"use client";

import React, { useState, useRef } from 'react';
import { X, Save, Image as ImageIcon, Calendar, Briefcase, Code, AlignLeft, Type, Link as LinkIcon, Loader2, UploadCloud, Bold, Italic, Heading2, List, Quote } from 'lucide-react';

interface WebProjectModalProps {
  isOpen: boolean;
  editingId: string | null;
  isSaving: boolean;
  formData: {
    year: string;
    title: string;
    techString: string;
    role: string;
    description: string;
    image: string;
    url: string;
  };
  
  setFormData: React.Dispatch<React.SetStateAction<{
    year: string;
    title: string;
    techString: string;
    role: string;
    description: string;
    image: string;
    url: string;
  }>>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function Modal({isOpen, editingId, formData, setFormData, onClose, onSave, isSaving }: WebProjectModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen) return null;

  const handleInsertFormat = (syntaxBefore: string, syntaxAfter: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.description;
    const selectedText = text.substring(start, end);

    const replacement = `${syntaxBefore}${selectedText || 'Text'}${syntaxAfter}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);

    setFormData({ ...formData, description: newText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntaxBefore.length, end + syntaxBefore.length);
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${baseUrl}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });

      const json = await response.json();

      if (response.ok && json.success) {
        setFormData({ ...formData, image: json.url });
      } else {
        alert(json.message || 'Gagal mengunggah gambar ke Google Drive');
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan server saat mengunggah gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white dark:bg-[#121212] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] p-6 md:p-8 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 animate-in zoom-in-95 duration-200 custom-scrollbar">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
            <Briefcase className="text-[#0369A1] dark:text-[#E11D48]" />
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onClose} className="text-[#0F172A]/50 dark:text-white/50 hover:text-red-500 hover:rotate-90 transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-5 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <Type size={16} /> Project Title
              </label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <Calendar size={16} /> Year / Period
              </label>
              <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="e.g., 2026 - Present" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <Code size={16} /> Tech Stack (Comma separated)
              </label>
              <input type="text" value={formData.techString} onChange={(e) => setFormData({ ...formData, techString: e.target.value })} placeholder="e.g., Flutter, Laravel, Supabase" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <Briefcase size={16} /> Your Role
              </label>
              <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g., Fullstack Developer" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
              <LinkIcon size={16} /> Project URL (Live / Repo)
            </label>
            <input type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://..." className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" />
          </div>

          <div className="space-y-2 border border-[#7DD3FC]/30 dark:border-[#991B1B]/30 p-4 rounded-2xl bg-[#F0F9FF]/20 dark:bg-[#000000]/20">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2 mb-3">
              <ImageIcon size={16} /> Project Thumbnail
            </label>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-32 h-24 bg-[#F0F9FF] dark:bg-[#121212] rounded-xl border border-dashed border-[#0369A1]/50 dark:border-[#E11D48]/50 overflow-hidden flex items-center justify-center shrink-0 relative group">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-[#0F172A]/30 dark:text-white/30" size={32} />
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={24} />
                  </div>
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" 
                  />
                  <div className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0369A1]/10 dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] border border-[#0369A1]/30 dark:border-[#E11D48]/30 rounded-xl font-bold font-space transition-colors hover:bg-[#0369A1]/20 dark:hover:bg-[#E11D48]/20">
                    {isUploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                    {isUploading ? 'Uploading to GDrive...' : 'Choose Image File'}
                  </div>
                </div>
            
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
                  placeholder="Or paste GDrive URL here..." 
                  className="w-full px-4 py-2 text-xs bg-transparent border-b border-[#7DD3FC]/50 dark:border-[#991B1B]/50 text-[#0F172A] dark:text-white focus:outline-none focus:border-[#0369A1] dark:focus:border-[#E11D48]" 
                />
              </div>
            </div>
          </div>

          {/* Text Editor */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center justify-between">
              <span className="flex items-center gap-2"><AlignLeft size={16} /> Description / Full Case Study</span>
              <span className="text-xs text-[#0369A1] dark:text-[#E11D48] font-normal">Markdown Supported</span>
            </label>
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#F0F9FF] dark:bg-[#1E1E1E] border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-t-xl">
              <button
                type="button"
                onClick={() => handleInsertFormat('## ')}
                className="p-2 hover:bg-[#0369A1]/20 dark:hover:bg-[#E11D48]/20 rounded-lg text-[#0F172A] dark:text-white transition-colors"
                title="Heading 2"
              >
                <Heading2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleInsertFormat('**', '**')}
                className="p-2 hover:bg-[#0369A1]/20 dark:hover:bg-[#E11D48]/20 rounded-lg text-[#0F172A] dark:text-white transition-colors"
                title="Bold"
              >
                <Bold size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleInsertFormat('*', '*')}
                className="p-2 hover:bg-[#0369A1]/20 dark:hover:bg-[#E11D48]/20 rounded-lg text-[#0F172A] dark:text-white transition-colors"
                title="Italic"
              >
                <Italic size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleInsertFormat('- ')}
                className="p-2 hover:bg-[#0369A1]/20 dark:hover:bg-[#E11D48]/20 rounded-lg text-[#0F172A] dark:text-white transition-colors"
                title="Bullet List"
              >
                <List size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleInsertFormat('> ')}
                className="p-2 hover:bg-[#0369A1]/20 dark:hover:bg-[#E11D48]/20 rounded-lg text-[#0F172A] dark:text-white transition-colors"
                title="Quote"
              >
                <Quote size={16} />
              </button>
            </div>

            <textarea 
              ref={textareaRef}
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              rows={12} 
              placeholder="Write your case study here. Use the toolbar above for headings, bold, or lists..." 
              className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border-t-0 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-b-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] resize-y min-h-[220px]" 
              required 
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSaving || isUploading}
              className="w-full flex justify-center items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-4 rounded-xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-2 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              {isSaving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}