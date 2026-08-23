import React from 'react';
import AccountForm from '@/components/sections/admin/dashboard/account/AccountForm'; 

export const metadata = {
  title: 'Manage Accounts',
  description: 'Add or manage admin credentials for the portfolio dashboard.',
};

export default function AccountPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#0F172A] dark:text-white font-space">
          Accounts <span className="text-[#0369A1] dark:text-[#E11D48]">&</span> Access
        </h1>
      </div>
      
      <AccountForm />
    </div>
  );
}