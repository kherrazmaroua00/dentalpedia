'use client';

import { useEffect, useState } from 'react';
import { User, Lock, Save } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import AdminLayout from '@/components/AdminLayout';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [email, setEmail] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    apiFetch('/api/auth/me').then((admin) => {
      setName(admin.name || '');
      setBio(admin.bio || '');
      setAvatarUrl(admin.avatarUrl || '');
      setEmail(admin.email);
    });
  }, []);

  async function handleProfileSave() {
    setSavingProfile(true);
    setProfileMsg('');
    try {
      await apiFetch('/api/auth/me', { method: 'PUT', body: JSON.stringify({ name, bio, avatarUrl }) });
      setProfileMsg('Profil mis à jour.');
    } catch (err) {
      setProfileMsg(err.message);
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSave() {
    setPasswordErr('');
    setPasswordMsg('');
    if (newPassword !== confirmPassword) {
      setPasswordErr('Les mots de passe ne correspondent pas.');
      return;
    }
    setSavingPassword(true);
    try {
      await apiFetch('/api/auth/password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setPasswordMsg('Mot de passe mis à jour.');
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err) {
      setPasswordErr(err.message);
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold text-gray-900 mb-1">Paramètres</h1>
      <p className="text-gray-500 mb-8">Gérez votre profil et votre sécurité.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-violet-100 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-5">
            <User className="w-5 h-5 text-violet-600" /> Profil
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">EMAIL</label>
              <input value={email} disabled className="w-full px-4 py-2.5 rounded-xl bg-gray-50 text-sm text-gray-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">NOM</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">BIO</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">URL DE L'AVATAR</label>
              <input
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400"
              />
            </div>

            {profileMsg && <p className="text-sm text-violet-600">{profileMsg}</p>}

            <button
              onClick={handleProfileSave}
              disabled={savingProfile}
              className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-xl transition"
            >
              <Save className="w-4 h-4" /> {savingProfile ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-5">
            <Lock className="w-5 h-5 text-violet-600" /> Sécurité
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">MOT DE PASSE ACTUEL</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">NOUVEAU MOT DE PASSE</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">CONFIRMER LE NOUVEAU MOT DE PASSE</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900"
              />
            </div>

            {passwordErr && <p className="text-sm text-red-600">{passwordErr}</p>}
            {passwordMsg && <p className="text-sm text-violet-600">{passwordMsg}</p>}

            <button
              onClick={handlePasswordSave}
              disabled={savingPassword}
              className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-xl transition"
            >
              <Save className="w-4 h-4" /> {savingPassword ? 'Enregistrement...' : 'Changer le mot de passe'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}