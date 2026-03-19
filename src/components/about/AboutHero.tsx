"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Shield, Target, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function AboutHero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // تأثير Parallax خفيف للصورة عند السكرول
  const yImage = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden ">
      
      {/* 1. طبقة الخلفية السينمائية (The Cinematic Layer) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10" />
        <div className="absolute inset-0 z-10" />

        <motion.div 
          style={{ y: yImage }}
          initial={{ scale: 1.2, filter: "blur(20px) brightness(0)" }}
          animate={{ scale: 1, filter: "blur(0px) brightness(0.5)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full bg-[url('/about-hero.webp')] bg-cover bg-[center_top] md:bg-center grayscale-[0.3] contrast-[1.2]" 
        />
        
        {/* 📟 Tactical Laser Scan Line */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-gold/20 blur-sm z-20 pointer-events-none"
        />
      </div>

      {/* 2. المحتوى المركزي (The Mission Core) */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-20 text-center px-6 max-w-6xl mx-auto mt-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge: التأسيس */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-8 bg-gold/40" />
            <div className="flex items-center gap-2">
              <Target size={12} className="text-gold animate-pulse" />
              <span className="text-gold text-[9px] md:text-xs font-black uppercase tracking-[0.5em] italic">
                Established Excellence 2012
              </span>
            </div>
            <div className="h-[1px] w-8 bg-gold/40" />
          </div>

          {/* العنوان الضخم: Cinematic Typo */}
          <h1 className="font-display text-[clamp(2.8rem,14vw,8rem)] font-black text-white italic uppercase tracking-[-0.04em] leading-[0.85] mb-8">
            DEFINERS <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-gold/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              OF SECURITY
            </span>
          </h1>
          
          {/* النص الوصفي: Tactical Briefing Style */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-slate-300 text-sm md:text-xl font-medium leading-relaxed italic border-l-2 border-gold/60 pl-6 text-left md:text-center md:border-l-0 md:pl-0"
            >
              British Academy (IAHS) is a <span className="text-white font-bold">global ecosystem</span> engineered for 
              elite security professionals and homeland defense leaders.
            </motion.p>
            {/* Mobile Decorative ID */}
            <div className="absolute -top-4 -right-2 hidden md:block opacity-20">
               <span className="text-[10px] text-white font-mono uppercase tracking-[0.5em]">Auth_Status: Cleared</span>
            </div>
          </div>
        </motion.div>


      </motion.div>

      {/* 3. مؤشر السكرول (Scroll Beacon) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <span className="text-[8px] text-white/30 uppercase tracking-[0.8em] font-black mb-2">Advance</span>
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-1 bg-gold rounded-full"
          />
        </div>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-40 mix-blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10" />
    </section>
  );
}