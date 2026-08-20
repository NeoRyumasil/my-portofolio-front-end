import React from 'react';

export default function Header() {
  return (
    <div className="space-y-2 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30 pb-6">
      <h1 className="text-4xl font-extrabold text-[#0F172A] dark:text-white font-space tracking-tight">
        Welcome back, Alvin!
      </h1>
      <p className="text-[#0F172A]/70 dark:text-white/70">
        Here is a quick overview of your portfolio.
      </p>
    </div>
  );
}