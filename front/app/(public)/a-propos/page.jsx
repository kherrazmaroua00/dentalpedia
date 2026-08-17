'use client';
import { useEffect, useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function AProposPage() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/dashboard/admin')
      .then(setAdmin)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
      <div className="bg-white/60 border border-violet-100 rounded-[28px] p-8 md:p-12 shadow-[0_18px_50px_rgba(125,93,255,0.06)]">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-violet-500 uppercase mb-4">
          À propos
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-500 mb-6">
          Dentalpedia, une bibliothèque made by students
        </h1>

        <div className="space-y-5 text-base md:text-lg leading-8 text-slate-600">
          <p>
            Dentalpedia est une plateforme éducative pensée pour les étudiants en médecine dentaire.
            Son objectif est simple : centraliser les meilleurs supports, cours, fiches et ressources
            pédagogiques afin de rendre l’apprentissage plus clair, plus accessible et plus collaboratif.
          </p>

          <p>
            Ici, chaque année d’étude est organisée pour que vous puissiez retrouver rapidement les
            contenus utiles à votre progression, sans perdre de temps à chercher dans plusieurs sources.
          </p>

          <p>
            La plateforme est dirigée par <span className="font-semibold text-violet-500">Chahinez Benkeltoum</span>,
            l'administratrice et fondatrice du projet. Elle a eu l'idée visionnaire de créer Dentalpedia et de partager 
            ses ressources pédagogiques avec la communauté dentaire. Elle est responsable, 
            de la curation des contenus, et de maintenir un environnement de qualité pour tous les étudiants.
          </p>
          
          <p>
            <span className="font-semibold text-violet-500">Chahinez Benkeltoum</span> gère au quotidien la plateforme : 
            elle enrichit la bibliothèque de ressources, organise les contenus, et s'engage à soutenir la communauté dentaire 
            en facilitant la circulation des connaissances entre étudiants. Son dévouement et sa vision ont permis la création 
            de cet espace d'apprentissage collaboratif et bienveillant.
          </p>

          <p>
            <span className="font-semibold text-violet-500">Maroua</span> est la développeuse principale de Dentalpedia. 
            Elle a conçu et construit 100% de la plateforme de zéro : la structure technique, le design, l'interface utilisateur, 
            les fonctionnalités - tout. Elle continue à l'améliorer constamment avec ses compétences en développement. 
            Son travail technique et ses compétences en design permettent à Chahinez de réaliser sa vision et d'offrir une 
            plateforme professionnelle, stable et performante.
          </p>

          {!loading && admin && (
            <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl border border-violet-200 p-6 mt-6">
              <h3 className="text-xl font-bold text-slate-500 mb-3">Contact l'administratrice</h3>
              <div className="space-y-3">
                {admin.email && (
                  <a
                    href={`mailto:${admin.email}`}
                    className="flex items-center gap-3 text-slate-700 hover:text-violet-600 transition"
                  >
                    <Mail className="w-5 h-5 text-violet-500" />
                    <span>{admin.email}</span>
                  </a>
                )}
                {admin.instagram && (
                  <a
                    href={`https://instagram.com/${admin.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-700 hover:text-violet-600 transition"
                  >
                    <span className="w-5 h-5 text-violet-500 flex items-center justify-center text-sm">📷</span>
                    <span>{admin.instagram}</span>
                  </a>
                )}
                {admin.telegram && (
                  <a
                    href={`https://t.me/${admin.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-700 hover:text-violet-600 transition"
                  >
                    <MessageCircle className="w-5 h-5 text-violet-500" />
                    <span>{admin.telegram}</span>
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-200 p-6 mt-6">
            <h3 className="text-xl font-bold text-slate-500 mb-3">Contribuer et partager vos ressources</h3>
            <p className="text-slate-700 mb-4">
              Vous avez des ressources utiles, des cours, des résumés, des documents ou des vidéos à partager ? 
              Vous pouvez contribuer à enrichir Dentalpedia et aider les autres étudiants à progresser !
            </p>
            <p className="text-slate-700 mb-4">
              Pour soumettre vos ressources et collaborer avec l'administratrice, veuillez contacter Chahinez directement.
            </p>
            <a
              href={`mailto:chahinezbenkeltoum20@gmail.com?subject=Je souhaite contribuer à Dentalpedia`}
              className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-medium px-5 py-2.5 rounded-lg transition"
            >
              <Mail className="w-4 h-4" /> Contacter l'admin pour contribuer
            </a>
            
          </div>

          
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
       

          <a
            href="/"
            className="inline-flex items-center justify-center border border-violet-200 text-violet-500 hover:bg-violet-50 font-semibold px-6 py-3 rounded-xl transition"
          >
            Découvrir les ressources
          </a>
        </div>
      </div>
    </div>
  );
}