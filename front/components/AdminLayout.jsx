'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import AdminSidebar from '@/components/AdminSidebar';
import AdminFooter from '@/components/AdminFooter';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    apiFetch('/api/auth/me')
      .catch(() => router.push('/admin/login'))
      .finally(() => setChecking(false));
  }, [router]);

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f6f4fd] via-[#f3eefc] to-[#faf9ff]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 px-10 py-10">{children}</main>
        <AdminFooter />
      </div>
    </div>
  );
}