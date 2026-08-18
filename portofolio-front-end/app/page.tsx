import About from '@/components/sections/About';
import Expertise from '@/components/sections/Expertise';
import Journey from '@/components/sections/Journey';
import Experience from '@/components/sections/Experience';
import Credentials from '@/components/sections/Credentials';
import Contact from '@/components/sections/Contact';

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