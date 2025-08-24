'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  User, 
  LogOut, 
  Sparkles, 
  Zap,
  Home,
  Package,
  LayoutDashboard,
  UserPlus,
  LogIn,
  Settings,
  Bell,
  Shield,
  CreditCard
} from 'lucide-react';

// ✅ allowed colors
type ColorOption = "blue" | "purple" | "green" | "yellow";

// ✅ mobile nav items type-safe করা হলো
interface MobileNavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  color: ColorOption;
  badge?: number;
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      await signOut({ redirect: false });
      router.push('/'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActivePath = (path: string): boolean => {
    return pathname === path;
  };

  // ✅ mobile nav items list
  const mobileNavItems: MobileNavItem[] = [
    { href: '/', icon: Home, label: 'Home', color: 'blue' },
    { href: '/products', icon: Package, label: 'Products', color: 'purple' },
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'green' },
    { href: '/notifications', icon: Bell, label: 'Alerts', color: 'yellow', badge: 3 }
  ];

  // ✅ color function type-safe
  const getColorClasses = (color: ColorOption, isActive: boolean = false) => {
    const colors: Record<ColorOption, { text: string; gradient: string }> = {
      blue: {
        text: isActive ? "text-blue-500" : "group-hover:text-blue-500",
        gradient: "from-blue-600 to-purple-600",
      },
      purple: {
        text: isActive ? "text-purple-500" : "group-hover:text-purple-500",
        gradient: "from-purple-600 to-pink-600",
      },
      green: {
        text: isActive ? "text-green-500" : "group-hover:text-green-500",
        gradient: "from-green-600 to-blue-600",
      },
      yellow: {
        text: isActive ? "text-yellow-500" : "group-hover:text-yellow-500",
        gradient: "from-yellow-600 to-orange-600",
      },
    };

    return colors[color];
  };

  // ✅ তোমার বাকি কোড untouched রাখা হলো
  if (status === 'loading') {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="w-40 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Top Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen 
          ? 'glass-morphism shadow-2xl shadow-blue-500/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Premium Logo */}
            <Link href="/" className="flex items-center space-x-3 group z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-pink-400 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-2xl font-poppins gradient-text">
                  Premium Store
                </span>
                <div className="flex items-center space-x-1 mt-0.5">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">LUXURY</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`relative flex items-center space-x-2 font-medium transition-all duration-300 group ${
                  isActivePath('/') 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text'
                }`}
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Home</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                  isActivePath('/') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>

              <Link 
                href="/products" 
                className={`relative flex items-center space-x-2 font-medium transition-all duration-300 group ${
                  isActivePath('/products') 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text'
                }`}
              >
                <Package className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Products</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ${
                  isActivePath('/products') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              {session ? (
                <div className="flex items-center space-x-6">
                  <Link 
                    href="/dashboard" 
                    className={`relative flex items-center space-x-2 font-medium transition-all duration-300 group ${
                      isActivePath('/dashboard') 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-slate-700 dark:text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:bg-clip-text'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Dashboard</span>
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-600 to-blue-600 transition-all duration-300 ${
                      isActivePath('/dashboard') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-3 px-4 py-2 rounded-2xl glass-morphism hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {session.user?.name?.split(' ')[0] || 'User'}
                      </span>
                    </button>
                    
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-72 glass-morphism rounded-2xl shadow-2xl p-4 fade-in-up">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                              <User className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-slate-800 dark:text-white">
                                {session.user?.name || 'User'}
                              </p>
                              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                {session.user?.email || 'user@example.com'}
                              </p>
                            </div>
                          </div>
                          <hr className="border-slate-200/20 dark:border-slate-700/20" />
                          <div className="space-y-1">
                            <Link href="/settings" className="w-full flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium group">
                              <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                              <span>Settings</span>
                            </Link>
                            <Link href="/billing" className="w-full flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-green-50/50 dark:hover:bg-green-900/20 rounded-xl transition-colors font-medium">
                              <CreditCard className="w-4 h-4" />
                              <span>Billing</span>
                            </Link>
                            <Link href="/security" className="w-full flex items-center space-x-3 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 rounded-xl transition-colors font-medium">
                              <Shield className="w-4 h-4" />
                              <span>Security</span>
                            </Link>
                          </div>
                          <hr className="border-slate-200/20 dark:border-slate-700/20" />
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium group"
                          >
                            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/login" 
                    className="flex items-center space-x-2 font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
                  >
                    <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Sign In</span>
                  </Link>
                  <Link href="/register">
                    <button className="premium-button px-6 py-3 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg flex items-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Get Started</span>
                    </button>
                  </Link>
                </div>
              )}
              
              <ThemeSwitcher />
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center space-x-3">
              <ThemeSwitcher />
              {/* Mobile Menu Button - Only show when not logged in */}
              {!session && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-3 rounded-2xl glass-morphism text-slate-700 dark:text-slate-300 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}
              
              {/* Mobile Profile Button - Only show when logged in */}
              {session && (
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative p-2 rounded-2xl glass-morphism hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white dark:border-gray-900"></div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu - Only show when not logged in */}
          {isMobileMenuOpen && !session && (
            <div className="md:hidden glass-morphism rounded-3xl mt-4 p-6 shadow-2xl fade-in-up">
              <div className="flex flex-col space-y-6">
                <Link 
                  href="/products" 
                  className="flex items-center space-x-3 font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors" 
                  onClick={closeMobileMenu}
                >
                  <Package className="w-5 h-5" />
                  <span>Products</span>
                </Link>
                
                <Link 
                  href="/login" 
                  className="flex items-center space-x-3 font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                  onClick={closeMobileMenu}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
                <Link href="/register" onClick={closeMobileMenu}>
                  <button className="w-full premium-button px-6 py-3 text-white rounded-2xl font-semibold flex items-center justify-center space-x-2">
                    <UserPlus className="w-5 h-5" />
                    <span>Get Started</span>
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Profile Dropdown - Only show when logged in */}
          {isProfileOpen && session && (
            <div className="md:hidden glass-morphism rounded-3xl mt-4 p-6 shadow-2xl fade-in-up">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {session.user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
                <hr className="border-slate-200/20 dark:border-slate-700/20" />
                <div className="space-y-2">
                  <Link href="/settings" className="flex items-center space-x-3 p-3 text-slate-600 dark:text-slate-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-xl transition-colors font-medium">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                  <Link href="/billing" className="flex items-center space-x-3 p-3 text-slate-600 dark:text-slate-300 hover:bg-green-50/50 dark:hover:bg-green-900/20 rounded-xl transition-colors font-medium">
                    <CreditCard className="w-5 h-5" />
                    <span>Billing</span>
                  </Link>
                  <Link href="/security" className="flex items-center space-x-3 p-3 text-slate-600 dark:text-slate-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 rounded-xl transition-colors font-medium">
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </Link>
                </div>
                <hr className="border-slate-200/20 dark:border-slate-700/20" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Mobile Navigation - Only show when logged in */}
      {session && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
          <div className="glass-morphism border-t border-white/10 backdrop-blur-xl">
            <div className="grid grid-cols-4 gap-1 px-4 py-3">
              {mobileNavItems.map((item) => {
                const isActive = isActivePath(item.href);
                const colorClasses = getColorClasses(item.color, isActive);
                const Icon = item.icon;

                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="flex flex-col items-center space-y-1 p-2 rounded-2xl hover:bg-white/10 transition-all duration-300 group relative"
                  >
                    <div className="relative">
                      <Icon className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 ${
                        isActive 
                          ? colorClasses.text.replace('group-hover:', '') 
                          : `text-slate-600 dark:text-slate-300 ${colorClasses.text}`
                      }`} />
                      {item.badge && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-xs text-white font-bold">{item.badge}</span>
                        </div>
                      )}
                    </div>
                    <span className={`text-xs font-medium transition-all duration-300 ${
                      isActive 
                        ? colorClasses.text.replace('group-hover:', '') 
                        : `text-slate-600 dark:text-slate-300 ${colorClasses.text}`
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for bottom navigation */}
      {session && <div className="h-20 md:h-0"></div>}

      {/* Click outside handler for mobile profile */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .glass-morphism {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .premium-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .premium-button:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #764ba2, #f093fb);
        }
      `}</style>
    </>
  );
};

export default Navbar;
