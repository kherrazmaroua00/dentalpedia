export default function TheorySlider({ value, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-3">Répartition du contenu pédagogique</p>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">Théorie <span className="font-bold text-violet-700">{value}%</span></span>
        <span className="text-gray-600">Clinique <span className="font-bold text-emerald-600">{100 - value}%</span></span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden bg-emerald-300 mb-1">
        <div className="h-full bg-violet-600" style={{ width: `${value}%` }} />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-violet-600"
      />
      <p className="text-xs text-gray-400 mt-2">Total: 100% ✓</p>
    </div>
  );
}