import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export interface JourneyItem {
  id: string;
  year: string;
  label: string;
  title: string;
  description: string;
}

interface JourneyCardProps {
  item: JourneyItem;
  onEdit: (item: JourneyItem) => void;
  onDelete: (id: string) => void;
}

export default function Card({ item, onEdit, onDelete }: JourneyCardProps) {
  return (
    <div className="group relative bg-white dark:bg-[#121212] p-6 md:p-8 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex flex-col md:flex-row gap-6 md:gap-12 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0369A1]/5 dark:hover:shadow-[#E11D48]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300">
      
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button 
          onClick={() => onEdit(item)} 
          className="p-2 bg-[#0369A1] text-white rounded-xl hover:bg-[#0284C7] hover:scale-110 transition-all"
          title="Edit Milestone"
        >
          <Edit2 size={16} />
        </button>
        <button 
          onClick={() => onDelete(item.id)} 
          className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:scale-110 transition-all"
          title="Delete Milestone"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Tahun */}
      <div className="w-full md:w-1/4 flex items-center md:items-start gap-4">
        <div className="w-4 h-4 rounded-full bg-[#0369A1] dark:bg-[#E11D48] mt-1 shrink-0 group-hover:scale-125 transition-transform"></div>
        <h3 className="text-2xl font-black text-[#0F172A] dark:text-white font-space">
          {item.year}
        </h3>
      </div>

      {/* Detail Konten */}
      <div className="w-full md:w-3/4 space-y-2 bg-[#F0F9FF]/50 dark:bg-[#000000]/30 p-6 rounded-2xl border border-[#7DD3FC]/10 dark:border-[#991B1B]/10">
        <span className="text-xs font-bold text-[#0369A1] dark:text-[#E11D48] tracking-widest uppercase font-space">
          {item.label}
        </span>
        <h4 className="text-xl font-bold text-[#0F172A] dark:text-white font-space group-hover:text-[#0369A1] dark:group-hover:text-[#F43F5E] transition-colors">
          {item.title}
        </h4>
        <p className="text-sm text-[#0F172A]/70 dark:text-white/70">
          {item.description}
        </p>
      </div>
    </div>
  );
}