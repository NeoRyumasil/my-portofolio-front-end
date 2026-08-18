import React from 'react';

export default function About() {
  return (
    <section id="about" className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-10">
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#7DD3FC]/20 text-[#0369A1] px-3 py-1.5 rounded-full text-xs font-bold tracking-widest font-space">
          <span className="w-2 h-2 rounded-full bg-[#0369A1]"></span>
          IT STUDENT & DEVELOPER
        </div>
        <h1 className="text-6xl font-extrabold text-[#0F172A] leading-tight">
          Crafting <span className="text-[#0369A1] relative">
            Digital
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#7DD3FC]" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round"/>
            </svg>
          </span><br/>
          <span className="text-[#0369A1]">Sanctuaries</span><br/>
          Through Code.
        </h1>
        <p className="text-lg text-[#0F172A]/70 max-w-lg leading-relaxed">
          Hi, I'm Muhammad Alvin Ababil. I blend technical precision with ethereal design principles to build robust applications and seamless user experiences. Passionate about soft-tech aesthetics and clean architecture.
        </p>
        <div className="flex items-center gap-4 pt-4 font-space">
          <a href="#works" className="bg-[#0369A1] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#0369A1]/20 hover:bg-[#0369A1]/90 transition">
            VIEW PROJECTS
          </a>
          <a href="#contact" className="bg-white text-[#0369A1] border border-[#0369A1] px-8 py-3 rounded-full font-bold hover:bg-[#F0F9FF] transition">
            CONTACT ME
          </a>
        </div>
      </div>
      <div className="flex-1 flex justify-end">
        <div className="w-full max-w-md aspect-square bg-white rounded-[40px] shadow-2xl shadow-[#0F172A]/5 p-4 border border-[#7DD3FC]/20">
          <div className="w-full h-full bg-[#F0F9FF] rounded-[30px] overflow-hidden flex items-center justify-center relative bg-[url('/image_73338d.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}