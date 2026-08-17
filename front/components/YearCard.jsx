import { ArrowRight, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function YearCard({ year, index, onEdit, onDelete }) {
  const displayNumber = index !== undefined ? index + 1 : year.order;

  return (
    <div className="relative bg-white rounded-2xl border border-violet-100 p-6 min-h-[220px] flex flex-col justify-between overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-violet-50" />
      <div className="absolute right-6 top-10 w-10 h-10 rounded-full bg-violet-50" />

      <div className="flex items-start justify-between relative z-10">
        <span className="text-5xl font-extrabold text-violet-500">
          {String(displayNumber).padStart(2, '0')}
        </span>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
            {onEdit && (
              <button
                onClick={() => onEdit(year)}
                className="w-8 h-8 rounded-full bg-white border border-violet-100 flex items-center justify-center text-gray-400 hover:text-violet-500 hover:border-violet-300"
                title="Modifier"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(year)}
                className="w-8 h-8 rounded-full bg-white border border-violet-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-300"
                title="Supprimer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full whitespace-nowrap">
            {year.modulesCount} modules
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 relative z-0">
        <p className="text-xl font-semibold text-gray-800">{year.academicYear}</p>
        <Link
          href={`/admin/years/${year.id}`}
          className="w-10 h-10 rounded-full border-2 border-violet-200 flex items-center justify-center text-violet-500 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}