'use client';

import { TrendingUp, DollarSign, Eye, ShoppingCart, BarChart, Users, Activity } from 'lucide-react';
import Image from 'next/image';

// Demo data
const statsCards = [
  { name: 'Total Sales', stat: '$14,832', icon: DollarSign, change: '+12.5%', changeType: 'increase' },
  { name: 'Total Views', stat: '2.1M', icon: Eye, change: '+8.2%', changeType: 'increase' },
  { name: 'New Customers', stat: '1,204', icon: Users, change: '-2.1%', changeType: 'decrease' },
  { name: 'Conversion Rate', stat: '3.45%', icon: Activity, change: '+0.5%', changeType: 'increase' },
];

const bestSellingProducts = [
  { id: '1', name: 'MacBook Pro M3 Max', sales: 245, imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop' },
  { id: '2', name: 'iPhone 15 Pro Max', sales: 189, imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop' },
  { id: '3', name: 'Sony WH-1000XM5', sales: 302, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
];

const mostViewedProducts = [
    { id: '3', name: 'Sony WH-1000XM5', views: '150.2k', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
    { id: '1', name: 'MacBook Pro M3 Max', views: '120.5k', imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop' },
    { id: '4', name: 'iPad Pro 12.9"', views: '98.7k', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-poppins text-slate-800 dark:text-white">
          Product Analytics
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Track your store's performance and growth.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((item) => (
          <div key={item.name} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{item.name}</p>
              <item.icon className="h-6 w-6 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            </div>
            <div className="mt-1 flex items-baseline gap-x-2">
              <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">{item.stat}</h3>
              <span className={`text-sm font-semibold ${item.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Sales Chart Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50">
           <h3 className="font-semibold text-lg mb-4">Sales Over Time</h3>
           <div className="h-80 flex items-center justify-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <BarChart className="w-12 h-12" />
              <p className="ml-4">Chart data will be displayed here</p>
           </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-500" /> Best Sellers
          </h3>
          <ul className="space-y-4">
            {bestSellingProducts.map((product) => (
              <li key={product.id} className="flex items-center gap-4">
                <Image
  src={product.imageUrl}
  alt={product.name}
  width={48}
  height={48}
  className="object-cover rounded-lg"
/>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{product.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{product.sales} sales</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Most Viewed Products */}
       <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Eye size={20} className="text-blue-500" /> Most Viewed
          </h3>
          <ul className="space-y-4">
            {mostViewedProducts.map((product) => (
              <li key={product.id} className="flex items-center gap-4">
                <Image
  src={product.imageUrl}
  alt={product.name}
  width={48}
  height={48}
  className="object-cover rounded-lg"
/>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{product.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{product.views} views</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}