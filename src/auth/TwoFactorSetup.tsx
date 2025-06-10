import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import QRCode from 'qrcode.react';

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
    // Solicitar a Supabase el secret para TOTP
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
    setLoading(false);
    if (error) setError(error.message);
    else if (data) {
      setSecret(data.totp.secret);
      setOtpauthUrl(data.totp.otpauth_url);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    // Verificar el código TOTP
    const { error } = await supabase.auth.mfa.verify({ factorType: 'totp', code });
    setLoading(false);
    if (error) setError('Código incorrecto o expirado.');
    else {
      setSuccess('2FA activado correctamente.');
      onVerified();
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
