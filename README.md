# Odoo POS Chat WebApp

Aplicación Next.js + Supabase + TailwindCSS para autenticación robusta y chat, lista para integración con n8n y Odoo POS.

## Estructura del proyecto
- `/auth`: autenticación y seguridad
- `/chat`: lógica y componentes del chat
- `/components`: componentes reutilizables
- `/lib`: conexión a servicios externos (ej: Supabase)
- `/utils`: helpers y utilidades

## Primeros pasos
1. Configura tu proyecto en [Supabase](https://supabase.com/)
2. Copia las claves en `.env.local`
3. Habilita autenticación por email y Google en Supabase
4. Instala dependencias:
   ```pwsh
   npm install
   ```
5. Inicia el servidor de desarrollo:
   ```pwsh
   npm run dev
   ```

## Notas
- El chat está listo para conectar a backend/n8n y Odoo POS.
- La función `sendToN8n` es un mock para pruebas.
- Usa TailwindCSS para estilos y modo oscuro global.

---

Documenta y comenta los puntos clave para facilitar futuras integraciones.
