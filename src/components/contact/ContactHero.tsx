"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const COLORS = {
  navy: "oklch(25% 0.08 260)",
  mediumBlue: "oklch(45% 0.12 255)",
  gold: "#D4AF37",
};

export default function TacticalContactHero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // منع الرندر تماماً على السيرفر لحل مشكلة الـ Hydration
  if (!mounted) return null;

  return (
    <section 
      className="relative min-h-[80svh] w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ backgroundColor: COLORS.navy }}
    >
      {/* 🌌 Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full opacity-20 blur-[120px]"
          style={{ backgroundColor: COLORS.mediumBlue }} 
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">
            Get in touch
          </span>
        </motion.div>
        
        {/* Headline - Centered */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-6">
          Contact <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/50">
            Us
          </span>
        </h1>

        {/* Sub-text */}
        <p className="text-white/50 text-xl md:text-2xl font-medium italic max-w-2xl mx-auto">
        {`  "We're here to answer your inquiries and provide professional support."`}
        </p>
      </div>

      {/* Noise Overaly */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none z-20" />
    </section>
  );
}