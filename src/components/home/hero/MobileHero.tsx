"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/constants";

export default function MobileHero() {
  const [current, setCurrent] = useState(0);
  const active = HERO_SLIDES[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    // ✅ h-dvh و bg-navy بناءً على طلبك
    <div className="relative h-dvh w-full bg-navy overflow-hidden flex flex-col">
      
      {/* 🌌 Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={active.image} 
            alt="bg" 
            fill 
            sizes="100vw"
            className="object-cover blur-2xl scale-110" 
            priority
          />
          {/* ✅ bg-linear-to-b المعيار الحديث في v4 */}
          <div className="absolute inset-0 bg-linear-to-b from-navy/80 via-transparent to-navy" />
        </motion.div>
      </AnimatePresence>

      {/* 📸 Top Visual Section */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${current}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            className="relative w-full aspect-[4/5] max-h-[40vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
          >
            <Image 
              src={active.image} 
              alt={active.title} 
              fill 
              sizes="80vw"
              className="object-cover" 
              priority 
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-transparent to-transparent" />
            
            <div className="absolute top-4 right-4 bg-gold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
              <ShieldCheck size={10} className="text-navy" />
              <span className="text-navy font-black text-[7px] uppercase tracking-tighter">SIA_ACCREDITED</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 📝 Bottom Content Sheet */}
      <motion.div 
        className="relative z-20 bg-navy/90 backdrop-blur-3xl rounded-t-[2.5rem] px-6 pt-6 pb-8 border-t border-white/5"
      >
        <div className="mx-auto w-8 h-1 bg-white/10 rounded-full mb-6" />

        <div className="text-center space-y-4">
          <AnimatePresence mode="wait">
            <motion.div 
               key={`text-${current}`}
               initial={{ opacity: 0, y: 10 }} 
               animate={{ opacity: 1, y: 0 }}
               className="space-y-2"
            >
              <div className="flex justify-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={8} className="fill-gold text-gold" />)}
              </div>

              {/* ✅ تصغير حجم الخط لضمان التجاوب الشامل */}
              <h1 className="text-3xl font-black text-white italic uppercase leading-[0.9] tracking-tighter">
                {active.title} <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-white">
                    {active.subtitle}
                </span>
              </h1>

              <p className="text-white/40 text-[10px] font-medium leading-tight max-w-[240px] mx-auto italic">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col gap-4 pt-2">
            <Link href="/courses">
              <motion.button 
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 bg-gold text-navy font-black uppercase tracking-[0.2em] text-[10px] rounded-xl flex items-center justify-center gap-2"
              >
                Start Mission <ChevronRight size={14} />
              </motion.button>
            </Link>
            
            <div className="flex justify-center gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button 
                  key={i} 
                  className={`h-1 transition-all duration-500 rounded-full ${current === i ? 'w-8 bg-gold' : 'w-1.5 bg-white/10'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  ); 
}