import React from 'react';
import Header from '@/components/sections/admin/dashboard/overview/Header';
import Stats from '@/components/sections/admin/dashboard/overview/Stats';
import TopProjects from '@/components/sections/admin/dashboard/overview/TopProjects';
import TopCredentials from '@/components/sections/admin/dashboard/overview/TopCredentials';

export default function DashboardOverview() {
  return (
    <div className="space-y-10">
      <Header />
      <Stats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        <TopProjects />
        <TopCredentials />
      </div>
    </div>
  );
}