const STORAGE_KEY = "fulmar-reclamos-v1";
const ROLE_KEY = "fulmar-role-v1";
const API_PATH = "/api/tickets";
const SYSTEM_PASSWORD = "35426";
const SYSTEM_ACCESS_KEY = "fulmar-sistemas-access-v1";
const OPERATORS = ["Cristian Sievert", "Santiago del Sel", "Ramiro Urgorri"];
const REQUESTED_TO = ["Marcos Barlotti"];
const EXCEL_STATUS = ["Pendiente", "En proceso", "Finalizada"];
const VERIFICATION_OPTIONS = ["Si", "No"];

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
  [STATUS.CLOSED]: "status-closed",
  Pendiente: "status-new",
  "En proceso": "status-analysis",
  Finalizada: "status-closed"
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
      { title: "Requerimiento registrado", text: "Registrado por Natalia desde Gestión de Calidad.", date: "2026-09-03T09:10:00", complete: true },
      { title: "Derivado a Sistemas", text: "El caso fue enviado al equipo responsable.", date: "2026-09-03T09:18:00", complete: true },
      { title: "Caso tomado por Sistemas", text: "Sistemas comenzó el análisis técnico.", date: "2026-09-03T11:35:00", complete: true },
      { title: "Corrección registrada", text: "Pendiente de registrar la corrección realizada y la observación.", date: null, complete: false },
      { title: "Verificación de Soporte", text: "Soporte verificará la corrección realizada.", date: null, complete: false }
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
      { title: "Requerimiento registrado", text: "Registrado por Mariana desde Atención al Cliente.", date: "2026-09-02T14:20:00", complete: true },
      { title: "Derivado a Sistemas", text: "El caso fue enviado al equipo responsable.", date: "2026-09-02T14:31:00", complete: true },
      { title: "Caso tomado por Sistemas", text: "Sistemas comenzó el análisis técnico.", date: "2026-09-03T08:30:00", complete: true },
      { title: "Corrección registrada", text: "Corrección realizada. Pendiente de verificación por Soporte.", date: "2026-09-03T10:05:00", complete: true },
      { title: "Verificación de Soporte", text: "Soporte debe verificar la corrección realizada.", date: null, complete: false }
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
      { title: "Requerimiento registrado", text: "Registrado por Pablo desde Comercial.", date: "2026-09-03T08:05:00", complete: true },
      { title: "Derivado a Sistemas", text: "El caso fue enviado al equipo responsable.", date: "2026-09-03T08:20:00", complete: true },
      { title: "Caso tomado por Sistemas", text: "Pendiente de que Sistemas tome el caso.", date: null, complete: false },
      { title: "Corrección registrada", text: "Pendiente de registrar la corrección realizada y la observación.", date: null, complete: false },
      { title: "Verificación de Soporte", text: "Soporte verificará la corrección realizada.", date: null, complete: false }
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
      { title: "Requerimiento registrado", text: "Registrado por Mariana desde Atención al Cliente.", date: "2026-08-28T10:10:00", complete: true },
      { title: "Derivado a Sistemas", text: "El caso fue enviado al equipo responsable.", date: "2026-08-28T10:20:00", complete: true },
      { title: "Corrección registrada", text: "Corrección realizada y comunicada a Atención.", date: "2026-08-31T15:10:00", complete: true },
      { title: "Verificación de Soporte", text: "Corrección verificada por Natalia.", date: "2026-09-01T16:35:00", complete: true },
      { title: "Requerimiento finalizado", text: "Soporte confirmó la corrección realizada.", date: "2026-09-01T16:40:00", complete: true }
    ]
  }
];

let tickets = loadTickets();
let apiAvailable = false;
let activeRole = localStorage.getItem(ROLE_KEY) || "calidad";
let systemUnlocked = sessionStorage.getItem(SYSTEM_ACCESS_KEY) === "1";
if (activeRole === "sistemas" && !systemUnlocked) activeRole = "calidad";
let currentQuickFilter = "all";
let selectedTicketId = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function loadTickets() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved ? JSON.parse(saved) : structuredClone(seedTickets)).map(normalizeTicket);
  } catch (error) {
    return structuredClone(seedTickets).map(normalizeTicket);
  }
}

