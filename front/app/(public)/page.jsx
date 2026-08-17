'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { usePageView } from '@/lib/usePageView';
import YearAccordionItem from '@/components/YearAccordionItem';

export default function HomePage() {
  usePageView('/');
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    apiFetch('/api/years')
      .then(setYears)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pb-10">
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-6 md:py-8">
        <div className="flex-1 max-w-[560px]">
          <span className="inline-block text-[11px] font-semibold tracking-[0.14em] text-white-600 uppercase bg-violet-50 px-3 py-2 rounded-[05px] border border-violet-200 mb-5">
            Plateforme Éducative
          </span>
          <h1 className="text-[38px] md:text-[42px] leading-[1.05] font-bold text-slate-600 mb-5">
            Votre succès commence ici, avec <span className="text-violet-500">Dentalpedia</span>
          </h1>
          <p className="text-[15px] leading-7 text-slate-500 max-w-[560px] mb-8">
            La plateforme de ressources éducatives dédiée aux étudiants en médecine dentaire en Algérie.
            Accédez à des cours structurés, des cas cliniques et une communauté bienveillante.
          </p>
          
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-72 h-72 flex items-center justify-center">
            <div className="absolute w-48 h-48 rounded-full bg-sky-100 blur-md" />
            <img src="/dent.svg" alt="Dentalpedia" className="relative z-10 w-86 h-86 object-contain" />
          </div>
        </div>
      </section>

      <section id="annees" className="pt-6 md:pt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[42px] md:text-[42px] leading-none font-bold text-slate-600">Années d'études</h2>
          <div className="flex items-center gap-5 text-[12px] text-slate-500 border border-slate-200 rounded-[15px] px-4 py-2 bg-white">
            <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" />Théorie</span>
            <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />pre-clinique/Clinique</span>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400">Chargement des années...</p>
        ) : years.length === 0 ? (
          <p className="text-sm text-slate-400">Aucune année créée pour le moment.</p>
        ) : (
          <div className="relative">
            <div className="absolute left-4 top-10 bottom-10 w-1 bg-violet-200 z-0" />
            {years.map((year, i) => (
              <YearAccordionItem
                key={year.id}
                year={year}
                index={i}
                modules={year.modules || []}
                loadingModules={false}
                expanded={expandedId === year.id}
                onToggle={() => setExpandedId(expandedId === year.id ? null : year.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}