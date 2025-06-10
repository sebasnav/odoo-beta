import { createClient } from '@supabase/supabase-js';

// Claves de Supabase: usa variables de entorno para seguridad
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Comentario clave: Aquí se inicializa el cliente Supabase para toda la app.
// Para integración futura con n8n y Odoo, puedes usar este cliente para obtener tokens o datos del usuario.
