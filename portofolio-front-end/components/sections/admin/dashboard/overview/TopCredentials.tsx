import React from 'react';
import { Award, Settings2 } from 'lucide-react';
import Link from 'next/link';

export default function TopCredentials() {
  const topCredentials = [
    { id: 'azure-ai-900', title: 'Azure AI 900 Fundamentals', issuer: 'Microsoft' },
    { id: 'cloud-architect', title: 'Cloud Architect Basics', issuer: 'Various' },
    { id: 'softdev-mastery', title: 'SoftDev Mastery', issuer: 'Tech Institute' },
  ];

  return (
    <div className="bg-white dark:bg-[#121212] p-6 md:p-8 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F172A]/5 dark:hover:shadow-[#E11D48]/10 hover:border-[#7DD3FC]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300">
      <div className="flex justify-between items-center mb-6 border-b border-[#7DD3FC]/10 dark:border-[#991B1B]/20 pb-4">
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-3">
          <Award size={24} className="text-[#0369A1] dark:text-[#E11D48]" />
          Top Credentials
        </h2>
        <Link 
          href="/admin/dashboard/credentials"
          className="p-2 bg-[#F0F9FF] dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] rounded-xl hover:bg-[#0369A1] hover:text-white dark:hover:bg-[#E11D48] hover:scale-110 transition-all"
          title="Manage Top Credentials"
        >
          <Settings2 size={20} />
        </Link>
      </div>

      <div className="space-y-4 flex-1">
        {topCredentials.map((cert, index) => (
          <div key={index} className="group flex items-center justify-between p-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 rounded-2xl border border-[#7DD3FC]/10 dark:border-[#991B1B]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div>
              <h3 className="font-bold text-[#0F172A] dark:text-white font-space line-clamp-1 group-hover:text-[#0369A1] dark:group-hover:text-[#E11D48] transition-colors">{cert.title}</h3>
              <p className="text-xs text-[#0F172A]/60 dark:text-white/60 mt-1">{cert.issuer}</p>
            </div>
            <div className="text-xs font-bold font-space bg-[#0369A1] dark:bg-[#E11D48] text-white px-3 py-1 rounded-full group-hover:scale-110 transition-transform">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-[#0F172A]/50 dark:text-white/50 text-center mt-6">
        These credentials are currently featured on your /developer page.
      </p>
    </div>
  );
}