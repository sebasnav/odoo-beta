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
      <h2 className="text-xl font-bold mb-4">Chat inteligente (placeholder)</h2>
      <div className="mb-2 text-gray-600">Usuario: {user?.email || 'No autenticado'}</div>
      <div className="h-40 bg-gray-100 rounded p-2 mb-4 flex flex-col gap-2 overflow-y-auto">
        {/* Mensajes mock */}
        <div className="self-start bg-blue-100 px-3 py-1 rounded">Hola, ¿en qué puedo ayudarte?</div>
        <div className="self-end bg-green-100 px-3 py-1 rounded">Quiero crear una venta en Odoo POS.</div>
      </div>
      <form className="flex gap-2">
        <input className="flex-1 border p-2 rounded" placeholder="Escribe tu mensaje..." disabled />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled>Enviar</button>
      </form>
      {/* Comentario clave: Aquí se integrará el backend/n8n para automatizar ventas en Odoo POS */}
    </div>
  );
}
