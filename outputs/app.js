const STORAGE_KEY = "fulmar-reclamos-v1";
const ROLE_KEY = "fulmar-role-v1";
const API_PATH = "/api/tickets";

const STATUS = {
  NEW: "Nuevo",
  ASSIGNED: "Derivado a Sistemas",
  ANALYSIS: "En análisis",
  RESOLVED: "Resuelto por Sistemas",
  VERIFICATION: "En verificación",
  CLOSED: "Cerrado"
};

const statusClass = {
  [STATUS.NEW]: "status-new",
  [STATUS.ASSIGNED]: "status-systems",
  [STATUS.ANALYSIS]: "status-analysis",
  [STATUS.RESOLVED]: "status-resolved",
  [STATUS.VERIFICATION]: "status-verification",
  [STATUS.CLOSED]: "status-closed"
};

const seedTickets = [
  {
    id: "RC-0007",
    number: 7,
    customer: "Cliente de demostración",
    contact: "cliente@ejemplo.com",
    subject: "Reclamo por información no actualizada",
    typology: "Reclamo de cliente",
    sourceSector: "Gestión de Calidad",
    createdBy: "Natalia",
    priority: "Alta",
    targetDate: "2026-09-05",
    description: "El cliente informa que recibió información desactualizada en la última comunicación y solicita una respuesta formal.",
    immediateAction: "Se registró el reclamo y se derivó para análisis del equipo de Sistemas.",
    status: STATUS.ANALYSIS,
    assignee: "Sistemas",
    createdAt: "2026-09-03T09:10:00",
    updatedAt: "2026-09-03T11:35:00",
    correctiveNumber: 1,
    correctiveAction: "Revisar el origen de los datos, corregir la información publicada y validar el circuito de actualización.",
    resolution: "Se identificó una demora en la sincronización. Se actualizó el dato y se agregó una validación previa a la próxima comunicación.",
    actionTaken: "Actualización de la fuente de datos y control de validación implementado.",
    systemsResponsible: "Equipo de Sistemas",
    verification: null,
    history: [
      { title: "Ticket creado", text: "Registrado por Natalia desde Gestión de Calidad.", date: "2026-09-03T09:10:00", complete: true },
      { title: "Derivado a Sistemas", text: "El caso fue enviado al equipo responsable.", date: "2026-09-03T09:18:00", complete: true },
      { title: "Caso tomado por Sistemas", text: "Sistemas comenzó el análisis técnico.", date: "2026-09-03T11:35:00", complete: true },
      { title: "Respuesta de Sistemas", text: "Pendiente de registrar la resolución y respuesta formal.", date: null, complete: false },
      { title: "Verificación y cierre", text: "Calidad verificará la efectividad de la acción.", date: null, complete: false }
    ]
  },
  {
    id: "RC-0006",
    number: 6,
    customer: "Transportes del Sur S.A.",
    contact: "compras@transportesdelsur.com",
    subject: "Acceso bloqueado al portal de pedidos",
    typology: "Reclamo de cliente",
    sourceSector: "Atención al Cliente",
    createdBy: "Mariana",
    priority: "Media",
    targetDate: "2026-09-04",
    description: "El usuario principal no puede acceder al portal desde el cambio de contraseña.",
    immediateAction: "Se confirmó la identidad del contacto y se derivó el incidente.",
    status: STATUS.RESOLVED,
    assignee: "Sistemas",
    createdAt: "2026-09-02T14:20:00",
    updatedAt: "2026-09-03T10:05:00",
    correctiveNumber: 1,
    correctiveAction: "Revisar el restablecimiento de credenciales y el envío de instrucciones de acceso.",
    resolution: "Se restableció la contraseña, se comprobó el acceso y se envió una respuesta al contacto del cliente.",
    actionTaken: "Restablecimiento de credenciales y prueba de acceso exitosa.",
    systemsResponsible: "Luciano - Sistemas",
    verification: null,
    history: [
      { title: "Ticket creado", text: "Registrado por Mariana desde Atención al Cliente.", date: "2026-09-02T14:20:00", complete: true },
      { title: "Derivado a Sistemas", text: "El caso fue enviado al equipo responsable.", date: "2026-09-02T14:31:00", complete: true },
      { title: "Caso tomado por Sistemas", text: "Sistemas comenzó el análisis técnico.", date: "2026-09-03T08:30:00", complete: true },
      { title: "Respuesta de Sistemas", text: "Resolución registrada. Pendiente de verificación por Calidad.", date: "2026-09-03T10:05:00", complete: true },
      { title: "Verificación y cierre", text: "Calidad debe confirmar que la acción fue efectiva.", date: null, complete: false }
    ]
  },
  {
    id: "RC-0005",
    number: 5,
    customer: "Industrias Andinas",
    contact: "soporte@industriasandinas.com",
    subject: "Error al descargar certificado",
    typology: "Consulta",
    sourceSector: "Comercial",
    createdBy: "Pablo",
    priority: "Baja",
    targetDate: "2026-09-06",
    description: "El cliente no consigue descargar el certificado desde el área privada.",
    immediateAction: "Se solicitó una captura de pantalla y se informó que el caso estaba en revisión.",
    status: STATUS.ASSIGNED,
    assignee: "Sistemas",
    createdAt: "2026-09-03T08:05:00",
    updatedAt: "2026-09-03T08:20:00",
    correctiveNumber: null,
    correctiveAction: "",
    resolution: "",
    actionTaken: "",
    systemsResponsible: "",
    verification: null,
    history: [
      { title: "Ticket creado", text: "Registrado por Pablo desde Comercial.", date: "2026-09-03T08:05:00", complete: true },
      { title: "Derivado a Sistemas", text: "El caso fue enviado al equipo responsable.", date: "2026-09-03T08:20:00", complete: true },
      { title: "Caso tomado por Sistemas", text: "Pendiente de que Sistemas tome el caso.", date: null, complete: false },
      { title: "Respuesta de Sistemas", text: "Pendiente de registrar la resolución.", date: null, complete: false },
      { title: "Verificación y cierre", text: "Calidad verificará la efectividad de la acción.", date: null, complete: false }
    ]
  },
  {
    id: "RC-0004",
    number: 4,
    customer: "Farmacia Central",
    contact: "administracion@farmaciacentral.com",
    subject: "Demora en confirmación de pedido",
    typology: "Reclamo de cliente",
    sourceSector: "Atención al Cliente",
    createdBy: "Mariana",
    priority: "Media",
    targetDate: "2026-09-01",
    description: "La confirmación de un pedido llegó fuera del plazo esperado.",
    immediateAction: "Se confirmó el estado del pedido y se comunicó el seguimiento.",
    status: STATUS.CLOSED,
    assignee: "Sistemas",
    createdAt: "2026-08-28T10:10:00",
    updatedAt: "2026-09-01T16:40:00",
    correctiveNumber: 1,
    correctiveAction: "Revisar la notificación automática y establecer un control de envío.",
    resolution: "Se ajustó la regla de notificaciones y se monitoreó el envío durante 24 horas.",
    actionTaken: "Regla corregida y control de envío aplicado.",
    systemsResponsible: "Luciano - Sistemas",
    verification: { result: "Acción efectiva", observations: "Se verificó el envío correcto de nuevas confirmaciones.", date: "2026-09-01T16:35:00", by: "Natalia" },
    history: [
      { title: "Ticket creado", text: "Registrado por Mariana desde Atención al Cliente.", date: "2026-08-28T10:10:00", complete: true },
      { title: "Derivado a Sistemas", text: "El caso fue enviado al equipo responsable.", date: "2026-08-28T10:20:00", complete: true },
      { title: "Respuesta de Sistemas", text: "Resolución registrada y comunicada a Atención.", date: "2026-08-31T15:10:00", complete: true },
      { title: "Acción verificada", text: "Acción efectiva. Verificación realizada por Natalia.", date: "2026-09-01T16:35:00", complete: true },
      { title: "Acción correctiva cerrada", text: "La no conformidad quedó cerrada.", date: "2026-09-01T16:40:00", complete: true }
    ]
  }
];

