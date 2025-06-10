// Formulario de login con Supabase Auth
'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useDarkMode } from '../components/DarkModeContext';
import { cookies } from 'next/headers';
import { forceSessionReload } from '../utils/forceSessionReload';

const palette = {
  green1: '#98F05E',
  green2: '#B2F477',
  green3: '#CCF890',
  green4: '#E5FBA9',
  yellow: '#FFFFC2',
  error: '#ff4d4f',
  placeholder: '#999',
};

interface AuthFormProps {
  lang?: 'es' | 'en';
  setLang?: (lang: 'es' | 'en') => void;
}

export default function AuthForm({ lang: langProp, setLang: setLangProp }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [view, setView] = useState<'login' | 'forgot' | 'signup'>('login');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { dark, toggleDark } = useDarkMode();
  const [langState, setLangState] = useState<'es' | 'en'>(langProp || 'es');
  const lang = langProp !== undefined ? langProp : langState;
  const setLang = setLangProp !== undefined ? setLangProp : setLangState;

  // Traducciones simples
  const t = (key: string) => {
    const dict: Record<string, Record<'es'|'en', string>> = {
      'hello': { es: '¡Hola!', en: 'Hello!' },
      'sign_in': { es: 'Iniciar sesión', en: 'Sign In' },
      'sign_in_to_account': { es: 'Ingresa a tu cuenta', en: 'Sign into Your account' },
      'email': { es: 'Correo electrónico', en: 'E-mail' },
      'password': { es: 'Contraseña', en: 'Password' },
      'remember_me': { es: 'Recuérdame', en: 'Remember me' },
      'forgot_password': { es: '¿Olvidaste tu contraseña?', en: 'Forgot password?' },
      'sign_in_btn': { es: 'ENTRAR', en: 'SIGN IN' },
      'dont_have_account': { es: '¿No tienes cuenta?', en: "Don't have an account?" },
      'create': { es: 'Crear cuenta', en: 'Create' },
      'back_to_login': { es: 'Volver a iniciar sesión', en: 'Back to login' },
      'send_link': { es: 'Enviar enlace', en: 'Send link' },
      'recover_password': { es: 'Recuperar contraseña', en: 'Recover password' },
      'account_created': { es: 'Registro exitoso. Revisa tu correo.', en: 'Account created. Check your email.' },
      'reset_sent': { es: 'Enlace de recuperación enviado. Revisa tu correo.', en: 'Reset link sent. Check your email.' },
    };
    return dict[key]?.[lang] || key;
  };

  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        setError(lang === 'es' ? 'Correo o contraseña incorrectos. Por favor, verifica tus datos.' : 'Incorrect email or password. Please check your credentials.');
      } else {
        setError(error.message);
      }
      return;
    }
    // Persistencia de sesión: guardar token en cookie para middleware y SSR
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session?.access_token) {
      document.cookie = `sb-access-token=${sessionData.session.access_token}; path=/;`;
    }
    setLoading(false);
    // Forzar recarga para que el middleware lea la cookie y asegurar acceso a /chat
    forceSessionReload();
    // No llamar router.push aquí, la recarga lo gestiona
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) setError(error.message);
    else setMessage(t('reset_sent'));
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }
    // Crear perfil en tabla 'profiles' si el registro fue exitoso
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        username: email.split('@')[0],
        role: 'user',
      });
    }
    setLoading(false);
    setMessage(t('account_created'));
  }

  // Accesibilidad: validación simple
  const emailValid = email.length > 3 && email.includes('@');
  const passwordValid = password.length >= 6;
  const canSubmit = emailValid && passwordValid && !loading;

  // Paleta y modo oscuro
  const bg = 'bg-gray-900'; // Fondo fijo oscuro
  const text = 'text-white';
  const inputBg = 'bg-gray-900';
  const inputBorder = 'border border-white/20';
  const placeholder = 'text-gray-400';

  // Toggle language
  function toggleLang() { setLang(lang === 'es' ? 'en' : 'es'); }

  // Limpia los campos al cambiar de vista
  function goTo(view: 'login' | 'signup' | 'forgot') {
    setView(view);
    setError('');
    setMessage('');
    setEmail('');
    setPassword('');
    setLoading(false);
  }

  // Login
  if (view === 'login') {
    return (
      <form onSubmit={handleLogin} className={`flex flex-col gap-4 p-0 rounded-xl w-full max-w-md ${bg}`}> 
        <div className="flex justify-between mb-6">
          <span />
        </div>
        <h2 className="text-4xl font-bold text-center mb-2 {text}">¡Hola!</h2>
        <p className="text-lg text-center mb-6 {text}">Ingresa a tu cuenta</p>
        <input
          type="email"
          placeholder={t('email')}
          className={`p-3 rounded-full ${inputBorder} focus:outline-none focus:ring-2 focus:ring-green-400 ${inputBg} text-base ${placeholder} w-full`}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('password')}
            className={`p-3 rounded-full ${inputBorder} focus:outline-none focus:ring-2 focus:ring-green-400 ${inputBg} text-base ${placeholder} w-full pr-12`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.828-2.828A9.956 9.956 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.714-4.253 1.928-5.928" /></svg>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between text-xs mt-2 mb-2 text-white/80">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" checked={remember} onChange={e => setRemember(e.target.checked)} /> {t('remember_me')}
          </label>
          <button type="button" className="hover:underline" onClick={() => goTo('forgot')}>{t('forgot_password')}</button>
        </div>
        <button type="submit" disabled={!canSubmit} className="font-bold py-3 rounded-full shadow-md transition-colors bg-[#3A5F3A] text-white text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <span className="animate-pulse">...</span> : t('sign_in_btn')}
        </button>
        <div className="text-center text-xs mt-6 text-white/80">
          {t('dont_have_account')} <button type="button" className="hover:underline" onClick={() => goTo('signup')}>{t('create')}</button>
        </div>
        {message && <div className="text-green-700 text-center font-semibold bg-[#E5FBA9] border border-[#B2F477] rounded p-2 mt-2 transition-colors">{message}</div>}
        {error && <div className="text-center font-semibold bg-red-50 border border-red-200 rounded p-2 mt-2" style={{color: palette.error}}>{error}</div>}
      </form>
    );
  }

  // Forgot password
  if (view === 'forgot') {
    return (
      <form onSubmit={handleForgot} className={`flex flex-col gap-4 p-0 rounded-xl w-full max-w-md ${bg}`}> 
        <div className="flex justify-between mb-6">
          <span />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 {text}">{t('recover_password')}</h2>
        <input
          type="email"
          placeholder={t('email')}
          className={`p-3 rounded-full ${inputBorder} focus:outline-none focus:ring-2 focus:ring-green-400 ${inputBg} text-base ${placeholder} w-full`}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={!emailValid || loading} className="font-bold py-3 rounded-full shadow-md transition-colors bg-[#3A5F3A] text-white text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <span className="animate-pulse">...</span> : t('send_link')}
        </button>
        {message && <div className="text-green-700 text-center font-semibold bg-[#E5FBA9] border border-[#B2F477] rounded p-2 mt-2 transition-colors">{message}</div>}
        {error && <div className="text-center font-semibold bg-red-50 border border-red-200 rounded p-2 mt-2" style={{color: palette.error}}>{error}</div>}
        <div className="text-center text-xs mt-6 text-white/80">
          <button type="button" className="hover:underline" onClick={() => goTo('login')}>{t('back_to_login')}</button>
        </div>
      </form>
    );
  }

  // Signup
  if (view === 'signup') {
    return (
      <form onSubmit={handleSignUp} className={`flex flex-col gap-4 p-0 rounded-xl w-full max-w-md ${bg}`}> 
        <div className="flex justify-between mb-6">
          <span />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 {text}">{t('create')}</h2>
        <input
          type="email"
          placeholder={t('email')}
          className={`p-3 rounded-full ${inputBorder} focus:outline-none focus:ring-2 focus:ring-green-400 ${inputBg} text-base ${placeholder} w-full`}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('password')}
            className={`p-3 rounded-full ${inputBorder} focus:outline-none focus:ring-2 focus:ring-green-400 ${inputBg} text-base ${placeholder} w-full pr-12`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.828-2.828A9.956 9.956 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.714-4.253 1.928-5.928" /></svg>
            )}
          </button>
        </div>
        <button type="submit" disabled={!canSubmit} className="font-bold py-3 rounded-full shadow-md transition-colors bg-[#3A5F3A] text-white text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <span className="animate-pulse">...</span> : t('create')}
        </button>
        {message && <div className="text-green-700 text-center font-semibold bg-[#E5FBA9] border border-[#B2F477] rounded p-2 mt-2 transition-colors">{message}</div>}
        {error && <div className="text-center font-semibold bg-red-50 border border-red-200 rounded p-2 mt-2" style={{color: palette.error}}>{error}</div>}
        <div className="text-center text-xs mt-6 text-white/80">
          <button type="button" className="hover:underline" onClick={() => goTo('login')}>{t('back_to_login')}</button>
        </div>
      </form>
    );
  }

  return null;
}
