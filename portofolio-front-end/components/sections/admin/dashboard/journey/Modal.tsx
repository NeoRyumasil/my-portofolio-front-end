import React from 'react';
import { X, Save, Calendar, MapPin, AlignLeft, GraduationCap, Loader2 } from 'lucide-react';

interface JourneyModalProps {
  isOpen: boolean;
  editingId: string | null;
  isSaving: boolean;
  formData: {
    year: string;
    label: string;
    title: string;
    description: string;
  };
  
  setFormData: React.Dispatch<React.SetStateAction<{
    year: string;
    label: string;
    title: string;
    description: string;
  }>>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function Modal({ isOpen, editingId, formData, setFormData, onClose, onSave, isSaving }: JourneyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#121212] w-full max-w-xl rounded-[32px] p-8 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
            <GraduationCap className="text-[#0369A1] dark:text-[#E11D48]" />
            {editingId ? 'Edit Milestone' : 'Add New Milestone'}
          </h3>
          <button onClick={onClose} className="text-[#0F172A]/50 dark:text-white/50 hover:text-red-500 hover:rotate-90 transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <Calendar size={16} /> Period / Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g., 2024 - Present"
                className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <MapPin size={16} /> Subtitle Label
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., STUDIED AT / WORKED AT"
                className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
              <GraduationCap size={16} /> Institution / Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Telkom University Bandung"
              className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
              <AlignLeft size={16} /> Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detail your achievements or focus..."
              rows={3}
              className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full flex justify-center items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-4 rounded-xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-2 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {isSaving ? 'Saving...' : 'Save Milestone'}
          </button>
        </form>

      </div>
    </div>
  );
}