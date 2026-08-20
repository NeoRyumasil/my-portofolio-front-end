'use client'

import About from '@/components/sections/developer/About';
import Expertise from '@/components/sections/developer/Expertise';
import Journey from '@/components/sections/developer/Journey';
import Experience from '@/components/sections/developer/Experience';
import Credentials from '@/components/sections/developer/Credentials';
import Contact from '@/components/sections/developer/Contact';

export default function Portfolio() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 space-y-32">
      <About />
      <Expertise />
      <Journey />
      <Experience />
      <Credentials />
      <Contact />
    </main>
  );
}