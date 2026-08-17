import { BookOpen, MoreVertical } from 'lucide-react';
import { timeAgo } from '@/lib/time';

const palette = [
  'bg-emerald-100 text-emerald-600',
  'bg-violet-100 text-violet-500',
  'bg-rose-100 text-rose-600',
  'bg-sky-100 text-sky-600',
];

export default function RecentModuleItem({ module, index }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-violet-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${palette[index % palette.length]}`}>
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{module.name}</p>
          <p className="text-xs text-gray-400">{module.yearName} • {timeAgo(module.createdAt)}</p>
        </div>
      </div>
      <button className="text-gray-300 hover:text-gray-500">
        <MoreVertical className="w-4 h-4" />
      </button>
    </div>
  );
}