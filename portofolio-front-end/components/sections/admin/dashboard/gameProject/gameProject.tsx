"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import Card, { GameProject } from '@/components/sections/admin/dashboard/gameProject/Card';
import Modal from '@/components/sections/admin/dashboard/gameProject/Modal';

export default function GameProjectForm() {
  const [projects, setProjects] = useState<GameProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    techString: '', 
    role: '',
    description: '',
    image: '',
    url: ''
  });

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/game-projects?limit=50`);
      const json = await response.json();
      
      if (response.ok && json.success) {
        setProjects(json.data);
      }

    } catch (error) {
      console.error("Gagal mengambil data proyek game:", error);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project?: GameProject) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        year: project.year,
        title: project.title,
        techString: project.tech.join(', '), 
        role: project.role,
        description: project.description,
        image: project.image,
        url: project.url || ''
      });

    } else {
      setEditingId(null);
      setFormData({ year: '', title: '', techString: '', role: '', description: '', image: '', url: '' });
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
      
      const techArray = formData.techString.split(',').map(item => item.trim()).filter(item => item !== '');

      const payload = {
        title: formData.title,
        year: formData.year,
        tech: techArray,
        role: formData.role,
        description: formData.description,
        image: formData.image,
        url: formData.url
      };

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${baseUrl}/api/game-projects/${editingId}` : `${baseUrl}/api/game-projects`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const json = await response.json();

      if (response.ok && json.success) {
        alert(json.message);
        fetchProjects(); 
        handleCloseModal();

      } else {
        alert(json.message || 'Gagal menyimpan proyek game');
      }

    } catch (error) {
      console.error("Save error:", error);
      alert("Terjadi kesalahan pada server.");

    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this game project?')) {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        const response = await fetch(`${baseUrl}/api/game-projects/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const json = await response.json();

        if (response.ok && json.success) {
          alert("Proyek game berhasil dihapus!");
          setProjects(projects.filter(p => p.id !== id));

        } else {
          alert(json.message || 'Gagal menghapus proyek');
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
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage your game development showcases.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add Game
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-[#7DD3FC]/30 dark:border-[#991B1B]/30 rounded-[32px]">
          <p className="text-[#0F172A]/50 dark:text-white/50 font-space">Belum ada proyek game yang ditambahkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id}
              project={project}
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