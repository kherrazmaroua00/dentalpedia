'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { usePageView } from '@/lib/usePageView';

export default function YearModulesPage() {
  const { yearId } = useParams();
  usePageView(`/annees/${yearId}`);
  const [year, setYear] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/api/years/${yearId}`)
      .then(setYear)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [yearId]);

  if (loading) {
    return <p className="text-sm text-slate-400 py-10">Chargement...</p>;
  }

  if (!year) {
    return <p className="text-sm text-slate-400 py-10">Année introuvable.</p>;
  }

  return (
    <div className="pb-10">
      <Link href="/" className="flex items-center gap-2 text-violet-600 hover:text-violet-700 text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>

      <h1 className="text-4xl font-bold text-slate-800 mb-2">{year.academicYear}</h1>
      {year.description && <p className="text-slate-500 mb-8 max-w-2xl">{year.description}</p>}

      {year.modules.length === 0 ? (
        <p className="text-sm text-slate-400">Aucun module pour cette année.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {year.modules.map((module) => (
            <Link
              key={module.id}
              href={`/annees/${yearId}/module/${module.id}`}
              className="bg-white rounded-2xl border border-violet-100 p-6 flex items-center justify-between hover:border-violet-300 transition group"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{module.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-1">{module.description || 'Aucune description.'}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  {module.driveUrl && (
                    <span className="flex items-center gap-1"><FolderOpen className="w-3.5 h-3.5" /> Drive</span>
                  )}
                  <span>{module._count?.videos ?? 0} vidéos</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-violet-600 transition shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}