"use client";

import React, { useState, useEffect } from 'react';
import { Award, Settings2, Loader2, X, Star } from 'lucide-react';
import Link from 'next/link';

export default function TopCredentials() {
  const [topCredentials, setTopCredentials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [allCredentials, setAllCredentials] = useState<any[]>([]);
  const [isManaging, setIsManaging] = useState(false);

  const fetchTopCredentials = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/credentials?isTop=true&limit=3`, {
        credentials: 'include'
      });
      const json = await response.json();
      if (json.success) setTopCredentials(json.data);
    } catch (error) {
      console.error("Gagal mengambil top credentials:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTopCredentials();
  }, []);

  const handleOpenManage = async () => {
    setIsManageModalOpen(true);
    setIsManaging(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/credentials`, {
        credentials: 'include'
      });
      const json = await response.json();
      if (json.success) setAllCredentials(json.data);
    } catch (error) {
      console.error("Gagal mengambil semua kredensial:", error);
    } finally {
      setIsManaging(false);
    }
  };

  const toggleTopStatus = async (cert: any) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const updatedStatus = !cert.isTop;
      
      const payload = { ...cert, isTop: updatedStatus };
      
      const response = await fetch(`${baseUrl}/api/credentials/${cert.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setAllCredentials(allCredentials.map(c => c.id === cert.id ? { ...c, isTop: updatedStatus } : c));
        fetchTopCredentials();
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
            <Award size={24} className="text-[#0369A1] dark:text-[#E11D48]" />
            Top Credentials
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handleOpenManage}
              className="px-3 py-1.5 text-xs font-bold bg-[#F0F9FF] dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] rounded-xl hover:bg-[#0369A1] hover:text-white dark:hover:bg-[#E11D48] transition-all"
            >
              Manage
            </button>
            <Link 
              href="/admin/dashboard/credentials"
              className="p-1.5 bg-[#F0F9FF] dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] rounded-xl hover:bg-[#0369A1] hover:text-white dark:hover:bg-[#E11D48] transition-all"
            >
              <Settings2 size={16} />
            </Link>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#0369A1]" /></div>
          ) : topCredentials.length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-5">Belum ada kredensial yang ditandai sebagai Top</p>
          ) : (
            topCredentials.map((cert, index) => (
              <div key={cert.id} className="group flex items-center justify-between p-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 rounded-2xl border border-[#7DD3FC]/10 dark:border-[#991B1B]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div>
                  <h3 className="font-bold text-[#0F172A] dark:text-white font-space line-clamp-1 group-hover:text-[#0369A1] dark:group-hover:text-[#E11D48] transition-colors">{cert.title}</h3>
                  <p className="text-xs text-[#0F172A]/60 dark:text-white/60 mt-1">{cert.issuer}</p>
                </div>
                <div className="text-xs font-bold font-space bg-[#0369A1] dark:bg-[#E11D48] text-white px-3 py-1 rounded-full group-hover:scale-110 transition-transform">
                  #{index + 1}
                </div>
              </div>
            ))
          )}
        </div>

        <p className="text-xs text-[#0F172A]/50 dark:text-white/50 text-center mt-6">
          These credentials are currently featured on your /developer page.
        </p>
      </div>

      {/* Modal Manajemen Top Credentials */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121212] w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-[32px] p-6 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Manage Top Credentials</h3>
              <button onClick={() => setIsManageModalOpen(false)} className="text-[#0F172A]/50 hover:text-red-500">
                <X size={24} />
              </button>
            </div>
            
            {isManaging ? (
              <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#0369A1]" /></div>
            ) : (
              <div className="space-y-3">
                {allCredentials.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 bg-[#F0F9FF] dark:bg-[#1E1E1E] rounded-xl">
                    <span className="font-medium text-[#0F172A] dark:text-white line-clamp-1">{cert.title}</span>
                    <button 
                      onClick={() => toggleTopStatus(cert)}
                      className={`p-2 rounded-full transition-colors ${cert.isTop ? 'bg-[#0369A1] dark:bg-[#E11D48] text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}
                    >
                      <Star size={18} fill={cert.isTop ? 'currentColor' : 'none'} />
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