# Mesa de reclamos - Ful-Mar

Sistema de seguimiento para registrar reclamos, derivarlos a Sistemas, documentar la resolución y verificar/cerrar la acción correctiva. La pantalla principal sigue la lógica de la planilla de soporte.

## Cómo probarlo

Abrí [index.html](./index.html) en un navegador moderno. No requiere instalación ni servidor.

Si se abre como archivo local o sin API configurada, guarda los cambios en el `localStorage` del navegador para poder probar el flujo. Cuando se publica junto con las Pages Functions y la base D1, usa la API compartida y deja de depender del navegador de cada persona.

## Flujo incluido

1. Atención / Calidad registra el reclamo.
2. Atención / Calidad lo deriva a Sistemas.
3. Sistemas toma el caso y lo deja en análisis.
4. Sistemas registra la acción correctiva, la acción tomada y la respuesta para comunicar al cliente.
5. Atención / Calidad verifica si la acción fue efectiva.
6. Si es efectiva, Atención / Calidad cierra la acción correctiva. Si no, el ticket vuelve a Sistemas.

## Correspondencia con la planilla y el PDF de referencia

La tabla principal conserva la estructura del Excel: fecha, razón social, requerimiento, operador, solicitado a, prioridad, estado, fecha de cierre y verificado. El detalle del ticket incorpora los campos del registro de no conformidades: tipología, sector emisor, descripción, acción inmediata, acción correctiva, responsable, verificación, observaciones y cierre. El número `RC-0007` y los casos visibles al abrir el prototipo son datos de demostración.

## Conexión preparada para Cloudflare

La carpeta `functions/` contiene la API para listar, crear y actualizar tickets. La migración `migrations/0001_create_tickets.sql` crea la tabla D1 y `db/schema.ts` documenta su estructura. El binding esperado para la base es `DB`.

Para publicar esta versión hay que configurar el proyecto de Pages con `outputs` como carpeta de archivos estáticos, asociar una base D1 al binding `DB` y aplicar la migración. No se crean recursos ni se activa ningún plan desde estos archivos.

Antes de usarlo con datos reales todavía falta proteger el acceso de la API con el mecanismo de autenticación elegido para la empresa.

## Próximo paso para convertirlo en sistema real

Para producción habría que agregar autenticación, permisos por sector, notificaciones por email, adjuntos y auditoría de cambios. La base y el backend inicial ya están preparados para que Atención y Sistemas trabajen sobre los mismos tickets.
