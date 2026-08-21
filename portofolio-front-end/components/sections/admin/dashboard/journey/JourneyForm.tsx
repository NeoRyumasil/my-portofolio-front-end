"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Calendar, MapPin, AlignLeft, GraduationCap } from 'lucide-react';

interface JourneyItem {
  id: string;
  year: string;
  label: string;
  title: string;
  description: string;
}

export default function JourneyForm() {
  // Data default sesuai dengan desain UI My Journey kamu
  const [journeys, setJourneys] = useState<JourneyItem[]>([
    { 
      id: '1', 
      year: '2020 - 2023', 
      label: 'STUDIED AT', 
      title: 'Vocational High School 13 Bandung', 
      description: 'Graduated as a Software Engineering major.' 
    },
    { 
      id: '2', 
      year: '2024 - Present', 
      label: 'STUDIED AT', 
      title: 'Telkom University Bandung', 
      description: "Pursuing a Bachelor's degree in Information Technology." 
    }
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
      // Tambah di awal array biar yang terbaru muncul di atas
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
      {/* Header & Add Button */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage your educational and professional milestones.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add Milestone
        </button>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {journeys.map((item) => (
          <div 
            key={item.id} 
            className="group relative bg-white dark:bg-[#121212] p-6 md:p-8 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex flex-col md:flex-row gap-6 md:gap-12 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0369A1]/5 dark:hover:shadow-[#E11D48]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300"
          >
            {/* Action Buttons (Muncul saat di-hover) */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <button 
                onClick={() => handleOpenModal(item)} 
                className="p-2 bg-[#0369A1] text-white rounded-xl hover:bg-[#0284C7] hover:scale-110 transition-all"
                title="Edit Milestone"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => handleDelete(item.id)} 
                className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:scale-110 transition-all"
                title="Delete Milestone"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Bagian Kiri: Tahun */}
            <div className="w-full md:w-1/4 flex items-center md:items-start gap-4">
              <div className="w-4 h-4 rounded-full bg-[#0369A1] dark:bg-[#E11D48] mt-1 shrink-0 group-hover:scale-125 transition-transform"></div>
              <h3 className="text-2xl font-black text-[#0F172A] dark:text-white font-space">
                {item.year}
              </h3>
            </div>

            {/* Bagian Kanan: Detail Konten */}
            <div className="w-full md:w-3/4 space-y-2 bg-[#F0F9FF]/50 dark:bg-[#000000]/30 p-6 rounded-2xl border border-[#7DD3FC]/10 dark:border-[#991B1B]/10">
              <span className="text-xs font-bold text-[#0369A1] dark:text-[#E11D48] tracking-widest uppercase font-space">
                {item.label}
              </span>
              <h4 className="text-xl font-bold text-[#0F172A] dark:text-white font-space group-hover:text-[#0369A1] dark:group-hover:text-[#F43F5E] transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-[#0F172A]/70 dark:text-white/70">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CRUD Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121212] w-full max-w-xl rounded-[32px] p-8 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <GraduationCap className="text-[#0369A1] dark:text-[#E11D48]" />
                {editingId ? 'Edit Milestone' : 'Add New Milestone'}
              </h3>
              <button onClick={handleCloseModal} className="text-[#0F172A]/50 dark:text-white/50 hover:text-red-500 hover:rotate-90 transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Input Year */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                    <Calendar size={16} /> Period / Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g., 2024 - Present"
                    className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
                    required
                  />
                </div>

                {/* Input Label */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                    <MapPin size={16} /> Subtitle Label
                  </label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g., STUDIED AT / WORKED AT"
                    className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
                    required
                  />
                </div>
              </div>

              {/* Input Title */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <GraduationCap size={16} /> Institution / Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Telkom University Bandung"
                  className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
                  required
                />
              </div>

              {/* Input Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <AlignLeft size={16} /> Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail your achievements or focus..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-4 rounded-xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-2"
              >
                <Save size={20} /> Save Milestone
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}