function normalizeTicket(ticket) {
  const operator = ticket.operator || ticket.createdBy || "";
  const requestedTo = ticket.requestedTo || (ticket.assignee && !["Sin asignar", "Sistemas"].includes(ticket.assignee) ? ticket.assignee : REQUESTED_TO[0]);
  const historyTitles = {
    "Ticket creado": "Requerimiento registrado",
    "Respuesta de Sistemas": "Corrección registrada",
    "Caso tomado por Sistemas": "Revisión iniciada por Sistemas",
    "Verificación y cierre": "Verificación de Soporte",
    "Acción verificada": "Verificación de Soporte",
    "Acción correctiva cerrada": "Requerimiento finalizado"
  };
  return {
    ...ticket,
    operator,
    createdBy: operator || ticket.createdBy || "",
    requestedTo,
    history: (ticket.history || []).map(item => {
      const sentAutomatically = item.title === "Derivado a Sistemas" && !item.complete && ticket.status === STATUS.NEW;
      return { ...item, title: sentAutomatically ? "Enviado a Sistemas" : historyTitles[item.title] || item.title, complete: sentAutomatically ? true : item.complete };
    }),
    verified: ticket.verified || (["Acción efectiva", "Si"].includes(ticket.verification?.result) ? "Si" : ["Acción no efectiva", "No"].includes(ticket.verification?.result) ? "No" : ""),
    closedAt: ticket.closedAt || (ticket.status === STATUS.CLOSED ? ticket.updatedAt : "")
  };
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
    tickets = remoteTickets.map(normalizeTicket);
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
    showToast("El requerimiento quedó guardado localmente, pero no se pudo sincronizar");
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
function operationalStatus(ticket) {
  if (ticket.status === STATUS.CLOSED) return "Finalizada";
  if ([STATUS.NEW, STATUS.ASSIGNED].includes(ticket.status)) return "Pendiente";
  return "En proceso";
}
function dateInputValue(value) { return value ? String(value).slice(0, 10) : ""; }
function optionMarkup(options, selected, blankLabel = "") {
  const blank = blankLabel ? `<option value="">${escapeHtml(blankLabel)}</option>` : "";
  return `${blank}${options.map(option => `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}`;
}

function renderDashboard() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const selectedStatus = $("#statusFilter").value;
  const totals = tickets.reduce((summary, ticket) => { summary[operationalStatus(ticket)] += 1; return summary; }, { Pendiente: 0, "En proceso": 0, Finalizada: 0 });
  $("#totalCount").textContent = tickets.length;
  $("#pendingCount").textContent = totals.Pendiente;
  $("#progressCount").textContent = totals["En proceso"];
  $("#finishedCount").textContent = totals.Finalizada;
  const visible = tickets.filter(ticket => {
    const matchesQuery = !query || [ticket.id, ticket.customer, ticket.subject, ticket.operator, ticket.requestedTo].some(value => String(value || "").toLowerCase().includes(query));
    const matchesStatus = selectedStatus === "all" || operationalStatus(ticket) === selectedStatus;
    return matchesQuery && matchesStatus;
  }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  $("#resultCount").textContent = `${visible.length} ${visible.length === 1 ? "requerimiento" : "requerimientos"}`;
  $("#ticketTableBody").innerHTML = visible.map(ticket => `<tr data-open-ticket="${ticket.id}">
    <td><span class="ticket-id">${ticket.id}</span></td>
    <td><span class="updated">${formatDate(ticket.createdAt)}</span></td>
    <td><span class="ticket-customer strong-cell">${escapeHtml(ticket.customer)}</span></td>
    <td><div class="ticket-subject">${escapeHtml(ticket.subject)}</div></td>
    <td><span>${escapeHtml(ticket.operator || ticket.createdBy || "—")}</span></td>
    <td><span>${escapeHtml(ticket.requestedTo || "—")}</span></td>
    <td><span class="priority ${ticket.priority}">${escapeHtml(ticket.priority || "—")}</span></td>
    <td>${statusBadge(operationalStatus(ticket))}</td>
    <td><span class="updated">${ticket.status === STATUS.CLOSED ? formatDate(ticket.closedAt || ticket.updatedAt) : "—"}</span></td>
    <td><span class="verified ${ticket.verified === "Si" ? "yes" : ticket.verified === "No" ? "no" : ""}">${escapeHtml(ticket.verified || "—")}</span></td>
  </tr>`).join("");
  $("#emptyState").classList.toggle("hidden", visible.length > 0);
  $$('[data-open-ticket]').forEach(row => row.addEventListener("click", () => openTicket(row.dataset.openTicket)));
}

function renderDetail(ticket) {
  const canTake = activeRole === "sistemas" && [STATUS.NEW, STATUS.ASSIGNED].includes(ticket.status);
  const canResolve = activeRole === "sistemas" && ticket.status === STATUS.ANALYSIS;
  const canVerify = activeRole === "calidad" && [STATUS.RESOLVED, STATUS.VERIFICATION].includes(ticket.status);
  const primaryAction = canTake ? `<button class="button button-primary" data-action="take">Tomar requerimiento <span>→</span></button>`
    : canResolve ? `<button class="button button-primary" data-action="resolve">Registrar corrección <span>→</span></button>`
    : canVerify ? `<button class="button button-primary" data-action="verify">Verificar requerimiento <span>→</span></button>` : "";
  $("#detailContent").innerHTML = `<div class="detail-top">
    <div><a class="back-link" href="#dashboard">← Volver al panel</a><div class="detail-title-row"><h1>${escapeHtml(ticket.subject)}</h1>${statusBadge(operationalStatus(ticket))}</div><div class="detail-meta"><span><strong>${ticket.id}</strong></span><span>Fecha ${formatDate(ticket.createdAt)}</span><span>Operador <strong>${escapeHtml(ticket.operator || ticket.createdBy)}</strong></span></div></div>
    <div class="detail-actions">${primaryAction}</div>
  </div>
  <div class="detail-grid">
    <div class="detail-main">
      <article class="info-card"><div class="info-card-heading"><h2>Datos del requerimiento</h2></div><div class="read-grid">
        ${readField("Razón social", ticket.customer)}${readField("Operador", ticket.operator || ticket.createdBy)}${readField("Solicitado a", ticket.requestedTo)}${readField("Descripción", ticket.description || ticket.subject, true)}${ticket.contact ? readField("Contacto", ticket.contact) : ""}
      </div></article>
      ${(ticket.correction || ticket.correctiveAction || ticket.resolution || ticket.observation || ticket.actionTaken) ? `<article class="info-card response-card"><div class="info-card-heading"><h2><span class="systems-icon">↗</span> Corrección de Sistemas</h2></div>${ticket.correction || ticket.correctiveAction || ticket.resolution ? `<div class="field-readonly">${readField("Corrección realizada", ticket.correction || ticket.correctiveAction || ticket.resolution, true)}</div>` : ""}${ticket.observation || ticket.actionTaken ? `<div class="field-readonly">${readField("Observación", ticket.observation || ticket.actionTaken, true)}</div>` : ""}</article>` : ""}
      <article class="info-card timeline-card"><h2>Historial del requerimiento</h2><div class="timeline">${ticket.history.map(item => `<div class="timeline-item ${item.complete ? "complete" : ""}"><span class="timeline-dot"></span><div class="timeline-copy"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p><time>${item.date ? formatDate(item.date, true) : "Pendiente"}</time></div></div>`).join("")}</div></article>
    </div>
    <aside class="side-stack">
      <article class="info-card side-card"><h2>Resumen operativo</h2><div class="assignee"><span class="mini-avatar system">${initials(ticket.requestedTo || ticket.assignee || "Sin asignar")}</span><div><strong>${escapeHtml(ticket.requestedTo || ticket.assignee || "Sin asignar")}</strong><span>Solicitado a</span></div></div><div class="sidebar-divider"></div><div class="side-details"><div class="side-detail"><span>Prioridad</span><strong class="priority ${ticket.priority}">${escapeHtml(ticket.priority || "—")}</strong></div><div class="side-detail"><span>Estado</span><strong>${operationalStatus(ticket)}</strong></div><div class="side-detail"><span>Fecha de cierre</span><strong>${formatDate(ticket.closedAt)}</strong></div><div class="side-detail"><span>Verificado</span><strong>${escapeHtml(ticket.verified || "—")}</strong></div></div></article>
      ${ticket.verification ? `<article class="info-card side-card"><h2>Verificación de Soporte</h2><div class="side-details"><div class="side-detail"><span>Verificado</span><strong>${escapeHtml(ticket.verified || "—")}</strong></div><div class="side-detail"><span>Verificado por</span><strong>${escapeHtml(ticket.verification.by)}</strong></div><div class="side-detail"><span>Fecha</span><strong>${formatDate(ticket.verification.date)}</strong></div></div><p class="internal-note">${escapeHtml(ticket.verification.observations || "Sin observaciones")}</p></article>` : ""}
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
  if (target === "new") { const dateField = $("[name=requestDate]"); if (dateField && !dateField.value) dateField.value = todayInput(); }
  if (target === "detail" && selectedTicketId) { const ticket = ticketById(selectedTicketId); if (ticket) renderDetail(ticket); }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openTicket(id) { selectedTicketId = id; location.hash = `ticket/${id}`; }

function addHistory(ticket, title, text, complete = true) {
  ticket.history = ticket.history || [];
  ticket.history = ticket.history.filter(item => !["Derivación a Sistemas", "Derivado a Sistemas", "Enviado a Sistemas", "Caso tomado por Sistemas", "Revisión iniciada por Sistemas", "Respuesta de Sistemas", "Verificación y cierre", "Corrección registrada", "Verificación de Soporte"].includes(item.title) || item.complete);
  ticket.history.push({ title, text, date: nowIso(), complete });
}

function handleDetailAction(action, id) {
  const ticket = ticketById(id);
  if (!ticket) return;
  if (action === "copy") { navigator.clipboard?.writeText(ticket.id); showToast(`${ticket.id} copiado`); return; }
  if (action === "edit") { openEditModal(ticket); return; }
  if (action === "take") { ticket.status = STATUS.ANALYSIS; ticket.assignee = ticket.requestedTo || ticket.assignee || "Sistemas"; ticket.updatedAt = nowIso(); addHistory(ticket, "Revisión iniciada por Sistemas", "Sistemas comenzó el análisis técnico."); saveTickets(ticket); renderDetail(ticket); showToast("El requerimiento quedó en análisis"); return; }
  if (action === "resolve") { openResolutionModal(ticket); return; }
  if (action === "verify") { openVerificationModal(ticket); return; }
}

function openEditModal(ticket) {
  const currentStatus = operationalStatus(ticket);
  const verified = ticket.verified || "";
  const modal = createModal("Editar requerimiento", '<form id="editTicketForm" class="modal-form">' +
    '<div class="form-grid two-col">' +
      '<label class="field"><span>Fecha <em>*</em></span><input type="date" name="requestDate" required value="' + dateInputValue(ticket.createdAt) + '" /></label>' +
      '<label class="field"><span>Razón social <em>*</em></span><input name="customer" required value="' + escapeHtml(ticket.customer || "") + '" /></label>' +
      '<label class="field field-span-2"><span>Requerimiento <em>*</em></span><input name="subject" required value="' + escapeHtml(ticket.subject || "") + '" /></label>' +
      '<label class="field"><span>Operador <em>*</em></span><select name="operator" required>' + optionMarkup(OPERATORS, ticket.operator || ticket.createdBy) + '</select></label>' +
      '<label class="field"><span>Solicitado a <em>*</em></span><select name="requestedTo" required>' + optionMarkup(REQUESTED_TO, ticket.requestedTo) + '</select></label>' +
      '<label class="field"><span>Prioridad</span><select name="priority">' + optionMarkup(["Alta", "Media", "Baja"], ticket.priority || "Media") + '</select></label>' +
      '<label class="field"><span>Estado</span><select name="operationalStatus">' + optionMarkup(EXCEL_STATUS, currentStatus) + '</select></label>' +
      '<label class="field"><span>Fecha de cierre</span><input type="date" name="closedDate" value="' + dateInputValue(ticket.closedAt) + '" /></label>' +
      '<label class="field"><span>Verificado</span><select name="verified">' + optionMarkup(VERIFICATION_OPTIONS, verified, "Sin verificar") + '</select></label>' +
      '<label class="field field-span-2"><span>Detalle</span><textarea name="description" rows="4">' + escapeHtml(ticket.description || "") + '</textarea></label>' +
    '</div>' +
    '<div class="form-footer"><button type="button" class="button button-secondary" data-close-modal>Cancelar</button><button type="submit" class="button button-primary">Guardar cambios</button></div>' +
  '</form>');
  $("#editTicketForm", modal).addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.target);
    const requestDate = form.get("requestDate");
    const nextStatus = form.get("operationalStatus");
    const nextVerified = form.get("verified") || "";
    ticket.createdAt = String(requestDate) + "T12:00:00";
    ticket.customer = form.get("customer");
    ticket.subject = form.get("subject");
    ticket.operator = form.get("operator");
    ticket.createdBy = ticket.operator;
    ticket.requestedTo = form.get("requestedTo");
    ticket.assignee = ticket.assignee === "Sin asignar" ? ticket.requestedTo : ticket.assignee;
    ticket.priority = form.get("priority");
    ticket.description = form.get("description") || ticket.subject;
    ticket.verified = nextVerified;
    if (nextVerified === "Si") ticket.verification = { ...(ticket.verification || {}), result: "Si", date: ticket.verification?.date || nowIso(), by: ticket.verification?.by || ticket.operator };
    else if (nextVerified === "No") ticket.verification = { ...(ticket.verification || {}), result: "No", date: ticket.verification?.date || nowIso(), by: ticket.verification?.by || ticket.operator };
    else ticket.verification = null;
    if (nextStatus === "Pendiente") { ticket.status = STATUS.NEW; ticket.closedAt = ""; }
    if (nextStatus === "En proceso") { ticket.status = [STATUS.NEW, STATUS.CLOSED].includes(ticket.status) ? STATUS.ASSIGNED : ticket.status; ticket.closedAt = ""; }
    if (nextStatus === "Finalizada") { ticket.status = STATUS.CLOSED; ticket.closedAt = form.get("closedDate") ? String(form.get("closedDate")) + "T12:00:00" : ticket.closedAt || nowIso(); }
    ticket.updatedAt = nowIso();
    addHistory(ticket, "Datos actualizados", "Se actualizaron los datos del requerimiento.");
    saveTickets(ticket);
    closeModal();
    renderDetail(ticket);
    showToast("Cambios guardados");
  });
}

