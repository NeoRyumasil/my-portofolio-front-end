"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import ProjectHeader from '@/components/sections/projects/detail/ProjectHeader';
import ProjectImage from '@/components/sections/projects/detail/ProjectImage';
import ProjectDescription from '@/components/sections/projects/detail/ProjectDescription';

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProjectDetail = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        let response = await fetch(`${baseUrl}/api/web-projects/${id}`);
        let json = await response.json();

        if (response.ok && json.success && json.data) {
          setProject({ ...json.data, category: 'web' });
          setIsLoading(false);
          return;
        }

        response = await fetch(`${baseUrl}/api/game-projects/${id}`);
        json = await response.json();

        if (response.ok && json.success && json.data) {
          setProject({ ...json.data, category: 'game' });
        } else {
          setIsError(true);
        }

      } catch (error) {
        console.error("Gagal mengambil detail proyek:", error);
        setIsError(true);

      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-[#0369A1] dark:text-[#E11D48] mb-4" />
        <p className="text-[#0F172A]/70 dark:text-white/70 font-space font-bold animate-pulse">Loading Project Details...</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center pt-20 space-y-6">
        <h1 className="text-6xl font-black text-[#0F172A] dark:text-white font-space">404</h1>
        <p className="text-xl text-[#0F172A]/70 dark:text-white/70">Project could not be found.</p>
        <button onClick={() => router.back()} className="px-8 py-3 bg-[#0369A1] dark:bg-[#E11D48] text-white rounded-full font-bold font-space hover:-translate-y-1 transition-all">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        <ProjectHeader project={project} />
        <ProjectImage image={project.image} title={project.title} />
        <ProjectDescription description={project.description} url={project.url} />
      </div>
    </main>
  );
}