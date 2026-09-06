"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Globe, Code, Briefcase } from 'lucide-react';

export default function ProjectHeader({ project }: { project: any }) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <button 
        onClick={() => router.back()} 
        className="inline-flex items-center gap-2 text-[#0369A1] dark:text-[#E11D48] font-bold font-space hover:-translate-x-2 transition-transform"
      >
        <ArrowLeft size={20} /> Back to Portfolio
      </button>

      <div className="flex flex-wrap items-center gap-4">
        <span className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-4 py-1.5 rounded-full font-bold font-space text-sm tracking-wider flex items-center gap-2 shadow-md">
          <Calendar size={16} /> {project.year}
        </span>
        <span className="bg-[#7DD3FC]/20 dark:bg-[#991B1B]/30 text-[#0369A1] dark:text-[#F43F5E] px-4 py-1.5 rounded-full font-bold font-space text-sm tracking-wider border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 flex items-center gap-2">
          <Globe size={16} /> {project.category === 'web' ? 'Web & App' : 'Game Development'}
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold text-[#0F172A] dark:text-white font-space leading-tight">
        {project.title}
      </h1>

      <div className="flex flex-wrap gap-3 pt-2">
        {project.tech && project.tech.map((tech: string, i: number) => (
          <span key={`tech-${i}`} className="bg-[#0369A1] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-1.5">
            <Code size={14} /> {tech}
          </span>
        ))}
        
        {project.role && project.role.split(',').map((roleItem: string, idx: number) => (
          <span key={`role-${idx}`} className="bg-[#E11D48] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-1.5">
            <Briefcase size={14} /> {roleItem.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}