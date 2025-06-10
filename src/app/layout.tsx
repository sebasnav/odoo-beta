import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { DarkModeProvider } from '../components/DarkModeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Odoo POS Chat',
  description: 'WebApp con Next.js, Supabase y TailwindCSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className + ' min-h-screen transition-colors'}>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
// Comentario clave: Layout global server-only, el contexto aplica la clase dark en el cliente.
