"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card, { JourneyItem } from '@/components/sections/admin/dashboard/journey/Card';
import Modal from '@/components/sections/admin/dashboard/journey/Modal';

export default function JourneyForm() {
  const [journeys, setJourneys] = useState<JourneyItem[]>([
    { id: '1', year: '2020 - 2023', label: 'STUDIED AT', title: 'Vocational High School 13 Bandung', description: 'Graduated as a Software Engineering major.' },
    { id: '2', year: '2024 - Present', label: 'STUDIED AT', title: 'Telkom University Bandung', description: "Pursuing a Bachelor's degree in Information Technology." }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ year: '', label: 'STUDIED AT', title: '', description: '' });

  const handleOpenModal = (item?: JourneyItem) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ year: item.year, label: item.label, title: item.title, description: item.description });
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setJourneys(journeys.map(j => j.id === editingId ? { ...j, ...formData } : j));
    } else {
      const newItem: JourneyItem = { id: Date.now().toString(), ...formData };
      setJourneys([newItem, ...journeys]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this journey milestone?')) {
      setJourneys(journeys.filter(j => j.id !== id));
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