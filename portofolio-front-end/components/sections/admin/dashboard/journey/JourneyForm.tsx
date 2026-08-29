"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import Card, { JourneyItem } from '@/components/sections/admin/dashboard/journey/Card';
import Modal from '@/components/sections/admin/dashboard/journey/Modal';

export default function JourneyForm() {
  const [journeys, setJourneys] = useState<JourneyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({ 
    year: '', 
    label: 'STUDIED AT', 
    title: '', 
    description: '' 
  });

  const fetchJourneys = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/journeys`);
      const json = await response.json();
      
      if (response.ok && json.success) {
        setJourneys(json.data);
      }

    } catch (error) {
      console.error("Gagal mengambil data perjalanan:", error);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  const handleOpenModal = (item?: JourneyItem) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ 
        year: item.year, 
        label: item.label, 
        title: item.title, 
        description: item.description 
      });

    } else {
      setEditingId(null);
      setFormData({ year: '', label: 'STUDIED AT', title: '', description: '' });
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
      const url = editingId ? `${baseUrl}/api/journeys/${editingId}` : `${baseUrl}/api/journeys`;

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
        fetchJourneys(); 
        handleCloseModal();
      } else {
        alert(json.message || 'Gagal menyimpan milestone');
      }

    } catch (error) {
      console.error("Save error:", error);
      alert("Terjadi kesalahan pada server.");

    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this journey milestone?')) {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        const response = await fetch(`${baseUrl}/api/journeys/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const json = await response.json();

        if (response.ok && json.success) {
          alert("Milestone berhasil dihapus!");
          setJourneys(journeys.filter(j => j.id !== id));
        } else {
          alert(json.message || 'Gagal menghapus milestone');
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
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage your educational and professional milestones.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add Milestone
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : journeys.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-[#7DD3FC]/30 dark:border-[#991B1B]/30 rounded-[32px]">
          <p className="text-[#0F172A]/50 dark:text-white/50 font-space">Belum ada milestone yang ditambahkan.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {journeys.map((item) => (
            <Card 
              key={item.id}
              item={item}
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