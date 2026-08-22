import React from 'react';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  image: string;
  url: string;
}

interface CredentialCardProps {
  cert: Credential;
  onEdit: (cert: Credential) => void;
  onDelete: (id: string) => void;
}

export default function Card({ cert, onEdit, onDelete }: CredentialCardProps) {
  return (
    <div className="group flex flex-col bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:shadow-2xl hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300 relative">
      
      {/* Action Overlay */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
        <button onClick={() => onEdit(cert)} className="p-2 bg-[#0369A1] text-white rounded-xl hover:bg-[#0284C7] hover:scale-110 transition-all shadow-md">
          <Edit2 size={16} />
        </button>
        <button onClick={() => onDelete(cert.id)} className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:scale-110 transition-all shadow-md">
          <Trash2 size={16} />
        </button>
      </div>

      {/* Credential Image */}
      <div className="h-48 relative bg-[#F0F9FF] dark:bg-[#000000] border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" style={{ backgroundImage: `url(${cert.image})` }}></div>
      </div>

      {/* Content Details */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] dark:text-white font-space mb-2 line-clamp-2">
          {cert.title}
        </h3>
        
        <p className="text-sm text-[#0F172A]/70 dark:text-white/70 font-medium mb-6">
          Issued by <span className="font-bold text-[#0369A1] dark:text-[#E11D48]">{cert.issuer}</span>
        </p>

        {/* View URL */}
        <div className="mt-auto pt-4 border-t border-[#7DD3FC]/10 dark:border-[#991B1B]/20">
          {cert.url && cert.url !== '#' ? (
            <a 
              href={cert.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-[#0369A1] dark:text-[#E11D48] font-bold font-space text-xs tracking-widest uppercase hover:underline transition-all"
            >
              View Certificate <ExternalLink size={14} />
            </a>
          ) : (
            <span className="text-[#0F172A]/30 dark:text-white/30 font-bold font-space text-xs tracking-widest uppercase">
              No Verification URL
            </span>
          )}
        </div>
      </div>
    </div>
  );
}