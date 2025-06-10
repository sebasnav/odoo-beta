<<<<<<< HEAD
# Next.js + Supabase + TailwindCSS Starter

Este proyecto es una base moderna para apps con autenticación (email/password y Google OAuth), chat básico y estructura lista para conectar con n8n y Odoo 17 POS.

## Estructura recomendada
- `/auth`: lógica y componentes de autenticación
- `/chat`: lógica y componentes del chat
- `/components`: componentes reutilizables
- `/lib`: utilidades de conexión (ej: Supabase)
- `/utils`: helpers y funciones para integración externa (ej: sendToN8n)

## Primeros pasos
1. Configura tu proyecto en [Supabase](https://supabase.com/)
2. Copia las claves públicas y privadas en `.env.local`
3. Habilita autenticación por email y Google en Supabase
4. Instala dependencias si es necesario:
   ```pwsh
   npm install
   ```
5. Inicia el servidor de desarrollo:
   ```pwsh
   npm run dev
   ```

## Notas
- El chat es un placeholder, listo para conectar a backend/n8n.
- La función `sendToN8n` está mockeada en `/utils`.
- Usa TailwindCSS para estilos rápidos.

---

Documenta y comenta los puntos clave para facilitar futuras integraciones.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# odoo-beta
>>>>>>> 4e982c21bb95177c4f09429d0a7e2761567db51f
