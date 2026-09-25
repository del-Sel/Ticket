const DEFAULT_NOTIFICATION_EMAIL = "santiagotdelsel@gmail.com";
const DEFAULT_NOTIFICATION_RECIPIENTS = [
  { name: "Santiago del Sel", email: DEFAULT_NOTIFICATION_EMAIL },
  { name: "Franco Barrios", email: DEFAULT_NOTIFICATION_EMAIL },
  { name: "Gastón Paz", email: DEFAULT_NOTIFICATION_EMAIL }
];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function normalizeRecipients(value) {
  if (!Array.isArray(value)) return [];
  return value.map(item => ({
    name: String(item?.name || "").trim(),
    email: String(item?.email || "").trim().toLowerCase()
  })).filter(item => item.name && validEmail(item.email));
}

function parseRecipients(value) {
  try {
    return normalizeRecipients(JSON.parse(String(value || "")));
  } catch (error) {
    return [];
  }
}

async function ensureSettingsTable(db) {
  await db.prepare(
    "CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL, updated_at TEXT NOT NULL)"
  ).run();
  await db.prepare(
    "INSERT OR IGNORE INTO app_settings (key, value, updated_at) VALUES (?, ?, ?)"
  ).bind("notification_email", DEFAULT_NOTIFICATION_EMAIL, new Date().toISOString()).run();
  await db.prepare(
    "INSERT OR IGNORE INTO app_settings (key, value, updated_at) VALUES (?, ?, ?)"
  ).bind("notification_recipients", JSON.stringify(DEFAULT_NOTIFICATION_RECIPIENTS), new Date().toISOString()).run();
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ notificationRecipients: DEFAULT_NOTIFICATION_RECIPIENTS, configured: false });
  await ensureSettingsTable(env.DB);
  const row = await env.DB.prepare(
    "SELECT value FROM app_settings WHERE key = ?"
  ).bind("notification_recipients").first();
  const parsedRecipients = parseRecipients(row?.value);
  const notificationRecipients = parsedRecipients.length ? parsedRecipients : DEFAULT_NOTIFICATION_RECIPIENTS;
  return json({ notificationRecipients, notificationEmail: notificationRecipients[0].email, configured: Boolean(env.PROCESS_MAILER && env.REPORT_MAIL_TOKEN) });
}

export async function onRequestPut({ request, env }) {
  if (!env.DB) return json({ error: "D1 binding DB is not configured" }, 503);
  const body = await request.json().catch(() => null);
  const rawRecipients = Array.isArray(body?.notificationRecipients)
    ? body.notificationRecipients
    : body?.notificationEmail
      ? [{ name: "Santiago del Sel", email: body.notificationEmail }]
      : [];
  const notificationRecipients = normalizeRecipients(rawRecipients);
  if (!notificationRecipients.length || notificationRecipients.length !== rawRecipients.length) {
    return json({ error: "Revisá los nombres y correos de los destinatarios" }, 400);
  }
  await ensureSettingsTable(env.DB);
  const now = new Date().toISOString();
  await env.DB.prepare(
    "UPDATE app_settings SET value = ?, updated_at = ? WHERE key = ?"
  ).bind(JSON.stringify(notificationRecipients), now, "notification_recipients").run();
  await env.DB.prepare(
    "UPDATE app_settings SET value = ?, updated_at = ? WHERE key = ?"
  ).bind(notificationRecipients[0].email, now, "notification_email").run();
  return json({ notificationRecipients, notificationEmail: notificationRecipients[0].email, configured: Boolean(env.PROCESS_MAILER && env.REPORT_MAIL_TOKEN) });
}
