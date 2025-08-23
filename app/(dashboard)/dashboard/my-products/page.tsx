'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Package, Crown, Sparkles, Eye, TrendingUp, Star, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
};

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("You are not logged in.");
        router.push('/login');
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/products/my-products`, {
        headers: {
          
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      toast.error('Could not load your products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this premium product?')) {
      toast.loading('Deleting product...', { id: productId });
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const res = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to delete product');
        }
        
        toast.success('Product deleted successfully!', { id: productId });
        fetchProducts(); 
      } catch (error: any) {
        toast.error(error.message || 'Could not delete the product.', { id: productId });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center fade-in-up">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
            <Package className="w-10 h-10 text-white" />
          </div>
          <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">Loading your premium products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in-up">
      {/* Premium Header */}
      <div className="glass-morphism rounded-3xl p-8 premium-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 glass-morphism rounded-full">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-semibold gradient-text">PREMIUM SELLER</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins gradient-text mb-2">
              My Premium Products
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Manage your luxury product collection
            </p>
          </div>
          
          <Link href="/dashboard/add-product">
            <button className="premium-button text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl shadow-lg">
              <span className="flex items-center gap-3">
                <Plus className="w-5 h-5" />
                Add Premium Product
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-morphism rounded-2xl p-6 premium-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{products.length}</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Products</p>
            </div>
          </div>
        </div>
        
        <div className="glass-morphism rounded-2xl p-6 premium-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">
                ${products.reduce((sum, product) => sum + product.price, 0).toLocaleString()}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Value</p>
            </div>
          </div>
        </div>
        
        <div className="glass-morphism rounded-2xl p-6 premium-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">4.8</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table/Cards */}
      <div className="glass-morphism rounded-3xl overflow-hidden premium-card">
        {products.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                    <th className="text-left p-6 font-bold text-slate-800 dark:text-white">Product</th>
                    <th className="text-left p-6 font-bold text-slate-800 dark:text-white">Category</th>
                    <th className="text-left p-6 font-bold text-slate-800 dark:text-white">Price</th>
                    <th className="text-left p-6 font-bold text-slate-800 dark:text-white">Status</th>
                    <th className="text-right p-6 font-bold text-slate-800 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id} 
                        className="border-b border-slate-200/30 dark:border-slate-700/30 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300 fade-in-up"
                        style={{animationDelay: `${index * 0.1}s`}}>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-16 h-16 object-cover rounded-xl shadow-lg" 
                            />
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg">{product.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Premium Product</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-6">
                        <p className="text-2xl font-bold gradient-text">${product.price.toLocaleString()}</p>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                          Active
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center justify-end gap-3">
                          <Link href={`/products/${product._id}`}>
                            <button className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 group">
                              <Eye className="w-5 h-5" />
                            </button>
                          </Link>
                          <Link href={`/dashboard/update-product/${product._id}`}>
                            <button className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300">
                              <Edit className="w-5 h-5" />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleDelete(product._id)}
                            className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden p-6 space-y-6">
              {products.map((product, index) => (
                <div key={product._id} 
                     className="glass-morphism rounded-2xl p-6 premium-card fade-in-up"
                     style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-20 h-20 object-cover rounded-xl shadow-lg" 
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">{product.name}</h3>
                      <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                      <p className="text-2xl font-bold gradient-text mt-2">${product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                      Active
                    </span>
                    <div className="flex items-center gap-2">
                      <Link href={`/products/${product._id}`}>
                        <button className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center text-blue-500">
                          <Eye className="w-5 h-5" />
                        </button>
                      </Link>
                      <Link href={`/dashboard/update-product/${product._id}`}>
                        <button className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center text-green-500">
                          <Edit className="w-5 h-5" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 fade-in-up">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Package className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-600 dark:text-slate-400 mb-4">No Premium Products</h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              You haven't added any premium products yet. Create your first luxury listing to get started!
            </p>
            <Link href="/dashboard/add-product">
              <button className="premium-button text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl shadow-lg">
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Add Your First Product
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}