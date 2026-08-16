export default function StatCard({ label, value, icon: Icon, meta, metaIcon: MetaIcon }) {
  return (
    <div className="bg-white rounded-2xl border border-violet-100 p-6 shadow-sm shadow-violet-50">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{label}</span>
        <div className="w-9 h-9 rounded-full bg-violet-50 flex items-center justify-center text-violet-500">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-bold text-violet-700 mb-2">{value}</div>
      {meta && (
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          {MetaIcon && <MetaIcon className="w-3.5 h-3.5" />}
          {meta}
        </div>
      )}
    </div>
  );
}