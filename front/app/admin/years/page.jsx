'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import AdminLayout from '@/components/AdminLayout';
import YearCard from '@/components/YearCard';
import YearModal from '@/components/YearModal';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function YearsPage() {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingYear, setEditingYear] = useState(null);
  const [deletingYear, setDeletingYear] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function loadYears() {
    const data = await apiFetch('/api/years');
    setYears(data);
  }

  useEffect(() => {
    loadYears().finally(() => setLoading(false));
  }, []);

  function openCreate() {
    setEditingYear(null);
    setModalOpen(true);
  }

  function openEdit(year) {
    setEditingYear(year);
    setModalOpen(true);
  }

  async function handleSubmit(payload) {
    if (editingYear) {
      await apiFetch(`/api/years/${editingYear.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...payload, order: editingYear.order }),
      });
    } else {
      await apiFetch('/api/years', {
        method: 'POST',
        body: JSON.stringify({ ...payload, order: years.length + 1 }),
      });
    }
    await loadYears();
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await apiFetch(`/api/years/${deletingYear.id}`, { method: 'DELETE' });
      setDeletingYear(null);
      await loadYears();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-5xl font-bold text-gray-500 mb-1">Années d'études</h1>
          <p className="text-gray-500">Sélectionnez une année pour gérer ses modules académiques.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-medium px-5 py-3 rounded-xl transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          Ajouter une année
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Chargement...</p>
      ) : years.length === 0 ? (
        <p className="text-gray-400 text-sm">Aucune année pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {years.map((year, i) => (
            <YearCard
              key={year.id}
              year={year}
              index={i}
              onEdit={openEdit}
              onDelete={setDeletingYear}
            />
          ))}
        </div>
      )}

      <YearModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingYear}
      />

      <ConfirmDialog
        open={!!deletingYear}
        title="Supprimer cette année ?"
        message={
          deletingYear
            ? `"${deletingYear.academicYear}" et tous ses modules (${deletingYear.modulesCount}) et vidéos associées seront définitivement supprimés. Cette action est irréversible.`
            : ''
        }
        onConfirm={handleDelete}
        onCancel={() => setDeletingYear(null)}
        loading={deleting}
      />
    </AdminLayout>
  );
}