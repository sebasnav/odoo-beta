'use client';
import { getSessionOrRedirect } from '../auth/session';
import ChatPlaceholder from './ChatPlaceholder';

export default async function ChatPage() {
  await getSessionOrRedirect();
  return <ChatPlaceholder />;
}
// Comentario clave: Esta página está protegida por sesión. Muestra el chat básico y está lista para conectar a backend/n8n.