let tickets = loadTickets();
let apiAvailable = false;
let activeRole = localStorage.getItem(ROLE_KEY) || "calidad";
let currentQuickFilter = "all";
let selectedTicketId = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function loadTickets() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : structuredClone(seedTickets);
  } catch (error) {
    return structuredClone(seedTickets);
  }
}

function saveTickets(ticket = null, method = "PUT") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  if (ticket && apiAvailable) void saveRemoteTicket(ticket, method);
}

function apiUrl() {
  return ["http:", "https:"].includes(window.location.protocol) ? `${window.location.origin}${API_PATH}` : null;
}

async function loadRemoteTickets() {
  const url = apiUrl();
  if (!url) return;
  try {
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) return;
    const remoteTickets = await response.json();
    if (!Array.isArray(remoteTickets)) return;
    tickets = remoteTickets;
    apiAvailable = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    if (location.hash.startsWith("#ticket/") && !ticketById(selectedTicketId)) {
      location.hash = "dashboard";
      return;
    }
    if (location.hash.startsWith("#ticket/") && selectedTicketId) renderDetail(ticketById(selectedTicketId));
    else renderDashboard();
  } catch (error) {
    // The local demo remains available when the API is not configured yet.
  }
}

async function saveRemoteTicket(ticket, method = "PUT") {
  const url = method === "POST" ? apiUrl() : `${apiUrl()}/${encodeURIComponent(ticket.id)}`;
  if (!url) return;
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(ticket)
    });
    if (!response.ok) throw new Error(`API ${response.status}`);
  } catch (error) {
    showToast("El ticket quedó guardado localmente, pero no se pudo sincronizar");
  }
}
function nowIso() { return new Date().toISOString(); }
function todayInput() { return new Date().toISOString().slice(0, 10); }
function initials(name = "") { return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "--"; }
function formatDate(value, withTime = false) {
  if (!value) return "—";
  const date = new Date(value.includes("T") ? value : `${value}T12:00:00`);
  const base = new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  if (!withTime) return base;
  return `${base} · ${new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit" }).format(date)}`;
}
function relativeDate(value) {
  if (!value) return "—";
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  return formatDate(value);
}
function statusBadge(status) { return `<span class="status-badge ${statusClass[status] || "status-closed"}">${status}</span>`; }
function ticketById(id) { return tickets.find(ticket => ticket.id === id); }

