"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, LayoutGrid, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { HERO_SLIDES } from "@/lib/constants";

export default function DesktopHero() {
  const [current, setCurrent] = useState(0);
  const active = HERO_SLIDES[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] lg:h-screen w-full bg-navy flex items-center overflow-hidden">
      
      {/* 🌌 Dynamic Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={active.image} 
            alt="Academy Background" 
            fill 
            priority
            sizes="100vw"
            className="object-cover saturate-0 grayscale opacity-40"
          />
          {/* Tailwind v4 Gradient Syntax */}
          <div className="absolute inset-0 bg-linear-to-tr from-navy via-navy/95 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* 🎯 Left: Tactical Info Section */}
          <motion.div
            key={`text-${current}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <ShieldCheck size={12} className="text-gold" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">Elite_Security_Briefing</span>
            </div>
            
            {/* Fluid Heading - صغرنا الـ Clamp ليكون أكثر رزانة */}
            <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white italic uppercase leading-[0.9] tracking-tighter">
              {active.title} <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-gold/80 to-white">
                {active.subtitle}
              </span>
            </h1>

            <p className="text-white/40 text-[12px] lg:text-[14px] max-w-md mx-auto lg:mx-0 font-medium leading-relaxed italic">
              {active.description}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4">
              <button className="px-8 py-4 bg-gold text-navy font-black uppercase tracking-[0.2em] text-[9px] rounded-xl hover:bg-white transition-all group flex items-center gap-2.5 shadow-xl shadow-gold/10">
                Start Mission <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <div className="size-10 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/5 transition-all">
                    <Play size={14} fill="currentColor" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest">Preview_intro</span>
              </button>
            </div>
          </motion.div>

          {/* 🖼️ Right: Visual Component */}
          <div className="relative flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ scale: 0.95, opacity: 0, x: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 1.05, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[480px] aspect-[4/5] lg:max-h-[65vh] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image 
                   src={active.image} 
                   alt="Security Training" 
                   fill 
                   priority
                   sizes="(max-width: 1024px) 100vw, 50vw"
                   className="object-cover" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent" />
                
                {/* 🎖️ Animated Stats Widget */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 left-6 right-6 bg-navy/80 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl"
                >
                  <div className="size-9 bg-gold rounded-lg flex items-center justify-center text-navy shrink-0 shadow-lg">
                    <LayoutGrid size={18} />
                  </div>
                  <div>
                    <p className="text-white/30 font-black uppercase text-[7px] tracking-widest">Active_Deployment</p>
                    <p className="text-white font-black text-lg tabular-nums tracking-tighter leading-none">
                      1,240 <span className="text-[9px] text-emerald-400 font-bold ml-1">+12%</span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
            {/* Cinematic Glow */}
            <div className="absolute -z-10 size-full bg-gold/5 blur-[120px] rounded-full" />
          </div>

        </div>
      </div>

      {/* 🧭 Slide Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-16 lg:translate-x-0 flex gap-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 transition-all duration-500 rounded-full ${idx === current ? 'w-10 bg-gold' : 'w-2 bg-white/10'}`} 
          />
        ))}
      </div>
    </section>
  );
}