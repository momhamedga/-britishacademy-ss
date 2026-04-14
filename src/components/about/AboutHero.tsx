"use client";
import { ABOUT_CONTENT } from '@/lib/membership/about';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// 🎨 درجات الألوان المطلوبة بدقة OKLCH
const COLORS = {
  navy: "oklch(25% 0.08 260)",      // Academy Navy
  mediumBlue: "oklch(45% 0.12 255)", // Medium Blue
  bgLight: "oklch(98% 0.01 260)",   // Light Base
  gold: "#D4AF37",                  // Gold Accent
};


export default function TacticalAbout() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => setIsClient(true), []);

  if (!isClient) return <section className="min-h-[80svh]" style={{ backgroundColor: COLORS.navy }} />;

  return (
    <section 
      className="relative py-20 md:py-32 px-6 overflow-hidden"
      style={{ backgroundColor: COLORS.navy }} // الأساس هو الـ Navy العميق
    >
      {/* 🌌 High-Performance Mesh Gradient - تداخل الألوان المطلوبة */}
      <div className="absolute inset-0 pointer-events-none">
        {/* توهج Medium Blue في الزاوية */}
        <div 
          className="absolute -top-[10%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-30 blur-[120px]"
          style={{ backgroundColor: COLORS.mediumBlue }} 
        />
        {/* لمسة من الـ Gold الخفيف جداً في الخلفية للعمق */}
        <div 
          className="absolute bottom-[-10%] left-[5%] w-[40%] h-[40%] rounded-full opacity-5 blur-[100px]"
          style={{ backgroundColor: COLORS.gold }} 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 🏆 Title System - Unified & Dark Mode Optimized */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/70">
              {ABOUT_CONTENT.badge}
            </span>
          </motion.div>
          
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white md:text-7xl lg:text-8xl leading-[0.9]">
            {ABOUT_CONTENT.headline.split('—')[0]} 
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/60">
              {ABOUT_CONTENT.headline.split('—')[1] || "Training Leaders"}
            </span>
          </h2>
        </div>

    
        {/* 📱 Bento Cards - Tactical Dark Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl">
          {ABOUT_CONTENT.cards.map((card, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.98 }}
              className="relative group p-8 md:p-14 bg-white/[0.03] backdrop-blur-sm rounded-[2.5rem] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
            >
              {/* الضوء اللي بيتحرك عند الهوفر */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
                {/* Icon Container */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-[#D4AF37]/10 border border-white/10 shadow-xl group-hover:border-[#D4AF37]/30 transition-colors">
                  <card.icon size={28} className="text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic">
                    {card.title}
                  </h4>
                  <p className="text-sm md:text-lg text-white/60 font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Tactical Corners */}
              <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/10 rounded-br-md" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Noise Texture for High-End feel */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] pointer-events-none z-40" />
    </section>
  );
}