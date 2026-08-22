"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card, { Tool } from '@/components/sections/admin/dashboard/expertise/Card';
import Modal from '@/components/sections/admin/dashboard/expertise/Modal';

export default function ExpertiseForm() {
  const [tools, setTools] = useState<Tool[]>([
    { id: '1', name: 'Laravel', category: 'web', icon: '/icons/laravel.svg' },
    { id: '2', name: 'Next.js', category: 'web', icon: '/icons/nextjs.svg' },
    { id: '3', name: 'Flutter', category: 'web', icon: '/icons/flutter.svg' },
    { id: '4', name: 'Python', category: 'web', icon: '/icons/python.svg' },
    { id: '5', name: 'Go', category: 'web', icon: '/icons/go.svg' },
    { id: '6', name: 'Supabase', category: 'web', icon: '/icons/supabase.svg' },
    { id: '7', name: 'Unity', category: 'game', icon: '/icons/unity.svg' },
    { id: '8', name: 'Godot', category: 'game', icon: '/icons/godot.svg' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', category: 'web' as 'web' | 'game', icon: '' });

  const webTools = tools.filter(t => t.category === 'web');
  const gameTools = tools.filter(t => t.category === 'game');

  const handleOpenModal = (tool?: Tool) => {
    if (tool) {
      setEditingId(tool.id);
      setFormData({ name: tool.name, category: tool.category, icon: tool.icon });
    } else {
      setEditingId(null);
      setFormData({ name: '', category: 'web', icon: '' });
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
      setTools(tools.map(t => t.id === editingId ? { ...t, ...formData } : t));
    } else {
      const newTool: Tool = { id: Date.now().toString(), ...formData };
      setTools([...tools, newTool]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      setTools(tools.filter(t => t.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage the tools and frameworks you wield.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add New Tool
        </button>
      </div>

      {/* Grid Web Development */}
      <div className="bg-white dark:bg-[#121212] p-8 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 mb-8">
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space mb-6 pb-4 border-b border-[#7DD3FC]/10 dark:border-[#991B1B]/20">
          Web & App Development
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {webTools.map((tool) => (
            <Card key={tool.id} tool={tool} onEdit={handleOpenModal} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      {/* Grid Game Development */}
      <div className="bg-white dark:bg-[#121212] p-8 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 mb-8">
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space mb-6 pb-4 border-b border-[#7DD3FC]/10 dark:border-[#991B1B]/20">
          Game Development
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {gameTools.map((tool) => (
            <Card key={tool.id} tool={tool} onEdit={handleOpenModal} onDelete={handleDelete} />
          ))}
        </div>
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