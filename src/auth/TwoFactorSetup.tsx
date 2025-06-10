import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import QRCode from 'react-qr-code';

export default function TwoFactorSetup({ onVerified }: { onVerified: () => void }) {
  const [secret, setSecret] = useState('');
  const [otpauthUrl, setOtpauthUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSetup() {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Paso 1: Enroll TOTP
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
      if (error) {
        setError(error.message);
      } else if (data?.totp?.qr_code) {
        setSecret(data.totp.secret);
        setOtpauthUrl(data.totp.qr_code);
        // Guardar el factorId para la verificación posterior
        (window as any).__supabaseFactorId = data.id;
        // Paso 2: Crear challenge y guardar challengeId
        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: data.id });
        if (challengeError) {
          setError(challengeError.message);
        } else if (challengeData?.id) {
          (window as any).__supabaseChallengeId = challengeData.id;
        } else {
          setError('No se pudo crear el challenge para el factor.');
        }
      } else {
        setError('No se pudo obtener el QR. Intenta nuevamente.');
      }
    } catch (e: any) {
      setError(e.message || 'Error inesperado.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Paso 3: Verificar el código TOTP usando factorId y challengeId
      const factorId = (window as any).__supabaseFactorId || '';
      const challengeId = (window as any).__supabaseChallengeId || '';
      const { error } = await supabase.auth.mfa.verify({ factorId, challengeId, code });
      if (error) {
        setError('Código incorrecto o expirado.');
      } else {
        setSuccess('2FA activado correctamente.');
        onVerified();
      }
    } catch (e: any) {
      setError(e.message || 'Error inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      {!secret ? (
        <button onClick={handleSetup} className="bg-blue-600 text-white py-2 px-4 rounded" disabled={loading}>Activar 2FA</button>
      ) : (
        <>
          <div className="mb-4">Escanea este QR con tu app de autenticación:</div>
          <div className="flex justify-center mb-4">
            <QRCode value={otpauthUrl} size={180} />
          </div>
          <form onSubmit={handleVerify} className="space-y-4">
            <input type="text" placeholder="Código de 6 dígitos" value={code} onChange={e => setCode(e.target.value)} className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded" disabled={loading}>Verificar</button>
          </form>
        </>
      )}
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
// Comentario clave: Componente para activar y verificar 2FA (TOTP) usando Supabase.
