"use client";

import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function CertificationsHero() {

    const COLORS = {
  navy: "oklch(25% 0.08 260)",
  mediumBlue: "oklch(45% 0.12 255)",
  gold: "oklch(75% 0.15 85)",
};
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
      {/* خلفية تكتيكية مشابهة لتصميم الهيرو */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] rounded-full opacity-20 blur-[120px]" style={{ backgroundColor: COLORS.mediumBlue }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full opacity-10 blur-[100px]" style={{ backgroundColor: COLORS.gold }} />
          </div>
          
 
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md">
          <Target size={14} className="text-[oklch(75%_0.15_85)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70"> certifications</span>
        </motion.div>
        
        <h1           className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-tight mb-6">
           Our Internationally <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[oklch(75%_0.15_85)] to-[oklch(75%_0.15_85)/40]">    Accredited Certifications </span>
        </h1>
   <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl font-medium italic border-l-2 border-[oklch(75%_0.15_85)]/30 pl-6 mx-auto max-w-2xl"
        >
          {`"Certificates recognized by leading global professional organizations"`}
        </motion.p>
    
      </div>
    </section>
  );
}