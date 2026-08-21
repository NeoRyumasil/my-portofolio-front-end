"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Calendar, Briefcase, Code, AlignLeft, Type, Link as LinkIcon, ExternalLink } from 'lucide-react';

// 1. Tambahkan property 'url' di interface
interface WebProject {
  id: string;
  year: string;
  title: string;
  tech: string[];
  role: string;
  description: string;
  image: string;
  url: string; 
}

export default function WebProject() {
  // 2. Tambahkan default value untuk 'url'
  const [projects, setProjects] = useState<WebProject[]>([
    {
      id: 'gudang-damar',
      year: '2026 - Present',
      title: 'Gudang Damar',
      tech: ['Flutter', 'Laravel', 'Supabase'],
      role: 'Fullstack Developer',
      description: 'A comprehensive warehouse management application designed to optimize store inventory and price tracking. Built with a strong focus on seamless user experience using Flutter and robust business logic on the backend with Laravel.',
      image: '/image_73338d.png',
      url: 'https://gudangdamar.example.com'
    },
    {
      id: 'ase-dashboard',
      year: '2026',
      title: 'ASE Media Dashboard',
      tech: ['Next.js', 'Supabase'],
      role: 'PR & Dev',
      description: 'An internal dashboard to manage media partner collaborations and streamline communication deliverables.',
      image: '/image_73338d.png',
      url: 'https://ase-dashboard.example.com'
    },
    {
      id: 'taskmaster-pro',
      year: '2025',
      title: 'TaskMaster Pro',
      tech: ['Vue.js', 'Node.js'],
      role: 'Backend Dev',
      description: 'A productivity app aimed at teams, featuring Kanban boards, time tracking, and automated reporting.',
      image: '/image_73338d.png',
      url: 'https://github.com/alvin/taskmaster'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // 3. Tambahkan 'url' di initial state form
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    techString: '', 
    role: '',
    description: '',
    image: '',
    url: ''
  });

  const handleOpenModal = (project?: WebProject) => {
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

    const projectData: WebProject = {
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
          <div key={project.id} className="group flex flex-col bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden shadow-lg shadow-[#0F172A]/5 dark:shadow-[#E11D48]/5 border border-[#7DD3FC]/10 dark:border-[#991B1B]/30 hover:-translate-y-2 hover:shadow-2xl hover:border-[#0369A1]/50 dark:hover:border-[#E11D48]/50 transition-all duration-300 relative">
            
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <button onClick={() => handleOpenModal(project)} className="p-2 bg-[#0369A1] text-white rounded-xl hover:bg-[#0284C7] hover:scale-110 transition-all shadow-md">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(project.id)} className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:scale-110 transition-all shadow-md">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="h-48 relative bg-[#F0F9FF] dark:bg-[#000000] border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 overflow-hidden">
              <div className="absolute top-4 left-4 z-10 bg-[#0F172A] dark:bg-[#121212] text-white border border-white/50 dark:border-[#991B1B]/80 px-3 py-1 font-bold font-space text-xs tracking-wider shadow-md">
                {project.year}
              </div>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" style={{ backgroundImage: `url(${project.image})` }}></div>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] dark:text-white font-space mb-4 line-clamp-1">
                {project.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-[#0369A1] text-white px-3 py-1 rounded-full text-xs font-bold font-space shadow-sm">
                    {tech}
                  </span>
                ))}
                <span className="bg-[#E11D48] text-white px-3 py-1 rounded-full text-xs font-bold font-space shadow-sm">
                  {project.role}
                </span>
              </div>

              <p className="text-sm text-[#0F172A]/70 dark:text-white/70 font-medium line-clamp-3 mb-6">
                {project.description}
              </p>

              {/* 4. Tampilkan URL di card */}
              <div className="mt-auto pt-4 border-t border-[#7DD3FC]/10 dark:border-[#991B1B]/20">
                {project.url ? (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-[#0369A1] dark:text-[#E11D48] font-bold font-space text-xs tracking-widest uppercase hover:underline transition-all"
                  >
                    View Project <ExternalLink size={14} />
                  </a>
                ) : (
                  <span className="text-[#0F172A]/30 dark:text-white/30 font-bold font-space text-xs tracking-widest uppercase">
                    No URL Provided
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-[#121212] w-full max-w-2xl rounded-[32px] p-6 md:p-8 shadow-2xl border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 animate-in zoom-in-95 duration-200 my-8">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                <Briefcase className="text-[#0369A1] dark:text-[#E11D48]" />
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={handleCloseModal} className="text-[#0F172A]/50 dark:text-white/50 hover:text-red-500 hover:rotate-90 transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                    <Type size={16} /> Project Title
                  </label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                    <Calendar size={16} /> Year / Period
                  </label>
                  <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="e.g., 2026 - Present" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                    <Code size={16} /> Tech Stack (Comma separated)
                  </label>
                  <input type="text" value={formData.techString} onChange={(e) => setFormData({ ...formData, techString: e.target.value })} placeholder="e.g., Flutter, Laravel, Supabase" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                    <Briefcase size={16} /> Your Role
                  </label>
                  <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g., Fullstack Developer" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" required />
                </div>
              </div>

              {/* 5. Input Field untuk URL */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <LinkIcon size={16} /> Project URL (Live / Repo)
                </label>
                <input type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://..." className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <ImageIcon size={16} /> Thumbnail Image URL
                </label>
                <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="/image_placeholder.png" className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48]" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2">
                  <AlignLeft size={16} /> Description
                </label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-3 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] resize-none" required />
              </div>

              <button type="submit" className="w-full flex justify-center items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-6 py-4 rounded-xl font-bold font-space shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-2">
                <Save size={20} /> Save Project
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}