"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/misc/ThemeToggle';
import { ArrowLeft } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isProjectPage = pathname?.includes('/project');
  const isAdminPage = pathname?.includes('/admin');

  const [cvLink, setCvLink] = useState<string>('#');

  useEffect(() => {
    if (!isAdminPage) {
      const fetchProfile = async () => {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
          const response = await fetch(`${baseUrl}/api/profile`);
          const json = await response.json();
          
          if (json.success && json.data) {
            const profileData = Array.isArray(json.data) ? json.data[0] : json.data;
            if (profileData?.cvLink) {
              setCvLink(profileData.cvLink);
            }
          }
        } catch (error) {
          console.error("Gagal mengambil data CV:", error);
        }
      };

      fetchProfile();
    }
  }, [isAdminPage]);

  return (
    <header className="fixed top-0 w-full bg-[#F0F9FF]/80 dark:bg-[#000000]/80 backdrop-blur-md z-50 shadow-sm border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center gap-2">
        
        {isAdminPage ? (
          <Link href="/developer" className="inline-flex items-center gap-2 text-[#0369A1] dark:text-[#F43F5E] font-bold font-space text-sm hover:opacity-80 hover:-translate-x-1 transition-all shrink-0">
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        ) : (
          <Link href="/developer" className="text-lg md:text-2xl font-black tracking-tighter text-[#0F172A] dark:text-white dark:font-space hover:opacity-80 transition-opacity">
            MUHAMMAD ALVIN ABABIL
          </Link>
        )}

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

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <ThemeToggle />
          
          {!isAdminPage && (
            <a 
              href={cvLink}
              target={cvLink !== '#' ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="whitespace-nowrap bg-[#0369A1] dark:bg-[#E11D48] text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold shadow-md hover:bg-[#0369A1]/90 dark:hover:bg-[#F43F5E] transition font-space cursor-pointer inline-flex items-center justify-center"
            >
              GET MY CV
            </a>
          )}
        </div>   
      </div>
    </header>
  );
}