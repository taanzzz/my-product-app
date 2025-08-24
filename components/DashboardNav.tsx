'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, PlusSquare, BarChart2, ArrowLeftCircle, 
  Crown, X
} from 'lucide-react';
import { useSession } from 'next-auth/react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, gradient: 'from-blue-500 to-cyan-600' },
  { href: '/dashboard/my-products', label: 'My Products', icon: Package, gradient: 'from-purple-500 to-pink-600' },
  { href: '/dashboard/add-product', label: 'Add Product', icon: PlusSquare, gradient: 'from-green-500 to-emerald-600' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2, gradient: 'from-orange-500 to-red-600' },
];


interface DashboardNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardNav({ sidebarOpen, setSidebarOpen }: DashboardNavProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      
      <div 
        className={`fixed inset-0 bg-black/60 z-30 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>

      
      <aside 
        className={`fixed top-0 left-0 h-full z-40
                  w-80 glass-morphism p-8 flex flex-col shadow-2xl border-r border-white/10 dark:border-gray-800/50 
                  transition-transform duration-300 ease-in-out
                  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                  lg:translate-x-0`} 
      >
        <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-poppins gradient-text">Premium</h2>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">DASHBOARD</span>
              </div>
            </div>
            
            <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
        </div>
        
        <div className="glass-morphism rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {session?.user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-white">
                {session?.user?.name?.split(' ')[0] || 'User'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back!</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col space-y-3 flex-1 mt-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)} 
                className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-white/20 dark:bg-black/20 shadow-xl scale-105'
                    : 'hover:bg-white/10 dark:hover:bg-black/10 hover:scale-105'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${isActive ? 'shadow-xl' : ''}`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`font-semibold text-lg ${
                  isActive 
                    ? 'gradient-text' 
                    : 'text-slate-700 dark:text-slate-300 group-hover:gradient-text'
                } transition-all duration-300`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute right-4">
                    <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8">
          <Link 
            href="/"
            className="group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 hover:bg-white/10 dark:hover:bg-black/10 hover:scale-105"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
              <ArrowLeftCircle className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-lg text-slate-700 dark:text-slate-300 group-hover:gradient-text transition-all duration-300">
              Back to Store
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}