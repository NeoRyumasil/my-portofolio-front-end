"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function WebProjects() {
  const projects = [
    { id: 'gudang-damar', year: '2026', title: 'Gudang Damar', tech: ['Flutter', 'Laravel'], role: 'Fullstack Dev', description: 'A comprehensive warehouse management application designed to optimize store inventory and price tracking.', image: '/image_73338d.png' },
    { id: 'seblak-mang-jay', year: '2026', title: 'Seblak Mang Jay', tech: ['Next.js', 'Firebase'], role: 'Frontend Dev', description: 'A business development and order management system for a culinary venture with real-time syncing.', image: '/image_73338d.png' },
    { id: 'cv-sign-language', year: '2026', title: 'CV Sign Language', tech: ['Python', 'OpenCV'], role: 'PKM-KC Lead', description: 'A computer vision project developed to interpret sign language in real-time, bridging communication gaps.', image: '/image_73338d.png' },
    { id: 'matsuri-portal', year: '2026', title: 'Nihon Matsuri Portal', tech: ['React', 'Tailwind'], role: 'Web Developer', description: 'Event portal and ticketing system for the Japanese culture festival featuring schedules and interactive maps.', image: '/image_73338d.png' },
    { id: 'ase-dashboard', year: '2026', title: 'ASE Media Dashboard', tech: ['Next.js', 'Supabase'], role: 'PR & Dev', description: 'An internal dashboard to manage media partner collaborations and streamline communication deliverables.', image: '/image_73338d.png' },
    { id: 'task-master', year: '2025', title: 'TaskMaster Pro', tech: ['Vue.js', 'Node.js'], role: 'Backend Dev', description: 'A productivity app aimed at teams, featuring Kanban boards, time tracking, and automated reporting.', image: '/image_73338d.png' },
    { id: 'eco-lite', year: '2025', title: 'E-Commerce Lite', tech: ['React', 'Express'], role: 'Fullstack Dev', description: 'A lightweight e-commerce storefront with Stripe integration for seamless and secure checkouts.', image: '/image_73338d.png' },
    { id: 'iot-tracker', year: '2024', title: 'Smart IoT Tracker', tech: ['Flutter', 'IoT'], role: 'Mobile Dev', description: 'Mobile dashboard connected to custom IoT hardware to track logistics in real-time.', image: '/image_73338d.png' },
    { id: 'personal-blog', year: '2024', title: 'Alvin Personal Blog', tech: ['Gatsby', 'GraphQL'], role: 'Creator', description: 'My personal blog detailing my coding journey, tutorials, and thoughts on software architecture.', image: '/image_73338d.png' },
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
    <section id="web-projects" className="space-y-12 pt-24 pb-12 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Web & App Projects.
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