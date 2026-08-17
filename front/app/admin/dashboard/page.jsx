'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Calendar, FileText, PlayCircle, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { timeAgo } from '@/lib/time';
import AdminLayout from '@/components/AdminLayout';
import StatCard from '@/components/StatCard';
import YearCard from '@/components/YearCard';
import RecentModuleItem from '@/components/RecentModuleItem';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiFetch('/api/dashboard/stats'), apiFetch('/api/years')])
      .then(([statsData, yearsData]) => {
        setStats(statsData);
        setYears(yearsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-5xl font-bold text-gray-500 mb-1">Bonjour</h1>
      <p className="text-gray-500 mb-8">Gérez vos ressources Dentalpedia.</p>

      {loading ? (
        <p className="text-gray-400 text-sm">Chargement des statistiques...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <StatCard
              label="Total visiteurs"
              value={stats.totalVisitors.toLocaleString('fr-FR')}
              icon={Users}
              meta={stats.monthChange !== null ? `${stats.monthChange >= 0 ? '+' : ''}${stats.monthChange}% ce mois` : 'Pas de données'}
              metaIcon={TrendingUp}
            />
            <StatCard
              label="Visiteurs aujourd'hui"
              value={stats.visitorsToday.toLocaleString('fr-FR')}
              icon={Calendar}
              meta={stats.dayChange !== null ? `${stats.dayChange >= 0 ? '+' : ''}${stats.dayChange}% vs hier` : 'Pas de données'}
              metaIcon={TrendingUp}
            />
            <StatCard
              label="Total modules"
              value={stats.totalModules}
              icon={FileText}
              meta={stats.lastModuleUpdate ? `Mis à jour ${timeAgo(stats.lastModuleUpdate)}` : 'Aucun module'}
              metaIcon={Clock}
            />
            <StatCard
              label="Total vidéos"
              value={stats.totalVideos}
              icon={PlayCircle}
              meta={stats.lastVideoUpdate ? `Mis à jour ${timeAgo(stats.lastVideoUpdate)}` : 'Aucune vidéo'}
              metaIcon={Clock}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-500">Années d'études</h2>
                <Link href="/admin/years" className="text-violet-500 text-sm font-medium flex items-center gap-1 hover:underline">
                  Voir tout <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {years.map((year) => <YearCard key={year.id} year={year} />)}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-500 mb-4">Modules récemment ajoutés</h2>
              <div className="bg-white rounded-2xl border border-violet-100 p-5 shadow-sm shadow-violet-50"> 
                {stats.recentModules.length === 0 ? (
                  <p className="text-sm text-gray-400">Aucun module pour le moment.</p>
                ) : (
                  stats.recentModules.map((m, i) => <RecentModuleItem key={m.id} module={m} index={i} />)
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}