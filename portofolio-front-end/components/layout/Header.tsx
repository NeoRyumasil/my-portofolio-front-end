import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-[#F0F9FF]/80 backdrop-blur-md z-50 shadow-sm border-b border-[#7DD3FC]/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-[#0F172A]">ALVIN.DEV</div>
        <nav className="hidden md:flex space-x-8 text-sm font-semibold text-[#0F172A]/70">
          <a href="#about" className="text-[#0369A1] border-b-2 border-[#0369A1] pb-1">ABOUT</a>
          <a href="#expertise" className="hover:text-[#0369A1] transition">EXPERTISE</a>
          <a href="#journey" className="hover:text-[#0369A1] transition">JOURNEY</a>
          <a href="#works" className="hover:text-[#0369A1] transition">WORKS</a>
          <a href="#credentials" className="hover:text-[#0369A1] transition">CREDENTIALS</a>
          <a href="#contact" className="hover:text-[#0369A1] transition">CONTACT</a>
        </nav>
        <button className="bg-[#0369A1] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-[#0369A1]/90 transition font-space">
          HIRE ME
        </button>
      </div>
    </header>
  );
}