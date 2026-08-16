import { Bookmark, Syringe, FileEdit, Microscope, Stethoscope, Pill, Cloud, CloudOff, PlaySquare, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const icons = [Bookmark, Syringe, FileEdit, Microscope, Stethoscope, Pill];
const colors = [
  'bg-emerald-100 text-emerald-600',
  'bg-violet-100 text-violet-600',
  'bg-rose-100 text-rose-600',
  'bg-sky-100 text-sky-600',
  'bg-amber-100 text-amber-600',
  'bg-indigo-100 text-indigo-600',
];

export default function ModuleCard({ module, index, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const Icon = icons[index % icons.length];
  const colorClass = colors[index % colors.length];
  const hasDrive = !!module.driveUrl;

  return (
    <div className="relative bg-white rounded-2xl border border-violet-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-400 hover:text-gray-600 p-1">
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-32 z-10">
              <button
                onClick={() => { setMenuOpen(false); onEdit(module); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-violet-50"
              >
                Modifier
              </button>
              <button
                onClick={() => { setMenuOpen(false); onDelete(module); }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.name}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{module.description || 'Aucune description.'}</p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full ${
          hasDrive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {hasDrive ? <Cloud className="w-3.5 h-3.5" /> : <CloudOff className="w-3.5 h-3.5" />}
          {hasDrive ? 'Drive Connecté' : 'Non Connecté'}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <PlaySquare className="w-3.5 h-3.5" />
          {module._count?.videos ?? 0}
        </span>
      </div>
    </div>
  );
}