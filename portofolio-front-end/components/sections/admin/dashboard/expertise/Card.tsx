import React from 'react';
import { Edit2, Trash2, Code, Box } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  category: 'web' | 'game';
  icon: string;
}

interface ExpertiseCardProps {
  tool: Tool;
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
}

export default function Card({ tool, onEdit, onDelete }: ExpertiseCardProps) {
  return (
    <div className="group relative bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300 cursor-pointer">
      
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(tool); }} 
          className="p-1.5 bg-[#0369A1] text-white rounded-lg hover:bg-[#0284C7] hover:scale-110 transition-all"
          title="Edit Tool"
        >
          <Edit2 size={14} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(tool.id); }} 
          className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-110 transition-all"
          title="Delete Tool"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="w-12 h-12 flex items-center justify-center text-[#0369A1]/70 dark:text-[#E11D48]/70 group-hover:text-[#0369A1] dark:group-hover:text-[#F43F5E] group-hover:scale-110 transition-all duration-300 overflow-hidden">
         {tool.icon ? (
            <img 
              src={tool.icon} 
              alt={tool.name} 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
         ) : (
            tool.category === 'web' ? <Code size={32} /> : <Box size={32} />
         )}
      </div>
      
      <span className="font-bold text-[#0F172A]/70 dark:text-white/70 font-space text-sm text-center group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors duration-300">
        {tool.name}
      </span>
      
    </div>
  );
}