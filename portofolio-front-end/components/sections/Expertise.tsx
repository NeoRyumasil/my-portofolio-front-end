import React from 'react';
import { Code2, Smartphone, Terminal, Gamepad2, Database, Bot } from 'lucide-react';

export default function Expertise() {
  const skills = [
    { name: 'Laravel', icon: <Code2 size={28} /> },
    { name: 'Next.js', icon: <Terminal size={28} /> },
    { name: 'Flutter', icon: <Smartphone size={28} /> },
    { name: 'Python', icon: <Bot size={28} /> },
    { name: 'Go', icon: <Code2 size={28} /> },
    { name: 'Unity', icon: <Gamepad2 size={28} /> },
    { name: 'Supabase', icon: <Database size={28} /> },
  ];

  return (
    <section id="expertise" className="text-center space-y-12 pt-20">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-[#0F172A]">Technical Arsenal</h2>
        <p className="text-[#0F172A]/70">Tools and frameworks I wield to bring ideas to life.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill, i) => (
          <div key={i} className="bg-white w-32 h-32 rounded-3xl shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:border-[#7DD3FC] transition duration-300">
            <div className="text-[#0369A1]">{skill.icon}</div>
            <span className="font-bold text-sm text-[#0F172A] font-space">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}