function openResolutionModal(ticket) {
  const modal = createModal("Registrar corrección de Sistemas", `<form id="resolutionForm" class="modal-form"><label class="field"><span>Corrección realizada <em>*</em></span><textarea name="correction" required placeholder="Qué se corrigió para resolver el requerimiento..."></textarea></label><label class="field"><span>Observación</span><textarea name="observation" placeholder="Dato relevante sobre la corrección realizada..."></textarea></label><div class="form-footer"><button type="button" class="button button-secondary" data-close-modal>Cancelar</button><button type="submit" class="button button-primary">Guardar corrección</button></div></form>`);
  $("#resolutionForm", modal).addEventListener("submit", event => { event.preventDefault(); const form = new FormData(event.target); ticket.correction = form.get("correction"); ticket.observation = form.get("observation"); ticket.correctiveAction = ticket.correction; ticket.actionTaken = ticket.observation; ticket.resolution = ticket.correction; ticket.status = STATUS.RESOLVED; ticket.verified = ""; ticket.verification = null; ticket.closedAt = ""; ticket.updatedAt = nowIso(); addHistory(ticket, "Corrección registrada", "Sistemas registró la corrección realizada."); saveTickets(ticket); closeModal(); renderDetail(ticket); showToast("Corrección registrada. Soporte puede verificarla"); });
}

