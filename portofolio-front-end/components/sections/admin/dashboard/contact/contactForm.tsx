"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import Card, { ContactLink } from '@/components/sections/admin/dashboard/contact/Card';
import Modal from '@/components/sections/admin/dashboard/contact/Modal';

export default function ContactForm() {
  const [contacts, setContacts] = useState<ContactLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    iconType: 'lucide' as 'lucide' | 'image',
    iconValue: 'mail'
  });

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/contacts`);
      const json = await response.json();
      
      if (response.ok && json.success) {
        setContacts(json.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data kontak:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${baseUrl}/api/contacts/${editingId}` : `${baseUrl}/api/contacts`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });

      const json = await response.json();

      if (response.ok && json.success) {
        alert(json.message);
        fetchContacts(); 
        handleCloseModal();
      } else {
        alert(json.message || 'Gagal menyimpan kontak');
      }

    } catch (error) {
      console.error("Save error:", error);
      alert("Terjadi kesalahan pada server.");

    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact link?')) {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        const response = await fetch(`${baseUrl}/api/contacts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const json = await response.json();

        if (response.ok && json.success) {
          alert("Kontak berhasil dihapus!");
          setContacts(contacts.filter(c => c.id !== id));

        } else {
          alert(json.message || 'Gagal menghapus kontak');
        }
        
      } catch (error) {
        console.error("Delete error:", error);
        alert("Terjadi kesalahan pada server.");
      }
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

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-[#7DD3FC]/30 dark:border-[#991B1B]/30 rounded-[32px]">
          <p className="text-[#0F172A]/50 dark:text-white/50 font-space">Belum ada kontak yang ditambahkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {contacts.map((contact) => (
            <Card 
              key={contact.id}
              contact={contact}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        onClose={handleCloseModal}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}