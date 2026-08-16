'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import AdminLayout from '@/components/AdminLayout';
import ModuleCard from '@/components/ModuleCard';
import ModuleModal from '@/components/ModuleModal';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function YearDetailPage() {
  const { yearId } = useParams();
  const [year, setYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [deletingModule, setDeletingModule] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function loadYear() {
    const data = await apiFetch(`/api/years/${yearId}`);
    setYear(data);
  }

  useEffect(() => {
    loadYear().finally(() => setLoading(false));
  }, [yearId]);

  function openCreate() {
    setEditingModule(null);
    setModalOpen(true);
  }

  async function openEdit(module) {
    const full = await apiFetch(`/api/modules/${module.id}`);
    setEditingModule(full);
    setModalOpen(true);
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await apiFetch(`/api/modules/${deletingModule.id}`, { method: 'DELETE' });
      setDeletingModule(null);
      await loadYear();
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <AdminLayout><p className="text-gray-400 text-sm">Chargement...</p></AdminLayout>;
  }

  if (!year) {
    return <AdminLayout><p className="text-gray-400 text-sm">Année introuvable.</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <Link href="/admin/years" className="flex items-center gap-2 text-gray-500 hover:text-violet-600 text-sm mb-4">
        <ArrowLeft className="w-4 h-4" /> Toutes les années
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">{year.academicYear}</h1>
          <p className="text-gray-500">Gérer les modules de cette année.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white font-medium px-5 py-3 rounded-xl transition shrink-0"
        >
          <Plus className="w-4 h-4" /> Ajouter un module
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {year.modules.map((module, i) => (
          <ModuleCard key={module.id} module={module} index={i} onEdit={openEdit} onDelete={setDeletingModule} />
        ))}

        <button
          onClick={openCreate}
          className="border-2 border-dashed border-violet-200 rounded-2xl flex flex-col items-center justify-center gap-3 py-16 text-gray-400 hover:border-violet-400 hover:text-violet-600 transition"
        >
          <span className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </span>
          Créer un nouveau module
        </button>
      </div>

      <ModuleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={loadYear}
        yearId={yearId}
        initialData={editingModule}
      />

      <ConfirmDialog
        open={!!deletingModule}
        title="Supprimer ce module ?"
        message={deletingModule ? `"${deletingModule.name}" et toutes ses vidéos seront définitivement supprimés.` : ''}
        onConfirm={handleDelete}
        onCancel={() => setDeletingModule(null)}
        loading={deleting}
      />
    </AdminLayout>
  );
}