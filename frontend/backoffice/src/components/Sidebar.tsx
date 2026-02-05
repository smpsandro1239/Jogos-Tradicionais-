"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, Calendar, Trophy, Users, LogOut, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Map, label: 'Aldeias', href: '/aldeias' },
  { icon: Calendar, label: 'Eventos', href: '/eventos' },
  { icon: Trophy, label: 'Jogos', href: '/jogos' },
  { icon: Users, label: 'Utilizadores', href: '/utilizadores' },
  { icon: ShieldCheck, label: 'Auditoria', href: '/auditoria' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-green-500">Aldeias Admin</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors",
                isActive ? "bg-green-600 text-white" : "hover:bg-slate-800 text-slate-400 hover:text-white"
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 w-full text-left text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
