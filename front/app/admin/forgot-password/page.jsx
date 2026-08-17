'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiFetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-purple-100 p-10">
        <h1 className="text-2xl font-bold text-violet-700 mb-2">Mot de passe oublié</h1>
        <p className="text-gray-500 text-sm mb-6">
          Entrez votre email, nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>

        {sent ? (
          <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
            Si cet email existe, un lien de réinitialisation vient d'être envoyé. Vérifiez votre boîte de réception.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</div>}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dentalpedia.fr"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-violet-50 border border-transparent focus:border-violet-400 focus:bg-white outline-none transition text-sm text-gray-900 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
            >
              {loading ? 'Envoi...' : 'Envoyer le lien'}
            </button>
          </form>
        )}

        <Link href="/admin/login" className="flex items-center justify-center gap-2 text-sm text-violet-600 hover:underline mt-6">
          <ArrowLeft className="w-4 h-4" /> Retour à la connexion
        </Link>
      </div>
    </div>
  );
}