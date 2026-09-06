import React from 'react';

export default function ProjectImage({ image, title }: { image: string, title: string }) {
  return (
    <div className="w-full aspect-video bg-[#F0F9FF] dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 relative">
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.6))] z-0"></div>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-700" 
      />
    </div>
  );
}