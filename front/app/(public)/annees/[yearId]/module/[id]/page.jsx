'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, FolderOpen, PlayCircle, Calendar, BookOpen, Info, Play } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { usePageView } from '@/lib/usePageView';
import { getYoutubeThumbnail } from '@/lib/youtube';

export default function ModulePublicPage() {
  const router = useRouter();
  const { yearId, id } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  usePageView(`/annees/${yearId}/module/${id}`);

  useEffect(() => {
    apiFetch(`/api/modules/${id}`).then(setModule).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-16 text-gray-400 text-sm">Chargement...</div>;
  if (!module) return <div className="max-w-4xl mx-auto px-4 py-16 text-gray-400 text-sm">Module introuvable.</div>;

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(`/annees/${yearId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-500 hover:text-violet-500 text-lg mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Retour aux modules
      </button>

      <div className="bg-gradient-to-br from-violet-100 to-pink-50 rounded-3xl border border-violet-500 p-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-500 bg-white px-4 py-3 rounded-full">
              {module.year.academicYear} 
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-gray-900">{module.name}</h1>
            {module.semester && (
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                S{module.semester}
              </span>
            )}
            {module.coefficient !== null && module.coefficient !== undefined && (
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Coef: {module.coefficient}
              </span>
            )}
          </div>
          
          {module.description ? (
            <p className="text-gray-600 text-sm max-w-2xl leading-relaxed mb-3">{module.description}</p>
          ) : (
            <p className="text-gray-500 text-sm max-w-md">
              Retrouvez tous les supports, cours et ressources de {module.name} au même endroit.
            </p>
          )}
          
        </div>
        {module.driveUrl && (
          <a
            href={module.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-sm font-medium px-5 py-3 rounded-xl transition shrink-0 self-start md:self-center"
          >
            <FolderOpen className="w-4 h-4" /> Ouvrir les ressources
          </a>
        )}
      </div>

      {module.videos.length > 0 && (
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
            <PlayCircle className="w-5 h-5 text-violet-600" /> Vidéos pédagogiques
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {module.videos.map((video) => {
              const thumb = getYoutubeThumbnail(video.youtubeUrl);
              return (
                <a
                  key={video.id}
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video group"
                >
                  {thumb && (
                    <img src={thumb} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-violet-700 ml-0.5" fill="currentColor" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                    <p className="text-white text-sm font-medium">{video.title}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center gap-6 bg-white rounded-2xl border border-violet-100 px-6 py-4 text-sm text-gray-500">
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-violet-500" /> Année: <span className="font-medium text-gray-800">{module.year.academicYear}</span>
        </span>
        <span className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-violet-500" /> Module: <span className="font-medium text-gray-800">{module.name}</span>
        </span>
        {module.coefficient !== null && module.coefficient !== undefined && (
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4 text-violet-500" /> Coefficient: <span className="font-medium text-gray-800">{module.coefficient}</span>
          </span>
        )}
        <span className="flex items-center gap-2">
          <Info className="w-4 h-4 text-violet-500" /> Contenu:{' '}
          <span className="font-medium text-gray-800">
            {module.driveUrl ? '1 Dossier Drive, ' : ''}{module.videos.length} Vidéos
          </span>
        </span>
      </div>
    </div>
  );
}