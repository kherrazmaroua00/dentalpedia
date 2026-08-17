'use client';

import { useState, useEffect } from 'react';
import { X, FileText, Folder, PlayCircle, Plus, Trash2, Link2, Save } from 'lucide-react';
import { apiFetch } from '@/lib/api';

const emptyVideo = () => ({ title: '', youtubeUrl: '', description: '' });

export default function ModuleModal({ open, onClose, onSaved, yearId, initialData }) {
  const [name, setName] = useState('');
  const [coefficient, setCoefficient] = useState('');
  const [description, setDescription] = useState('');
  const [semester, setSemester] = useState('1');
  const [driveUrl, setDriveUrl] = useState('');
  const [videos, setVideos] = useState([]);
  const [removedVideoIds, setRemovedVideoIds] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setRemovedVideoIds([]);
    if (initialData) {
      setName(initialData.name || '');
      setCoefficient(initialData.coefficient ?? '');
      setDescription(initialData.description || '');
      setSemester(String(initialData.semester ?? '1'));
      setDriveUrl(initialData.driveUrl || '');
      setVideos((initialData.videos || []).map((v) => ({ id: v.id, title: v.title, youtubeUrl: v.youtubeUrl, description: v.description || '' })));
    } else {
      setName(''); setCoefficient(''); setDescription(''); setSemester('1'); setDriveUrl('');
      setVideos([]);
    }
  }, [initialData, open]);

  if (!open) return null;

  function updateVideo(i, field, value) {
    setVideos((prev) => prev.map((v, idx) => (idx === i ? { ...v, [field]: value } : v)));
  }

  function addVideoRow() {
    setVideos((prev) => [...prev, emptyVideo()]);
  }

  function removeVideoRow(i) {
    const v = videos[i];
    if (v.id) setRemovedVideoIds((prev) => [...prev, v.id]);
    setVideos((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const payload = { yearId, name, coefficient: coefficient || null, description, semester, driveUrl };
      let moduleId = initialData?.id;

      if (initialData) {
        await apiFetch(`/api/modules/${initialData.id}`, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        const created = await apiFetch('/api/modules', { method: 'POST', body: JSON.stringify(payload) });
        moduleId = created.id;
      }

      await Promise.all(removedVideoIds.map((id) => apiFetch(`/api/videos/${id}`, { method: 'DELETE' })));

      await Promise.all(videos.filter((v) => v.title && v.youtubeUrl).map((v, i) => {
        const body = JSON.stringify({ moduleId, title: v.title, youtubeUrl: v.youtubeUrl, description: v.description, order: i });
        return v.id
          ? apiFetch(`/api/videos/${v.id}`, { method: 'PUT', body })
          : apiFetch('/api/videos', { method: 'POST', body });
      }));

      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative my-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-violet-500 mb-1">
          {initialData ? 'Modifier le module' : 'Ajouter un module'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">Créez un module académique et liez ses ressources.</p>

        <div className="border border-violet-100 rounded-2xl p-5 mb-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-violet-500 mb-4">
            <FileText className="w-4 h-4" /> Détails principaux
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">NOM DU MODULE</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: Parodontologie"
                className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">COEFFICIENT</label>
              <input
                type="number"
                value={coefficient}
                onChange={(e) => setCoefficient(e.target.value)}
                placeholder="ex: Coefficient"
                className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">BRÈVE DESCRIPTION</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brève description du module..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">SEMESTRE</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900"
            >
              <option value="1">Semestre 1</option>
              <option value="2">Semestre 2</option>
            </select>
          </div>
        </div>

        <div className="border border-violet-100 rounded-2xl p-5 mb-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-violet-500 mb-4">
            <Folder className="w-4 h-4" /> Dossier Google Drive
          </h3>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">DOSSIER DES RESSOURCES DU MODULE</label>
          <div className="relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="border border-violet-100 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-violet-500">
              <PlayCircle className="w-4 h-4" /> Cours vidéo
            </h3>
            <button
              onClick={addVideoRow}
              className="flex items-center gap-1.5 text-xs font-medium bg-violet-500 hover:bg-violet-600 text-white px-3 py-2 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" /> Ajouter une vidéo
            </button>
          </div>

          {videos.length === 0 && <p className="text-xs text-gray-400">Aucune vidéo ajoutée.</p>}

          <div className="space-y-4">
            {videos.map((video, i) => (
              <div key={i} className="relative border border-gray-100 rounded-xl p-4">
                <button
                  onClick={() => removeVideoRow(i)}
                  className="absolute top-3 right-3 text-gray-300 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">TITRE DE LA VIDÉO</label>
                    <input
                      value={video.title}
                      onChange={(e) => updateVideo(i, 'title', e.target.value)}
                      placeholder="ex: Intro à la Parodontologie"
                      className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">URL YOUTUBE</label>
                    <input
                      value={video.youtubeUrl}
                      onChange={(e) => updateVideo(i, 'youtubeUrl', e.target.value)}
                      placeholder="https://youtu.be/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">DESCRIPTION</label>
                  <input
                    value={video.description}
                    onChange={(e) => updateVideo(i, 'description', e.target.value)}
                    placeholder="Notes brèves sur ce cours..."
                    className="w-full px-4 py-2.5 rounded-xl bg-violet-50 outline-none text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition">
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !name.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-60 text-white font-medium transition"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : 'Enregistrer le module'}
          </button>
        </div>
      </div>
    </div>
  );
}