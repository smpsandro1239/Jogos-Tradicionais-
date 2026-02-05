"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Jogo } from '@/types';
import { Trophy, Plus, Edit, Trash2, LayoutGrid, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function JogosPage() {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const response = await api.get('/jogos');
        setJogos(response.data);
      } catch (err) {
        console.error('Erro ao carregar jogos', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJogos();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-700 border-green-200';
      case 'pausado': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'fechado': return 'bg-red-100 text-red-700 border-red-200';
      case 'terminado': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'poio_vaca': return { label: 'Poio da Vaca', icon: LayoutGrid };
      case 'rifa': return { label: 'Rifa', icon: Ticket };
      default: return { label: tipo, icon: Trophy };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestão de Jogos</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Novo Jogo
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium">Preço</th>
                <th className="px-6 py-4 font-medium">Configuração</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {jogos.map((jogo) => {
                const tipoInfo = getTipoLabel(jogo.tipo);
                const Icon = tipoInfo.icon;
                return (
                  <tr key={jogo.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                          <Icon size={18} />
                        </div>
                        <div className="font-bold text-slate-900">{tipoInfo.label}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-bold border capitalize",
                        getStatusColor(jogo.estado)
                      )}>
                        {jogo.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {Number(jogo.preco_participacao).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                      {JSON.stringify(jogo.config)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {jogos.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Nenhum jogo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
