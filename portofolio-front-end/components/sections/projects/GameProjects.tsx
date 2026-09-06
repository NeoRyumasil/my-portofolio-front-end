"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Loader2 } from 'lucide-react';

export default function GameProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/api/game-projects?page=${page}&limit=9`);
        const json = await response.json();
        
        if (json.success) {
          const sortByYear = (a: any, b: any) => {
            const yearA = parseInt(a.year?.substring(0, 4)) || 0;
            const yearB = parseInt(b.year?.substring(0, 4)) || 0;
            return yearB - yearA;
          };

          setProjects(json.data.sort(sortByYear));
          setTotalPages(json.meta.totalPages);
        }

      } catch (error) {
        console.error("Gagal mengambil data proyek game:", error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [page]);

  const chunkedProjects = [];
  for (let i = 0; i < projects.length; i += 3) {
    chunkedProjects.push(projects.slice(i, i + 3));
  }

  useEffect(() => {
    if (isHovered || chunkedProjects.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % chunkedProjects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, chunkedProjects.length]);

  return (
    <section id="game-projects" className="space-y-12 pt-24 pb-12 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Game Development
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Belum ada proyek yang ditambahkan.</p>
      ) : (
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
                  <Link href={`/developer/projects/${project.id}`} key={project.id} className="group flex flex-col bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/50 dark:hover:border-[#F43F5E]/50 transition-all duration-300">
                    <div className="h-48 relative bg-[#F0F9FF] dark:bg-[#000000] border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 overflow-hidden">
                      
                      <div className="absolute top-4 left-4 z-[20] bg-[#0F172A] dark:bg-[#121212] text-white border border-[#7DD3FC]/50 dark:border-[#991B1B]/80 px-3 py-1 font-bold font-space text-xs tracking-wider shadow-lg rounded-tl-xl rounded-br-xl">
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
                        {project.tech && project.tech.map((tech: string, i: number) => (
                          <span key={`tech-${i}`} className="bg-[#0369A1] text-white px-2 py-1 rounded-full text-[10px] font-bold font-space shadow-sm">{tech}</span>
                        ))}

                        {project.role && project.role.split(',').map((roleItem: string, idx: number) => (
                          <span key={`role-${idx}`} className="bg-[#E11D48] text-white px-2 py-1 rounded-full text-[10px] font-bold font-space shadow-sm">
                            {roleItem.trim()}
                          </span>
                        ))}
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
      )}
    </section>
  );
}