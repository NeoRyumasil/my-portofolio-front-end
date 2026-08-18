import React from 'react';
import { Briefcase, GitFork, Mail, XIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#7DD3FC]/20 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="text-3xl font-black tracking-tighter text-[#0F172A]">ALVIN.DEV</div>
          <p className="text-sm text-[#0F172A]/50">© 2024 Muhammad Alvin Ababil. Built with precision and passion.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[#0369A1] hover:bg-[#7DD3FC] hover:text-white transition">
            <Briefcase size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[#0369A1] hover:bg-[#7DD3FC] hover:text-white transition">
            <GitFork size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[#0369A1] hover:bg-[#7DD3FC] hover:text-white transition">
            <Mail size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[#0369A1] hover:bg-[#7DD3FC] hover:text-white transition">
            <XIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}