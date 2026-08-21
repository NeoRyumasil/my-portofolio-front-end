"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Award, Building, Type, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface Credential {
  id: string;
  title: string;
  issuer: string;
  image: string;
  url: string;
}

export default function CredentialForm() {
  // Data default sesuai dengan desain UI kamu
  const [credentials, setCredentials] = useState<Credential[]>([
    { 
      id: 'azure-ai-900', 
      title: 'Azure AI 900 Fundamentals', 
      issuer: 'Microsoft', 
      image: '/image_73338d.png',
      url: 'https://learn.microsoft.com/' 
    },
    { 
      id: 'cloud-architect', 
      title: 'Cloud Architect Basics', 
      issuer: 'Various', 
      image: '/image_73338d.png',
      url: '#' 
    },
    { 
      id: 'softdev-mastery', 
      title: 'SoftDev Mastery', 
      issuer: 'Tech Institute', 
      image: '/image_73338d.png',
      url: '#' 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    image: '',
    url: ''
  });

  const handleOpenModal = (cert?: Credential) => {
    if (cert) {
      setEditingId(cert.id);
      setFormData({
        title: cert.title,
        issuer: cert.issuer,
        image: cert.image,
        url: cert.url || ''
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', issuer: '', image: '', url: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const certData: Credential = {
      id: editingId || formData.title.toLowerCase().replace(/\s+/g, '-'),
      title: formData.title,
      issuer: formData.issuer,
      image: formData.image || '/image_73338d.png',
      url: formData.url
    };

    if (editingId) {
      setCredentials(credentials.map(c => c.id === editingId ? certData : c));
    } else {
      setCredentials([certData, ...credentials]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this credential?')) {
      setCredentials(credentials.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      {/* Header & Add Button */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage your professional certifications and badges.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add Credential
        </button>
      </div>

      {/* Grid of Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {credentials.map((cert) => (
          <div key={cert.id} className="group flex flex-col bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:shadow-2xl hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300 relative">
            
            {/* Action Overlay */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <button onClick={() => handleOpenModal(cert)} className="p-2 bg-[#0369A1] text-white rounded-xl hover:bg-[#0284C7] hover:scale-110 transition-all shadow-md">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(cert.id)} className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:scale-110 transition-all shadow-md">
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
        ))}
      </div>

      {/* CRUD Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-[#121212] w-full max-w-xl rounded-[32px] p-6 md:p-8 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 animate-in zoom-in-95 duration-200 my-8">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <Award className="text-[#0369A1] dark:text-[#E11D48]" />
                {editingId ? 'Edit Credential' : 'Add New Credential'}
              </h3>
              <button onClick={handleCloseModal} className="text-[#0F172A]/50 dark:text-white/50 hover:text-red-500 hover:rotate-90 transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <Type size={16} /> Certification Title
                </label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Azure AI 900 Fundamentals" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <Building size={16} /> Issuing Organization
                </label>
                <input type="text" value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} placeholder="e.g., Microsoft" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <ImageIcon size={16} /> Certificate Image URL
                </label>
                <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="/image_placeholder.png" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <LinkIcon size={16} /> Verification URL (Optional)
                </label>
                <input type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://..." className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" />
              </div>

              <button type="submit" className="w-full flex justify-center items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-4 rounded-xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-2">
                <Save size={20} /> Save Credential
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}