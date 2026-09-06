"use client";

import React, { useState, useEffect } from 'react';
import { Briefcase, Settings2, Loader2, X, Star, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function TopProjects() {
  const [topProjects, setTopProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [isManaging, setIsManaging] = useState(false);

  const fetchTopProjects = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const [webRes, gameRes] = await Promise.all([
        fetch(`${baseUrl}/api/web-projects?isTop=true`, { credentials: 'include' }),
        fetch(`${baseUrl}/api/game-projects?isTop=true`, { credentials: 'include' })
      ]);
      
      const webJson = await webRes.json();
      const gameJson = await gameRes.json();
      
      let combined: any[] = [];
      
      if (webJson.success) {
        const webData = webJson.data.map((item: any) => ({ ...item, _type: 'web' }));
        combined = [...combined, ...webData];
      }
      if (gameJson.success) {
        const gameData = gameJson.data.map((item: any) => ({ ...item, _type: 'game' }));
        combined = [...combined, ...gameData];
      }

      setTopProjects(combined.slice(0, 3));
    } catch (error) {
      console.error("Gagal mengambil top projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopProjects();
  }, []);

  const handleOpenManage = async () => {
    setIsManageModalOpen(true);
    setIsManaging(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const [webRes, gameRes] = await Promise.all([
        fetch(`${baseUrl}/api/web-projects`, { credentials: 'include' }),
        fetch(`${baseUrl}/api/game-projects`, { credentials: 'include' })
      ]);
      
      const webJson = await webRes.json();
      const gameJson = await gameRes.json();
      
      let combinedAll: any[] = [];
      
      if (webJson.success) {
        const webData = webJson.data.map((item: any) => ({ ...item, _type: 'web' }));
        combinedAll = [...combinedAll, ...webData];
      }
      if (gameJson.success) {
        const gameData = gameJson.data.map((item: any) => ({ ...item, _type: 'game' }));
        combinedAll = [...combinedAll, ...gameData];
      }
      
      setAllProjects(combinedAll);
    } catch (error) {
      console.error("Gagal mengambil semua proyek:", error);
    } finally {
      setIsManaging(false);
    }
  };

  const toggleTopStatus = async (project: any) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const updatedStatus = !project.isTop;
      
      const payload = { ...project, isTop: updatedStatus };
      delete payload._type;
      
      const endpoint = project._type === 'web' ? 'web-projects' : 'game-projects';
      
      const response = await fetch(`${baseUrl}/api/${endpoint}/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setAllProjects(allProjects.map(p => p.id === project.id ? { ...p, isTop: updatedStatus } : p));
        fetchTopProjects();
      }
    } catch (error) {
      console.error("Gagal mengupdate status:", error);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-[#121212] p-6 md:p-8 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F172A]/5 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300">
        <div className="flex justify-between items-center mb-6 border-b border-[#7DD3FC]/10 dark:border-[#991B1B]/20 pb-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-3">
            <Briefcase size={24} className="text-[#0369A1] dark:text-[#E11D48]" />
            Top Projects
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handleOpenManage}
              className="px-3 py-1.5 text-xs font-bold bg-[#F0F9FF] dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] rounded-xl hover:bg-[#0369A1] hover:text-white dark:hover:bg-[#E11D48] transition-all"
            >
              Manage
            </button>
            <Link 
              href="/admin/dashboard/web-projects"
              className="p-1.5 bg-[#F0F9FF] dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] rounded-xl hover:bg-[#0369A1] hover:text-white dark:hover:bg-[#E11D48] transition-all"
            >
              <Settings2 size={16} />
            </Link>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#0369A1]" /></div>
          ) : topProjects.length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-5">Belum ada proyek yang ditandai sebagai Top</p>
          ) : (
            topProjects.map((project, index) => (
              <div key={project.id} className="group flex items-center justify-between p-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 rounded-2xl border border-[#7DD3FC]/10 dark:border-[#991B1B]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                   {project._type === 'web' ? (
                       <Briefcase size={16} className="text-[#0369A1] dark:text-[#F43F5E] opacity-50" />
                   ) : (
                       <Gamepad2 size={16} className="text-[#0369A1] dark:text-[#F43F5E] opacity-50" />
                   )}
                  <div>
                    <h3 className="font-bold text-[#0F172A] dark:text-white font-space line-clamp-1 group-hover:text-[#0369A1] dark:group-hover:text-[#E11D48] transition-colors">{project.title}</h3>
                    <p className="text-xs text-[#0F172A]/60 dark:text-white/60 mt-1">{project.role}</p>
                  </div>
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

      {/* Manajemen Top Projects */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121212] w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-[32px] p-6 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Manage Top Projects</h3>
              <button onClick={() => setIsManageModalOpen(false)} className="text-[#0F172A]/50 hover:text-red-500">
                <X size={24} />
              </button>
            </div>
            
            {isManaging ? (
              <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#0369A1]" /></div>
            ) : (
              <div className="space-y-3">
                {allProjects.map((proj) => (
                  <div key={proj.id} className="flex items-center justify-between p-4 bg-[#F0F9FF] dark:bg-[#1E1E1E] rounded-xl border border-transparent hover:border-[#0369A1]/30 dark:hover:border-[#E11D48]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      {proj._type === 'web' ? (
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"><Briefcase size={14} /></div>
                      ) : (
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg"><Gamepad2 size={14} /></div>
                      )}
                      <span className="font-medium text-[#0F172A] dark:text-white line-clamp-1">{proj.title}</span>
                    </div>
                    
                    <button 
                      onClick={() => toggleTopStatus(proj)}
                      className={`p-2 rounded-full transition-colors ${proj.isTop ? 'bg-[#0369A1] dark:bg-[#E11D48] text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                      title={proj.isTop ? "Remove from Top" : "Add to Top"}
                    >
                      <Star size={18} fill={proj.isTop ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}