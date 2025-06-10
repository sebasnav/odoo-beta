'use client';

import AuthForm from '../auth/AuthForm';
import { useState } from 'react';

export default function Page() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 py-12 md:py-20 relative">
      <div className="w-full max-w-3xl flex rounded-2xl border border-gray-400/40 overflow-hidden" style={{boxShadow: '0 2px 24px 0 rgba(0,0,0,0.18)'}}>
        <div className="w-full p-12 flex flex-col justify-center bg-gray-900 rounded-2xl relative" style={{minHeight: 540}}>
          <button
            type="button"
            aria-label="Toggle language"
            onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
            className="absolute top-6 left-6 z-10 text-sm font-semibold text-white/80 border border-white/20 rounded-full px-3 py-1 hover:bg-gray-700 transition"
          >
            {lang === 'es' ? 'ES' : 'EN'}
          </button>
          <AuthForm lang={lang} setLang={setLang} />
        </div>
      </div>
    </main>
  );
}
