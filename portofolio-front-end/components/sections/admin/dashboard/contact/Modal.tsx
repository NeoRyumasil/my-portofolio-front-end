"use client";

import React, { useState } from 'react';
import { XIcon, Globe, ImageIcon, Type, Link as LinkIcon, Save, Loader2, UploadCloud } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  editingId: string | null;
  isSaving: boolean;
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

export default function Modal({ isOpen, editingId, formData, setFormData, onClose, onSave, isSaving }: ContactModalProps) {
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${baseUrl}/api/upload`, {
        method: 'POST',
        credentials: 'include', 
        body: uploadData
      });

      const json = await response.json();

      if (response.ok && json.success) {
        setFormData({ ...formData, iconValue: json.url });
      } else {
        alert(json.message || 'Gagal mengunggah ikon ke Google Drive');
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan server saat mengunggah ikon.");
    } finally {
      setIsUploading(false);
    }
  };

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
                {formData.iconType === 'lucide' ? 'Select Icon' : 'Image Icon'}
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
                <div className="space-y-2">
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" 
                    />
                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0369A1]/10 dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] border border-[#0369A1]/30 dark:border-[#E11D48]/30 rounded-xl font-bold text-xs transition-colors hover:bg-[#0369A1]/20">
                      {isUploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                      {isUploading ? 'Uploading...' : 'Choose File'}
                    </div>
                  </div>
                  <input 
                    type="text" 
                    value={formData.iconValue} 
                    onChange={(e) => setFormData({ ...formData, iconValue: e.target.value })} 
                    placeholder="Or paste URL..." 
                    className="w-full px-2 py-1 text-xs bg-transparent border-b border-[#7DD3FC]/50 dark:border-[#991B1B]/50 text-[#0F172A] dark:text-white focus:outline-none"
                    required
                  />
                </div>
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

          <button 
            type="submit" 
            disabled={isSaving || isUploading}
            className="w-full flex justify-center items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-4 rounded-xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-4 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {isSaving ? 'Saving...' : 'Save Contact'}
          </button>
        </form>

      </div>
    </div>
  );
}