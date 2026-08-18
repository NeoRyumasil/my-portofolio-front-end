import React from 'react';
import { Bot, Languages, Cuboid } from 'lucide-react';

export default function Experience() {
  return (
    <section id="works" className="space-y-12 pt-20">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-[#0F172A]">Selected Works</h2>
          <p className="text-[#0F172A]/70">A collection of digital experiences designed with purpose and precision.</p>
        </div>
        <a href="#" className="text-[#0369A1] font-bold text-sm hover:underline hidden md:block font-space">VIEW ALL →</a>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10">
          <div className="h-48 bg-[#F0F9FF] flex items-center justify-center text-[#7DD3FC] relative border-b border-[#7DD3FC]/20">
            <Bot size={64} className="absolute bottom-4 right-4 opacity-50 text-[#0369A1]" />
          </div>
          <div className="p-8 space-y-4">
            <h3 className="text-xl font-bold text-[#0F172A]">AI Chat Assistant</h3>
            <p className="text-sm text-[#0F172A]/70 line-clamp-3">An intelligent conversational agent built with modern LLM integrations...</p>
            <div className="flex gap-2 pt-2 font-space">
              <span className="bg-[#7DD3FC]/20 text-[#0369A1] text-xs font-bold px-3 py-1 rounded-full">Next.js</span>
              <span className="bg-[#7DD3FC]/20 text-[#0369A1] text-xs font-bold px-3 py-1 rounded-full">Python</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10">
          <div className="h-48 bg-[#F0F9FF] flex items-center justify-center text-[#7DD3FC] relative border-b border-[#7DD3FC]/20">
            <Languages size={64} className="absolute bottom-4 right-4 opacity-50 text-[#0369A1]" />
          </div>
          <div className="p-8 space-y-4">
            <h3 className="text-xl font-bold text-[#0F172A]">CV Sign Language Translator</h3>
            <p className="text-sm text-[#0F172A]/70 line-clamp-3">A computer vision application utilizing machine learning models to interpret sign language...</p>
            <div className="flex gap-2 pt-2 font-space">
              <span className="bg-[#7DD3FC]/20 text-[#0369A1] text-xs font-bold px-3 py-1 rounded-full">Python</span>
              <span className="bg-[#7DD3FC]/20 text-[#0369A1] text-xs font-bold px-3 py-1 rounded-full">OpenCV</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10">
          <div className="h-48 bg-[#F0F9FF] flex items-center justify-center text-[#7DD3FC] relative border-b border-[#7DD3FC]/20">
            <Cuboid size={64} className="absolute bottom-4 right-4 opacity-50 text-[#0369A1]" />
          </div>
          <div className="p-8 space-y-4">
            <h3 className="text-xl font-bold text-[#0F172A]">Ethereal Realm</h3>
            <p className="text-sm text-[#0F172A]/70 line-clamp-3">A visually striking, interactive 3D web experience exploring abstract landscapes and soft-tech aesthetics.</p>
            <div className="flex gap-2 pt-2 font-space">
              <span className="bg-[#7DD3FC]/20 text-[#0369A1] text-xs font-bold px-3 py-1 rounded-full">Unity</span>
              <span className="bg-[#7DD3FC]/20 text-[#0369A1] text-xs font-bold px-3 py-1 rounded-full">WebGL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}