function openVerificationModal(ticket) {
  const modal = createModal("Verificar requerimiento", `<form id="verificationForm" class="modal-form"><label class="field"><span>¿La corrección fue realizada? <em>*</em></span><select name="result" required><option value="Si">Sí</option><option value="No">No</option></select></label><label class="field"><span>Observación</span><textarea name="observations" placeholder="Qué se verificó o qué falta corregir..."></textarea></label><div class="form-footer"><button type="button" class="button button-secondary" data-close-modal>Cancelar</button><button type="submit" class="button button-primary">Guardar verificación</button></div></form>`);
  $("#verificationForm", modal).addEventListener("submit", event => { event.preventDefault(); const form = new FormData(event.target); const result = form.get("result"); const verified = result === "Si"; ticket.verification = { result, observations: form.get("observations"), date: nowIso(), by: ticket.operator || "Soporte" }; ticket.verified = result; ticket.status = verified ? STATUS.CLOSED : STATUS.ANALYSIS; ticket.closedAt = verified ? nowIso() : ""; ticket.updatedAt = nowIso(); addHistory(ticket, verified ? "Requerimiento finalizado" : "Verificación pendiente", verified ? "Soporte verificó la corrección realizada." : "Soporte indicó que el requerimiento requiere una nueva revisión."); saveTickets(ticket); closeModal(); renderDetail(ticket); showToast(verified ? "Requerimiento finalizado" : "Volvió a Sistemas para revisión"); });
}

