"use client";

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Expertise() {
  const [webSkills, setWebSkills] = useState<any[]>([]);
  const [gameSkills, setGameSkills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/api/tools`); 
        const json = await response.json();
        
        if (json.success) {
          const web = json.data.filter((tool: any) => tool.category === 'web');
          const game = json.data.filter((tool: any) => tool.category === 'game');
          setWebSkills(web);
          setGameSkills(game);
        }

      } catch (error) {
        console.error("Gagal mengambil data tools:", error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  const SkillItem = ({ skill }: { skill: any }) => (
    <div className="bg-[#F0F9FF] dark:bg-[#121212] w-[100px] h-[100px] md:w-28 md:h-28 rounded-3xl shadow-sm border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:border-[#7DD3FC] dark:hover:border-[#F43F5E] transition duration-300 cursor-pointer">
      
      {/* Icon Image */}
      <div className="w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center">
        <img 
          src={skill.image} 
          alt={skill.name}
          className="max-w-full max-h-full object-contain drop-shadow-md"
        />
      </div>

      <span className="font-bold text-xs md:text-sm text-[#0F172A] dark:text-white font-space text-center px-1">
        {skill.name}
      </span>
    </div>
  );

  return (
    <section id="expertise" className="text-center space-y-12 pt-20 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Tools
        </h2>
        <p className="text-lg md:text-xl text-[#0F172A]/70 dark:text-white/70">
          My tools and frameworks
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left pt-4">
          
          <div className="bg-white dark:bg-[#121212]/80 p-8 md:p-10 rounded-[32px] shadow-xl shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space mb-8 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-4">
              Web & App Development
            </h3>
            <div className="flex flex-wrap gap-4">
              {webSkills.map((skill, i) => <SkillItem key={i} skill={skill} />)}
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212]/80 p-8 md:p-10 rounded-[32px] shadow-xl shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space mb-8 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-4">
              Game Development
            </h3>
            <div className="flex flex-wrap gap-4">
              {gameSkills.map((skill, i) => <SkillItem key={i} skill={skill} />)}
            </div>
          </div>

        </div>
      )}
    </section>
  );
}