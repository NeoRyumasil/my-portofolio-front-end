"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Experience() {
  const [activeCategory, setActiveCategory] = useState<'web' | 'game'>('web');

  const allProjects = [
    {
      id: 'gudang-damar',
      category: 'web',
      year: '2026 - Present',
      title: 'Gudang Damar',
      tech: ['Flutter', 'Laravel', 'Supabase'],
      role: 'Fullstack Developer',
      description: 'A comprehensive warehouse management application designed to optimize store inventory and price tracking. Built with a strong focus on seamless user experience using Flutter and robust business logic on the backend with Laravel.',
      image: '/image_73338d.png'
    },
    {
      id: 'ai-chat',
      category: 'web',
      year: '2026',
      title: 'AI Chat Assistant',
      tech: ['Next.js', 'Python', 'LLMs API'],
      role: 'AI Developer',
      description: 'An intelligent conversational agent and smart categorization system built with modern LLM API integrations. It focuses on delivering a soft, intuitive interface without the overhead of training custom models from scratch.',
      image: '/image_73338d.png'
    },
    {
      id: 'cv-sign-language',
      category: 'web',
      year: '2026',
      title: 'CV Sign Language',
      tech: ['Python', 'OpenCV'],
      role: 'PKM-KC Lead',
      description: 'A computer vision project developed under the Karsa Cipta (PKM-KC) framework. It utilizes machine learning models to interpret sign language in real-time, bridging communication gaps effectively.',
      image: '/image_73338d.png'
    },
    {
      id: 'hutan-kabut',
      category: 'game',
      year: '2026',
      title: 'Kehidupan Baru di Hutan Kabut',
      tech: ['RPG Maker', 'Pixel Art', 'Storytelling'],
      role: 'Game Designer & Writer',
      description: 'An interactive narrative game featuring unique characters like Rodhette, Granny, and Mr. Wolf. Focuses on immersive storytelling, branching dialogues, and vertical 4-panel visual mechanics tailored for engaging player experiences.',
      image: '/image_73338d.png'
    },
    {
      id: 'ethereal-realm',
      category: 'game',
      year: '2025',
      title: 'Ethereal Realm',
      tech: ['Unity', 'C#', 'WebGL'],
      role: 'Game Programmer',
      description: 'A visually striking, interactive 3D web experience exploring abstract landscapes and soft-tech aesthetics. Developed complex character controllers and environment interactions using Unity and C#.',
      image: '/image_73338d.png'
    }
  ];

  const displayedProjects = allProjects
    .filter((project) => project.category === activeCategory)
    .slice(0, 3);

  return (
    <section id="works" className="space-y-12 pt-24 pb-12 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Project Overview.
        </h2>
      </div>

      {/* Tabs Filter */}
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

      {/* Daftar Project */}
      <div className="space-y-24 pt-8 min-h-[600px]">
        {displayedProjects.map((project, index) => (
          <div key={project.id} className="group flex flex-col lg:flex-row gap-8 lg:gap-16 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Gambar */}
            <div className="w-full lg:w-5/12 relative">
              <div className="absolute -top-4 left-4 md:-left-4 z-10 bg-[#0F172A] dark:bg-[#121212] text-white border border-white/50 dark:border-[#991B1B]/80 px-4 py-1.5 font-bold font-space text-sm tracking-wider shadow-lg">
                {project.year}
              </div>
              
              <div className="relative w-full aspect-[4/3] bg-white dark:bg-[#121212] rounded-xl overflow-hidden shadow-xl shadow-[#0F172A]/5 dark:shadow-[#E11D48]/10 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 group-hover:border-[#7DD3FC] dark:group-hover:border-[#F43F5E] transition-all duration-500">
                <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.6))] z-0"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 z-10 opacity-90 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
              </div>
            </div>

            {/* Detail */}
            <div className="w-full lg:w-7/12 space-y-6 pt-2">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white font-space group-hover:text-[#0369A1] dark:group-hover:text-[#E11D48] transition-colors duration-300">
                {project.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-[#0369A1] dark:bg-[#0369A1] text-white px-4 py-1.5 rounded-full text-sm font-bold font-space shadow-sm">
                    {tech}
                  </span>
                ))}
                <span className="bg-[#E11D48] dark:bg-[#E11D48] text-white px-4 py-1.5 rounded-full text-sm font-bold font-space shadow-sm">
                  {project.role}
                </span>
              </div>

              <p className="text-lg md:text-xl text-[#0F172A]/80 dark:text-white/80 leading-relaxed font-medium">
                {project.description}
              </p>

              {/* View Detail */}
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
        ))}
      </div>

      {/* View All Projects */}
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