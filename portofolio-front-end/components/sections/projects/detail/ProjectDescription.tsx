import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ProjectDescription({ description, url }: { description: string, url: string }) {
  return (
    <div className="space-y-10 pt-4">
      
      <div className="space-y-6">
        <h3 className="text-3xl font-extrabold text-[#0F172A] dark:text-white font-space flex items-center gap-3 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-4">
          <BookOpen className="text-[#0369A1] dark:text-[#E11D48]" size={28} />
          Project Details
        </h3>

        <div className="text-lg md:text-xl text-[#0F172A]/80 dark:text-[#E2E8F0] leading-loose font-medium font-sans text-justify space-y-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0369A1] dark:[&_h2]:text-[#E11D48] [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:marker:text-[#0369A1] dark:[&_li]:marker:text-[#E11D48]">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>

      {url && (
        <div className="pt-8 border-t border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 bg-[#0369A1] dark:bg-[#E11D48] text-white px-8 py-4 rounded-full font-bold font-space shadow-lg hover:shadow-[#0369A1]/30 dark:hover:shadow-[#E11D48]/30 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            Open Project <ExternalLink size={20} />
          </a>
        </div>
      )}

    </div>
  );
}