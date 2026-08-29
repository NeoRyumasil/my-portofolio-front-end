"use client";

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Contact() {
  const [socials, setSocials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/api/contacts`);
        const json = await response.json();
        
        if (json.success) {
          setSocials(json.data);
        }

      } catch (error) {
        console.error("Gagal mengambil data kontak:", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <section id="contact" className="text-center space-y-12 pt-20 pb-10 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Get in Touch
        </h2>
        <p className="text-lg md:text-xl text-[#0F172A]/70 dark:text-white/70">
          You can find me in these platforms
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : socials.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Belum ada kontak yang ditambahkan.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          {socials.map((social, i) => (
            <a 
              href={social.url || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              key={social.id || i} 
              className="bg-white dark:bg-[#121212] w-40 h-40 rounded-3xl shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:border-[#7DD3FC] dark:hover:border-[#F43F5E] transition duration-300"
            >
              <div className="text-[#0369A1] dark:text-[#F43F5E] bg-[#F0F9FF] dark:bg-[#E11D48]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden">
                {social.image ? (
                  <img 
                    src={social.image} 
                    alt={social.name} 
                    className="w-full h-full object-contain drop-shadow-sm" 
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                )}
              </div>
              <span className="font-bold text-sm text-[#0F172A] dark:text-white font-space">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}