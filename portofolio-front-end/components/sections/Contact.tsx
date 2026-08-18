import React from 'react';
import { Briefcase, GitFork, Mail, XIcon } from 'lucide-react';

export default function Contact() {
  const socials = [
    { name: 'LinkedIn', icon: <Briefcase size={24} /> },
    { name: 'GitHub', icon: <GitFork size={24} /> },
    { name: 'Email', icon: <Mail size={24} /> },
    { name: 'X / Twitter', icon: <XIcon size={24} /> },
  ];

  return (
    <section id="contact" className="text-center space-y-12 pt-20 pb-10">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-[#0F172A]">Get in Touch</h2>
        <p className="text-[#0F172A]/70">Let's collaborate on something amazing. Find me on these platforms.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {socials.map((social, i) => (
          <a href="#" key={i} className="bg-white w-40 h-40 rounded-3xl shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:border-[#7DD3FC] transition duration-300">
            <div className="text-[#0369A1] bg-[#F0F9FF] p-4 rounded-full">{social.icon}</div>
            <span className="font-bold text-sm text-[#0F172A] font-space">{social.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}