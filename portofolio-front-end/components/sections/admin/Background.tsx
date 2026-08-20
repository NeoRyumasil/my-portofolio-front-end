import React from 'react';

export default function Background() {
  return (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#7DD3FC]/30 dark:bg-[#E11D48]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#0369A1]/10 dark:bg-[#991B1B]/20 rounded-full blur-3xl pointer-events-none"></div>
    </>
  );
}