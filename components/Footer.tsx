// Enhanced Footer
import Link from 'next/link';
import { 
  Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin, 
  Instagram, Facebook, Crown, Sparkles, Award
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
      <div className="absolute inset-0 glass-morphism"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Premium Company Info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-3xl font-poppins gradient-text">Premium Store</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">LUXURY EXCELLENCE</span>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
              Delivering unparalleled luxury experiences with the world&apos;s finest products. 
              Your gateway to premium lifestyle since 2024.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "#", color: "hover:text-gray-800 dark:hover:text-gray-200" },
                { icon: Twitter, href: "#", color: "hover:text-blue-500" },
                { icon: Instagram, href: "#", color: "hover:text-pink-500" },
                { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                { icon: Facebook, href: "#", color: "hover:text-blue-700" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className={`w-12 h-12 glass-morphism rounded-2xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Explore
            </h4>
            <div className="space-y-4">
              {[
                { name: 'Premium Products', href: '/products' },
                { name: 'Luxury Collections', href: '/collections' },
                { name: 'Elite Membership', href: '/membership' },
                { name: 'VIP Support', href: '/support' }
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="block text-gray-600 dark:text-gray-400 hover:gradient-text transition-all duration-300 font-medium hover:translate-x-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Premium Support */}
          <div>
            <h4 className="font-bold text-xl mb-6">Premium Support</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">premium@store.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">+1 (555) VIP-LUXURY</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">123 Luxury Avenue, Elite City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>&copy; {new Date().getFullYear()} Premium Store. Crafted with</span>
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              <span>for luxury enthusiasts worldwide.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:gradient-text transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:gradient-text transition-colors font-medium">
                Terms of Service
              </Link>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-600 dark:text-yellow-400 font-bold">PREMIUM CERTIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;