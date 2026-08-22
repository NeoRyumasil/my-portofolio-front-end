"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card, { ContactLink } from '@/components/sections/admin/dashboard/contact/Card';
import Modal from '@/components/sections/admin/dashboard/contact/Modal';

export default function ContactForm() {
  const [contacts, setContacts] = useState<ContactLink[]>([
    { id: '1', platform: 'LinkedIn', url: 'https://linkedin.com/in/alvin', iconType: 'lucide', iconValue: 'briefcase' },
    { id: '2', platform: 'GitHub', url: 'https://github.com/alvin', iconType: 'lucide', iconValue: 'globe' },
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
          <Card 
            key={contact.id}
            contact={contact}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}