import { supabase } from '../lib/supabaseClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSessionOrRedirect() {
  // Persistencia de sesión usando cookies (Next.js App Router)
  const cookieStore = cookies();
  const supabaseToken = cookieStore.get('sb-access-token')?.value;
  if (!supabaseToken) {
    redirect('/');
  }
  // Aquí podrías validar el token con Supabase si lo deseas
  return supabaseToken;
}
// Comentario clave: Middleware para proteger rutas y redirigir si no hay sesión. Útil para /chat y futuras integraciones con n8n/Odoo.