function renderDashboard() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const selectedStatus = $("#statusFilter").value;
  const visible = tickets.filter(ticket => {
    const matchesQuery = !query || [ticket.id, ticket.customer, ticket.subject, ticket.sourceSector].some(value => String(value || "").toLowerCase().includes(query));
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus;
    return matchesQuery && matchesStatus;
  }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  $("#resultCount").textContent = `${visible.length} ${visible.length === 1 ? "ticket" : "tickets"}`;
  $("#ticketTableBody").innerHTML = visible.map(ticket => `<tr data-open-ticket="${ticket.id}">
    <td><span class="ticket-id">${ticket.id}</span></td>
    <td><span class="updated">${formatDate(ticket.createdAt)}</span></td>
    <td><span class="ticket-customer strong-cell">${escapeHtml(ticket.customer)}</span></td>
    <td><div class="ticket-subject">${escapeHtml(ticket.subject)}</div></td>
    <td><span>${escapeHtml(ticket.createdBy || "—")}</span></td>
    <td><span>${escapeHtml(ticket.assignee || "—")}</span></td>
    <td><span class="priority ${ticket.priority}">${ticket.priority}</span></td>
    <td>${statusBadge(ticket.status)}</td>
    <td><span class="updated">${ticket.status === STATUS.CLOSED ? formatDate(ticket.closedAt || ticket.updatedAt) : "—"}</span></td>
    <td><span class="verified ${ticket.verification?.result === "Acción efectiva" ? "yes" : ticket.verification?.result === "Acción no efectiva" ? "no" : ""}">${ticket.verification?.result === "Acción efectiva" ? "Sí" : ticket.verification?.result === "Acción no efectiva" ? "No" : "—"}</span></td>
  </tr>`).join("");
  $("#emptyState").classList.toggle("hidden", visible.length > 0);
  $$('[data-open-ticket]').forEach(row => row.addEventListener("click", () => openTicket(row.dataset.openTicket)));
}

