const DEFAULT_NOTIFICATION_EMAIL = "santiagotdelsel@gmail.com";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

async function ensureSettingsTable(db) {
  await db.prepare(
    "CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL, updated_at TEXT NOT NULL)"
  ).run();
  await db.prepare(
    "INSERT OR IGNORE INTO app_settings (key, value, updated_at) VALUES (?, ?, ?)"
  ).bind("notification_email", DEFAULT_NOTIFICATION_EMAIL, new Date().toISOString()).run();
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ notificationEmail: DEFAULT_NOTIFICATION_EMAIL, configured: false });
  await ensureSettingsTable(env.DB);
  const row = await env.DB.prepare(
    "SELECT value FROM app_settings WHERE key = ?"
  ).bind("notification_email").first();
  const notificationEmail = validEmail(row?.value) ? row.value : DEFAULT_NOTIFICATION_EMAIL;
  return json({ notificationEmail, configured: Boolean(env.RESEND_API_KEY) });
}

export async function onRequestPut({ request, env }) {
  if (!env.DB) return json({ error: "D1 binding DB is not configured" }, 503);
  const body = await request.json().catch(() => null);
  const notificationEmail = String(body?.notificationEmail || "").trim().toLowerCase();
  if (!validEmail(notificationEmail)) return json({ error: "Ingresá un correo válido" }, 400);
  await ensureSettingsTable(env.DB);
  await env.DB.prepare(
    "UPDATE app_settings SET value = ?, updated_at = ? WHERE key = ?"
  ).bind(notificationEmail, new Date().toISOString(), "notification_email").run();
  return json({ notificationEmail, configured: Boolean(env.RESEND_API_KEY) });
}
