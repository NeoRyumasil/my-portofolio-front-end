"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function Experience() {
  const [activeCategory, setActiveCategory] = useState<'web' | 'game'>('web');
  const [webProjects, setWebProjects] = useState<any[]>([]);
  const [gameProjects, setGameProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        const [webRes, gameRes] = await Promise.all([
          fetch(`${baseUrl}/api/web-projects?limit=3`),
          fetch(`${baseUrl}/api/game-projects?limit=3`)
        ]);

        const webJson = await webRes.json();
        const gameJson = await gameRes.json();

        if (webJson.success) setWebProjects(webJson.data);
        
        if (gameJson.success) setGameProjects(gameJson.data);
      } catch (error) {
        console.error("Gagal mengambil data experience:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const displayedProjects = activeCategory === 'web' ? webProjects : gameProjects;

  return (
    <section id="works" className="space-y-12 pt-24 pb-12 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Project Overview
        </h2>
      </div>

      <div className="flex justify-center items-center gap-4 pt-4">
        <button 
          onClick={() => setActiveCategory('web')}
          className={`px-6 py-3 rounded-full font-bold font-space text-sm transition-all duration-300 ${
            activeCategory === 'web' 
              ? 'bg-[#0369A1] dark:bg-[#E11D48] text-white shadow-lg' 
              : 'bg-transparent border-2 border-[#7DD3FC]/50 dark:border-[#991B1B]/50 text-[#0F172A] dark:text-white hover:border-[#0369A1] dark:hover:border-[#E11D48]'
          }`}
        >
          Web & App Projects
        </button>
        <button 
          onClick={() => setActiveCategory('game')}
          className={`px-6 py-3 rounded-full font-bold font-space text-sm transition-all duration-300 ${
            activeCategory === 'game' 
              ? 'bg-[#0369A1] dark:bg-[#E11D48] text-white shadow-lg' 
              : 'bg-transparent border-2 border-[#7DD3FC]/50 dark:border-[#991B1B]/50 text-[#0F172A] dark:text-white hover:border-[#0369A1] dark:hover:border-[#E11D48]'
          }`}
        >
          Game Projects
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : (
        <div className="space-y-24 pt-8 min-h-[600px]">
          {displayedProjects.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada proyek di kategori ini.</p>
          ) : (
            displayedProjects.map((project) => (
              <div key={project.id} className="group flex flex-col lg:flex-row gap-8 lg:gap-16 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-full lg:w-5/12 relative">
                  <div className="absolute -top-4 left-4 md:-left-4 z-10 bg-[#0F172A] dark:bg-[#121212] text-white border border-white/50 dark:border-[#991B1B]/80 px-4 py-1.5 font-bold font-space text-sm tracking-wider shadow-lg">
                    {project.year}
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-white dark:bg-[#121212] rounded-xl overflow-hidden shadow-xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 group-hover:border-[#7DD3FC] dark:group-hover:border-[#F43F5E] transition-all duration-500">
                    <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.6))] z-0"></div>
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 z-10 opacity-90 group-hover:opacity-100"
                      style={{ backgroundImage: `url(${project.image})` }}
                    ></div>
                  </div>
                </div>
                <div className="w-full lg:w-7/12 space-y-6 pt-2">
                  <h3 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white font-space group-hover:text-[#0369A1] dark:group-hover:text-[#E11D48] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech && project.tech.map((tech: string, i: number) => (
                      <span key={i} className="bg-[#0369A1] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                        {tech}
                      </span>
                    ))}
                    <span className="bg-[#E11D48] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                      {project.role}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl text-[#0F172A]/80 dark:text-white/80 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  <div className="pt-4">
                    <Link 
                      href={`/projects/${project.id}`} 
                      className="inline-flex items-center gap-2 text-[#0369A1] dark:text-[#E11D48] font-bold font-space text-base md:text-lg hover:underline transition-all"
                    >
                      View Detail <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="flex justify-center pt-16 border-t border-[#7DD3FC]/10 dark:border-[#991B1B]/20">
        <Link 
          href="/developer/projects" 
          className="group inline-flex items-center gap-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-10 py-4 rounded-full font-bold font-space text-lg shadow-xl hover:bg-[#0369A1] dark:hover:bg-[#E11D48] dark:hover:text-white hover:scale-105 transition-all duration-300"
        >
          View All Projects
          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}