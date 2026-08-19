import React from 'react';
import { Briefcase, Mail, XIcon } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="border-t border-[#7DD3FC]/20 dark:border-[#991B1B]/30 bg-white dark:bg-[#000000] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="text-3xl font-black tracking-tighter text-[#0F172A] dark:text-white dark:font-space">Muhammad Alvin Ababil</div>
          <p className="text-sm text-[#0F172A]/50 dark:text-white/50 dark:font-hanken">© 2026 Muhammad Alvin Ababil. All Rights Reserved.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-[#F0F9FF] dark:bg-[#E11D48]/10 flex items-center justify-center text-[#0369A1] dark:text-[#F43F5E] hover:bg-[#7DD3FC] dark:hover:bg-[#E11D48] hover:text-white dark:hover:text-white transition-all duration-300">
            <Briefcase size={18} />
          </a>

          <a href="#" className="w-10 h-10 rounded-full bg-[#F0F9FF] dark:bg-[#E11D48]/10 flex items-center justify-center text-[#0369A1] dark:text-[#F43F5E] hover:bg-[#7DD3FC] dark:hover:bg-[#E11D48] hover:text-white dark:hover:text-white transition-all duration-300">
            <SiGithub size={18} />
          </a>

          <a href="#" className="w-10 h-10 rounded-full bg-[#F0F9FF] dark:bg-[#E11D48]/10 flex items-center justify-center text-[#0369A1] dark:text-[#F43F5E] hover:bg-[#7DD3FC] dark:hover:bg-[#E11D48] hover:text-white dark:hover:text-white transition-all duration-300">
            <Mail size={18} />
          </a>

          <a href="#" className="w-10 h-10 rounded-full bg-[#F0F9FF] dark:bg-[#E11D48]/10 flex items-center justify-center text-[#0369A1] dark:text-[#F43F5E] hover:bg-[#7DD3FC] dark:hover:bg-[#E11D48] hover:text-white dark:hover:text-white transition-all duration-300">
            <XIcon size={18} />
          </a>

        </div>
      </div>
    </footer>
  );
}