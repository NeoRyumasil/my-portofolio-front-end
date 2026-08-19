import React from 'react';
import { Bot, Languages, Cuboid } from 'lucide-react';

export default function Experience() {
  return (
    <section id="works" className="space-y-12 pt-20 transition-colors duration-300">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-[#0F172A] dark:text-[#E11D48] font-space">Selected Works</h2>
          <p className="text-[#0F172A]/70 dark:text-white/70">A collection of digital experiences designed with purpose and precision.</p>
        </div>
        <a href="#" className="text-[#0369A1] dark:text-[#F43F5E] font-bold text-sm hover:underline hidden md:block font-space">VIEW ALL →</a>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="group bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/50 dark:hover:border-[#F43F5E]/50 transition-all duration-300 cursor-pointer">
          <div className="h-48 bg-[#F0F9FF] dark:bg-[#000000] flex items-center justify-center text-[#7DD3FC] dark:text-[#991B1B] relative border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-colors duration-300 group-hover:bg-[#E0F2FE] dark:group-hover:bg-[#991B1B]/20">
            <Bot size={64} className="absolute bottom-4 right-4 opacity-50 text-[#0369A1] dark:text-[#F43F5E] transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-2" />
          </div>
          <div className="p-8 space-y-4">
            <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-space transition-colors duration-300 group-hover:text-[#0369A1] dark:group-hover:text-[#F43F5E]">AI Chat Assistant</h3>
            <p className="text-sm text-[#0F172A]/70 dark:text-white/70 line-clamp-3">An intelligent conversational agent built with modern LLM integrations...</p>
            <div className="flex gap-2 pt-2 font-space">
              <span className="bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] text-xs font-bold px-3 py-1 rounded-full">Next.js</span>
              <span className="bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] text-xs font-bold px-3 py-1 rounded-full">Python</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/50 dark:hover:border-[#F43F5E]/50 transition-all duration-300 cursor-pointer">
          <div className="h-48 bg-[#F0F9FF] dark:bg-[#000000] flex items-center justify-center text-[#7DD3FC] dark:text-[#991B1B] relative border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-colors duration-300 group-hover:bg-[#E0F2FE] dark:group-hover:bg-[#991B1B]/20">
            <Languages size={64} className="absolute bottom-4 right-4 opacity-50 text-[#0369A1] dark:text-[#F43F5E] transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-2" />
          </div>
          <div className="p-8 space-y-4">
            <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-space transition-colors duration-300 group-hover:text-[#0369A1] dark:group-hover:text-[#F43F5E]">CV Sign Language Translator</h3>
            <p className="text-sm text-[#0F172A]/70 dark:text-white/70 line-clamp-3">A computer vision application utilizing machine learning models to interpret sign language...</p>
            <div className="flex gap-2 pt-2 font-space">
              <span className="bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] text-xs font-bold px-3 py-1 rounded-full">Python</span>
              <span className="bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] text-xs font-bold px-3 py-1 rounded-full">OpenCV</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/50 dark:hover:border-[#F43F5E]/50 transition-all duration-300 cursor-pointer">
          <div className="h-48 bg-[#F0F9FF] dark:bg-[#000000] flex items-center justify-center text-[#7DD3FC] dark:text-[#991B1B] relative border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-colors duration-300 group-hover:bg-[#E0F2FE] dark:group-hover:bg-[#991B1B]/20">
            <Cuboid size={64} className="absolute bottom-4 right-4 opacity-50 text-[#0369A1] dark:text-[#F43F5E] transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-2" />
          </div>
          <div className="p-8 space-y-4">
            <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-space transition-colors duration-300 group-hover:text-[#0369A1] dark:group-hover:text-[#F43F5E]">Ethereal Realm</h3>
            <p className="text-sm text-[#0F172A]/70 dark:text-white/70 line-clamp-3">A visually striking, interactive 3D web experience exploring abstract landscapes and soft-tech aesthetics.</p>
            <div className="flex gap-2 pt-2 font-space">
              <span className="bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] text-xs font-bold px-3 py-1 rounded-full">Unity</span>
              <span className="bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] text-xs font-bold px-3 py-1 rounded-full">WebGL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}