function createModal(title, content) {
  closeModal(); const backdrop = document.createElement("div"); backdrop.className = "modal-backdrop"; backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}"><div class="modal-header"><h2>${escapeHtml(title)}</h2><button class="modal-close" type="button" aria-label="Cerrar" data-close-modal>×</button></div>${content}</div>`; document.body.appendChild(backdrop); backdrop.addEventListener("click", event => { if (event.target === backdrop || event.target.closest("[data-close-modal]")) closeModal(); }); return backdrop;
}
function closeModal() { $(".modal-backdrop")?.remove(); }
function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 3000); }
function nextTicketNumber() { return Math.max(0, ...tickets.map(ticket => ticket.number || Number(ticket.id.replace(/\D/g, "")) || 0)) + 1; }
function nextCorrectiveNumber() { return Math.max(0, ...tickets.map(ticket => ticket.correctiveNumber || 0)) + 1; }

function openSystemsAccess() {
  const modal = createModal("Acceso a Sistemas", '<form id="systemsAccessForm" class="modal-form"><label class="field"><span>Contraseña <em>*</em></span><input type="password" name="password" required autocomplete="current-password" /></label><div class="form-footer"><button type="button" class="button button-secondary" data-close-modal>Cancelar</button><button type="submit" class="button button-primary">Ingresar</button></div></form>');
  $("#systemsAccessForm", modal).addEventListener("submit", event => { event.preventDefault(); const form = new FormData(event.target); if (form.get("password") !== SYSTEM_PASSWORD) { showToast("Contraseña incorrecta"); return; } systemUnlocked = true; sessionStorage.setItem(SYSTEM_ACCESS_KEY, "1"); activeRole = "sistemas"; localStorage.setItem(ROLE_KEY, activeRole); $("#roleSelect").value = activeRole; closeModal(); if (selectedTicketId && location.hash.startsWith("#ticket/")) renderDetail(ticketById(selectedTicketId)); showToast("Perfil Sistemas activo"); });
}

