
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, Eye, EyeOff, Sparkles, Crown } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading('Creating your premium account...', { id: 'register-toast' });

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Welcome to Premium Store! Please sign in.', { id: 'register-toast' });
        router.push('/login');
      } else {
        throw new Error(data.message || 'Failed to register');
      }
    } catch (error: any) {
      toast.error(error.message, { id: 'register-toast' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-md w-full relative z-10 fade-in-up">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins gradient-text mb-4">
            Join Premium
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Create your account and unlock exclusive luxury experiences.
          </p>
        </div>
        
        <div className="glass-morphism rounded-3xl p-8 md:p-10 shadow-2xl premium-card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Input */}
            <div className="relative group">
              <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-14 pr-6 py-4 premium-input rounded-2xl text-lg font-medium placeholder-slate-400 focus:placeholder-slate-300 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 premium-input rounded-2xl text-lg font-medium placeholder-slate-400 focus:placeholder-slate-300 transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-4 premium-input rounded-2xl text-lg font-medium placeholder-slate-400 focus:placeholder-slate-300 transition-all"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit" 
              disabled={isLoading}
              className="w-full premium-button text-white py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Join Premium Store
                </span>
              )}
            </button>
          </form>
        </div>
        
        {/* Sign In Link */}
        <div className="text-center mt-8">
          <span className="text-slate-600 dark:text-slate-400">Already have an account? </span>
          <Link href="/login" className="font-bold gradient-text hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}