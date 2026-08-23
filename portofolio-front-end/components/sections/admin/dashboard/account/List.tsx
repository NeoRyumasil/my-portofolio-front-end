import React from 'react';
import { Users, User, Edit2, Trash2 } from 'lucide-react';

export interface Account {
  id: string;
  username: string;
}

interface AccountListProps {
  accounts: Account[];
  editingId: string | null;
  onEdit: (acc: Account) => void;
  onDelete: (id: string) => void;
}

export default function List({ accounts, editingId, onEdit, onDelete }: AccountListProps) {
  return (
    <div className="xl:col-span-1 bg-white dark:bg-[#121212] p-8 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 h-fit sticky top-8">
      <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-space mb-6 flex items-center gap-2 pb-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30">
        <Users className="text-[#0369A1] dark:text-[#E11D48]" size={24} />
        Registered Admins
      </h3>
      
      <div className="space-y-4">
        {accounts.map(acc => (
          <div 
            key={acc.id} 
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group ${
              editingId === acc.id 
                ? 'bg-[#0369A1]/10 dark:bg-[#E11D48]/10 border-[#0369A1] dark:border-[#E11D48]' 
                : 'bg-[#F0F9FF]/50 dark:bg-[#000000]/30 border-[#7DD3FC]/20 dark:border-[#991B1B]/20 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl text-white transition-colors ${
                editingId === acc.id ? 'bg-[#0369A1] dark:bg-[#E11D48]' : 'bg-[#0F172A] dark:bg-[#1A1A1A]'
              }`}>
                <User size={18} />
              </div>
              <span className="font-bold text-[#0F172A] dark:text-white font-space text-sm">
                {acc.username}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit(acc)} 
                className="p-2 bg-[#0369A1] text-white rounded-lg hover:bg-[#0284C7] hover:scale-110 transition-all shadow-md"
                title="Edit Account"
              >
                <Edit2 size={14} />
              </button>
              <button 
                onClick={() => onDelete(acc.id)} 
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-110 transition-all shadow-md"
                title="Delete Account"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        
        {accounts.length === 0 && (
           <p className="text-center text-sm text-[#0F172A]/50 dark:text-white/50 py-4 font-space">
             No accounts found
           </p>
        )}
      </div>
    </div>
  );
}