import React from 'react';
import WebProject from '@/components/sections/admin/dashboard/webProject/WebProject';

export const metadata = {
  title: 'Web & App Projects',
};

export default function WebProjectsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="space-y-2 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-6">
        <h1 className="text-4xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Web & App Projects
        </h1>
      </div>

      {/* CRUD Manager Component */}
      <WebProject />
      
    </div>
  );
}