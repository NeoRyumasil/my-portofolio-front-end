"use client";

import React, { useState, useEffect } from 'react';
import { Briefcase, Settings2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function TopProjects() {
  const [topProjects, setTopProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopProjects = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/api/web-projects?limit=3`);
        const json = await response.json();
        if (json.success) setTopProjects(json.data);

      } catch (error) {
        console.error("Gagal mengambil top projects:", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopProjects();
  }, []);

  return (
    <div className="bg-white dark:bg-[#121212] p-6 md:p-8 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F172A]/5 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300">
      <div className="flex justify-between items-center mb-6 border-b border-[#7DD3FC]/10 dark:border-[#991B1B]/20 pb-4">
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-3">
          <Briefcase size={24} className="text-[#0369A1] dark:text-[#E11D48]" />
          Top Projects
        </h2>
        <Link 
          href="/admin/dashboard/web-projects"
          className="p-2 bg-[#F0F9FF] dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] rounded-xl hover:bg-[#0369A1] hover:text-white dark:hover:bg-[#E11D48] hover:scale-110 transition-all"
        >
          <Settings2 size={20} />
        </Link>
      </div>

      <div className="space-y-4 flex-1">
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#0369A1]" /></div>
        ) : topProjects.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-5">Belum ada proyek</p>
        ) : (
          topProjects.map((project, index) => (
            <div key={project.id} className="group flex items-center justify-between p-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 rounded-2xl border border-[#7DD3FC]/10 dark:border-[#991B1B]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div>
                <h3 className="font-bold text-[#0F172A] dark:text-white font-space line-clamp-1 group-hover:text-[#0369A1] dark:group-hover:text-[#E11D48] transition-colors">{project.title}</h3>
                <p className="text-xs text-[#0F172A]/60 dark:text-white/60 mt-1">{project.role}</p>
              </div>
              <div className="text-xs font-bold font-space bg-[#0369A1] dark:bg-[#E11D48] text-white px-3 py-1 rounded-full group-hover:scale-110 transition-transform">
                #{index + 1}
              </div>
            </div>
          ))
        )}
      </div>
      
      <p className="text-xs text-[#0F172A]/50 dark:text-white/50 text-center mt-6">
        These projects are currently featured on your /developer page.
      </p>
    </div>
  );
}