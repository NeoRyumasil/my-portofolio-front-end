import React from 'react';
import { 
  SiLaravel, 
  SiNextdotjs, 
  SiFlutter, 
  SiPython, 
  SiGo, 
  SiUnity, 
  SiSupabase,
  SiGodotengine,
} from 'react-icons/si';

export default function Expertise() {
  const webSkills = [
    { name: 'Laravel', icon: <SiLaravel size={28} /> },
    { name: 'Next.js', icon: <SiNextdotjs size={28} /> },
    { name: 'Flutter', icon: <SiFlutter size={28} /> },
    { name: 'Python', icon: <SiPython size={28} /> },
    { name: 'Go', icon: <SiGo size={28} /> },
    { name: 'Supabase', icon: <SiSupabase size={28} /> },
  ];

  const gameSkills = [
    { name: 'Unity', icon: <SiUnity size={28} /> },
    { name: 'Godot', icon: <SiGodotengine size={28} /> },
  ];

  return (
    <section id="expertise" className="text-center space-y-12 pt-20 transition-colors duration-300">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-[#0F172A] dark:text-[#E11D48] font-space">Technical Arsenal</h2>
        <p className="text-[#0F172A]/70 dark:text-white/70">Tools and frameworks I wield to bring ideas to life.</p>
      </div>

      {/* Grid untuk membagi 2 kotak (kiri WebDev, kanan GameDev) */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
        
        {/* Kotak Web Development */}
        <div className="bg-white dark:bg-[#121212]/80 p-8 md:p-10 rounded-[32px] shadow-xl shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space mb-8 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-4">
            Web & App Development
          </h3>
          <div className="flex flex-wrap gap-4">
            {webSkills.map((skill, i) => (
              <div key={i} className="bg-[#F0F9FF] dark:bg-[#121212] w-[100px] h-[100px] md:w-28 md:h-28 rounded-3xl shadow-sm border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:border-[#7DD3FC] dark:hover:border-[#F43F5E] transition duration-300 cursor-pointer">
                <div className="text-[#0369A1] dark:text-[#F43F5E]">{skill.icon}</div>
                <span className="font-bold text-xs md:text-sm text-[#0F172A] dark:text-white font-space">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kotak Game Development */}
        <div className="bg-white dark:bg-[#121212]/80 p-8 md:p-10 rounded-[32px] shadow-xl shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space mb-8 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-4">
            Game Development
          </h3>
          <div className="flex flex-wrap gap-4">
            {gameSkills.map((skill, i) => (
              <div key={i} className="bg-[#F0F9FF] dark:bg-[#121212] w-[100px] h-[100px] md:w-28 md:h-28 rounded-3xl shadow-sm border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:border-[#7DD3FC] dark:hover:border-[#F43F5E] transition duration-300 cursor-pointer">
                <div className="text-[#0369A1] dark:text-[#F43F5E]">{skill.icon}</div>
                <span className="font-bold text-xs md:text-sm text-[#0F172A] dark:text-white font-space">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}