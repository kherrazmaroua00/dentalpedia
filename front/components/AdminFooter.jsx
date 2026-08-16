import { ShieldCheck } from 'lucide-react';

export default function AdminFooter() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white/60 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <span className="font-semibold text-gray-800">Dentalpedia Admin</span>
        <span>© 2026 Dentalpedia – Plateforme d'excellence académique dentaire</span>
        <div className="flex items-center gap-5">
          <a href="#" className="underline hover:text-violet-600">Mentions Légales</a>
          <a href="#" className="underline hover:text-violet-600">Support Technique</a>
          <a href="#" className="underline hover:text-violet-600">Politique de Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}