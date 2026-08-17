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
        <p className="text-[11px] font-semibold tracking-[0.18em] text-violet-700 uppercase mb-4">
          À propos
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
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
            La plateforme est dirigée par <span className="font-semibold text-violet-700">Chahinez Benkeltoum</span>,
            l'administratrice responsable de la structure et de l'animation du projet, avec une volonté forte de soutenir
            la communauté dentaire et de faire circuler les connaissances entre étudiants.
          </p>
          <p>
            <span className="font-semibold text-violet-700">Chahinez Benkeltoum</span> est la fondatrice et administratrice 
            de Dentalpedia. Elle a créé cette plateforme par passion pour l'éducation et pour répondre à un besoin 
            réel : offrir aux étudiants en médecine dentaire un espace centralisé où retrouver tous les meilleurs 
            supports pédagogiques. Elle gère quotidiennement la plateforme, enrichit la bibliothèque de ressources 
            et s'engage à maintenir un environnement de qualité pour tous les étudiants.
          </p>

          <p>
            Un grand merci à <span className="font-semibold text-violet-700">Chahinez Benkeltoum</span> pour son dévouement, 
            son travail acharné et sa vision pour Dentalpedia. Sans elle, cette plateforme n'existerait pas. 
            Elle mérite toute notre gratitude pour avoir créé cet espace d'apprentissage collaboratif et bienveillant.
          </p>

          <p>
            <span className="font-semibold text-violet-700">Maroua</span> est la développeuse principale de Dentalpedia. 
            Elle a construit la plateforme techniquement et continue à l'améliorer avec ses compétences en développement. 
            Son travail technique permet à Chahinez de réaliser sa vision et d'offrir une plateforme stable et performante.
          </p>

          {!loading && admin && (
            <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl border border-violet-200 p-6 mt-6">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Contact l'administratrice</h3>
              <div className="space-y-3">
                {admin.email && (
                  <a
                    href={`mailto:${admin.email}`}
                    className="flex items-center gap-3 text-slate-700 hover:text-violet-700 transition"
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
                    className="flex items-center gap-3 text-slate-700 hover:text-violet-700 transition"
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
                    className="flex items-center gap-3 text-slate-700 hover:text-violet-700 transition"
                  >
                    <MessageCircle className="w-5 h-5 text-violet-500" />
                    <span>{admin.telegram}</span>
                  </a>
                )}
              </div>
            </div>
          )}

          <p>
            Si vous avez des ressources utiles, des cours, des résumés, des documents ou des vidéos à partager,
            vous pouvez contribuer à enrichir la bibliothèque et aider les autres étudiants à progresser.
            Ensemble, on construit une base de savoir plus solide et plus utile pour tous.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <a
            href="mailto:chahinezbenkeltoum20@gmail.com"
            className="inline-flex items-center justify-center bg-violet-700 hover:bg-violet-800 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Contacter l’admin
          </a>

          <a
            href="/"
            className="inline-flex items-center justify-center border border-violet-200 text-violet-700 hover:bg-violet-50 font-semibold px-6 py-3 rounded-xl transition"
          >
            Découvrir les ressources
          </a>
        </div>
      </div>
    </div>
  );
}