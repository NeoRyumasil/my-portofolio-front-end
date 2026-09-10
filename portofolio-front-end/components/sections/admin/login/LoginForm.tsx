"use client";

import React, { useState } from 'react';
import { User, Lock, LogIn, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const json = await response.json();

      if (response.ok && json.success) {
        router.push('/admin/dashboard');
      } else {
        setErrorMsg(json.message || 'Gagal melakukan login');
      }

    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('Terjadi kesalahan pada server. Coba lagi nanti.');

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#121212] p-8 md:p-10 rounded-[40px] shadow-2xl shadow-[#0F172A]/10 dark:shadow-[#E11D48]/10 border border-[#7DD3FC]/30 dark:border-[#991B1B]/30">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight mb-2">
          Admin Portal.
        </h1>
        <p className="text-[#0F172A]/70 dark:text-white/70">
          Welcome back. Please sign in to continue.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        
        {/* Error */}
        {errorMsg && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-bold text-center border border-red-200 dark:border-red-800">
            {errorMsg}
          </div>
        )}

        {/* Input Username */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#0369A1] dark:text-[#F43F5E]">
              <User size={20} />
            </div>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF] dark:bg-[#000000] border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300 disabled:opacity-50"
              placeholder="admin_alvin"
              required
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#0369A1] dark:text-[#F43F5E]">
              <Lock size={20} />
            </div>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF] dark:bg-[#000000] border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300 disabled:opacity-50"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Tombol Login */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full group flex justify-center items-center gap-3 bg-[#0369A1] dark:bg-[#E11D48] text-white py-4 rounded-2xl font-bold font-space text-lg shadow-xl shadow-[#0369A1]/20 dark:shadow-[#E11D48]/20 hover:bg-[#0369A1]/90 dark:hover:bg-[#F43F5E] hover:-translate-y-1 transition-all duration-300 mt-8 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
          )}
          {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
        </button>
      </form>
    </div>
  );
}