"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import Card, { Credential } from '@/components/sections/admin/dashboard/credential/Card';
import Modal from '@/components/sections/admin/dashboard/credential/Modal';

export default function CredentialForm() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    image: '',
    url: ''
  });

  const fetchCredentials = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/credentials?limit=50`);
      const json = await response.json();
      
      if (response.ok && json.success) {
        setCredentials(json.data);
      }

    } catch (error) {
      console.error("Gagal mengambil data kredensial:", error);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${baseUrl}/api/credentials/${editingId}` : `${baseUrl}/api/credentials`;

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
        fetchCredentials(); 
        handleCloseModal();
      } else {
        alert(json.message || 'Gagal menyimpan kredensial');
      }

    } catch (error) {
      console.error("Save error:", error);
      alert("Terjadi kesalahan pada server.");

    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this credential?')) {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        const response = await fetch(`${baseUrl}/api/credentials/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const json = await response.json();

        if (response.ok && json.success) {
          alert("Kredensial berhasil dihapus!");
          setCredentials(credentials.filter(c => c.id !== id));

        } else {
          alert(json.message || 'Gagal menghapus kredensial');
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
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage your professional certifications and badges.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add Credential
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : credentials.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-[#7DD3FC]/30 dark:border-[#991B1B]/30 rounded-[32px]">
          <p className="text-[#0F172A]/50 dark:text-white/50 font-space">Belum ada kredensial yang ditambahkan.</p>
        </div>
      ) : (
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