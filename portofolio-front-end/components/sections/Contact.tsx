import React from 'react';
import { Briefcase, Mail, XIcon } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export default function Contact() {
  const socials = [
    { name: 'LinkedIn', icon: <Briefcase size={24} /> },
    { name: 'GitHub', icon: <SiGithub size={24} /> },
    { name: 'Email', icon: <Mail size={24} /> },
    { name: 'X / Twitter', icon: <XIcon size={24} /> },
  ];

  return (
    <section id="contact" className="text-center space-y-12 pt-20 pb-10 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Get in Touch
        </h2>
        <p className="text-lg md:text-xl text-[#0F172A]/70 dark:text-white/70">
          Let's collaborate on something amazing. Find me on these platforms.
        </p>
      </div>

      {/* Style */}
      <div className="flex flex-wrap justify-center gap-6 pt-4">
        {socials.map((social, i) => (
          <a href="#" key={i} className="bg-white dark:bg-[#121212] w-40 h-40 rounded-3xl shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:border-[#7DD3FC] dark:hover:border-[#F43F5E] transition duration-300">
            <div className="text-[#0369A1] dark:text-[#F43F5E] bg-[#F0F9FF] dark:bg-[#E11D48]/10 p-4 rounded-full">{social.icon}</div>
            <span className="font-bold text-sm text-[#0F172A] dark:text-white font-space">{social.name}</span>
          </a>
        ))}
      </div>

    </section>
  );
}