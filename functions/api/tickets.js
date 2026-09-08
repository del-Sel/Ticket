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
  return json(ticket, 201);
}
