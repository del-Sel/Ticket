# Publicar el sistema de tickets en Cloudflare

Esta versión está preparada para Cloudflare Pages con Pages Functions y D1. No usa R2 para los tickets.

## Qué archivos subir

Al repositorio privado de GitHub hay que subir estas carpetas y archivos:

```text
outputs/
functions/
migrations/
db/
README-CLOUDFLARE.md
```

No es necesario subir la carpeta `work/`.

## 1. Crear el proyecto Pages

1. Entrar al panel de Cloudflare.
2. Ir a **Workers & Pages**.
3. Elegir **Create application → Pages → Connect to Git**.
4. Autorizar GitHub y seleccionar el repositorio privado.
5. Configurar:
   - **Framework preset:** None.
   - **Build command:** dejar vacío.
   - **Build output directory:** `outputs`.
   - **Production branch:** `main`.
6. Elegir **Save and Deploy**.

La carpeta `functions/` debe quedar en la raíz del repositorio, no dentro de `outputs/`, porque contiene la API del sistema.

## 2. Crear la base D1

1. Ir a **Storage & databases → D1**.
2. Elegir **Create database**.
3. Usar un nombre como `fulmar-tickets-db`.
4. Abrir la base creada y entrar en **Console**.
5. Copiar y ejecutar el contenido de `migrations/0001_create_tickets.sql`.

La migración crea la tabla de tickets y sus índices. No crear una base por cada ticket ni por cada subdominio.

## 3. Conectar D1 con Pages

1. Ir a **Workers & Pages → fulmar-tickets**.
2. Entrar en **Settings → Bindings**.
3. Elegir **Add → D1 database bindings**.
4. En **Variable name**, escribir exactamente `DB`.
5. Seleccionar `fulmar-tickets-db`.
6. Guardar y hacer un nuevo deploy.

La API ya está preparada para usar `env.DB` en las rutas `/api/tickets`.

## 4. Conectar el subdominio

1. Abrir el proyecto Pages.
2. Ir a **Custom domains → Set up a domain**.
3. Escribir el subdominio que te entregue la empresa, por ejemplo `tickets.ful-mar.com`.
4. Confirmar.

Si el dominio está administrado por Cloudflare, el registro DNS puede crearse automáticamente. Si está administrado en otro proveedor, crear un registro CNAME que apunte a la dirección `*.pages.dev` del proyecto.

## 5. Probar antes de usar datos reales

1. Abrir la URL `*.pages.dev` que entrega Cloudflare.
2. Crear un ticket de prueba.
3. Cambiar al perfil Sistemas y avanzar el ticket.
4. Confirmar que la respuesta quede guardada.
5. Abrir la aplicación desde otro navegador para comprobar que el ticket aparece allí también.

Antes de cargar reclamos reales hay que proteger el subdominio con el acceso de la empresa. La API no debe quedar pública con datos reales.

## Control de costos

- No activar **Workers Paid**.
- No agregar R2 a este proyecto.
- Revisar **Manage Account → Billing → Billable Usage** después del primer deploy.
- Pages y D1 se mantienen dentro del plan gratuito para este volumen de trabajo.

La integración de Git es la recomendada porque Pages Functions no se compilan mediante el botón de carga directa del panel.
