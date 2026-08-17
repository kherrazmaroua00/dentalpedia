'use client';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import YearProgressBar from './YearProgressBar';

const badgeColors = ['bg-violet-500', 'bg-emerald-300', 'bg-rose-200', 'bg-violet-200', 'bg-pink-200', 'bg-amber-200'];

export default function YearAccordionItem({ year, index, expanded, onToggle, modules, loadingModules }) {
  return (
    <div className="relative pl-14">
      <div className={`absolute left-0 top-6 w-12 h-12 rounded-[5px] flex items-center justify-center text-white text-sm font-bold ${badgeColors[index % badgeColors.length]}`}>
        {index + 1}
      </div>

      <div className="bg-white rounded-2xl border border-violet-100 p-6 mb-8">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-600">{year.academicYear}</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
              {year.modulesCount} Modules
            </span>
            <button
              onClick={onToggle}
              className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center hover:bg-violet-700 transition"
            >
              <ChevronDown className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <YearProgressBar theoryPercentage={year.theoryPercentage} />

        {expanded && (
          <div className="mt-5 pt-5 border-t border-violet-50">
            <p className="text-xs font-semibold text-gray-400 tracking-wide mb-3">MODULES PRINCIPAUX</p>
            {loadingModules ? (
              <p className="text-xs text-gray-400">Chargement...</p>
            ) : modules.length === 0 ? (
              <p className="text-xs text-gray-400">Aucun module pour cette année.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6  p-4 gap-y-2">
                {modules.map((m) => (
                  <Link
                    key={m.id}
                    href={`/annees/${year.id}/module/${m.id}`}
                    className="flex items-center justify-between text-sm  border border-violet-200 rounded-lg text-gray-900 hover:text-violet-700 p-4"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                      {m.name}
                    </span>
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}