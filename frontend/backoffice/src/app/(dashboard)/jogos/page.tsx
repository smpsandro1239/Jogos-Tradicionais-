"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Jogo, Evento, Sorteio } from '@/types';
import { Trophy, Plus, Edit, Trash2, LayoutGrid, Ticket, Loader2, Play, Eye, Footprints } from 'lucide-react';
import { cn } from '@/lib/utils';
import Modal from '@/components/Modal';
import axios from 'axios';

export default function JogosPage() {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentJogo, setCurrentJogo] = useState<Partial<Jogo> | null>(null);
  const [currentSorteio, setCurrentSorteio] = useState<Sorteio | null>(null);

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

  const fetchEventos = async () => {
    try {
      const response = await api.get('/eventos');
      setEventos(response.data);
    } catch (err) {
      console.error('Erro ao carregar eventos', err);
    }
  };

  useEffect(() => {
    fetchJogos();
    fetchEventos();
  }, []);

  const handleOpenModal = (jogo?: Jogo) => {
    if (jogo) {
      setCurrentJogo({ ...jogo });
    } else {
      setCurrentJogo({
        tipo: 'poio_vaca',
        preco_participacao: 1,
        estado: 'ativo',
        eventoId: eventos.length > 0 ? eventos[0].id : '',
        config: { linhas: 10, colunas: 10 }
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentJogo(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentJogo) return;

    setIsSaving(true);
    try {
      if (currentJogo.id) {
        await api.patch(`/jogos/${currentJogo.id}`, currentJogo);
      } else {
        await api.post('/jogos', currentJogo);
      }
      await fetchJogos();
      handleCloseModal();
    } catch (err) {
      console.error('Erro ao salvar jogo', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que deseja eliminar este jogo?')) return;

    try {
      await api.delete(`/jogos/${id}`);
      await fetchJogos();
    } catch (err) {
      console.error('Erro ao eliminar jogo', err);
    }
  };

  const handleSortear = async (id: string) => {
    if (!confirm('Deseja realizar o sorteio agora? Esta ação é irreversível.')) return;

    try {
      const res = await api.post(`/sorteios/${id}`);
      setCurrentSorteio(res.data);
      setIsResultModalOpen(true);
      await fetchJogos();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Erro ao realizar sorteio. Verifique se o jogo está fechado e tem participações pagas.');
      } else {
        alert('Ocorreu um erro inesperado.');
      }
    }
  };

  const handleVerResultado = async (id: string) => {
    try {
      const res = await api.get(`/sorteios/${id}`);
      setCurrentSorteio(res.data);
      setIsResultModalOpen(true);
    } catch (err) {
      console.error('Erro ao buscar sorteio', err);
    }
  };

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
      case 'corrida_caracois': return { label: 'Corrida de Caracóis', icon: Footprints };
      default: return { label: tipo, icon: Trophy };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestão de Jogos</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
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
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {jogo.estado === 'fechado' && (
                          <button
                            onClick={() => handleSortear(jogo.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Realizar Sorteio"
                          >
                            <Play size={18} />
                          </button>
                        )}
                        {jogo.estado === 'terminado' && (
                          <button
                            onClick={() => handleVerResultado(jogo.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver Resultado"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenModal(jogo)}
                          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(jogo.id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {jogos.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Nenhum jogo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Criação/Edição */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentJogo?.id ? 'Editar Jogo' : 'Novo Jogo'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Evento</label>
            <select
              required
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={currentJogo?.eventoId || ''}
              onChange={(e) => setCurrentJogo(prev => ({ ...prev!, eventoId: e.target.value }))}
            >
              <option value="" disabled>Selecione um evento</option>
              {eventos.map(evento => (
                <option key={evento.id} value={evento.id}>{evento.nome}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
              <select
                required
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none capitalize"
                value={currentJogo?.tipo || 'poio_vaca'}
                onChange={(e) => {
                  const tipo = e.target.value as Jogo['tipo'];
                  let config = {};
                  if (tipo === 'poio_vaca') config = { linhas: 10, colunas: 10 };
                  else if (tipo === 'rifa') config = { total_bilhetes: 100 };
                  else if (tipo === 'corrida_caracois') config = { num_caracois: 5 };
                  setCurrentJogo(prev => ({ ...prev!, tipo, config }));
                }}
              >
                <option value="poio_vaca">Poio da Vaca</option>
                <option value="rifa">Rifa</option>
                <option value="corrida_caracois">Corrida de Caracóis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
              <select
                required
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none capitalize"
                value={currentJogo?.estado || 'ativo'}
                onChange={(e) => setCurrentJogo(prev => ({ ...prev!, estado: e.target.value as Jogo['estado'] }))}
              >
                <option value="ativo">Ativo</option>
                <option value="pausado">Pausado</option>
                <option value="fechado">Fechado</option>
                <option value="terminado" disabled>Terminado (via sorteio)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Preço Participação (€)</label>
            <input
              type="number"
              step="0.01"
              required
              min="0"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={currentJogo?.preco_participacao || ''}
              onChange={(e) => setCurrentJogo(prev => ({ ...prev!, preco_participacao: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Configuração do Jogo</h3>
            {currentJogo?.tipo === 'poio_vaca' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Linhas</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    value={currentJogo?.config?.linhas || ''}
                    onChange={(e) => setCurrentJogo(prev => ({
                      ...prev!,
                      config: { ...prev!.config, linhas: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Colunas</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    value={currentJogo?.config?.colunas || ''}
                    onChange={(e) => setCurrentJogo(prev => ({
                      ...prev!,
                      config: { ...prev!.config, colunas: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
            ) : currentJogo?.tipo === 'rifa' ? (
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Total Bilhetes</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  value={currentJogo?.config?.total_bilhetes || ''}
                  onChange={(e) => setCurrentJogo(prev => ({
                    ...prev!,
                    config: { ...prev!.config, total_bilhetes: parseInt(e.target.value) }
                  }))}
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Número de Caracóis</label>
                <input
                  type="number"
                  required
                  min="2"
                  max="20"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  value={currentJogo?.config?.num_caracois || ''}
                  onChange={(e) => setCurrentJogo(prev => ({
                    ...prev!,
                    config: { ...prev!.config, num_caracois: parseInt(e.target.value) }
                  }))}
                />
              </div>
            )}
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
              {currentJogo?.id ? 'Guardar Alterações' : 'Criar Jogo'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de Resultado do Sorteio */}
      <Modal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        title="Resultado do Sorteio"
      >
        {currentSorteio && (
          <div className="space-y-6">
            <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
              <Trophy size={48} className="mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-medium text-green-900">Vencedor Apurado!</h3>
              <div className="text-4xl font-black text-green-700 mt-2">
                {currentSorteio.resultado.linha ? (
                  `L:${currentSorteio.resultado.linha} C:${currentSorteio.resultado.coluna}`
                ) : (
                  currentSorteio.resultado.numero_caracol ? (
                    `Caracol Nº ${currentSorteio.resultado.numero_caracol}`
                  ) : (
                    `Nº ${currentSorteio.resultado.numero}`
                  )
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Detalhes da Auditoria</h4>
              <div className="p-4 bg-slate-50 rounded-xl space-y-2 font-mono text-xs overflow-hidden">
                <div className="flex flex-col">
                  <span className="text-slate-400">Seed:</span>
                  <span className="text-slate-700 break-all">{currentSorteio.seed}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400">Hash (SHA-256):</span>
                  <span className="text-slate-700 break-all">{currentSorteio.hash_seed}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                  <span className="text-slate-400">Data:</span>
                  <span className="text-slate-700">{new Date(currentSorteio.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsResultModalOpen(false)}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
