import React from 'react';
import { Edit2, Trash2, Briefcase, Mail, Globe, XIcon } from 'lucide-react';

export interface ContactLink {
  id: string;
  platform: string;
  url: string;
  iconType: 'lucide' | 'image';
  iconValue: string;
}

interface ContactCardProps {
  contact: ContactLink;
  onEdit: (contact: ContactLink) => void;
  onDelete: (id: string) => void;
}

export default function Card({ contact, onEdit, onDelete }: ContactCardProps) {
  const renderIcon = (type: 'lucide' | 'image', value: string, size = 28) => {
    if (type === 'image') {
      return (
        <img 
          src={value} 
          alt={contact.platform} 
          className="object-contain rounded-md"
          style={{ width: size, height: size }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error';
          }}
        />
      );
    }

    switch (value) {
      case 'briefcase': return <Briefcase size={size} />;
      case 'mail': return <Mail size={size} />;
      case 'twitter': return <XIcon size={size} />;
      default: return <Globe size={size} />;
    }
  };

  return (
    <div className="group relative bg-white dark:bg-[#121212] aspect-square rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300 cursor-pointer">
      
      {/* Overlay */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(contact); }} 
          className="p-1.5 bg-[#0369A1] text-white rounded-lg hover:bg-[#0284C7] hover:scale-110 transition-all"
          title="Edit Contact"
        >
          <Edit2 size={14} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(contact.id); }} 
          className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-110 transition-all"
          title="Delete Contact"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Wrapper */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
        contact.iconType === 'image' 
          ? 'bg-transparent' 
          : 'bg-[#F0F9FF] dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#F43F5E] group-hover:bg-[#0369A1] dark:group-hover:bg-[#E11D48] group-hover:text-white'
      }`}>
        {renderIcon(contact.iconType, contact.iconValue, contact.iconType === 'image' ? 40 : 28)}
      </div>
      
      <span className="font-bold text-[#0F172A] dark:text-white font-space text-sm">
        {contact.platform}
      </span>
    </div>
  );
}