'use client';

import { Menu, ShoppingBag } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardHeader({ setSidebarOpen }: DashboardHeaderProps) {
  const { data: session } = useSession();
  
  return (
    
    <header className="md:hidden sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
      <button onClick={() => setSidebarOpen(true)} className="p-2">
        <Menu className="w-6 h-6" />
      </button>
      <div className="flex items-center gap-2">
         <ShoppingBag className="w-6 h-6 text-blue-500"/>
         <span className="font-semibold">{session?.user?.name?.split(' ')[0]}&apos;s Dashboard</span>
      </div>
    </header>
  );
}