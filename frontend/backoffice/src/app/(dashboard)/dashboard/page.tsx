"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Map, Calendar, Trophy } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalAldeias: 0,
    totalEventosAtivos: 0,
    totalAngariado: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/estatisticas/global');
        setStats(response.data);
      } catch (err) {
        console.error('Erro ao carregar estatísticas', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Map size={24} />
              </div>
              <div>
                <h2 className="text-slate-500 text-sm font-medium">Total Aldeias</h2>
                <p className="text-3xl font-bold mt-1">{stats.totalAldeias}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                <Calendar size={24} />
              </div>
              <div>
                <h2 className="text-slate-500 text-sm font-medium">Eventos Ativos</h2>
                <p className="text-3xl font-bold mt-1">{stats.totalEventosAtivos}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <Trophy size={24} />
              </div>
              <div>
                <h2 className="text-slate-500 text-sm font-medium">Total Angariado</h2>
                <p className="text-3xl font-bold mt-1">{stats.totalAngariado.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-8 bg-green-600 rounded-2xl text-white">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Backoffice</h2>
        <p className="text-green-100 opacity-90 max-w-2xl">
          Aqui pode gerir todas as aldeias, eventos e jogos tradicionais.
          Utilize o menu lateral para navegar entre as diferentes secções.
        </p>
      </div>
    </div>
  );
}
