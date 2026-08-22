"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card, { Credential } from '@/components/sections/admin/dashboard/credential/Card';
import Modal from '@/components/sections/admin/dashboard/credential/Modal';

export default function CredentialForm() {
  const [credentials, setCredentials] = useState<Credential[]>([
    { id: 'azure-ai-900', title: 'Azure AI 900 Fundamentals', issuer: 'Microsoft', image: '/image_73338d.png', url: 'https://learn.microsoft.com/' },
    { id: 'cloud-architect', title: 'Cloud Architect Basics', issuer: 'Various', image: '/image_73338d.png', url: '#' },
    { id: 'softdev-mastery', title: 'SoftDev Mastery', issuer: 'Tech Institute', image: '/image_73338d.png', url: '#' },
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
      <div className="flex justify-between items-center mb-8">
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage your professional certifications and badges.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add Credential
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {credentials.map((cert) => (
          <Card 
            key={cert.id}
            cert={cert}
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