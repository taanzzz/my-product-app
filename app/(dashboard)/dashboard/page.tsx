'use client';

import { useSession } from 'next-auth/react';
import { 
  BarChart, Package, DollarSign, Users, TrendingUp, 
  Star, Award, Crown, Sparkles, Zap, Eye
} from 'lucide-react';

const stats = [
  { 
    name: 'Total Products', 
    stat: '12', 
    icon: Package, 
    change: '+3', 
    changeType: 'increase',
    gradient: 'from-blue-500 to-cyan-600'
  },
  { 
    name: 'Revenue', 
    stat: '$4,850', 
    icon: DollarSign, 
    change: '+18%', 
    changeType: 'increase',
    gradient: 'from-green-500 to-emerald-600'
  },
  { 
    name: 'Customers', 
    stat: '89', 
    icon: Users, 
    change: '+12', 
    changeType: 'increase',
    gradient: 'from-purple-500 to-pink-600'
  },
  { 
    name: 'Views', 
    stat: '2,140', 
    icon: Eye, 
    change: '+7%', 
    changeType: 'increase',
    gradient: 'from-orange-500 to-red-600'
  }
];

const recentActivity = [
  { action: 'New product "Premium Headphones" added', time: '2 hours ago', type: 'success' },
  { action: 'Order #12345 completed successfully', time: '4 hours ago', type: 'info' },
  { action: 'Customer review received (5 stars)', time: '6 hours ago', type: 'success' },
  { action: 'Product "Luxury Watch" updated', time: '8 hours ago', type: 'info' },
];

export default function DashboardOverviewPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8 fade-in-up">
      {/* Premium Welcome Header */}
      <div className="glass-morphism rounded-3xl p-8 premium-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins gradient-text mb-2">
              Welcome back, {session?.user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              Here's your premium store performance overview
            </p>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">PREMIUM SELLER</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Award className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <div key={item.name} className="premium-card glass-morphism rounded-3xl p-8 fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                item.changeType === 'increase' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {item.change}
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold gradient-text mb-2">{item.stat}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Analytics Chart Placeholder */}
        <div className="glass-morphism rounded-3xl p-8 premium-card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Sales Analytics</h3>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <BarChart className="w-12 h-12 text-white" />
              </div>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                Premium analytics dashboard coming soon
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-morphism rounded-3xl p-8 premium-card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Recent Activity</h3>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 glass-morphism rounded-2xl">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                } animate-pulse`}></div>
                <div className="flex-1">
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{activity.action}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-morphism rounded-3xl p-8 premium-card">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
          <Zap className="w-8 h-8 text-purple-500" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="premium-button text-white p-6 rounded-2xl font-semibold text-lg hover:scale-105 transition-all shadow-xl">
            <Package className="w-8 h-8 mx-auto mb-3" />
            Add New Product
          </button>
          <button className="premium-button text-white p-6 rounded-2xl font-semibold text-lg hover:scale-105 transition-all shadow-xl">
            <BarChart className="w-8 h-8 mx-auto mb-3" />
            View Analytics
          </button>
          <button className="premium-button text-white p-6 rounded-2xl font-semibold text-lg hover:scale-105 transition-all shadow-xl">
            <Star className="w-8 h-8 mx-auto mb-3" />
            Manage Reviews
          </button>
        </div>
      </div>
    </div>
  );
}
