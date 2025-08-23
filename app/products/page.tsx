'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Crown, Filter, Star, Eye, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        
        const url = searchTerm 
          ? `${API_BASE_URL}/api/products?search=${searchTerm}`
          : `${API_BASE_URL}/api/products`;
          
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        toast.error('Could not load products.');
      } finally {
        setLoading(false);
      }
    };

    
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]); 

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-pink-400 via-red-500 to-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-to-br from-yellow-400 via-green-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Premium Header Section */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center space-x-2 px-6 py-3 glass-morphism rounded-full mb-8">
              <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold gradient-text">Premium Collection</span>
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-poppins mb-8 gradient-text leading-tight">
              Luxury Products
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Discover extraordinary products crafted with precision and designed for the 
              <span className="font-semibold gradient-text"> elite lifestyle</span>.
            </p>
          </div>

          {/* Enhanced Search Section */}
          <div className="mb-16 max-w-3xl mx-auto fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="glass-morphism rounded-3xl p-2 premium-card">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for luxury products..."
                  className="w-full pl-16 pr-6 py-5 premium-input rounded-2xl text-lg font-medium placeholder-slate-400 focus:placeholder-slate-300 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Loading State */}
          {loading ? (
            <div className="text-center py-32 fade-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
              <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">Loading premium products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-32 fade-in-up">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Search className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-4">No Products Found</h3>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                {searchTerm ? `No results for "${searchTerm}"` : 'No products available at the moment'}
              </p>
            </div>
          ) : (
            <>
              {/* Results Counter */}
              <div className="mb-8 fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="glass-morphism rounded-2xl px-6 py-3 inline-flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {products.length} Premium {products.length === 1 ? 'Product' : 'Products'} Found
                  </span>
                </div>
              </div>

              {/* Premium Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <div key={product._id} 
                       className="group premium-card glass-morphism rounded-3xl overflow-hidden transition-all duration-700 hover:scale-105 hover:shadow-2xl fade-in-up" 
                       style={{animationDelay: `${0.4 + (index * 0.1)}s`}}>
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <Image
  src={product.imageUrl}
  alt={product.name}
  width={500}   // ইচ্ছামতো width
  height={256}  // h-64 মানে 256px
  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Premium Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                          PREMIUM
                        </div>
                      </div>

                      {/* Quick View Button */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center shadow-lg">
                          <Eye className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-8">
                      <div className="mb-3">
                        <span className="px-3 py-1 text-xs font-bold gradient-text bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 group-hover:gradient-text transition-all duration-300">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-3xl font-bold gradient-text">
                          ${product.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <Link href={`/products/${product._id}`}>
                        <button className="w-full premium-button text-white py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform group-hover:scale-105 shadow-xl">
                          <span className="flex items-center justify-center gap-3">
                            <Crown className="w-5 h-5" />
                            View Details
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}