'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import TheorySlider from './TheorySlider';

export default function YearModal({ open, onClose, onSubmit, initialData }) {
  const [academicYear, setAcademicYear] = useState('');
  const [description, setDescription] = useState('');
  const [theoryPercentage, setTheoryPercentage] = useState(60);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setAcademicYear(initialData.academicYear);
      setDescription(initialData.description || '');
      setTheoryPercentage(initialData.theoryPercentage ?? 60);
    } else {
      setAcademicYear('');
      setDescription('');
      setTheoryPercentage(60);
    }
  }, [initialData, open]);

  if (!open) return null;

  async function handleSubmit() {
    if (!academicYear.trim()) return;
    setSaving(true);
    try {
      await onSubmit({ academicYear, description, theoryPercentage });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {initialData ? "Modifier l'Année Académique" : 'Créer une Année Académique'}
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Année Académique</label>
          <input
            type="text"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            placeholder="ex: 1ère Année, Année Préparatoire..."
            className="w-full px-4 py-3 rounded-xl bg-violet-50 border border-transparent focus:border-violet-400 outline-none text-sm text-gray-900 placeholder-gray-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Cette année comprend..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-violet-50 border border-transparent focus:border-violet-400 outline-none text-sm text-gray-900 placeholder-gray-400 resize-none"
          />
        </div>

        <div className="mb-8">
          <TheorySlider value={theoryPercentage} onChange={setTheoryPercentage} />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !academicYear.trim()}
            className="px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-60 text-white font-medium transition"
          >
            {saving ? 'Enregistrement...' : initialData ? 'Enregistrer' : "Créer l'année"}
          </button>
        </div>
      </div>
    </div>
  );
}