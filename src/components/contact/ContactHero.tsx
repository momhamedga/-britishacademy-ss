"use client"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ContactHero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // بارالاكس خفيف جداً للهيبة فقط
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* 🌑 Background Aura - هالة خفيفة جداً في الخلفية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div style={{ opacity, y }} className="relative z-10 text-center max-w-5xl">
        
        {/* 📟 Small Tagline */}
        <motion.div 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ duration: 1.5 }}
          className="text-gold/60 text-[10px] md:text-xs font-black uppercase mb-8 md:mb-12 tracking-[0.6em]"
        >
          Secure Protocol 01
        </motion.div>

        {/* 🏆 The Title - الفخامة في الخط */}
        <div className="relative inline-block mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3.5rem,12vw,10rem)] font-black text-white leading-none uppercase tracking-tighter"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic">Touch</span>
          </motion.h1>
          
          {/* خط رفيع جداً تحت العنوان بيتحرك بنعومة */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-4"
          />
        </div>

        {/* 📄 Simple Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-slate-400 text-sm md:text-xl font-light max-w-xl mx-auto leading-relaxed tracking-wide"
        >
          Your strategic inquiry is our priority. Connect with the 
          <span className="text-white font-medium"> Intelligence Unit</span> directly.
        </motion.p>

      </motion.div>

      {/* 🛰️ Minimal HUD Decor - عنصر واحد بس بيتحرك بهدوء */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
        <span className="text-[8px] text-gold uppercase tracking-[0.3em]">Scroll</span>
      </motion.div>

    </section>
  );
}