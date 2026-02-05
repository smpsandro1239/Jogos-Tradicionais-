"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Evento, Aldeia } from '@/types';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import Modal from '@/components/Modal';

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [aldeias, setAldeias] = useState<Aldeia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentEvento, setCurrentEvento] = useState<Partial<Evento> | null>(null);

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

  const fetchAldeias = async () => {
    try {
      const response = await api.get('/aldeias');
      setAldeias(response.data);
    } catch (err) {
      console.error('Erro ao carregar aldeias', err);
    }
  };

  useEffect(() => {
    fetchEventos();
    fetchAldeias();
  }, []);

  const handleOpenModal = (evento?: Evento) => {
    if (evento) {
      setCurrentEvento({
        ...evento,
        data_inicio: format(new Date(evento.data_inicio), "yyyy-MM-dd'T'HH:mm"),
        data_fim: evento.data_fim ? format(new Date(evento.data_fim), "yyyy-MM-dd'T'HH:mm") : undefined,
      });
    } else {
      setCurrentEvento({
        nome: '',
        descricao: '',
        data_inicio: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        estado: 'agendado',
        aldeiaId: aldeias.length > 0 ? aldeias[0].id : '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEvento(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEvento) return;

    setIsSaving(true);
    try {
      if (currentEvento.id) {
        await api.patch(`/eventos/${currentEvento.id}`, currentEvento);
      } else {
        await api.post('/eventos', currentEvento);
      }
      await fetchEventos();
      handleCloseModal();
    } catch (err) {
      console.error('Erro ao salvar evento', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que deseja eliminar este evento?')) return;

    try {
      await api.delete(`/eventos/${id}`);
      await fetchEventos();
    } catch (err) {
      console.error('Erro ao eliminar evento', err);
    }
  };

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
        <button
          onClick={() => handleOpenModal()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
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
                <th className="px-6 py-4 font-medium">Ações</th>
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
                    {format(new Date(evento.data_inicio), "d 'de' MMMM, yyyy HH:mm", { locale: pt })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(evento)}
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(evento.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {eventos.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Nenhum evento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentEvento?.id ? 'Editar Evento' : 'Novo Evento'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Aldeia</label>
            <select
              required
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={currentEvento?.aldeiaId || ''}
              onChange={(e) => setCurrentEvento(prev => ({ ...prev!, aldeiaId: e.target.value }))}
            >
              <option value="" disabled>Selecione uma aldeia</option>
              {aldeias.map(aldeia => (
                <option key={aldeia.id} value={aldeia.id}>{aldeia.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={currentEvento?.nome || ''}
              onChange={(e) => setCurrentEvento(prev => ({ ...prev!, nome: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
            <textarea
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none min-h-[100px]"
              value={currentEvento?.descricao || ''}
              onChange={(e) => setCurrentEvento(prev => ({ ...prev!, descricao: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data Início</label>
              <input
                type="datetime-local"
                required
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                value={currentEvento?.data_inicio || ''}
                onChange={(e) => setCurrentEvento(prev => ({ ...prev!, data_inicio: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
              <select
                required
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none capitalize"
                value={currentEvento?.estado || 'agendado'}
                onChange={(e) => setCurrentEvento(prev => ({ ...prev!, estado: e.target.value as Evento['estado'] }))}
              >
                <option value="agendado">Agendado</option>
                <option value="ativo">Ativo</option>
                <option value="terminado">Terminado</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSaving && <Loader2 size={18} className="animate-spin" />}
              {currentEvento?.id ? 'Guardar Alterações' : 'Criar Evento'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
