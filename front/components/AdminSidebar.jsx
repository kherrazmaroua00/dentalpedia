'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, CalendarDays, Settings, LogOut } from 'lucide-react';
import { apiFetch } from '@/lib/api';

const navItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutGrid },
  { href: '/admin/years', label: 'Années', icon: CalendarDays },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  }

  return (
    <aside className="w-64 min-h-screen bg-violet-50/40 border-r border-violet-100 flex flex-col px-4 py-6">
      <div className="px-2 mb-8">
        <h1 className="text-xl font-bold text-violet-700">Dentalpedia</h1>
        <p className="text-xs tracking-widest text-gray-400 font-semibold mt-0.5">PORTAIL ADMIN</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                active ? 'bg-violet-600 text-white shadow-sm' : 'text-gray-600 hover:bg-violet-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-violet-100 transition"
      >
        <LogOut className="w-5 h-5" />
        Déconnexion
      </button>
    </aside>
  );
}