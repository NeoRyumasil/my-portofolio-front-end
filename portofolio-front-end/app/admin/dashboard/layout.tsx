import React from 'react';
import Sidebar from '@/components/sections/admin/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex min-h-screen bg-[#F0F9FF] dark:bg-[#000000] transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 ml-72 pt-28 pb-12 px-10">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}