"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, User, Code, GraduationCap, Briefcase, Gamepad2, Award, Phone, LogOut, UserCog } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { title: 'Overview', icon: <LayoutDashboard size={20} />, link: '/admin/dashboard' },
    { title: 'About & Profile', icon: <User size={20} />, link: '/admin/dashboard/about' },
    { title: 'Tech Arsenal', icon: <Code size={20} />, link: '/admin/dashboard/expertise' },
    { title: 'My Journey', icon: <GraduationCap size={20} />, link: '/admin/dashboard/journey' },
    { title: 'Web & App', icon: <Briefcase size={20} />, link: '/admin/dashboard/web-projects' },
    { title: 'Game Projects', icon: <Gamepad2 size={20} />, link: '/admin/dashboard/game-projects' },
    { title: 'Credentials', icon: <Award size={20} />, link: '/admin/dashboard/credentials' },
    { title: 'Contact & Socials', icon: <Phone size={20} />, link: '/admin/dashboard/contact' },
    { title: 'Account Settings', icon: <UserCog size={20} />, link: '/admin/dashboard/account' }
  ];

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    
    localStorage.removeItem('token');

    document.cookie = 'token=; path=/; max-age=0; SameSite=Strict';

    router.push('/admin');
  };

  return (
    <aside className="w-72 fixed left-0 top-0 h-screen bg-white dark:bg-[#121212] border-r border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pt-28 pb-8 px-6 flex flex-col shadow-xl z-40 transition-colors duration-300">
      
      <div className="text-xs font-bold font-space text-[#0F172A]/50 dark:text-white/50 tracking-widest uppercase mb-4 ml-2">
        Management
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.link;
          
          return (
            <Link 
              key={index} 
              href={item.link}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-space font-bold transition-all duration-300 ${
                isActive 
                  ? 'bg-[#0369A1] dark:bg-[#E11D48] text-white shadow-md' 
                  : 'text-[#0F172A]/70 dark:text-white/70 hover:bg-[#F0F9FF] dark:hover:bg-[#991B1B]/20 hover:text-[#0369A1] dark:hover:text-[#F43F5E]'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Tombol Logout */}
      <div className="pt-6 border-t border-[#7DD3FC]/20 dark:border-[#991B1B]/30">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-space font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300 text-left"
        >
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>

    </aside>
  );
}