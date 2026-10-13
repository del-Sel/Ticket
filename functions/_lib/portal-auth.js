const PORTAL_URL = 'https://ful-mar-portal.pages.dev';
const MODULE_ID = 'tickets';
const COOKIE_NAME = 'fulmar_portal_module_session';
const SESSION_MAX_AGE = 60 * 60 * 8;

function getCookie(request, name) {
  const value = (request.headers.get('Cookie') || '').split(';').map(part => part.trim()).find(part => part.startsWith(`${name}=`));
  return value ? decodeURIComponent(value.slice(name.length + 1)) : '';
}

function sessionCookie(value) {
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`;
}

function unauthorized(request, api = false) {
  if (api) return new Response(JSON.stringify({ error: 'Necesitás ingresar desde el Portal FUL-MAR.' }), { status: 401, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
  const returnTo = encodeURIComponent(new URL(request.url).toString());
  return Response.redirect(`${PORTAL_URL}/?portal-return=${returnTo}&portal-module=${MODULE_ID}`, 302);
}

async function exchangeCode(code) {
  const response = await fetch(`${PORTAL_URL}/api/auth/module-token/consume`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ code, moduleId: MODULE_ID })
  });
  if (!response.ok) return null;
  return response.json().catch(() => null);
}

export async function verifyPortalSession(request) {
  const sessionToken = getCookie(request, COOKIE_NAME);
  if (!sessionToken) return null;
  const response = await fetch(`${PORTAL_URL}/api/auth/module-session/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ sessionToken, moduleId: MODULE_ID })
  });
  if (!response.ok) return null;
  return response.json().catch(() => null);
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const isApi = url.pathname.startsWith('/api/');
  const isAsset = /\.(?:css|js|png|jpg|jpeg|webp|svg|ico|woff2?)$/i.test(url.pathname);
  const code = url.searchParams.get('portal_code');
  if (code) {
    const result = await exchangeCode(code);
    if (!result?.sessionToken) return unauthorized(request, isApi);
    url.searchParams.delete('portal_code');
    const headers = new Headers({ Location: url.toString(), 'Cache-Control': 'no-store' });
    headers.append('Set-Cookie', sessionCookie(result.sessionToken));
    return new Response(null, { status: 302, headers });
  }
  if (isAsset) return next();
  const session = await verifyPortalSession(request);
  if (!session) return unauthorized(request, isApi);
  return next();
}

