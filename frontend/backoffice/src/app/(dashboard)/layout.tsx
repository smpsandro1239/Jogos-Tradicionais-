"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useWebSockets } from "@/hooks/useWebSockets";
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Conectar ao WebSocket se tivermos uma aldeia (Admin de Aldeia)
  const { lastEvent } = useWebSockets(user?.aldeiaId || 'global');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (lastEvent) {
      if (lastEvent.type === 'jogo_sorteado') {
        toast.success(`🎉 Sorteio Realizado: ${lastEvent.data.resultado}`, {
          duration: 5000,
          position: 'top-right',
        });
      } else if (lastEvent.type === 'nova_participacao') {
        toast(`🎟️ Nova participação: ${lastEvent.data.utilizadorNome}`, {
          icon: '👏',
          position: 'bottom-right',
        });
      }
    }
  }, [lastEvent]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Toaster />
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
