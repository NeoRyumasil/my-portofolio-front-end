import React from 'react';
import ContactForm from '@/components/sections/admin/dashboard/contact/ContactForm';

export const metadata = {
  title: 'Contact & Socials | Admin Portal',
};

export default function ContactPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="space-y-2 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-6">
        <h1 className="text-4xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
          Contact & Socials.
        </h1>
      </div>

      {/* Form */}
      <ContactForm />
      
    </div>
  );
}