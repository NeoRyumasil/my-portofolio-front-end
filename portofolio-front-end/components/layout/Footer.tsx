"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  const isDashboardPage = pathname?.includes('/admin/dashboard');

  return (
    <footer 
      className={`border-t border-[#7DD3FC]/20 dark:border-[#991B1B]/30 bg-white dark:bg-[#000000] transition-all duration-300 ${
        isDashboardPage ? 'ml-72' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="text-3xl font-black tracking-tighter text-[#0F172A] dark:text-white dark:font-space">
            Muhammad Alvin Ababil
          </div>
          <p className="text-sm text-[#0F172A]/50 dark:text-white/50 dark:font-hanken">
            © 2026 Muhammad Alvin Ababil. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}