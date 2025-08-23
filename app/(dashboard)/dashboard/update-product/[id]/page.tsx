'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ImageIcon, Save, Crown, Sparkles, Upload, DollarSign, Package, FileText, Tag, Edit3 } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type ProductData = {
  name: string;
  price: string;
  description: string;
  category: string;
};

export default function UpdateProductPage() {
  const [formData, setFormData] = useState<ProductData>({ name: '', price: '', description: '', category: '' });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const categories = ['Laptops', 'Smartphones', 'Audio', 'Tablets', 'Wearables', 'Gaming', 'Accessories'];

  useEffect(() => {
    if (!id) return;
    const fetchProductData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const result = await res.json();
        if (result.success) {
          const { name, price, description, category, imageUrl } = result.data;
          setFormData({ name, price: price.toString(), description, category });
          setImagePreview(imageUrl);
        }
      } catch (error) {
        toast.error('Could not fetch product data.');
        router.push('/dashboard/my-products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, [id, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (image) {
      data.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication failed');

      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Product updated successfully!');
        router.push('/dashboard/my-products');
      } else {
        throw new Error(result.message || 'Failed to update product.');
      }
    } catch (error: any) {
      toast.error(`❌ ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && !formData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center fade-in-up">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
            <Edit3 className="w-10 h-10 text-white" />
          </div>
          <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-orange-400 via-pink-500 to-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-to-br from-cyan-400 via-emerald-500 to-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center space-x-2 px-6 py-3 glass-morphism rounded-full mb-8">
              <Edit3 className="w-5 h-5 text-green-400 animate-pulse" />
              <span className="text-sm font-semibold gradient-text">Premium Product Update</span>
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-6 gradient-text">
              Update Premium Product
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Enhance your luxury product details to captivate more premium customers.
            </p>
          </div>

          
          <div className="premium-card glass-morphism rounded-3xl p-8 md:p-12 shadow-2xl fade-in-up" style={{animationDelay: '0.2s'}}>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="md:col-span-2">
                  <label htmlFor="name" className="flex items-center gap-3 text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    Product Name
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    className="w-full p-5 premium-input rounded-2xl text-lg font-medium placeholder-slate-400 focus:placeholder-slate-300 transition-all"
                    placeholder="Enter your premium product name"
                    required 
                  />
                </div>

                
                <div>
                  <label htmlFor="price" className="flex items-center gap-3 text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    Premium Price
                  </label>
                  <input 
                    type="number" 
                    name="price" 
                    id="price" 
                    value={formData.price} 
                    onChange={handleInputChange}
                    className="w-full p-5 premium-input rounded-2xl text-lg font-medium placeholder-slate-400 focus:placeholder-slate-300 transition-all"
                    placeholder="0.00"
                    required 
                  />
                </div>

                
                <div>
                  <label htmlFor="category" className="flex items-center gap-3 text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Tag className="w-4 h-4 text-white" />
                    </div>
                    Category
                  </label>
                  <select 
                    name="category" 
                    id="category" 
                    value={formData.category} 
                    onChange={handleInputChange}
                    className="w-full p-5 premium-input rounded-2xl text-lg font-medium transition-all"
                    required
                  >
                    <option value="">Select premium category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                
                <div className="md:col-span-2">
                  <label htmlFor="description" className="flex items-center gap-3 text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    Product Description
                  </label>
                  <textarea 
                    name="description" 
                    id="description" 
                    value={formData.description} 
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-5 premium-input rounded-2xl text-lg font-medium placeholder-slate-400 focus:placeholder-slate-300 transition-all resize-none"
                    placeholder="Describe your premium product in detail..."
                    required
                  />
                </div>

                
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                    Product Image
                  </label>
                  
                  <div className="glass-morphism rounded-3xl p-8 transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      {/* Current Image */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">Current Image</h4>
                        {imagePreview && (
                          <div className="relative group">
                            <img 
                              src={imagePreview} 
                              alt="Current product image" 
                              className="w-full max-h-80 object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                              <div className="text-white font-semibold text-center">
                                <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                                Current Image
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      
                      <div className="flex-1 text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-xl">
                          <Upload className="w-16 h-16 text-white" />
                        </div>
                        
                        <div className="space-y-4">
                          <label htmlFor="file-upload" className="premium-button text-white px-8 py-4 rounded-2xl font-bold text-lg cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-xl shadow-lg inline-flex items-center gap-3">
                            <Upload className="w-5 h-5" />
                            Update Image
                            <input 
                              id="file-upload" 
                              name="image" 
                              type="file" 
                              className="sr-only" 
                              onChange={handleImageChange} 
                              accept="image/*"
                            />
                          </label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Upload new image to replace current one<br />
                            (JPG, PNG formats supported)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full premium-button text-white py-6 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      Updating Premium Product...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <Save className="w-6 h-6" />
                      Update Premium Product
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}