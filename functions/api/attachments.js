const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function safeFileName(name = "foto") {
  const clean = String(name).normalize("NFKD").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
  return clean || "foto";
}

function validTicketId(value) {
  return /^RS-\d{4}$/.test(String(value || ""));
}

export async function onRequestPost({ request, env }) {
  if (!env.ATTACHMENTS) return json({ error: "El almacenamiento de adjuntos no está configurado" }, 503);

  const formData = await request.formData().catch(() => null);
  const ticketId = String(formData?.get("ticketId") || "");
  const files = (formData?.getAll("files") || []).filter(file => file && typeof file.stream === "function");
  if (!validTicketId(ticketId)) return json({ error: "Requerimiento inválido" }, 400);
  if (!files.length || files.length > MAX_FILES) return json({ error: "Se pueden adjuntar entre 1 y 5 fotos" }, 400);

  const attachments = [];
  for (const file of files) {
    const type = String(file.type || "");
    if (!type.startsWith("image/")) return json({ error: "Solo se permiten imágenes" }, 400);
    if (Number(file.size || 0) > MAX_FILE_SIZE) return json({ error: "Cada foto puede pesar hasta 10 MB" }, 400);

    const name = safeFileName(file.name);
    const key = "tickets/" + ticketId + "/" + crypto.randomUUID() + "-" + name;
    await env.ATTACHMENTS.put(key, file.stream(), {
      httpMetadata: {
        contentType: type,
        contentDisposition: 'inline; filename="' + name + '"'
      },
      customMetadata: {
        ticketId,
        originalName: name
      }
    });
    attachments.push({
      key,
      name,
      size: Number(file.size || 0),
      type,
      url: "/api/attachments?key=" + encodeURIComponent(key)
    });
  }

  return json({ attachments }, 201);
}

export async function onRequestGet({ request, env }) {
  if (!env.ATTACHMENTS) return new Response("El almacenamiento de adjuntos no está configurado", { status: 503 });

  const key = new URL(request.url).searchParams.get("key") || "";
  if (!key.startsWith("tickets/") || key.includes("..")) return new Response("Adjunto inválido", { status: 400 });

  const object = await env.ATTACHMENTS.get(key);
  if (!object) return new Response("Adjunto no encontrado", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Cache-Control", "private, max-age=3600");
  headers.set("ETag", object.httpEtag);
  return new Response(object.body, { headers });
}
