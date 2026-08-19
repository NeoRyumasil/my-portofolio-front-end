import React from 'react';
import { Award, BadgeCheck, Medal } from 'lucide-react';

export default function Credentials() {
  return (
    <section id="credentials" className="text-center space-y-12 pt-20 transition-colors duration-300">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-[#0F172A] dark:text-[#E11D48] font-space">Professional Credentials</h2>
        <p className="text-[#0F172A]/70 dark:text-white/70">Certifications and official recognition of my skills.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="group bg-white dark:bg-[#121212] p-8 rounded-[32px] shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 flex flex-col items-center gap-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#7DD3FC]/20 dark:hover:shadow-[#E11D48]/20 hover:border-[#7DD3FC] dark:hover:border-[#F43F5E] transition-all duration-300 cursor-pointer">
          <div className="w-16 h-16 bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 rounded-full flex items-center justify-center text-[#0369A1] dark:text-[#F43F5E] mb-2 transition-all duration-300 group-hover:bg-[#0369A1] dark:group-hover:bg-[#E11D48] group-hover:text-white group-hover:scale-110">
            <Award size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-white font-space">Azure AI 900 Fundamentals</h3>
          <p className="text-sm text-[#0F172A]/50 dark:text-white/50 font-space">Microsoft</p>
        </div>
        
        <div className="group bg-white dark:bg-[#121212] p-8 rounded-[32px] shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 flex flex-col items-center gap-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#7DD3FC]/20 dark:hover:shadow-[#E11D48]/20 hover:border-[#7DD3FC] dark:hover:border-[#F43F5E] transition-all duration-300 cursor-pointer">
          <div className="w-16 h-16 bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 rounded-full flex items-center justify-center text-[#0369A1] dark:text-[#F43F5E] mb-2 transition-all duration-300 group-hover:bg-[#0369A1] dark:group-hover:bg-[#E11D48] group-hover:text-white group-hover:scale-110">
            <BadgeCheck size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-white font-space">Cloud Architect Basics</h3>
          <p className="text-sm text-[#0F172A]/50 dark:text-white/50 font-space">Various</p>
        </div>

        <div className="group bg-white dark:bg-[#121212] p-8 rounded-[32px] shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 flex flex-col items-center gap-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#7DD3FC]/20 dark:hover:shadow-[#E11D48]/20 hover:border-[#7DD3FC] dark:hover:border-[#F43F5E] transition-all duration-300 cursor-pointer">
          <div className="w-16 h-16 bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 rounded-full flex items-center justify-center text-[#0369A1] dark:text-[#F43F5E] mb-2 transition-all duration-300 group-hover:bg-[#0369A1] dark:group-hover:bg-[#E11D48] group-hover:text-white group-hover:scale-110">
            <Medal size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-white font-space">SoftDev Mastery</h3>
          <p className="text-sm text-[#0F172A]/50 dark:text-white/50 font-space">Tech Institute</p>
        </div>
      </div>
    </section>
  );
}