"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function Credentials() {
  const [certs, setCerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchCredentials = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/api/credentials?page=${page}&limit=9`);
        const json = await response.json();
        
        if (json.success) {
          setCerts(json.data);
        }

      } catch (error) {
        console.error("Gagal mengambil data kredensial:", error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchCredentials();
  }, [page]);

  const chunkedCerts = [];
  for (let i = 0; i < certs.length; i += 3) {
    chunkedCerts.push(certs.slice(i, i + 3));
  }

  useEffect(() => {
    if (isHovered || chunkedCerts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % chunkedCerts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, chunkedCerts.length]);

  return (
    <section id="credentials" className="text-center space-y-12 pt-20 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Certification
        </h2>
        <p className="text-lg md:text-xl text-[#0F172A]/70 dark:text-white/70">
          My Certifications
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : certs.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Belum ada sertifikat yang ditambahkan.</p>
      ) : (
        <div 
          className="relative overflow-hidden max-w-6xl mx-auto pt-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {chunkedCerts.map((chunk, slideIndex) => (
              <div key={slideIndex} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-4">
                {chunk.map((cert) => (
                  <Link href={cert.url || '#'} key={cert.id} target="_blank" className="group flex flex-col bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/50 dark:hover:border-[#F43F5E]/50 transition-all duration-300 text-left">
                    <div className="h-48 relative bg-[#F0F9FF] dark:bg-[#000000] border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 overflow-hidden">
                      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.6))] z-0"></div>
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 z-10 opacity-90 group-hover:opacity-100" 
                        style={{ backgroundImage: `url(${cert.image})` }}
                      ></div>
                    </div>
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] dark:text-white font-space group-hover:text-[#0369A1] dark:group-hover:text-[#E11D48] transition-colors duration-300 line-clamp-2 mb-2">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-[#0F172A]/70 dark:text-white/70 font-medium mb-6">
                        Issued by <span className="font-bold text-[#0369A1] dark:text-[#E11D48]">{cert.issuer}</span>
                      </p>
                      <div className="mt-auto pt-4 border-t border-[#7DD3FC]/10 dark:border-[#991B1B]/20 text-[#0369A1] dark:text-[#E11D48] font-bold font-space text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase flex items-center justify-between">
                        <span>View Certificate</span>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 pt-10">
            {chunkedCerts.map((_, idx) => (
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
      )}
    </section>
  );
}