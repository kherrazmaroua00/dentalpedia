export default function YearsTimeline({ children }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-violet-100" />
      {children}
    </div>
  );
}