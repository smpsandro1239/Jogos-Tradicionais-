"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User, Aldeia } from '@/types';
import { Edit, Shield, MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Modal from '@/components/Modal';

export default function UtilizadoresPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [aldeias, setAldeias] = useState<Aldeia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/utilizadores');
      setUsers(response.data);
    } catch (err) {
      console.error('Erro ao carregar utilizadores', err);
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
    fetchUsers();
    fetchAldeias();
  }, []);

  const handleOpenModal = (user: User) => {
    setCurrentUser({ ...user });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !currentUser.id) return;

    setIsSaving(true);
    try {
      await api.patch(`/utilizadores/${currentUser.id}`, {
        role: currentUser.role,
        aldeia: currentUser.role === 'aldeia_admin' ? { id: currentUser.aldeia_id } : null,
      });
      await fetchUsers();
      handleCloseModal();
    } catch (err) {
      console.error('Erro ao salvar utilizador', err);
    } finally {
      setIsSaving(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'aldeia_admin': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'user': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Gestão de Utilizadores</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Utilizador</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Aldeia</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                          {user.nome.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{user.nome}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
                        getRoleColor(user.role)
                      )}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.aldeia ? (
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin size={14} className="text-slate-400" />
                          {user.aldeia.nome}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">---</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Editar Permissões"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                {currentUser?.nome?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-slate-900">{currentUser?.nome}</div>
                <div className="text-sm text-slate-500">{currentUser?.email}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                <Shield size={16} />
                Nível de Acesso (Role)
              </label>
              <select
                required
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                value={currentUser?.role || 'user'}
                onChange={(e) => setCurrentUser(prev => ({ ...prev!, role: e.target.value as User['role'] }))}
              >
                <option value="user">Utilizador</option>
                <option value="aldeia_admin">Administrador de Aldeia</option>
                <option value="super_admin">Super Administrador</option>
              </select>
            </div>

            {currentUser?.role === 'aldeia_admin' && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <MapPin size={16} />
                  Aldeia Associada
                </label>
                <select
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  value={currentUser?.aldeia_id || currentUser?.aldeia?.id || ''}
                  onChange={(e) => setCurrentUser(prev => ({ ...prev!, aldeia_id: e.target.value }))}
                >
                  <option value="" disabled>Selecionar Aldeia</option>
                  {aldeias.map(aldeia => (
                    <option key={aldeia.id} value={aldeia.id}>{aldeia.nome}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 font-bold"
            >
              {isSaving && <Loader2 size={18} className="animate-spin" />}
              Salvar Alterações
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
