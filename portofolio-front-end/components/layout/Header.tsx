"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/misc/ThemeToggle';
import { ArrowLeft } from 'lucide-react'; // Tambahkan import icon ArrowLeft

export default function Header() {
  const pathname = usePathname();
  const isProjectPage = pathname?.includes('/project');
  
  // Tambahkan deteksi untuk halaman admin
  const isAdminPage = pathname?.includes('/admin');

  return (
    <header className="fixed top-0 w-full bg-[#F0F9FF]/80 dark:bg-[#000000]/80 backdrop-blur-md z-50 shadow-sm border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Render tulisan Back to Portfolio jika di halaman admin, jika tidak render Nama */}
        {isAdminPage ? (
          <Link href="/developer" className="inline-flex items-center gap-2 text-[#0369A1] dark:text-[#F43F5E] font-bold font-space text-sm hover:opacity-80 hover:-translate-x-1 transition-all">
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        ) : (
          <Link href="/developer" className="text-2xl font-black tracking-tighter text-[#0F172A] dark:text-white dark:font-space hover:opacity-80 transition-opacity">
            MUHAMMAD ALVIN ABABIL
          </Link>
        )}

        {/* Sembunyikan navigasi tengah sama sekali kalau di halaman admin */}
        {!isAdminPage && (
          <nav className="hidden md:flex space-x-8 text-sm font-semibold text-[#0F172A]/70 dark:text-[#ffffff]/60">
            {isProjectPage ? (
              <>
                <Link href="/developer" className="hover:text-[#0369A1] dark:hover:text-[#F43F5E] transition">HOME</Link>
                <a href="#web-projects" className="hover:text-[#0369A1] dark:hover:text-[#F43F5E] transition">WEB & APP</a>
                <a href="#game-projects" className="hover:text-[#0369A1] dark:hover:text-[#F43F5E] transition">GAME</a>
                <a href="#credentials" className="hover:text-[#0369A1] dark:hover:text-[#F43F5E] transition">CREDENTIALS</a>
              </>
            ) : (
              <>
                <a href="#about" className="text-[#0369A1] dark:text-[#F43F5E] border-b-2 border-[#0369A1] dark:border-[#F43F5E] pb-1">ABOUT</a>
                <a href="#expertise" className="hover:text-[#0369A1] dark:hover:text-[#F43F5E] transition">EXPERTISE</a>
                <a href="#journey" className="hover:text-[#0369A1] dark:hover:text-[#F43F5E] transition">JOURNEY</a>
                <a href="#works" className="hover:text-[#0369A1] dark:hover:text-[#F43F5E] transition">WORKS</a>
                <a href="#credentials" className="hover:text-[#0369A1] dark:hover:text-[#F43F5E] transition">CREDENTIALS</a>
                <a href="#contact" className="hover:text-[#0369A1] dark:hover:text-[#F43F5E] transition">CONTACT</a>
              </>
            )}
          </nav>
        )}

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Sembunyikan tombol CV kalau di halaman admin */}
          {!isAdminPage && (
            <button className="bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-[#0369A1]/90 dark:hover:bg-[#F43F5E] transition font-space">
              GET MY CV
            </button>
          )}
        </div>   
      </div>
    </header>
  );
}