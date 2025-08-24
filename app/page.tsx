
import Link from 'next/link';
import { 
  Sparkles,  Shield, Star, ArrowRight, TrendingUp, 
  Users, Award, Globe, Rocket, Crown, Diamond 
} from 'lucide-react';

const features = [
  {
    icon: Crown,
    title: "Premium Quality",
    description: "Handpicked luxury products with unmatched quality standards",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: Rocket,
    title: "Lightning Fast",
    description: "Express delivery and seamless premium shopping experience",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: Diamond,
    title: "Exclusive Access",
    description: "VIP collection with limited edition luxury items",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Military-grade encryption for your data and transactions",
    gradient: "from-green-500 to-emerald-600"
  }
];

const testimonials = [
  {
    name: "Alexandra Sterling",
    role: "Fashion Director",
    content: "The quality is absolutely extraordinary. Every detail screams luxury and sophistication.",
    rating: 5,
    avatar: "AS",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Marcus Chen",
    role: "Tech Entrepreneur",
    content: "Premium Store redefined my expectations. The service is impeccable and products are phenomenal.",
    rating: 5,
    avatar: "MC",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Isabella Rodriguez",
    role: "Creative Director",
    content: "I&apos;ve never experienced such attention to detail. This is luxury shopping at its finest.",
    rating: 5,
    avatar: "IR",
    gradient: "from-rose-500 to-orange-500"
  }
];

const stats = [
  { number: "25K+", label: "Premium Members", icon: Users },
  { number: "1,500+", label: "Luxury Products", icon: Award },
  { number: "50+", label: "Countries", icon: Globe },
  { number: "99.9%", label: "Satisfaction", icon: Star }
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-32 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400 via-red-500 to-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-br from-yellow-400 via-green-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-6000"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-32 left-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <div className="floating">
            <div className="inline-flex items-center space-x-2 px-6 py-3 glass-morphism rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold gradient-text">Welcome to Premium Excellence</span>
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-poppins mb-8 gradient-text leading-tight">
              Premium Store
            </h1>
          </div>
          
          <p className="text-xl md:text-3xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Discover extraordinary luxury products crafted with precision and designed for the 
            <span className="font-semibold gradient-text"> elite lifestyle</span>. 
            Your journey to premium excellence starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link href="/products">
              <button className="group relative px-12 py-5 premium-button text-white rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl">
                <span className="relative z-10 flex items-center gap-3">
                  Explore Collection
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </Link>
            
            <Link href="/dashboard/add-product">
              <button className="px-12 py-5 glass-morphism border-2 border-transparent hover:border-purple-500/50 text-gray-700 dark:text-gray-300 rounded-3xl font-bold text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                <span className="flex items-center gap-3">
                  <Crown className="w-6 h-6 group-hover:text-purple-500 transition-colors" />
                  Become Seller
                </span>
              </button>
            </Link>
          </div>

          {/* Premium Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="glass-morphism rounded-3xl p-6 md:p-8 text-center premium-card group">
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-blue-500 group-hover:text-purple-500 transition-colors duration-300" />
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 glass-morphism rounded-full mb-6">
              <Diamond className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Why Choose Excellence</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-poppins mb-8 gradient-text">
              Luxury Redefined
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              We don&apos;t just sell products; we curate experiences that exceed the highest expectations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="premium-card glass-morphism rounded-3xl p-8 text-center h-full transition-all duration-700 hover:scale-105 hover:shadow-2xl">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 dark:from-purple-900/40 dark:via-blue-900/40 dark:to-pink-900/40"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 glass-morphism rounded-full mb-6">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Client Stories</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-poppins mb-8 gradient-text">
              Luxury Experiences
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="fade-in-up" style={{animationDelay: `${index * 0.3}s`}}>
                <div className="premium-card glass-morphism rounded-3xl p-8 h-full">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current mr-1" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-8 italic font-light leading-relaxed">
  {`"${testimonial.content}"`}
</blockquote>

                  <div className="flex items-center">
                    <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-gray-800 dark:text-white">{testimonial.name}</div>
                      <div className="text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="glass-morphism rounded-3xl p-12 md:p-16 premium-card">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 mx-auto shadow-2xl">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-8 gradient-text">
              Join the Elite
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
              Experience luxury like never before. Join thousands of discerning customers who demand nothing but the finest.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products">
                <button className="premium-button px-12 py-5 text-white rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl">
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Start Shopping Now
                  </span>
                </button>
              </Link>
              <Link href="/register">
                <button className="px-12 py-5 glass-morphism border-2 border-transparent hover:border-purple-500/50 text-gray-700 dark:text-gray-300 rounded-3xl font-bold text-xl transition-all duration-500 hover:scale-105">
                  <span className="flex items-center gap-3">
                    <Crown className="w-6 h-6" />
                    Become Member
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}