$("#roleSelect").value = activeRole;
$("#roleSelect").addEventListener("change", event => { const nextRole = event.target.value; if (nextRole === "sistemas" && !systemUnlocked) { event.target.value = activeRole; openSystemsAccess(); return; } activeRole = nextRole; localStorage.setItem(ROLE_KEY, activeRole); if (selectedTicketId && location.hash.startsWith("#ticket/")) renderDetail(ticketById(selectedTicketId)); showToast(activeRole === "sistemas" ? "Perfil Sistemas activo" : "Perfil Atención / Calidad activo"); });
$("#searchInput").addEventListener("input", renderDashboard);
$("#statusFilter").addEventListener("change", () => { currentQuickFilter = "all"; renderDashboard(); });
$$("[data-quick-filter]").forEach(button => button.addEventListener("click", () => { currentQuickFilter = button.dataset.quickFilter; $("#statusFilter").value = "all"; renderDashboard(); }));
$("#newTicketForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.target);
  const number = nextTicketNumber();
  const operator = form.get("operator");
  const requestedTo = form.get("requestedTo");
  const requestDate = form.get("requestDate") || todayInput();
  const created = String(requestDate) + "T12:00:00";
  const ticket = { id: "RC-" + String(number).padStart(4, "0"), number, customer: form.get("customer"), contact: "", subject: form.get("subject"), typology: "Reclamo de cliente", sourceSector: "Atención al Cliente", operator, createdBy: operator, requestedTo, priority: form.get("priority"), targetDate: "", description: form.get("description") || form.get("subject"), immediateAction: "", status: STATUS.ASSIGNED, assignee: requestedTo, createdAt: created, updatedAt: created, correctiveNumber: null, correctiveAction: "", correction: "", observation: "", resolution: "", actionTaken: "", systemsResponsible: "", verification: null, verified: "", closedAt: "", history: [{ title: "Requerimiento registrado", text: "Registrado por " + operator + ".", date: created, complete: true }, { title: "Enviado a Sistemas", text: "El requerimiento fue enviado a " + requestedTo + ".", date: created, complete: true }, { title: "Revisión iniciada por Sistemas", text: "Pendiente de que Sistemas tome el requerimiento.", date: null, complete: false }, { title: "Corrección registrada", text: "Pendiente de registrar la corrección.", date: null, complete: false }, { title: "Verificación de Soporte", text: "Pendiente de verificación.", date: null, complete: false }] };
  tickets.push(ticket);
  saveTickets(ticket, "POST");
  event.target.reset();
  showToast("Requerimiento " + ticket.id + " creado correctamente");
  openTicket(ticket.id);
});

function routeFromHash() { const hash = location.hash.replace(/^#/, "") || "dashboard"; if (hash.startsWith("ticket/")) { selectedTicketId = hash.split("/")[1]; if (ticketById(selectedTicketId)) { renderDashboard(); showView("detail"); } else { location.hash = "dashboard"; showView("dashboard"); } } else if (hash === "new") showView("new"); else showView("dashboard"); }
window.addEventListener("hashchange", routeFromHash);
routeFromHash();
void loadRemoteTickets();
