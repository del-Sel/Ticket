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

export async function onRequestPut({ request, env, params }) {
  if (!env.DB) return json({ error: "D1 binding DB is not configured" }, 503);
  const ticket = normalizeTicket(await request.json().catch(() => null));
  if (!ticket || ticket.id !== params.id) return json({ error: "Ticket inválido" }, 400);
  const result = await env.DB.prepare(
    "UPDATE tickets SET number = ?, status = ?, updated_at = ?, payload = ? WHERE id = ?"
  ).bind(ticket.number || 0, ticket.status || "Nuevo", ticket.updatedAt, JSON.stringify(ticket), ticket.id).run();
  if (!result.meta?.changes) return json({ error: "Ticket no encontrado" }, 404);
  return json(ticket);
}
