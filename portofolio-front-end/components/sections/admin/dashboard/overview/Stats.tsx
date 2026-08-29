"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Star, Eye, Briefcase, Gamepad2, Loader2 } from 'lucide-react';

export default function Stats() {
  const [stats, setStats] = useState({
    web: 0,
    game: 0,
    credentials: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        const [webRes, gameRes, credRes] = await Promise.all([
          fetch(`${baseUrl}/api/web-projects?limit=1`),
          fetch(`${baseUrl}/api/game-projects?limit=1`),
          fetch(`${baseUrl}/api/credentials?limit=1`)
        ]);

        const webJson = await webRes.json();
        const gameJson = await gameRes.json();
        const credJson = await credRes.json();

        setStats({
          web: webJson.meta?.totalItems || 0,
          game: gameJson.meta?.totalItems || 0,
          credentials: credJson.meta?.totalItems || 0
        });

      } catch (error) {
        console.error("Gagal mengambil statistik:", error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const totalProjects = stats.web + stats.game;
  const pageViews = "67"; 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-10 h-10 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="group bg-white dark:bg-[#121212] p-6 rounded-3xl shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex flex-col justify-center gap-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F172A]/5 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/60 dark:hover:border-[#E11D48]/60 transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] rounded-2xl group-hover:scale-110 group-hover:bg-[#0369A1] dark:group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-300">
            <Activity size={24} />
          </div>
          <div>
            <div className="text-3xl font-black text-[#0F172A] dark:text-white font-space">{totalProjects}</div>
            <div className="text-sm font-bold text-[#0F172A]/50 dark:text-white/50 font-space">Total Projects</div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 mt-2 border-t border-[#7DD3FC]/10 dark:border-[#991B1B]/20 group-hover:border-[#7DD3FC]/30 dark:group-hover:border-[#E11D48]/30 transition-colors">
          <div className="flex items-center gap-2 text-sm text-[#0F172A]/70 dark:text-white/70 font-medium">
            <Briefcase size={16} className="text-[#0369A1] dark:text-[#F43F5E]" />
            <span>{stats.web} Web & App</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#0F172A]/70 dark:text-white/70 font-medium">
            <Gamepad2 size={16} className="text-[#0369A1] dark:text-[#F43F5E]" />
            <span>{stats.game} Game</span>
          </div>
        </div>
      </div>

      <div className="group bg-white dark:bg-[#121212] p-6 rounded-3xl shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex items-center gap-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F172A]/5 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/60 dark:hover:border-[#E11D48]/60 transition-all duration-300 cursor-pointer">
        <div className="p-4 bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] rounded-2xl group-hover:scale-110 group-hover:bg-[#0369A1] dark:group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-300">
          <Star size={24} />
        </div>
        <div>
          <div className="text-3xl font-black text-[#0F172A] dark:text-white font-space">{stats.credentials}</div>
          <div className="text-sm font-bold text-[#0F172A]/50 dark:text-white/50 font-space">Credentials</div>
        </div>
      </div>

      <div className="group bg-white dark:bg-[#121212] p-6 rounded-3xl shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex items-center gap-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F172A]/5 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/60 dark:hover:border-[#E11D48]/60 transition-all duration-300 cursor-pointer">
        <div className="p-4 bg-[#7DD3FC]/20 dark:bg-[#E11D48]/20 text-[#0369A1] dark:text-[#F43F5E] rounded-2xl group-hover:scale-110 group-hover:bg-[#0369A1] dark:group-hover:bg-[#E11D48] group-hover:text-white transition-all duration-300">
          <Eye size={24} />
        </div>
        <div>
          <div className="text-3xl font-black text-[#0F172A] dark:text-white font-space">{pageViews}</div>
          <div className="text-sm font-bold text-[#0F172A]/50 dark:text-white/50 font-space">Page Views</div>
        </div>
      </div>
    </div>
  );
}