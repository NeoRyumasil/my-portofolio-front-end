import React from 'react';
import { X, Save, Image as ImageIcon } from 'lucide-react';

interface ExpertiseModalProps {
  isOpen: boolean;
  editingId: string | null;
  formData: {
    name: string;
    category: 'web' | 'game';
    icon: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    category: 'web' | 'game';
    icon: string;
  }>>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function Modal({ isOpen, editingId, formData, setFormData, onClose, onSave }: ExpertiseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#121212] w-full max-w-lg rounded-[32px] p-8 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space">
            {editingId ? 'Edit Tool' : 'Add New Tool'}
          </h3>
          <button onClick={onClose} className="text-[#0F172A]/50 dark:text-white/50 hover:text-red-500 hover:rotate-90 transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space">Tool Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as 'web' | 'game' })}
              className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
            >
              <option value="web">Web & App Development</option>
              <option value="game">Game Development</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
              <ImageIcon size={16} /> Icon File Name / URL
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="e.g., /icons/laravel.svg"
              className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-4 rounded-xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-4"
          >
            <Save size={20} /> Save Tool
          </button>
        </form>

      </div>
    </div>
  );
}