function renderDetail(ticket) {
  const canAssign = activeRole === "calidad" && ticket.status === STATUS.NEW;
  const canTake = activeRole === "sistemas" && ticket.status === STATUS.ASSIGNED;
  const canResolve = activeRole === "sistemas" && ticket.status === STATUS.ANALYSIS;
  const canVerify = activeRole === "calidad" && [STATUS.RESOLVED, STATUS.VERIFICATION].includes(ticket.status);
  const canClose = activeRole === "calidad" && ticket.status === STATUS.VERIFICATION && ticket.verification?.result === "Acción efectiva";
  const primaryAction = canAssign ? `<button class="button button-primary" data-action="assign">Derivar a Sistemas <span>→</span></button>`
    : canTake ? `<button class="button button-primary" data-action="take">Tomar caso <span>→</span></button>`
    : canResolve ? `<button class="button button-primary" data-action="resolve">Registrar resolución <span>→</span></button>`
    : canClose ? `<button class="button button-primary" data-action="close">Cerrar acción correctiva <span>✓</span></button>`
    : canVerify ? `<button class="button button-primary" data-action="verify">Verificar acción <span>→</span></button>` : "";
  $("#detailContent").innerHTML = `<div class="detail-top">
    <div><a class="back-link" href="#dashboard">← Volver al panel</a><div class="detail-title-row"><h1>${escapeHtml(ticket.subject)}</h1>${statusBadge(ticket.status)}</div><div class="detail-meta"><span><strong>${ticket.id}</strong></span><span>Creado ${formatDate(ticket.createdAt)}</span><span>Por <strong>${escapeHtml(ticket.createdBy)}</strong></span></div></div>
    <div class="detail-actions">${primaryAction}<button class="button button-secondary" data-action="copy">Copiar número</button></div>
  </div>
  <div class="detail-grid">
    <div class="detail-main">
      <article class="info-card"><div class="info-card-heading"><h2>Fase 1 · Registro de la no conformidad</h2><span class="muted">Origen del caso</span></div><div class="read-grid">
        ${readField("Cliente", ticket.customer)}${readField("Contacto", ticket.contact || "No informado")}${readField("Tipología", ticket.typology)}${readField("Sector emisor", ticket.sourceSector)}${readField("Descripción", ticket.description, true)}${readField("Acción inmediata", ticket.immediateAction || "No registrada", true)}
      </div></article>
      <article class="info-card response-card"><div class="info-card-heading"><h2><span class="systems-icon">↗</span> Fases 2 y 3 · Acción de Sistemas</h2>${ticket.correctiveNumber ? `<span class="muted">N° AC ${ticket.correctiveNumber}</span>` : ""}</div>
        ${ticket.correctiveAction ? `<div class="field-readonly">${readField("Acción correctiva definida", ticket.correctiveAction, true)}</div>` : `<div class="next-step"><strong>Próximo paso de Sistemas</strong>Tomar el caso, documentar el análisis y definir la acción correctiva.</div>`}
        ${ticket.resolution ? `<div class="field-readonly">${readField("Respuesta / resolución de Sistemas", ticket.resolution, true)}</div>` : ""}
        ${ticket.actionTaken ? `<div class="field-readonly">${readField("Acción tomada", ticket.actionTaken, true)}</div>` : ""}
        ${ticket.systemsResponsible ? `<div class="field-readonly">${readField("Responsable de la acción", ticket.systemsResponsible)}</div>` : ""}
      </article>
      <article class="info-card timeline-card"><h2>Historial del ticket</h2><div class="timeline">${ticket.history.map(item => `<div class="timeline-item ${item.complete ? "complete" : ""}"><span class="timeline-dot"></span><div class="timeline-copy"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p><time>${item.date ? formatDate(item.date, true) : "Pendiente"}</time></div></div>`).join("")}</div></article>
    </div>
    <aside class="side-stack">
      <article class="info-card side-card"><h2>Resumen operativo</h2><div class="assignee"><span class="mini-avatar system">${initials(ticket.assignee || "Sin asignar")}</span><div><strong>${escapeHtml(ticket.assignee || "Sin asignar")}</strong><span>Responsable actual</span></div></div><div class="sidebar-divider"></div><div class="side-details"><div class="side-detail"><span>Prioridad</span><strong class="priority ${ticket.priority}">${ticket.priority}</strong></div><div class="side-detail"><span>Fecha objetivo</span><strong>${formatDate(ticket.targetDate)}</strong></div><div class="side-detail"><span>Última actualización</span><strong>${formatDate(ticket.updatedAt, true)}</strong></div><div class="side-detail"><span>N° acción correctiva</span><strong>${ticket.correctiveNumber || "Pendiente"}</strong></div></div></article>
      ${ticket.verification ? `<article class="info-card side-card"><h2>Fase 4 · Verificación</h2><div class="side-details"><div class="side-detail"><span>Resultado</span><strong>${escapeHtml(ticket.verification.result)}</strong></div><div class="side-detail"><span>Verificado por</span><strong>${escapeHtml(ticket.verification.by)}</strong></div><div class="side-detail"><span>Fecha</span><strong>${formatDate(ticket.verification.date)}</strong></div></div><p class="internal-note">${escapeHtml(ticket.verification.observations || "Sin observaciones")}</p></article>` : ""}
      <article class="info-card side-card"><p class="eyebrow">RESPUESTA AL CLIENTE</p><div class="next-step"><strong>${ticket.status === STATUS.CLOSED ? "Caso cerrado" : activeRole === "sistemas" ? "Cuando resuelvas" : "Cuando Sistemas responda"}</strong>${ticket.status === STATUS.CLOSED ? "La acción correctiva fue verificada y cerrada." : activeRole === "sistemas" ? "registrá también el texto que Atención podrá comunicar al cliente." : "vas a poder revisar la resolución y enviar una respuesta formal al cliente."}</div><p class="internal-note">La respuesta queda dentro del ticket para mantener una trazabilidad completa.</p></article>
    </aside>
  </div>`;
  $$('[data-action]', $("#detailContent")).forEach(button => button.addEventListener("click", () => handleDetailAction(button.dataset.action, ticket.id)));
}

