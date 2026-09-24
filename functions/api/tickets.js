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

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>\"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

async function notificationEmail(env) {
  if (!env.DB) return DEFAULT_NOTIFICATION_EMAIL;
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL, updated_at TEXT NOT NULL)"
  ).run();
  await env.DB.prepare(
    "INSERT OR IGNORE INTO app_settings (key, value, updated_at) VALUES (?, ?, ?)"
  ).bind("notification_email", DEFAULT_NOTIFICATION_EMAIL, new Date().toISOString()).run();
  const row = await env.DB.prepare(
    "SELECT value FROM app_settings WHERE key = ?"
  ).bind("notification_email").first();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(row?.value || "")) ? row.value : DEFAULT_NOTIFICATION_EMAIL;
}

async function sendTicketNotification(env, ticket) {
  if (!env.EMAIL) return { sent: false, configured: false };
  const recipient = await notificationEmail(env);
  const from = env.NOTIFICATION_FROM || "procesosfulmar@gmail.com";
  const subject = "Nuevo Requerimiento " + ticket.id + " - " + (ticket.customer || "Sin Razón Social");
  const text = [
    subject,
    "Fecha: " + (ticket.createdAt || "—"),
    "Razón Social: " + (ticket.customer || "—"),
    "Requerimiento: " + (ticket.subject || "—"),
    "Operador: " + (ticket.operator || ticket.createdBy || "—"),
    "Solicitado A: " + (ticket.requestedTo || "—"),
    "Prioridad: " + (ticket.priority || "—"),
    "",
    ticket.description || ""
  ].join("\n");
  const html = "<h2>" + escapeHtml(subject) + "</h2><p><strong>Fecha:</strong> " + escapeHtml(ticket.createdAt || "—") + "</p><p><strong>Razón Social:</strong> " + escapeHtml(ticket.customer || "—") + "</p><p><strong>Requerimiento:</strong> " + escapeHtml(ticket.subject || "—") + "</p><p><strong>Operador:</strong> " + escapeHtml(ticket.operator || ticket.createdBy || "—") + "</p><p><strong>Solicitado A:</strong> " + escapeHtml(ticket.requestedTo || "—") + "</p><p><strong>Prioridad:</strong> " + escapeHtml(ticket.priority || "—") + "</p><hr /><p>" + escapeHtml(ticket.description || "") + "</p>";
  const result = await env.EMAIL.send({ from, to: recipient, subject, text, html });
  return { sent: true, configured: true, recipient, messageId: result?.messageId || "" };
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
