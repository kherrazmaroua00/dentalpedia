'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/annees', label: 'Années' },
  { href: '/a-propos', label: 'À propos' },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  return (
    <nav className="w-full py-6">
      <div className="max-w-3xl mx-auto flex items-center p-5 justify-center gap-10 text-lg font-medium">
        {navItems.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={active ? 'text-violet-700 underline underline-offset-4' : 'text-gray-500 hover:text-violet-600'}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}