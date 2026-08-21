"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, XIcon, Save, Briefcase, Mail, Link as LinkIcon, Type, Globe, ImageIcon } from 'lucide-react';

interface ContactLink {
  id: string;
  platform: string;
  url: string;
  iconType: 'lucide' | 'image'; // Tambahan tipe ikon
  iconValue: string; // Menyimpan nama lucide ATAU url gambar
}

export default function ContactForm() {
  // Data default
  const [contacts, setContacts] = useState<ContactLink[]>([
    { id: '1', platform: 'LinkedIn', url: 'https://linkedin.com/in/alvin', iconType: 'lucide', iconValue: 'briefcase' },
    { id: '2', platform: 'GitHub', url: 'https://github.com/alvin', iconType: 'lucide', iconValue: 'github' },
    { id: '3', platform: 'Email', url: 'mailto:alvin@example.com', iconType: 'lucide', iconValue: 'mail' },
    { id: '4', platform: 'X / Twitter', url: 'https://twitter.com/alvin', iconType: 'lucide', iconValue: 'twitter' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    iconType: 'lucide' as 'lucide' | 'image',
    iconValue: 'mail'
  });

  const handleOpenModal = (contact?: ContactLink) => {
    if (contact) {
      setEditingId(contact.id);
      setFormData({
        platform: contact.platform,
        url: contact.url,
        iconType: contact.iconType || 'lucide',
        iconValue: contact.iconValue
      });
    } else {
      setEditingId(null);
      setFormData({ platform: '', url: '', iconType: 'lucide', iconValue: 'mail' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const contactData: ContactLink = {
      id: editingId || Date.now().toString(),
      platform: formData.platform,
      url: formData.url,
      iconType: formData.iconType,
      iconValue: formData.iconValue
    };

    if (editingId) {
      setContacts(contacts.map(c => c.id === editingId ? contactData : c));
    } else {
      setContacts([...contacts, contactData]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact link?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  // Helper untuk merender Ikon atau Gambar
  const renderIcon = (type: 'lucide' | 'image', value: string, size = 28) => {
    if (type === 'image') {
      return (
        <img 
          src={value} 
          alt="Custom Icon" 
          className="object-contain rounded-md"
          style={{ width: size, height: size }}
          onError={(e) => {
             // Fallback kalau gambarnya error/broken
             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error';
          }}
        />
      );
    }

    switch (value) {
      case 'briefcase': return <Briefcase size={size} />;
      case 'github': return <Globe size={size} />;
      case 'mail': return <Mail size={size} />;
      case 'twitter': return <XIcon size={size} />;
      case 'instagram': return <Globe size={size} />;
      default: return <Globe size={size} />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage your social media and contact links.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add Contact
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className="group relative bg-white dark:bg-[#121212] aspect-square rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300 cursor-pointer"
          >
            
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <button onClick={(e) => { e.stopPropagation(); handleOpenModal(contact); }} className="p-1.5 bg-[#0369A1] text-white rounded-lg hover:bg-[#0284C7] hover:scale-110 transition-all" title="Edit Contact">
                <Edit2 size={14} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }} className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-110 transition-all" title="Delete Contact">
                <Trash2 size={14} />
              </button>
            </div>

            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              contact.iconType === 'image' 
                ? 'bg-transparent' // Kalau gambar, background transparan aja biar nyatu
                : 'bg-[#F0F9FF] dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#F43F5E] group-hover:bg-[#0369A1] dark:group-hover:bg-[#E11D48] group-hover:text-white'
            }`}>
              {renderIcon(contact.iconType, contact.iconValue, contact.iconType === 'image' ? 40 : 28)}
            </div>
            
            <span className="font-bold text-[#0F172A] dark:text-white font-space text-sm">
              {contact.platform}
            </span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-[#121212] w-full max-w-lg rounded-[32px] p-8 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <Globe className="text-[#0369A1] dark:text-[#E11D48]" />
                {editingId ? 'Edit Contact' : 'Add New Contact'}
              </h3>
              <button onClick={handleCloseModal} className="text-[#0F172A]/50 dark:text-white/50 hover:text-red-500 hover:rotate-90 transition-all">
                <XIcon size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              
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
                {/* Pilihan Tipe Ikon */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                    <Globe size={16} /> Icon Style
                  </label>
                  <select 
                    value={formData.iconType} 
                    onChange={(e) => {
                      const type = e.target.value as 'lucide' | 'image';
                      // Reset value saat ganti tipe biar formnya kosong/rapi
                      setFormData({ ...formData, iconType: type, iconValue: type === 'lucide' ? 'mail' : '' });
                    }} 
                    className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] appearance-none"
                  >
                    <option value="lucide">Lucide Icons</option>
                    <option value="image">Custom Image</option>
                  </select>
                </div>

                {/* Dinamis: Tampilkan Select atau Input tergantung pilihan di atas */}
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
                      <option value="github">GitHub</option>
                      <option value="mail">Email</option>
                      <option value="twitter">X / Twitter</option>
                      <option value="instagram">Instagram</option>
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
      )}
    </div>
  );
}