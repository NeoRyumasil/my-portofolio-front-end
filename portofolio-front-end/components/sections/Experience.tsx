import React from 'react';

export default function Experience() {
  const projects = [
    {
      year: '2026 - Present',
      title: 'Gudang Damar',
      tech: ['Flutter', 'Laravel', 'Supabase'],
      role: 'Fullstack Developer',
      description: 'A comprehensive warehouse management application designed to optimize store inventory and price tracking. Built with a strong focus on seamless user experience using Flutter and robust business logic on the backend with Laravel.',
      image: '/image_73338d.png'
    },
    {
      year: '2026',
      title: 'AI Chat Assistant',
      tech: ['Next.js', 'Python', 'LLMs API'],
      role: 'AI Developer',
      description: 'An intelligent conversational agent and smart categorization system built with modern LLM API integrations. It focuses on delivering a soft, intuitive interface without the overhead of training custom models from scratch.',
      image: '/image_73338d.png'
    },
    {
      year: '2026',
      title: 'CV Sign Language Translator',
      tech: ['Python', 'OpenCV', 'Computer Vision'],
      role: 'PKM-KC Lead',
      description: 'A computer vision project developed under the Karsa Cipta (PKM-KC) framework. It utilizes machine learning models to interpret sign language in real-time, bridging communication gaps effectively.',
      image: '/image_73338d.png'
    }
  ];

  return (
    <section id="works" className="space-y-16 pt-24 pb-12 transition-colors duration-300">
      <div className="space-y-4 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-8 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Project Overview
        </h2>
      </div>

      <div className="space-y-24 pt-8">
        {projects.map((project, index) => (
          <div key={index} className="group flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            
            <div className="w-full lg:w-5/12 relative">
              <div className="absolute -top-4 left-4 md:-left-4 z-10 bg-[#0F172A] dark:bg-[#121212] text-white border border-white/50 dark:border-[#991B1B]/80 px-4 py-1.5 font-bold font-space text-sm tracking-wider shadow-lg">
                {project.year}
              </div>
              
              <div className="relative w-full aspect-[4/3] bg-white dark:bg-[#121212] rounded-xl overflow-hidden shadow-xl shadow-[#0F172A]/5 dark:shadow-[#E11D48]/10 border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 group-hover:border-[#7DD3FC] dark:group-hover:border-[#F43F5E] transition-all duration-500">
                <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.6))] z-0"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 z-10 opacity-90 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 space-y-6 pt-2">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white font-space group-hover:text-[#0369A1] dark:group-hover:text-[#E11D48] transition-colors duration-300">
                {project.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-[#0369A1] dark:bg-[#0369A1] text-white px-4 py-1.5 rounded-full text-sm font-bold font-space shadow-sm">
                    {tech}
                  </span>
                ))}
                <span className="bg-[#E11D48] dark:bg-[#E11D48] text-white px-4 py-1.5 rounded-full text-sm font-bold font-space shadow-sm">
                  {project.role}
                </span>
              </div>

              <p className="text-lg md:text-xl text-[#0F172A]/80 dark:text-white/80 leading-relaxed font-medium">
                {project.description}
              </p>
            </div>

          </div>
        ))}
        
      </div>
    </section>
  );
}