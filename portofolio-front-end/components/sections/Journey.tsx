import React from 'react';

export default function Journey() {
  return (
    <section id="journey" className="text-center space-y-16 pt-20">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-[#0F172A]">Journey</h2>
        <p className="text-[#0F172A]/70">Milestones in my educational and professional path.</p>
      </div>

      <div className="relative max-w-3xl mx-auto text-left">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#7DD3FC]/30"></div>

        <div className="relative flex justify-between items-center w-full mb-12">
          <div className="w-5/12">
            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10 text-right">
              <span className="text-xs font-bold text-[#0369A1] uppercase tracking-wider font-space">Recent</span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-1">Agate Academy Game Programming</h3>
              <p className="text-sm text-[#0F172A]/70 mt-2">Deep dive into game development principles, logic, and architecture.</p>
            </div>
          </div>
          <div className="z-10 w-4 h-4 bg-[#0369A1] rounded-full ring-4 ring-[#F0F9FF]"></div>
          <div className="w-5/12"></div>
        </div>

        <div className="relative flex justify-between items-center w-full mb-12">
          <div className="w-5/12"></div>
          <div className="z-10 w-4 h-4 bg-[#0369A1] rounded-full ring-4 ring-[#F0F9FF]"></div>
          <div className="w-5/12">
            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10 text-left">
              <span className="text-xs font-bold text-[#0369A1] uppercase tracking-wider font-space">Ongoing</span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-1">Competitive Programming Events</h3>
              <p className="text-sm text-[#0F172A]/70 mt-2">Regular participation in algorithmic challenges and coding competitions.</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-between items-center w-full">
          <div className="w-5/12">
            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-[#0F172A]/5 border border-[#7DD3FC]/10 text-right">
              <span className="text-xs font-bold text-[#0369A1] uppercase tracking-wider font-space">Past</span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-1">AI x SoftDev Bootcamp</h3>
              <p className="text-sm text-[#0F172A]/70 mt-2">Intensive training program focusing on artificial intelligence and software development fundamentals.</p>
            </div>
          </div>
          <div className="z-10 w-4 h-4 bg-[#0369A1] rounded-full ring-4 ring-[#F0F9FF]"></div>
          <div className="w-5/12"></div>
        </div>
      </div>
    </section>
  );
}