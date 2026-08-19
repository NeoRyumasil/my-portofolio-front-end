import React from 'react';

export default function About() {
  return (
    <section id="about" className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-10 transition-colors duration-300">
      <div className="flex-1 space-y-6">

        <div className="inline-flex items-center gap-2 bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] px-3 py-1.5 rounded-full text-xs font-bold tracking-widest font-space">
          <span className="w-2 h-2 rounded-full bg-[#0369A1] dark:bg-[#F43F5E]"></span>
          Web Backend and Game Developer
        </div>

        <h1 className="text-6xl font-extrabold text-[#0F172A] dark:text-white leading-tight font-space">
          Crafting <span className="text-[#0369A1] dark:text-[#E11D48]">Digital</span><br/>
          <span className="text-[#0369A1] dark:text-[#E11D48]">Sanctuaries</span><br/>
          Through Code.
        </h1>

        <p className="text-lg text-[#0F172A]/70 dark:text-white/70 max-w-lg leading-relaxed">
          Hi, I'm Muhammad Alvin Ababil. I blend technical precision with ethereal design principles to build robust applications and seamless user experiences. Passionate about soft-tech aesthetics and clean architecture.
        </p>

        <div className="flex items-center gap-4 pt-4 font-space">
          <a href="#works" className="bg-[#0369A1] dark:bg-[#E11D48] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#0369A1]/20 dark:shadow-[#E11D48]/20 hover:bg-[#0369A1]/90 dark:hover:bg-[#E11D48]/90 hover:-translate-y-1 transition-all duration-300">
            VIEW PROJECTS
          </a>

          <a href="#contact" className="bg-white dark:bg-[#121212] text-[#0369A1] dark:text-[#F43F5E] border border-[#0369A1] dark:border-[#F43F5E] px-8 py-3 rounded-full font-bold hover:bg-[#F0F9FF] dark:hover:bg-[#991B1B]/20 hover:-translate-y-1 transition-all duration-300">
            CONTACT ME
          </a>

        </div>
      </div>

      {/* Style */}
      <div className="flex-1 flex justify-end">
        <div className="group w-full max-w-md aspect-square bg-white dark:bg-[#121212] rounded-[40px] shadow-2xl shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 p-4 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 hover:border-[#7DD3FC]/60 dark:hover:border-[#F43F5E]/60 hover:shadow-[#7DD3FC]/20 dark:hover:shadow-[#F43F5E]/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
          <div className="w-full h-full bg-[#F0F9FF] dark:bg-[#000000] rounded-[30px] overflow-hidden flex items-center justify-center relative bg-[url('/image_73338d.png')] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]">
            <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.6))] transition-opacity duration-500 group-hover:opacity-30"></div>
          </div>
        </div>
      </div>

    </section>
  );
}