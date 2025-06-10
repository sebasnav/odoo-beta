// Contexto global para dark mode SIEMPRE activo
'use client';
import { createContext, useContext, ReactNode, useEffect } from 'react';

interface DarkModeContextProps {
  dark: true;
  toggleDark: () => void;
  setDark: (value: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  // Siempre modo oscuro
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.classList.add('dark');
  }, []);

  // toggle/setDark son nops
  const toggleDark = () => {};
  const setDark = () => {};

  return (
    <DarkModeContext.Provider value={{ dark: true, toggleDark, setDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error('useDarkMode must be used within DarkModeProvider');
  return ctx;
}
