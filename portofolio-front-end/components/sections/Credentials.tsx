import React from 'react';
import { Award, BadgeCheck, Medal } from 'lucide-react';

export default function Credentials() {
  return (
    <section id="credentials" className="text-center space-y-12 pt-20">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-[#0F172A]">Professional Credentials</h2>
        <p className="text-[#0F172A]/70">Certifications and official recognition of my skills.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-[32px] shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-[#7DD3FC]/20 rounded-full flex items-center justify-center text-[#0369A1] mb-2">
            <Award size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">Azure AI 900 Fundamentals</h3>
          <p className="text-sm text-[#0F172A]/50 font-space">Microsoft</p>
        </div>
        
        <div className="bg-white p-8 rounded-[32px] shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-[#7DD3FC]/20 rounded-full flex items-center justify-center text-[#0369A1] mb-2">
            <BadgeCheck size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">Cloud Architect Basics</h3>
          <p className="text-sm text-[#0F172A]/50 font-space">Various</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-[#7DD3FC]/20 rounded-full flex items-center justify-center text-[#0369A1] mb-2">
            <Medal size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">SoftDev Mastery</h3>
          <p className="text-sm text-[#0F172A]/50 font-space">Tech Institute</p>
        </div>
      </div>
    </section>
  );
}