"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/update-password',
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Si el correo existe, recibirás un enlace para restablecer tu contraseña.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar contraseña</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {message && <div className="text-green-600 mb-4 text-center">{message}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </button>
        <div className="mt-4 text-center">
          <a href="/sign-in" className="text-blue-600 hover:underline">Volver a iniciar sesión</a>
        </div>
      </form>
    </div>
  );
} 