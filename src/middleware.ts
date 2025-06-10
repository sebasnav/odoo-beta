import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Proteger la ruta /chat: si no hay token de sesión, redirigir a inicio
  const token = request.cookies.get('sb-access-token');
  if (!token && request.nextUrl.pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/chat'],
};
// Comentario clave: Middleware para persistencia de sesión y protección de /chat.
