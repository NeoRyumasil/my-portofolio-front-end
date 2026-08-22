import React from 'react';
import { XIcon, Globe, ImageIcon, Type, Link as LinkIcon, Save } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  editingId: string | null;
  formData: {
    platform: string;
    url: string;
    iconType: 'lucide' | 'image';
    iconValue: string;
  };

  setFormData: React.Dispatch<React.SetStateAction<{
    platform: string;
    url: string;
    iconType: 'lucide' | 'image';
    iconValue: string;
  }>>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function Modal({ isOpen, editingId, formData, setFormData, onClose, onSave }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-[#121212] w-full max-w-lg rounded-[32px] p-8 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
            <Globe className="text-[#0369A1] dark:text-[#E11D48]" />
            {editingId ? 'Edit Contact' : 'Add New Contact'}
          </h3>
          <button onClick={onClose} className="text-[#0F172A]/50 dark:text-white/50 hover:text-red-500 hover:rotate-90 transition-all">
            <XIcon size={24} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
              <Type size={16} /> Platform Name
            </label>
            <input 
              type="text" 
              value={formData.platform} 
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })} 
              placeholder="e.g., LinkedIn" 
              className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <Globe size={16} /> Icon Style
              </label>
              <select 
                value={formData.iconType} 
                onChange={(e) => {
                  const type = e.target.value as 'lucide' | 'image';
                  setFormData({ ...formData, iconType: type, iconValue: type === 'lucide' ? 'mail' : '' });
                }} 
                className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] appearance-none"
              >
                <option value="lucide">Lucide Icons</option>
                <option value="image">Custom Image</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                {formData.iconType === 'lucide' ? <Globe size={16}/> : <ImageIcon size={16}/>} 
                {formData.iconType === 'lucide' ? 'Select Icon' : 'Image URL'}
              </label>
              
              {formData.iconType === 'lucide' ? (
                <select 
                  value={formData.iconValue} 
                  onChange={(e) => setFormData({ ...formData, iconValue: e.target.value })} 
                  className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] appearance-none"
                >
                  <option value="briefcase">Briefcase (Work)</option>
                  <option value="mail">Email</option>
                  <option value="twitter">X / Twitter</option>
                  <option value="globe">Globe / Web</option>
                </select>
              ) : (
                <input 
                  type="url" 
                  value={formData.iconValue} 
                  onChange={(e) => setFormData({ ...formData, iconValue: e.target.value })} 
                  placeholder="https://..." 
                  className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
                  required
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
              <LinkIcon size={16} /> Contact URL
            </label>
            <input 
              type="text" 
              value={formData.url} 
              onChange={(e) => setFormData({ ...formData, url: e.target.value })} 
              placeholder="https://..." 
              className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" 
              required 
            />
          </div>

          <button type="submit" className="w-full flex justify-center items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-4 rounded-xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-4">
            <Save size={20} /> Save Contact
          </button>
        </form>

      </div>
    </div>
  );
}