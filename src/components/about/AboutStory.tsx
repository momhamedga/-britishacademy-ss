"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Target, ShieldAlert, Zap } from 'lucide-react';

export default function AboutStory() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // تأثير حركة الصور المتداخلة في الموبايل والديسكتوب
  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={targetRef} className="py-24 md:py-48 px-6 relative overflow-hidden ">
      
      {/* 🌌 Background Decoration */}
      <div className="absolute inset-0 bg-grid-gold opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
        
        {/* 1. الجانب البصري: التكوين السينمائي المتداخل */}
        <div className="lg:col-span-6 relative order-2 lg:order-1 flex justify-center lg:justify-start">
          
          {/* Main Frame */}
          <motion.div 
            style={{ y: img1Y }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/5] w-[90%] md:w-[85%] rounded-[3rem] md:rounded-[4.5rem] overflow-hidden border border-white/10 z-20 shadow-2xl"
          >
            <Image 
              src="/about-1.webp" 
              alt="British Academy Strategic Intelligence" 
              fill 
              className="object-cover contrast-[1.1] brightness-75 scale-110 group-hover:scale-100 transition-transform duration-[2s]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>

          {/* Floating Image Card - Now visible on mobile with adjusted scale */}
          <motion.div 
            style={{ y: img2Y }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 -right-2 md:-right-10 aspect-[1/1.1] w-[55%] md:w-[60%] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border-2 border-gold/30 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.9)] glass-effect"
          >
            <Image 
              src="/about-2.webp" 
              alt="Global Operations IAHS" 
              fill 
              className="object-cover saturate-[1.2] brightness-90" 
            />
            {/* Tactical Label on Floating Image */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gold/20">
                <span className="text-[7px] text-gold font-black uppercase tracking-widest flex items-center gap-1">
                    <Target size={8} /> Live Ops 2026
                </span>
            </div>
          </motion.div>
        </div>

        {/* 2. المحتوى النصي: Storytelling Section */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-10">
          
          {/* Header Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase">Phase_01</span>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-gold/50 to-transparent" />
              </div>

              <h2 className="font-display text-[clamp(2.5rem,10vw,4rem)] font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                The <span className="text-gold italic drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Legacy</span> <br /> 
                of IAHS
              </h2>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* The Main Hook Text */}
            <div className="relative pl-6 border-l-2 border-gold/40">
              <p className="text-white text-lg md:text-2xl font-medium leading-relaxed italic opacity-95">
                Founded on the principles of <span className="text-gold">high-level defense</span>, we have evolved into the premiere destination for global security excellence.
              </p>
            </div>

            {/* Sub-text with Tactical Keywords */}
            <div className="space-y-6">
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
                Our methodology combines <span className="text-white font-bold border-b border-gold/20 pb-0.5">"Data-First"</span> tactical efficiency with traditional British discipline. We engineer the leaders of homeland defense for the 2026 landscape.
              </p>
              
              {/* Tactical Tags Grid */}
              <div className="flex flex-wrap gap-3 pt-4">
                {[
                    { label: 'Strategic Intel', icon: Target },
                    { label: 'Tactical Mastery', icon: ShieldAlert },
                    { label: 'Crisis Control', icon: Zap }
                ].map((tag, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,175,55,0.1)' }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-gold/80 transition-all cursor-default"
                  >
                    <tag.icon size={12} className="text-gold/50" />
                    {tag.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}