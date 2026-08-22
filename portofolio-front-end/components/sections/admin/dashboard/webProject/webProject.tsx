"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card, { WebProject as WebProjectType } from '@/components/sections/admin/dashboard/webProject/Card';
import Modal from '@/components/sections/admin/dashboard/webProject/Modal';

export default function WebProject() {
  const [projects, setProjects] = useState<WebProjectType[]>([
    { id: 'gudang-damar', year: '2026 - Present', title: 'Gudang Damar', tech: ['Flutter', 'Laravel', 'Supabase'], role: 'Fullstack Developer', description: 'A comprehensive warehouse management application designed to optimize store inventory and price tracking. Built with a strong focus on seamless user experience using Flutter and robust business logic on the backend with Laravel.', image: '/image_73338d.png', url: 'https://gudangdamar.example.com' },
    { id: 'ase-dashboard', year: '2026', title: 'ASE Media Dashboard', tech: ['Next.js', 'Supabase'], role: 'PR & Dev', description: 'An internal dashboard to manage media partner collaborations and streamline communication deliverables.', image: '/image_73338d.png', url: 'https://ase-dashboard.example.com' },
    { id: 'taskmaster-pro', year: '2025', title: 'TaskMaster Pro', tech: ['Vue.js', 'Node.js'], role: 'Backend Dev', description: 'A productivity app aimed at teams, featuring Kanban boards, time tracking, and automated reporting.', image: '/image_73338d.png', url: 'https://github.com/alvin/taskmaster' }
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

  const handleOpenModal = (project?: WebProjectType) => {
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

    const projectData: WebProjectType = {
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
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <p className="text-[#0F172A]/70 dark:text-white/70">Manage your web and application portfolios.</p>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-3 rounded-2xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} /> Add Project
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