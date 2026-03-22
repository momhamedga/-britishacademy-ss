"use client";
import { ACADEMY_DATA } from '@/lib/membership/about';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  const yImage = useTransform(scrollY, [0, 500], [0, 80]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-svh min-h-[650px] flex items-center justify-center overflow-hidden ">
      
    

      {/* 2. Content Core */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-20 text-center px-4 md:px-6 w-full max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge: Refined & Small */}
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <div className="h-[1px] w-6 md:w-10 bg-gold/20" />
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-gold/80" />
              <span className="text-gold/80 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em]">
                {ACADEMY_DATA.location} Strategic Hub
              </span>
            </div>
            <div className="h-[1px] w-6 md:w-10 bg-gold/20" />
          </div>

          {/* Title: Eye-Friendly Size */}
          <h1 className="font-display text-[clamp(2rem,10vw,4.5rem)] font-black text-white uppercase tracking-tight leading-[0.95] mb-8 md:mb-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 block mb-1">
              Professional
            </span>
            <span className="italic text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
               Development Partner
            </span>
          </h1>
          
          {/* Description Card: Mobile Creative Touch */}
          <div className="relative max-w-2xl mx-auto px-2">
            <motion.div
              whileTap={{ scale: 0.98 }} // Mobile Haptic feel
              className="relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 md:p-10 overflow-hidden group shadow-2xl"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/30 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/30 rounded-br-xl" />

              <p className="text-slate-300 text-sm md:text-lg font-medium leading-relaxed md:leading-loose text-center">
                {ACADEMY_DATA.description}
              </p>

              {/* Scanning Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.div>

            {/* Micro-Data Labels */}
            <div className="mt-6 flex justify-center items-center gap-4 md:gap-8 opacity-20">
               <span className="text-[7px] md:text-[9px] text-white font-mono uppercase tracking-widest">Wembley_Station.v4</span>
               <div className="w-1 h-1 rounded-full bg-gold" />
               <span className="text-[7px] md:text-[9px] text-white font-mono uppercase tracking-widest">Encr_Auth_2026</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Minimal Scroll Beacon */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/0 via-gold/50 to-gold/0" />
        <span className="text-[7px] text-white/20 uppercase tracking-[0.6em] font-black">Scroll</span>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-40" />
    </section>
  );
}