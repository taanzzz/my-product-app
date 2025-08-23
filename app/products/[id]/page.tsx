import Link from 'next/link';
import { Star, Heart, ShoppingCart, Shield, Truck, RotateCcw, Check, ArrowLeft, Crown, Sparkles, Award } from 'lucide-react';


type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  
  features?: string[];
  rating?: number;
  reviews?: number;
};


async function getProductById(id: string): Promise<Product | undefined> {
  try {
    
    const response = await fetch('http://localhost:5000/api/products', {
      cache: 'no-store', 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const responseData = await response.json();
    
    
    if (responseData && Array.isArray(responseData.data)) {
      const product = responseData.data.find((p: Product) => p._id === id);
      
      if (product) {
        product.rating = 4.8;
        product.reviews = 256;
        product.features = [
          'High-performance Processor',
          'Stunning Retina Display',
          'All-day Battery Life',
          'Premium Build Quality'
        ];
      }
      return product;
    }
    return undefined;
    
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return undefined;
  }
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-40 w-80 h-80 bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 fade-in-up">
          <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Award className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-6 gradient-text">Product Not Found</h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Sorry, we couldn't find the premium product you're looking for.
          </p>
          <Link href="/products">
            <button className="premium-button text-white px-12 py-5 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl">
              <span className="flex items-center gap-3">
                <ArrowLeft className="w-6 h-6" />
                Back to Collection
              </span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-pink-400 via-red-500 to-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-to-br from-yellow-400 via-green-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Premium Back Navigation */}
          <div className="mb-12 fade-in-up">
            <Link href="/products" className="inline-flex items-center gap-3 glass-morphism px-6 py-4 rounded-2xl premium-card transition-all duration-300 hover:scale-105">
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="font-semibold text-slate-600 dark:text-slate-400">Back to Collection</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Premium Product Image */}
            <div className="fade-in-up">
              <div className="premium-card glass-morphism rounded-3xl p-8 shadow-2xl">
                <div className="relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-auto max-h-[600px] object-contain rounded-2xl shadow-xl"
                  />
                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-xl flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      PREMIUM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Product Details */}
            <div className="space-y-8 fade-in-up" style={{animationDelay: '0.2s'}}>
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-morphism rounded-full">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-bold gradient-text uppercase tracking-wide">
                  {product.category}
                </span>
              </div>
              
              {/* Product Name */}
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins gradient-text leading-tight">
                {product.name}
              </h1>
              
              {/* Rating Section */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="glass-morphism px-4 py-2 rounded-xl">
                  <span className="font-bold text-slate-800 dark:text-white">
                    {product.rating} <span className="text-slate-500 dark:text-slate-400">({product.reviews} reviews)</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="glass-morphism rounded-2xl p-6">
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
              
              {/* Premium Features */}
              {product.features && (
                <div className="glass-morphism rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-500" />
                    Premium Features
                  </h3>
                  <div className="space-y-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-200 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Premium Price */}
              <div className="glass-morphism rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Premium Price</span>
                  <Crown className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-5xl font-bold gradient-text">${product.price.toLocaleString()}</p>
              </div>
              
              {/* Premium Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 premium-button text-white px-8 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl">
                  <span className="flex items-center justify-center gap-3">
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </span>
                </button>
                <button className="glass-morphism border-2 border-transparent hover:border-red-500/50 p-5 rounded-2xl transition-all duration-300 hover:scale-105 group">
                  <Heart className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
              
              {/* Premium Service Features */}
              <div className="grid grid-cols-3 gap-6">
                <div className="glass-morphism rounded-2xl p-6 text-center premium-card group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1">Free Shipping</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Express Delivery</p>
                </div>
                
                <div className="glass-morphism rounded-2xl p-6 text-center premium-card group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1">2 Year Warranty</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Premium Protection</p>
                </div>
                
                <div className="glass-morphism rounded-2xl p-6 text-center premium-card group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <RotateCcw className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1">Easy Returns</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">30 Day Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}