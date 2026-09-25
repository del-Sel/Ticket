function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function normalizeTicket(ticket) {
  if (!ticket || typeof ticket !== "object" || !ticket.id || !ticket.createdAt || !ticket.updatedAt) return null;
  return ticket;
}

const DEFAULT_NOTIFICATION_EMAIL = "santiagotdelsel@gmail.com";
const DEFAULT_NOTIFICATION_RECIPIENTS = [
  { name: "Santiago del Sel", email: DEFAULT_NOTIFICATION_EMAIL },
  { name: "Franco Barrios", email: DEFAULT_NOTIFICATION_EMAIL },
  { name: "Gastón Paz", email: DEFAULT_NOTIFICATION_EMAIL }
];

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>\"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function parseRecipients(value) {
  try {
    const parsed = JSON.parse(String(value || ""));
    if (!Array.isArray(parsed)) return [];
    return parsed.map(item => ({
      name: String(item?.name || "").trim(),
      email: String(item?.email || "").trim().toLowerCase()
    })).filter(item => item.name && validEmail(item.email));
  } catch (error) {
    return [];
  }
}

async function notificationRecipients(env) {
  if (!env.DB) return DEFAULT_NOTIFICATION_RECIPIENTS;
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL, updated_at TEXT NOT NULL)"
  ).run();
  await env.DB.prepare(
    "INSERT OR IGNORE INTO app_settings (key, value, updated_at) VALUES (?, ?, ?)"
  ).bind("notification_email", DEFAULT_NOTIFICATION_EMAIL, new Date().toISOString()).run();
  await env.DB.prepare(
    "INSERT OR IGNORE INTO app_settings (key, value, updated_at) VALUES (?, ?, ?)"
  ).bind("notification_recipients", JSON.stringify(DEFAULT_NOTIFICATION_RECIPIENTS), new Date().toISOString()).run();
  const row = await env.DB.prepare(
    "SELECT value FROM app_settings WHERE key = ?"
  ).bind("notification_recipients").first();
  const recipients = parseRecipients(row?.value);
  if (recipients.length) return recipients;
  const legacy = await env.DB.prepare(
    "SELECT value FROM app_settings WHERE key = ?"
  ).bind("notification_email").first();
  return validEmail(legacy?.value) ? [{ name: "Santiago del Sel", email: legacy.value }] : DEFAULT_NOTIFICATION_RECIPIENTS;
}

async function sendTicketNotification(env, ticket) {
  const recipients = await notificationRecipients(env);
  const recipientEmails = recipients.map(item => item.email).join(", ");
  const mailer = env.PROCESS_MAILER;
  const mailToken = env.REPORT_MAIL_TOKEN;
  if (!mailer || !mailToken) return { sent: false, configured: false, recipients: recipientEmails };
  const subject = "Nuevo Requerimiento " + ticket.id + " - " + (ticket.customer || "Sin Razón Social");
  const text = [
    subject,
    "Fecha: " + (ticket.createdAt || "—"),
    "Razón Social: " + (ticket.customer || "—"),
    "Requerimiento: " + (ticket.subject || "—"),
    "Operador: " + (ticket.operator || ticket.createdBy || "—"),
    "Solicitado a: " + (ticket.requestedTo || "—"),
    "Prioridad: " + (ticket.priority || "—"),
    "",
    ticket.description || ""
  ].join("\n");
  const html = "<h2>" + escapeHtml(subject) + "</h2><p><strong>Fecha:</strong> " + escapeHtml(ticket.createdAt || "—") + "</p><p><strong>Razón Social:</strong> " + escapeHtml(ticket.customer || "—") + "</p><p><strong>Requerimiento:</strong> " + escapeHtml(ticket.subject || "—") + "</p><p><strong>Operador:</strong> " + escapeHtml(ticket.operator || ticket.createdBy || "—") + "</p><p><strong>Solicitado a:</strong> " + escapeHtml(ticket.requestedTo || "—") + "</p><p><strong>Prioridad:</strong> " + escapeHtml(ticket.priority || "—") + "</p><hr /><p>" + escapeHtml(ticket.description || "") + "</p>";
  const response = await mailer.fetch("https://internal/api/report-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Report-Mail-Token": mailToken
    },
    body: JSON.stringify({ to: recipientEmails, subject, text, html })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { sent: false, configured: true, recipients: recipientEmails, error: result?.error || "No se pudo enviar el aviso" };
  }
  return { sent: true, configured: true, recipients: recipientEmails, messageId: result?.messageId || "" };
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ error: "D1 binding DB is not configured" }, 503);
  const { results = [] } = await env.DB.prepare(
    "SELECT payload FROM tickets ORDER BY updated_at DESC"
  ).all();
  return json(results.map(row => JSON.parse(row.payload)));
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: "D1 binding DB is not configured" }, 503);
  const ticket = normalizeTicket(await request.json().catch(() => null));
  if (!ticket) return json({ error: "Ticket inválido" }, 400);
  await env.DB.prepare(
    "INSERT INTO tickets (id, number, status, created_at, updated_at, payload) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(ticket.id, ticket.number || 0, ticket.status || "Nuevo", ticket.createdAt, ticket.updatedAt, JSON.stringify(ticket)).run();
  let notification = { sent: false, configured: false };
  try {
    notification = await sendTicketNotification(env, ticket);
  } catch (error) {
    console.error("No se pudo enviar el aviso por correo", error);
    notification = { sent: false, configured: true };
  }
  return json({ ...ticket, notification }, 201);
}
