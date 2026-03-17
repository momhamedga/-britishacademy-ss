"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { HERO_SLIDES } from "@/lib/constants";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const active = HERO_SLIDES[current];

  return (
    <section className="relative h-screen min-h-[850px] w-full flex items-center overflow-hidden bg-[#020617]">
      
{/* 1. Cinematic Soft Background */}
<div className="absolute inset-0 z-0 bg-background">
  <AnimatePresence mode="wait">
    <motion.div
      key={current}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="relative w-full h-full"
    >
      <Image
        src={active.image} 
        alt={active.title}
        fill
        // استخدام الكلاس الجديد img-cinematic لتوحيد الألوان
        className="object-cover object-center img-cinematic"
        priority
      />
      
      {/* طبقة الـ Vignette لإخفاء حواف الصورة وجعل النص يبرز */}
      <div className="absolute inset-0 vignette-overlay z-10 opacity-80" />
      
      {/* تدرج إضافي لضمان سواد جهة النص (يسار) */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
    </motion.div>
  </AnimatePresence>
</div>

      {/* 2. Main Content */}
      <div className="container mx-auto px-8 md:px-20 relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={containerVariants}
            className="max-w-5xl"
          >
            {/* Minimalist Glass Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
               <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-xl">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  <span className="text-white/50 text-[10px] font-medium uppercase tracking-[0.4em]">
                    {active.accent}
                  </span>
               </div>
            </motion.div>
            
            {/* Headline Section */}
            <div className="space-y-2 mb-10">
              <div className="overflow-hidden">
                <motion.h1 
                  variants={titleReveal}
                  className="text-6xl md:text-[110px] font-black text-white italic uppercase leading-[0.9] tracking-tighter"
                >
                  {active.title}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h2 
                  variants={titleReveal}
                  className="text-5xl md:text-[80px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37]/90 via-[#D4AF37] to-[#D4AF37]/50 italic uppercase leading-[0.9] tracking-tighter"
                >
                  {active.subtitle}
                </motion.h2>
              </div>
            </div>

            {/* Description */}
            <motion.p 
              variants={itemVariants} 
              className="text-white/40 text-lg md:text-xl max-w-xl leading-relaxed font-light mb-14 border-l border-white/10 pl-8"
            >
              {active.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-10">
              <button className="group relative px-12 py-5 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#020617] font-bold uppercase italic tracking-widest text-[11px] overflow-hidden transition-all duration-500 rounded-sm shadow-xl hover:shadow-[#D4AF37]/20">
                <span className="relative z-10 flex items-center gap-3">
                  Initiate Training <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />
              </button>
              
              <button className="group flex items-center gap-4 text-white/20 hover:text-[#D4AF37]/60 transition-all text-[10px] font-bold uppercase tracking-[0.5em]">
                <span className="h-[1px] w-8 bg-white/10 group-hover:w-12 group-hover:bg-[#D4AF37] transition-all duration-500" />
                Technical Protocol
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Side Navigation */}
      <div className="absolute bottom-16 right-16 z-30 flex items-center gap-12">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative flex flex-col items-end"
          >
            <span className={`text-[9px] font-black mb-3 transition-all duration-500 ${current === i ? "text-[#D4AF37] translate-x-0" : "text-white/5 translate-x-2 group-hover:text-white/30"}`}>
              0{i + 1}
            </span>
            <div className={`h-[1px] transition-all duration-1000 ${current === i ? "w-20 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" : "w-8 bg-white/5 group-hover:bg-white/20"}`} />
          </button>
        ))}
      </div>

      {/* Decor */}
      <div className="absolute inset-0 z-[1] opacity-20 bg-grid-gold pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-20">
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[7px] font-bold uppercase tracking-[1em] text-white">Scroll</span>
      </div>
    </section>
  );
}

// Animation Variants
const containerVariants = {
  animate: { transition: { staggerChildren: 0.15 } }
};

const titleReveal = {
  initial: { y: "100%", opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 1, 
      ease: "easeOut" // أو استخدم قيم جاهزة زي "circOut" لسرعة الـ Build
    } 
  },
  exit: { y: "-20%", opacity: 0, transition: { duration: 0.4 } }
};
const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, x: 10, transition: { duration: 0.3 } }
};