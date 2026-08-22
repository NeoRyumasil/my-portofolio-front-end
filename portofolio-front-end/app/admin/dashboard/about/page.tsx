import React from 'react';
import AboutForm from '@/components/sections/admin/dashboard/about/AboutForm';

export const metadata = {
  title: 'About Profile',
};

export default function EditAboutPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="space-y-2 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-6">
        <h1 className="text-4xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          About & Profile
        </h1>
        <p className="text-[#0F172A]/70 dark:text-white/70 font-medium">
          Manage your personal information, hero section tagline, and CV link.
        </p>
      </div>

      {/* Form Component */}
      <AboutForm />
      
    </div>
  );
}