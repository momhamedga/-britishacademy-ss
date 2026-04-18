"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/constants";

export default function MobileHero() {
  const [current, setCurrent] = useState(0);
  const active = HERO_SLIDES[current];

  // Auto-swipe logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000); // سرعة متوسطة للموبايل
    return () => clearInterval(timer);
  }, []);

  return (
    // 🛡️ استخدام dvh (Dynamic Viewport Height) لضمان ملء الشاشة على جميع الأجهزة
    <div className="relative h-[100dvh] w-full bg-navy overflow-hidden flex flex-col selection:bg-gold/30">
      
      {/* 🌌 1. Background Immersive Layer (أجواء سينمائية عميقة) */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          {/* خلفية مغبشة (Blur) لإعطاء عمق رهيب */}
          <Image 
            src={active.image} 
            alt="bg-blur" 
            fill 
            className="object-cover blur-3xl saturate-150 scale-110" 
          />
          {/* تدرج لوني عميق (Gradient) لمنع تشتيت العين */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-transparent to-navy" />
        </motion.div>
      </AnimatePresence>

      {/* 📸 2. Top Visual Section (The Capsule UI) */}
      {/* استغلال الجزء الأكبر من الشاشة (flex-[1.4]) للصورة */}
      <div className="relative z-10 flex-[1.4] flex items-center justify-center p-6 pt-24 pb-12 lg:pt-0 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${current}`}
            initial={{ scale: 0.8, opacity: 0, y: 50, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 1.1, opacity: 0, y: -50, rotate: -5 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-full aspect-[4/5] md:aspect-square rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] group"
          >
            <Image 
              src={active.image} 
              alt={active.title} 
              fill 
              className="object-cover saturate-[1.1] contrast-[1.05]" 
              priority 
            />
            {/* التدرج اللوني السفلي لإخفاء الحواف */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000613] via-transparent to-transparent opacity-90" />
            
            {/* 🎖️ Status Floating Badge (توهج ذهبي) */}
            <div className="absolute top-6 right-6 bg-gold/90 backdrop-blur-md px-5 py-2 rounded-full flex items-center gap-2 shadow-2xl">
              <ShieldCheck size={14} className="text-navy" />
              <span className="text-navy font-black text-[9px] uppercase tracking-widest leading-none">Elite Standard</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 📝 3. Bottom Content Sheet (The App Sheet UI) */}
      <motion.div 
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-20 bg-navy/90 backdrop-blur-3xl rounded-t-[4rem] px-8 pt-12 pb-12 border-t border-white/5 shadow-[0_-25px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Drag Handle UI (إيحاء التطبيق) */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-white/10 rounded-full" />

        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.div 
               key={`text-${current}`}
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.5 }}
               className="space-y-5"
            >
              {/* التقييم بالنجوم */}
              <div className="flex justify-center gap-1.5 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={11} className="fill-gold text-gold" />)}
              </div>

              {/* العناوين ضخمة وBold */}
              <h1 className="text-5xl font-black text-white italic uppercase leading-[0.85] tracking-tighter drop-shadow-lg">
                {active.title} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/70 to-gold">
                    {active.subtitle}
                </span>
              </h1>

              {/* الوصف ناعم ومقروء */}
              <p className="text-white/60 text-[13px] font-medium leading-relaxed px-2">
                {active.description}
              </p>

              {/* أزرار ضخمة وسهلة الضغط */}
              <div className="flex flex-col gap-4 pt-8">
                <Link href="/login">
                  <motion.button 
                    whileTap={{ scale: 0.96 }}
                    className="w-full py-5 bg-gold text-navy font-black uppercase tracking-[0.3em] text-[11px] rounded-2xl shadow-[0_15px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] transition-all active:scale-95"
                  >
                    Start Mission
                  </motion.button>
                </Link>
                
                {/* Pagination Indicators - Dot Style */}
                <div className="flex justify-center gap-2 pt-2">
                  {HERO_SLIDES.map((_, i) => (
                    <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${current === i ? 'w-10 bg-gold' : 'w-2 bg-white/20'}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}