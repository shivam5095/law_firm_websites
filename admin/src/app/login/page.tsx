'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { adminApi, setAuthToken, getAuthToken } from '@/lib/api';
import { Loader2, Scale } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Already authenticated check
    if (getAuthToken()) {
      router.replace('/dashboard');
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await adminApi.post('/auth/login', data);
      
      if (response.success && response.data.token) {
        setAuthToken(response.data.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_user', JSON.stringify(response.data.user));
        }
        router.replace('/dashboard');
      } else {
        setErrorMsg('Authentication failed. Token not returned.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-navy-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500 via-transparent to-transparent"></div>
      
      <div className="w-full max-w-md bg-white border border-charcoal-100 p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-navy-800 p-3 rounded-full text-gold-500 mb-4 shadow-md">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-navy-800 tracking-tight font-medium text-center">
            Maurya Law Chambers
          </h1>
          <p className="text-sm text-charcoal-500 uppercase tracking-widest mt-1">
            Secure Admin Access
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 mb-6 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="admin@lawfirm.com"
              className={`w-full px-4 py-3 border rounded-none focus:outline-none focus:ring-1 transition-colors ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-charcoal-200 focus:ring-navy-700 focus:border-navy-700'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-2">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-none focus:outline-none focus:ring-1 transition-colors ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-charcoal-200 focus:ring-navy-700 focus:border-navy-700'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy-800 text-white font-medium py-3.5 hover:bg-navy-700 transition-colors tracking-wider uppercase text-sm flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin text-gold-400" />
                Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
