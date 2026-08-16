'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { usePageView } from '@/lib/usePageView';
import YearsTimeline from '@/components/YearsTimeline';
import YearAccordionItem from '@/components/YearAccordionItem';

export default function AnneesPage() {
  usePageView('/annees');
  const [years, setYears] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [modulesCache, setModulesCache] = useState({});
  const [loadingModules, setLoadingModules] = useState(false);

  useEffect(() => {
    apiFetch('/api/years').then(setYears).catch(console.error);
  }, []);

  async function toggleYear(year) {
    if (expandedId === year.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(year.id);
    if (!modulesCache[year.id]) {
      setLoadingModules(true);
      try {
        const full = await apiFetch(`/api/years/${year.id}`);
        setModulesCache((prev) => ({ ...prev, [year.id]: full.modules }));
      } finally {
        setLoadingModules(false);
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Toutes les années</h1>
      <YearsTimeline>
        {years.map((year, i) => (
          <YearAccordionItem
            key={year.id}
            year={year}
            index={i}
            expanded={expandedId === year.id}
            onToggle={() => toggleYear(year)}
            modules={modulesCache[year.id] || []}
            loadingModules={loadingModules && expandedId === year.id}
          />
        ))}
      </YearsTimeline>
    </div>
  );
}