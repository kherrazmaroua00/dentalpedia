'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { apiFetch } from '@/lib/api';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      await apiFetch('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword }) });
      setDone(true);
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Lien invalide ou incomplet.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-purple-100 p-10">
        <h1 className="text-2xl font-bold text-violet-700 mb-6">Nouveau mot de passe</h1>

        {done ? (
          <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
            Mot de passe réinitialisé. Redirection vers la connexion...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</div>}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer le mot de passe"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
            >
              {loading ? 'Enregistrement...' : 'Réinitialiser le mot de passe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">Chargement...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}