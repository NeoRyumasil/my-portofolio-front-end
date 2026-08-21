"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Code, Box } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: 'web' | 'game';
  icon: string;
}

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

  // Komponen ToolGrid yang sudah di-upgrade efek hover-nya
  const ToolGrid = ({ title, data }: { title: string, data: Tool[] }) => (
    <div className="bg-white dark:bg-[#121212] p-8 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 mb-8">
      <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space mb-6 pb-4 border-b border-[#7DD3FC]/10 dark:border-[#991B1B]/20">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((tool) => (
          <div 
            key={tool.id} 
            className="group relative bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0369A1]/10 dark:hover:shadow-[#E11D48]/10 hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300 cursor-pointer"
          >
            
            {/* Action Overlay */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <button 
                onClick={(e) => { e.stopPropagation(); handleOpenModal(tool); }} 
                className="p-1.5 bg-[#0369A1] text-white rounded-lg hover:bg-[#0284C7] hover:scale-110 transition-all"
                title="Edit Tool"
              >
                <Edit2 size={14} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(tool.id); }} 
                className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-110 transition-all"
                title="Delete Tool"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Icon Container dengan Animasi */}
            <div className="w-12 h-12 flex items-center justify-center text-[#0369A1]/70 dark:text-[#E11D48]/70 group-hover:text-[#0369A1] dark:group-hover:text-[#F43F5E] group-hover:scale-110 transition-all duration-300">
               {tool.category === 'web' ? <Code size={32} /> : <Box size={32} />}
            </div>
            
            {/* Nama Tool */}
            <span className="font-bold text-[#0F172A]/70 dark:text-white/70 font-space text-sm text-center group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors duration-300">
              {tool.name}
            </span>
            
          </div>
        ))}
      </div>
    </div>
  );

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

      <ToolGrid title="Web & App Development" data={webTools} />
      <ToolGrid title="Game Development" data={gameTools} />

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121212] w-full max-w-lg rounded-[32px] p-8 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space">
                {editingId ? 'Edit Tool' : 'Add New Tool'}
              </h3>
              <button onClick={handleCloseModal} className="text-[#0F172A]/50 dark:text-white/50 hover:text-red-500 hover:rotate-90 transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space">Tool Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'web' | 'game' })}
                  className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
                >
                  <option value="web">Web & App Development</option>
                  <option value="game">Game Development</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <ImageIcon size={16} /> Icon File Name / URL
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., /icons/laravel.svg"
                  className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-4 rounded-xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-4"
              >
                <Save size={20} /> Save Tool
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}