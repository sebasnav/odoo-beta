import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { access_token } = await request.json();
  if (!access_token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 });
  }
  // Set cookie HTTPOnly para que sea accesible en SSR/middleware
  const response = NextResponse.json({ ok: true });
  response.cookies.set('sb-access-token', access_token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: true,
    maxAge: 60 * 60 * 24 * 7 // 7 días
  });
  return response;
}
// Comentario clave: API route para guardar el access_token como cookie HTTPOnly tras login. Imprescindible para SSR/middleware y seguridad.
