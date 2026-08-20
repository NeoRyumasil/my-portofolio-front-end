import WebProjects from '@/components/sections/projects/WebProjects';
import GameProjects from '@/components/sections/projects/GameProjects';
import Credentials from '@/components/sections/developer/Credentials';

export const metadata = {
  title: 'Muhammad Alvin Ababil |s Projects',
  description: 'Showcase of Web and Game Development Projects',
};

export default function ProjectsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 space-y-24">
      <WebProjects />
      <GameProjects />
      <Credentials />
    </main>
  );
}