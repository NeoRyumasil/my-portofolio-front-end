"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function GameProjects() {
  const projects = [
    { id: 'hutan-kabut', year: '2026', title: 'Hutan Kabut', tech: ['RPG Maker', 'Pixel Art'], role: 'Designer', description: 'An interactive narrative game featuring unique characters. Focuses on immersive storytelling and vertical 4-panel visual mechanics.', image: '/image_73338d.png' },
    { id: 'ethereal-realm', year: '2025', title: 'Ethereal Realm', tech: ['Unity', 'C#'], role: 'Programmer', description: 'A visually striking 3D web experience exploring abstract landscapes and soft-tech aesthetics using Unity WebGL.', image: '/image_73338d.png' },
    { id: 'pixel-dungeon', year: '2025', title: 'Pixel Crawler', tech: ['Godot', 'GDScript'], role: 'Solo Dev', description: 'A classic 2D dungeon crawler with procedural level generation, dynamic lighting, and turn-based combat.', image: '/image_73338d.png' },
    { id: 'space-invaders', year: '2024', title: 'Space Remaster', tech: ['Unity', 'C#'], role: 'Programmer', description: 'A modern remaster of the classic arcade game featuring particle effects, boss battles, and a global leaderboard.', image: '/image_73338d.png' },
    { id: 'summer-memories', year: '2024', title: 'Summer Memories', tech: ['RenPy', 'Python'], role: 'Writer', description: 'A slice-of-life visual novel exploring the Japanese Matsuri festival with multiple branching endings.', image: '/image_73338d.png' },
    { id: 'platformer-adv', year: '2023', title: '2D Platformer Adv', tech: ['Godot', 'Animation'], role: 'Solo Dev', description: 'My first serious game project. A 2D platformer emphasizing precise jumping mechanics and tight controls.', image: '/image_73338d.png' },
  ];

  const chunkedProjects = [];
  for (let i = 0; i < projects.length; i += 3) {
    chunkedProjects.push(projects.slice(i, i + 3));
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % chunkedProjects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, chunkedProjects.length]);

  return (
    <section id="game-projects" className="space-y-12 pt-24 pb-12 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Game Development.
        </h2>
      </div>

      <div 
        className="relative overflow-hidden pt-8 max-w-7xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {chunkedProjects.map((chunk, slideIndex) => (
            <div key={slideIndex} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-4">
              {chunk.map((project) => (
                <Link href={`/projects/${project.id}`} key={project.id} className="group flex flex-col bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/50 dark:hover:border-[#F43F5E]/50 transition-all duration-300">
                  <div className="h-48 relative bg-[#F0F9FF] dark:bg-[#000000] border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 overflow-hidden">
                    <div className="absolute top-4 left-4 z-10 bg-[#0F172A] dark:bg-[#121212] text-white border border-white/50 dark:border-[#991B1B]/80 px-3 py-1 font-bold font-space text-xs tracking-wider shadow-md">
                      {project.year}
                    </div>
                    <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.6))] z-0"></div>
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 z-10 opacity-90 group-hover:opacity-100" style={{ backgroundImage: `url(${project.image})` }}></div>
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] dark:text-white font-space group-hover:text-[#0369A1] dark:group-hover:text-[#E11D48] transition-colors duration-300 line-clamp-1 mb-4">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="bg-[#0369A1] text-white px-2 py-1 rounded-full text-[10px] font-bold font-space shadow-sm">{tech}</span>
                      ))}
                      <span className="bg-[#E11D48] text-white px-2 py-1 rounded-full text-[10px] font-bold font-space shadow-sm">{project.role}</span>
                    </div>
                    <p className="text-sm text-[#0F172A]/70 dark:text-white/70 font-medium line-clamp-3 mb-6">
                      {project.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[#7DD3FC]/10 dark:border-[#991B1B]/20 text-[#0369A1] dark:text-[#E11D48] font-bold font-space text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase flex items-center justify-between">
                      <span>View Details</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 pt-10">
          {chunkedProjects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'bg-[#0369A1] dark:bg-[#E11D48] w-8' 
                  : 'bg-[#7DD3FC]/50 dark:bg-[#991B1B]/50 hover:bg-[#7DD3FC] dark:hover:bg-[#E11D48]/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}