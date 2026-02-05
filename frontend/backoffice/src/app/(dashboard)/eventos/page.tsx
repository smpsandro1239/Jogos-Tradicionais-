"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Evento } from '@/types';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/eventos');
        setEventos(response.data);
      } catch (err) {
        console.error('Erro ao carregar eventos', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-700 border-green-200';
      case 'agendado': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'terminado': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestão de Eventos</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Novo Evento
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
                <th className="px-6 py-4 font-medium">Nome</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium">Data Início</th>
                <th className="px-6 py-4 font-medium">Jogos</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {eventos.map((evento) => (
                <tr key={evento.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{evento.nome}</div>
                    <div className="text-slate-500 text-xs truncate max-w-xs">{evento.descricao || 'Sem descrição'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-bold border capitalize",
                      getStatusColor(evento.estado)
                    )}>
                      {evento.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {format(new Date(evento.data_inicio), "d 'de' MMMM, yyyy", { locale: pt })}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Tag size={14} />
                      <span>Gerir</span>
                    </div>
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
              ))}
              {eventos.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Nenhum evento encontrado.
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
