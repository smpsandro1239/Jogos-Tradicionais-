"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Aldeia } from '@/types';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';

export default function AldeiasPage() {
  const [aldeias, setAldeias] = useState<Aldeia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAldeias = async () => {
      try {
        const response = await api.get('/aldeias');
        setAldeias(response.data);
      } catch (err) {
        console.error('Erro ao carregar aldeias', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAldeias();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestão de Aldeias</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Nova Aldeia
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aldeias.map((aldeia) => (
            <div key={aldeia.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 bg-green-50 flex items-center justify-center">
                <MapPin size={48} className="text-green-200" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{aldeia.nome}</h2>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                  {aldeia.descricao || 'Sem descrição disponível.'}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 flex justify-center items-center gap-2 p-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <Edit size={16} />
                    Editar
                  </button>
                  <button className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {aldeias.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              Nenhuma aldeia encontrada. Comece por criar uma nova.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
