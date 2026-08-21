"use client";

import React, { useState } from 'react';
import { User, Type, FileText, Link as LinkIcon, Image as ImageIcon, Briefcase, Save } from 'lucide-react';

export default function AboutForm() {
  const [role, setRole] = useState('Web Backend and Game Developer');
  const [name, setName] = useState('Muhammad Alvin Ababil');
  const [tagline, setTagline] = useState('Crafting Digital Sanctuaries Through Code.');
  const [bio, setBio] = useState("Hi, I'm Muhammad Alvin Ababil. I blend technical precision with ethereal design principles to build robust applications and seamless user experiences. Passionate about soft-tech aesthetics and clean architecture.");
  const [cvLink, setCvLink] = useState('https://docs.google.com/document/d/your-cv-link');
  const [profileImage, setProfileImage] = useState('/image_73338d.png');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      console.log({ role, name, tagline, bio, cvLink, profileImage });
      alert('Profile berhasil diupdate!');
      setIsSaving(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSave} className="bg-white dark:bg-[#121212] p-8 md:p-10 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 space-y-8">
      
      {/* 1. Input Role (Badge atas) */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">Role / Badge Title</label>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-[#0369A1] dark:text-[#E11D48] pointer-events-none">
            <Briefcase size={20} />
          </div>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300"
            required
          />
        </div>
      </div>

      {/* 2. Input Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">Full Name</label>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-[#0369A1] dark:text-[#E11D48] pointer-events-none">
            <User size={20} />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300"
            required
          />
        </div>
      </div>

      {/* 3. Input Tagline */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">Hero Tagline</label>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-[#0369A1] dark:text-[#E11D48] pointer-events-none">
            <Type size={20} />
          </div>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300"
            required
          />
        </div>
      </div>

      {/* 4. Input Bio */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">About Bio</label>
        <div className="relative">
          <div className="absolute top-4 left-4 text-[#0369A1] dark:text-[#E11D48] pointer-events-none">
            <FileText size={20} />
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300 resize-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 5. Input CV Link */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">CV Document Link</label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-[#0369A1] dark:text-[#E11D48] pointer-events-none">
              <LinkIcon size={20} />
            </div>
            <input
              type="url"
              value={cvLink}
              onChange={(e) => setCvLink(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300"
            />
          </div>
        </div>

        {/* 6. Input Profile Image URL */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">Profile Image URL</label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-[#0369A1] dark:text-[#E11D48] pointer-events-none">
              <ImageIcon size={20} />
            </div>
            <input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex justify-end gap-4">
        <button
          type="button"
          className="px-8 py-3 rounded-2xl font-bold font-space text-[#0F172A] dark:text-white hover:bg-[#F0F9FF] dark:hover:bg-[#991B1B]/20 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-8 py-3 rounded-2xl font-bold font-space shadow-lg shadow-[#0369A1]/20 dark:shadow-[#E11D48]/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          <Save size={20} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

    </form>
  );
}