function readField(label, value, large = false) { return `<div class="field-readonly"><span class="read-label">${label}</span><div class="read-value ${large ? "large" : ""}">${escapeHtml(value || "—")}</div></div>`; }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }

function showView(view) {
  const target = view === "detail" ? "detail" : view === "new" ? "new" : "dashboard";
  $$('[data-view]').forEach(section => section.classList.toggle("hidden", section.dataset.view !== target));
  $$('[data-view-link]').forEach(link => link.classList.toggle("is-active", link.dataset.viewLink === target));
  if (target === "dashboard") renderDashboard();
  if (target === "new") { const dateField = $("[name=targetDate]"); if (dateField && !dateField.value) dateField.value = todayInput(); }
  if (target === "detail" && selectedTicketId) { const ticket = ticketById(selectedTicketId); if (ticket) renderDetail(ticket); }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openTicket(id) { selectedTicketId = id; location.hash = `ticket/${id}`; }

function addHistory(ticket, title, text, complete = true) {
  ticket.history = ticket.history || [];
  ticket.history = ticket.history.filter(item => !["Derivación a Sistemas", "Derivado a Sistemas", "Caso tomado por Sistemas", "Respuesta de Sistemas", "Verificación y cierre"].includes(item.title) || item.complete);
  ticket.history.push({ title, text, date: nowIso(), complete });
}

function handleDetailAction(action, id) {
  const ticket = ticketById(id);
  if (!ticket) return;
  if (action === "copy") { navigator.clipboard?.writeText(ticket.id); showToast(`${ticket.id} copiado`); return; }
  if (action === "assign") { ticket.status = STATUS.ASSIGNED; ticket.assignee = "Sistemas"; ticket.updatedAt = nowIso(); addHistory(ticket, "Derivado a Sistemas", "El caso fue enviado al equipo responsable."); saveTickets(ticket); renderDetail(ticket); showToast("Ticket derivado a Sistemas"); return; }
  if (action === "take") { ticket.status = STATUS.ANALYSIS; ticket.assignee = "Sistemas"; ticket.updatedAt = nowIso(); addHistory(ticket, "Caso tomado por Sistemas", "Sistemas comenzó el análisis técnico."); saveTickets(ticket); renderDetail(ticket); showToast("El caso quedó en análisis"); return; }
  if (action === "resolve") { openResolutionModal(ticket); return; }
  if (action === "verify") { openVerificationModal(ticket); return; }
  if (action === "close") { ticket.status = STATUS.CLOSED; ticket.closedAt = nowIso(); ticket.updatedAt = ticket.closedAt; addHistory(ticket, "Acción correctiva cerrada", "La no conformidad quedó cerrada."); saveTickets(ticket); renderDetail(ticket); showToast("Acción correctiva cerrada"); return; }
}

function openResolutionModal(ticket) {
  const modal = createModal("Registrar resolución de Sistemas", `<form id="resolutionForm" class="modal-form"><p class="field-help">Completá la acción correctiva, lo realizado y el texto que Atención puede comunicar al cliente.</p><label class="field"><span>Acción correctiva definida <em>*</em></span><textarea name="correctiveAction" required placeholder="Qué se hará para eliminar la causa del problema..."></textarea></label><label class="field"><span>Acción tomada <em>*</em></span><textarea name="actionTaken" required placeholder="Qué se hizo concretamente..."></textarea></label><label class="field"><span>Respuesta / resolución para comunicar <em>*</em></span><textarea name="resolution" required placeholder="Respuesta clara para Atención y el cliente..."></textarea></label><label class="field"><span>Responsable de la acción</span><input name="systemsResponsible" value="Equipo de Sistemas" /></label><div class="form-footer"><button type="button" class="button button-secondary" data-close-modal>Cancelar</button><button type="submit" class="button button-primary">Guardar resolución</button></div></form>`);
  $("#resolutionForm", modal).addEventListener("submit", event => { event.preventDefault(); const form = new FormData(event.target); ticket.correctiveNumber = ticket.correctiveNumber || nextCorrectiveNumber(); ticket.correctiveAction = form.get("correctiveAction"); ticket.actionTaken = form.get("actionTaken"); ticket.resolution = form.get("resolution"); ticket.systemsResponsible = form.get("systemsResponsible") || "Equipo de Sistemas"; ticket.status = STATUS.RESOLVED; ticket.updatedAt = nowIso(); addHistory(ticket, "Respuesta de Sistemas", `Resolución registrada por ${ticket.systemsResponsible}.`); saveTickets(ticket); closeModal(); renderDetail(ticket); showToast("Resolución registrada. Calidad puede verificarla"); });
}

function openVerificationModal(ticket) {
  const modal = createModal("Verificar acción implementada", `<form id="verificationForm" class="modal-form"><p class="field-help">Esta instancia corresponde a la verificación de efectividad por Atención / Calidad.</p><label class="field"><span>Resultado de la verificación <em>*</em></span><select name="result" required><option value="Acción efectiva">Acción efectiva</option><option value="Acción no efectiva">Acción no efectiva</option></select></label><label class="field"><span>Observaciones</span><textarea name="observations" placeholder="Qué se comprobó y qué evidencia queda..."></textarea></label><div class="form-footer"><button type="button" class="button button-secondary" data-close-modal>Cancelar</button><button type="submit" class="button button-primary">Guardar verificación</button></div></form>`);
  $("#verificationForm", modal).addEventListener("submit", event => { event.preventDefault(); const form = new FormData(event.target); const result = form.get("result"); ticket.verification = { result, observations: form.get("observations"), date: nowIso(), by: "Natalia" }; ticket.status = result === "Acción efectiva" ? STATUS.VERIFICATION : STATUS.ANALYSIS; ticket.updatedAt = nowIso(); addHistory(ticket, result === "Acción efectiva" ? "Acción verificada" : "Verificación: requiere ajustes", result === "Acción efectiva" ? `Acción efectiva. Verificación realizada por Natalia.` : "La acción no fue efectiva; Sistemas debe revisar el caso."); saveTickets(ticket); closeModal(); renderDetail(ticket); showToast(result === "Acción efectiva" ? "Acción verificada. Ya puede cerrarse" : "El ticket volvió a Sistemas para ajustes"); });
}

function createModal(title, content) {
  closeModal(); const backdrop = document.createElement("div"); backdrop.className = "modal-backdrop"; backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}"><div class="modal-header"><h2>${escapeHtml(title)}</h2><button class="modal-close" type="button" aria-label="Cerrar" data-close-modal>×</button></div>${content}</div>`; document.body.appendChild(backdrop); backdrop.addEventListener("click", event => { if (event.target === backdrop || event.target.closest("[data-close-modal]")) closeModal(); }); return backdrop;
}
function closeModal() { $(".modal-backdrop")?.remove(); }
function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 3000); }
function nextTicketNumber() { return Math.max(0, ...tickets.map(ticket => ticket.number || Number(ticket.id.replace(/\D/g, "")) || 0)) + 1; }
function nextCorrectiveNumber() { return Math.max(0, ...tickets.map(ticket => ticket.correctiveNumber || 0)) + 1; }

