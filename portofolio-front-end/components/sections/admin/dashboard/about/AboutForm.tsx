"use client";

import React, { useState, useEffect } from 'react';
import { User, Type, FileText, Link as LinkIcon, Image as ImageIcon, Briefcase, Save, Loader2, UploadCloud } from 'lucide-react';

export default function AboutForm() {
  const [profileId, setProfileId] = useState<string | null>(null);
  
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [bio, setBio] = useState('');
  const [cvLink, setCvLink] = useState('');
  const [profileImage, setProfileImage] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const getDirectImageUrl = (url: string) => {
    if (!url) return url;
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/d\/(.+?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    if (url.includes('drive.google.com/open?id=')) {
      const id = url.split('id=')[1];
      if (id) {
        return `https://drive.google.com/uc?export=view&id=${id}`;
      }
    }
    return url;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/api/profile`);
        const json = await response.json();
        
        if (json.success && json.data.length > 0) {
          const data = json.data[0];
          setProfileId(data.id);
          setRole(data.role);
          setName(data.fullName); 
          setTagline(data.tagline);
          setBio(data.bio);
          setCvLink(data.cvLink || '');
          setProfileImage(getDirectImageUrl(data.profileImage || ''));
        }
      } catch (error) {
        console.error("Gagal mengambil data profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${baseUrl}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` 
        },
        body: uploadData
      });

      const json = await response.json();

      if (response.ok && json.success) {
        setProfileImage(getDirectImageUrl(json.url));
      } else {
        alert(json.message || 'Gagal mengunggah foto profil ke Google Drive');
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan server saat mengunggah foto profil.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      const safeImageUrl = getDirectImageUrl(profileImage);

      const payload = {
        role,
        fullName: name, 
        tagline,
        bio,
        cvLink,
        profileImage: safeImageUrl
      };

      const method = profileId ? 'PUT' : 'POST';
      const url = profileId 
        ? `${baseUrl}/api/profile/${profileId}` 
        : `${baseUrl}/api/profile`;

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
        alert('Profile berhasil disimpan!');
        if (!profileId && json.data?.id) {
          setProfileId(json.data.id);
        }
      } else {
        alert(json.message || 'Gagal menyimpan profile');
      }

    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Terjadi kesalahan pada server.');
      
    } finally {
      setIsSaving(false);
    }
  };

  const handleManualUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setProfileImage(getDirectImageUrl(val));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white dark:bg-[#121212] rounded-[32px] border border-[#7DD3FC]/20 dark:border-[#991B1B]/30">
        <Loader2 className="w-10 h-10 animate-spin text-[#0369A1] dark:text-[#E11D48]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="bg-white dark:bg-[#121212] p-8 md:p-10 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 space-y-8">
      
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

        <div className="space-y-2 border border-[#7DD3FC]/30 dark:border-[#991B1B]/30 p-4 rounded-2xl bg-[#F0F9FF]/20 dark:bg-[#000000]/20">
          <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space flex items-center gap-2 mb-3">
            <ImageIcon size={16} /> Profile Image
          </label>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-20 h-20 bg-[#F0F9FF] dark:bg-[#121212] rounded-xl border border-dashed border-[#0369A1]/50 dark:border-[#E11D48]/50 overflow-hidden flex items-center justify-center shrink-0 relative group">
              {profileImage ? (
                <img src={profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-[#0F172A]/30 dark:text-white/30" size={24} />
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="animate-spin text-white" size={20} />
                </div>
              )}
            </div>

            <div className="flex-1 w-full space-y-2">
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" 
                />
                <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0369A1]/10 dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] border border-[#0369A1]/30 dark:border-[#E11D48]/30 rounded-xl font-bold text-xs transition-colors hover:bg-[#0369A1]/20">
                  {isUploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                  {isUploading ? 'Uploading...' : 'Choose File'}
                </div>
              </div>
              <input 
                type="text" 
                value={profileImage} 
                onChange={handleManualUrlChange} 
                placeholder="Or paste URL..." 
                className="w-full px-2 py-1 text-xs bg-transparent border-b border-[#7DD3FC]/50 dark:border-[#991B1B]/50 text-[#0F172A] dark:text-white focus:outline-none" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#7DD3FC]/20 dark:border-[#991B1B]/30 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-8 py-3 rounded-2xl font-bold font-space text-[#0F172A] dark:text-white hover:bg-[#F0F9FF] dark:hover:bg-[#991B1B]/20 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-8 py-3 rounded-2xl font-bold font-space shadow-lg shadow-[#0369A1]/20 dark:shadow-[#E11D48]/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}