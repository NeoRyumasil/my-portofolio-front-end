"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card, { GameProject } from '@/components/sections/admin/dashboard/gameProject/Card';
import Modal from '@/components/sections/admin/dashboard/gameProject/Modal';

export default function GameProjectForm() {
  const [projects, setProjects] = useState<GameProject[]>([
    {
      id: 'hutan-kabut',
      year: '2026',
      title: 'Kehidupan Baru di Hutan Kabut',
      tech: ['RPG Maker', 'Pixel Art', 'Storytelling'],
      role: 'Game Designer & Writer',
      description: 'An interactive narrative game featuring unique characters like Rodhette, Granny, and Mr. Wolf. Focuses on immersive storytelling, branching dialogues, and vertical 4-panel visual mechanics.',
      image: '/image_73338d.png',
      url: 'https://alvin.itch.io/hutan-kabut'
    },
    {
      id: 'ethereal-realm',
      year: '2025',
      title: 'Ethereal Realm',
      tech: ['Unity', 'C#', 'WebGL'],
      role: 'Game Programmer',
      description: 'A visually striking, interactive 3D web experience exploring abstract landscapes and soft-tech aesthetics. Developed complex character controllers and environment interactions.',
      image: '/image_73338d.png',
      url: 'https://alvin.itch.io/ethereal-realm'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    techString: '', 
    role: '',
    description: '',
    image: '',
    url: ''
  });

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const techArray = formData.techString.split(',').map(item => item.trim()).filter(item => item !== '');

    const projectData: GameProject = {
      id: editingId || formData.title.toLowerCase().replace(/\s+/g, '-'),
      year: formData.year,
      title: formData.title,
      tech: techArray,
      role: formData.role,
      description: formData.description,
      image: formData.image || '/image_73338d.png',
      url: formData.url
    };

    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? projectData : p));
    } else {
      setProjects([projectData, ...projects]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this game project?')) {
      setProjects(projects.filter(p => p.id !== id));
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