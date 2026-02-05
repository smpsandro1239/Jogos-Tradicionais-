"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { AuditLog } from '@/types';
import { ShieldCheck, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

export default function AuditoriaPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/auditoria');
        setLogs(response.data);
      } catch (err) {
        console.error('Erro ao carregar logs de auditoria', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Auditoria do Sistema</h1>
          <p className="text-slate-500 text-sm mt-1">Registo de todas as ações sensíveis realizadas na plataforma.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Pesquisar logs..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-64"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Data / Hora</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ação</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Utilizador ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Metadados</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {format(new Date(log.created_at), "dd/MM/yyyy", { locale: pt })}
                      </div>
                      <div className="text-xs text-slate-500">
                        {format(new Date(log.created_at), "HH:mm:ss")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {log.acao}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      {log.utilizadorId.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs overflow-hidden text-ellipsis font-mono text-[10px] text-slate-400 bg-slate-50 p-2 rounded border border-slate-100">
                        {JSON.stringify(log.metadados)}
                      </div>
                    </td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      <ShieldCheck size={48} className="mx-auto text-slate-200 mb-3" />
                      Nenhum registo de auditoria encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
