// Helper para forzar recarga y asegurar que la cookie de sesión esté disponible para SSR/middleware
export function forceSessionReload() {
  // Forzar recarga completa para que el middleware de Next.js lea la cookie de Supabase
  if (typeof window !== 'undefined') {
    window.location.href = '/chat';
  }
}
