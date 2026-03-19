"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Target, Zap, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export default function MembershipHero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // تأثير Parallax للنصوص في الموبايل عند السكرول
  const textY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden ">


      <motion.div 
        style={{ y: textY, opacity }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        
        {/* 🛡️ شارة الأمان المطورة */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl mb-10 group"
        >
          <div className="relative">
            <ShieldCheck size={16} className="text-gold relative z-10" />
            <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 bg-gold rounded-full blur-sm" 
            />
          </div>
          <span className="text-gold text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] italic">
            Elite Engineering Faculty
          </span>
        </motion.div>

        {/* 🎯 العنوان الرئيسي (Cinematic Typo) */}
        <div className="relative mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="text-[clamp(3.5rem,15vw,8.5rem)] font-black text-white italic uppercase tracking-[-0.06em] leading-[0.8] md:leading-[0.75]">
              GLOBAL <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-gold to-gold/50">
                COMMANDER
                {/* Glow Effect behind the text */}
                <span className="absolute inset-0 blur-[30px] bg-gold/20 -z-10 opacity-50" />
              </span>
            </h1>
          </motion.div>
          
          {/* Reflection for Desktop, Hidden on small mobiles for performance */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full opacity-[0.03] select-none pointer-events-none blur-md hidden md:block">
             <h1 className="text-[clamp(3rem,10vw,7.5rem)] font-black text-white italic uppercase tracking-[-0.05em] leading-[0.85] scale-y-[-1]">
               COMMANDER
             </h1>
          </div>
        </div>

        {/* 📝 الوصف (Subtext) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-2xl mx-auto px-4"
        >
          <p className="text-slate-400 text-sm md:text-xl font-medium leading-relaxed tracking-wide italic">
            An interconnected mixture of <span className="text-white font-bold">professional veterans</span> and 
            security architects dedicated to <span className="text-gold shadow-gold/20 shadow-sm">elite engineering standards</span>.
          </p>
        </motion.div>

        {/* ⚡ Mobile-Responsive CTA Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-14 flex flex-col items-center gap-6"
        >


          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 opacity-40">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={20} className="text-gold" />
            </motion.div>
            <span className="text-[8px] text-white font-black uppercase tracking-[0.6em]">Stand By</span>
          </div>
        </motion.div>
      </motion.div>

      {/* 🛰️ Floating Data Elements (Decorative) */}
      <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 opacity-20">
        <div className="w-12 h-[1px] bg-white" />
        <span className="text-[8px] text-white font-mono uppercase tracking-[0.3em]">Lat: 30.0444° N / Long: 31.2357° E</span>
      </div>
      
    </section>
  );
}