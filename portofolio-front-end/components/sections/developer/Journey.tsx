"use client";

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Journey() {
  const [journeyItems, setJourneyItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJourneys = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/api/journeys`);
        const json = await response.json();
        
        if (json.success) {
          setJourneyItems(json.data);
        }
        
      } catch (error) {
        console.error("Gagal mengambil data journey:", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchJourneys();
  }, []);

  return (
    <section id="journey" className="space-y-16 pt-24 pb-12 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          My Journey
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : journeyItems.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Belum ada riwayat perjalanan yang ditambahkan.</p>
      ) : (
        <div className="relative max-w-6xl pt-6">
          <div className="absolute left-[15px] md:left-[19px] top-8 bottom-0 w-[2px] bg-[#7DD3FC]/40 dark:bg-[#991B1B]/40"></div>
          <div className="space-y-16 md:space-y-24">
            {journeyItems.map((item, index) => (
              <div key={item.id || index} className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-16 pl-12 md:pl-28">
                <div className="absolute left-0 top-1 md:top-1/2 md:-translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0369A1] dark:bg-[#E11D48] ring-[6px] ring-[#F0F9FF] dark:ring-[#000000] shadow-sm"></div>
                <div className="md:w-5/12 shrink-0">
                  <h3 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white font-space tracking-tight">
                    {item.year}
                  </h3>
                </div>
                <div className="md:w-7/12 flex-1">
                  <div className="bg-white dark:bg-[#121212] p-8 md:p-12 rounded-[32px] shadow-xl shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:border-[#7DD3FC] dark:hover:border-[#F43F5E] transition-all duration-300">
                    <div className="mb-4 md:mb-6">
                      <span className="text-[#0369A1] dark:text-[#F43F5E] font-bold text-base md:text-lg mb-2 block font-space uppercase tracking-wider">
                        {item.label || 'Studied at'}
                      </span>
                      <h4 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-white leading-tight">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[#0F172A]/70 dark:text-[#ffffff]/70 font-medium text-base md:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}