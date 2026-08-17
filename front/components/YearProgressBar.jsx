export default function YearProgressBar({ theoryPercentage }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-gray-400 mb-1">
        <span>Répartition Pédagogique</span>
        <span>
          {theoryPercentage}% Théorie{theoryPercentage < 100 ? ` / ${100 - theoryPercentage}% Pre-clinique/Clinique` : ''}
        </span>
      </div>
      <div className="h-3 rounded-full bg-emerald-200 overflow-hidden">
        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${theoryPercentage}%` }} />
      </div>
    </div>
  );
}