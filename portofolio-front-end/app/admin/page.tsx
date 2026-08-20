import React from 'react';
import Background from '@/components/sections/admin/Background';
import LoginForm from '@/components/sections/admin/Login/LoginForm';

export const metadata = {
  title: 'Admin Login',
  description: 'Secure admin portal for Alvin.dev',
};

export default function AdminPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#F0F9FF] dark:bg-[#000000] p-6 pt-24 transition-colors duration-300 overflow-hidden">
      
      <Background />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <LoginForm />
      </div>
      
    </main>
  );
}