'use client';

import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function ChatPlaceholder() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chat inteligente</h2>
      {/* Aquí se integrará el chat real */}
      {/* Comentario clave: Aquí se integrará el backend/n8n para automatizar ventas en Odoo POS */}
    </div>
  );
}
// Comentario clave: Componente base para chat, listo para integración real.