$("#roleSelect").value = activeRole;
$("#roleSelect").addEventListener("change", event => { activeRole = event.target.value; localStorage.setItem(ROLE_KEY, activeRole); if (selectedTicketId && location.hash.startsWith("#ticket/")) renderDetail(ticketById(selectedTicketId)); showToast(activeRole === "sistemas" ? "Perfil Sistemas activo" : "Perfil Atención / Calidad activo"); });
$("#searchInput").addEventListener("input", renderDashboard);
$("#statusFilter").addEventListener("change", () => { currentQuickFilter = "all"; renderDashboard(); });
$$("[data-quick-filter]").forEach(button => button.addEventListener("click", () => { currentQuickFilter = button.dataset.quickFilter; $("#statusFilter").value = "all"; renderDashboard(); }));
$("#newTicketForm").addEventListener("submit", event => { event.preventDefault(); const form = new FormData(event.target); const number = nextTicketNumber(); const created = nowIso(); const ticket = { id: `RC-${String(number).padStart(4, "0")}`, number, customer: form.get("customer"), contact: form.get("contact"), subject: form.get("subject"), typology: form.get("typology"), sourceSector: form.get("sourceSector"), createdBy: "Natalia", priority: form.get("priority"), targetDate: form.get("targetDate"), description: form.get("description"), immediateAction: form.get("immediateAction"), status: STATUS.NEW, assignee: "Sin asignar", createdAt: created, updatedAt: created, correctiveNumber: null, correctiveAction: "", resolution: "", actionTaken: "", systemsResponsible: "", verification: null, history: [{ title: "Ticket creado", text: "Registrado por Natalia desde el sector emisor.", date: created, complete: true }, { title: "Derivado a Sistemas", text: "Pendiente de enviar el caso al equipo responsable.", date: null, complete: false }, { title: "Respuesta de Sistemas", text: "Pendiente de registrar la resolución.", date: null, complete: false }, { title: "Verificación y cierre", text: "Calidad verificará la efectividad de la acción.", date: null, complete: false }] }; tickets.push(ticket); saveTickets(ticket, "POST"); event.target.reset(); showToast(`${ticket.id} creado correctamente`); openTicket(ticket.id); });

function routeFromHash() { const hash = location.hash.replace(/^#/, "") || "dashboard"; if (hash.startsWith("ticket/")) { selectedTicketId = hash.split("/")[1]; if (ticketById(selectedTicketId)) { renderDashboard(); showView("detail"); } else { location.hash = "dashboard"; showView("dashboard"); } } else if (hash === "new") showView("new"); else showView("dashboard"); }
window.addEventListener("hashchange", routeFromHash);
routeFromHash();
void loadRemoteTickets();
