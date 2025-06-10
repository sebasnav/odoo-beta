// Utilidad para enviar datos a n8n (mock)
export async function sendToN8n(payload: any) {
  // Endpoint base de n8n (ajusta en producción)
  const N8N_ENDPOINT = process.env.NEXT_PUBLIC_N8N_ENDPOINT || 'https://n8n.example.com/webhook/odoo-pos';
  try {
    const res = await fetch(N8N_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    // Comentario clave: Aquí se conecta con n8n para automatizar ventas en Odoo POS.
    return await res.json();
  } catch (err) {
    // Manejo de error básico
    return { error: true, message: err instanceof Error ? err.message : err };
  }
}
