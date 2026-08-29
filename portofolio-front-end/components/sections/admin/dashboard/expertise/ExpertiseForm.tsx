"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import Card, { Tool } from '@/components/sections/admin/dashboard/expertise/Card';
import Modal from '@/components/sections/admin/dashboard/expertise/Modal';

export default function ExpertiseForm() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'web' as 'web' | 'game', icon: '' });

  const webTools = tools.filter(t => t.category === 'web');
  const gameTools = tools.filter(t => t.category === 'game');

  const fetchTools = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/tools`);
      const json = await response.json();
      
      if (response.ok && json.success) {
        setTools(json.data);
      }

    } catch (error) {
      console.error("Gagal mengambil data tools:", error);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${baseUrl}/api/tools/${editingId}` : `${baseUrl}/api/tools`;

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
        fetchTools();
        handleCloseModal();

      } else {
        alert(json.message || 'Gagal menyimpan data tool');
      }

    } catch (error) {
      console.error("Save error:", error);
      alert("Terjadi kesalahan pada server.");

    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        const response = await fetch(`${baseUrl}/api/tools/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const json = await response.json();

        if (response.ok && json.success) {
          alert("Tool berhasil dihapus!");
          setTools(tools.filter(t => t.id !== id));

        } else {
          alert(json.message || 'Gagal menghapus tool');
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
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage the tools and frameworks you wield.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add New Tool
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : tools.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-[#7DD3FC]/30 dark:border-[#991B1B]/30 rounded-[32px]">
          <p className="text-[#0F172A]/50 dark:text-white/50 font-space">Belum ada tool yang ditambahkan.</p>
        </div>
      ) : (
        <>
          {webTools.length > 0 && (
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
          )}

          {gameTools.length > 0 && (
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
          )}
        </>
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