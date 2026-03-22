"use client"
import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { HERO_SLIDES } from "@/lib/constants";
import Link from "next/link";

// تعريف الـ Variants خارج الكومبوننت لتحسين الأداء وتجنب إعادة التعريف
const containerVariants: Variants = { 
  animate: { transition: { staggerChildren: 0.15 } } 
};

const titleReveal: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  exit: { y: "-20%", opacity: 0, transition: { duration: 0.4 } }
};

const itemVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, x: 10, transition: { duration: 0.3 } }
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPending, startTransition] = useTransition();

  const nextSlide = () => {
    startTransition(() => {
      setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    });
  };

  const prevSlide = () => {
    startTransition(() => {
      setCurrent((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    });
  };

  useEffect(() => {
    if (isPaused) return; 
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [isPaused, current]);

  const active = HERO_SLIDES[current];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative h-[100dvh] min-h-[800px] w-full flex items-center overflow-hidden bg-background touch-pan-y"
    >
      {/* 1. Cinematic Background with Touch Support */}
      <motion.div 
        className="absolute inset-0 z-0"
        drag="x" // إضافة خاصية السحب
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 100) prevSlide();
          else if (info.offset.x < -100) nextSlide();
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "circOut" }}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src={active.image} 
              alt={active.title}
              fill
              className="object-cover object-center brightness-[0.5] saturate-[0.8]"
              priority
              sizes="100vw"
            />
            {/* التقنيات الجديدة في v4 توفر تدرجات أنعم */}
            <div className="absolute inset-0 vignette-overlay z-10 opacity-80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 2. Main Content */}
      <div className="container mx-auto px-6 md:px-20 relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={containerVariants}
            className="max-w-5xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
               <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-2xl">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_12px_#D4AF37]" />
                  <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">
                    {active.accent}
                  </span>
               </div>
            </motion.div>
            
            {/* Headline */}
            <div className="space-y-4 mb-10">
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
                  className="text-5xl md:text-[80px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#D4AF37]/80 to-[#D4AF37]/40 italic uppercase leading-[0.9] tracking-tighter"
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

            {/* CTA Button with Enhanced Shine v4 */}
            <motion.div variants={itemVariants}>
              <Link href="/courses">
                <button className="group relative px-12 py-6 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-navy font-black uppercase italic tracking-widest text-[11px] overflow-hidden transition-all duration-700 rounded-[2px] shadow-2xl active:scale-95">
                  <span className="relative z-10 flex items-center gap-3">
                    View Courses <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Mobile Optimized Navigation (Visible only on Touch) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-4 pointer-events-none md:hidden">
        <button onClick={prevSlide} className="pointer-events-auto p-4 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 text-white/40 active:text-[#D4AF37] transition-all">
          <ChevronLeft size={28} />
        </button>
        <button onClick={nextSlide} className="pointer-events-auto p-4 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 text-white/40 active:text-[#D4AF37] transition-all">
          <ChevronRight size={28} />
        </button>
      </div>

      {/* 4. Side Indicators */}
      <div className="absolute bottom-16 right-8 md:right-16 z-30 flex items-center gap-6 md:gap-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative flex flex-col items-end py-4"
          >
            <span className={`text-[10px] font-black mb-3 transition-all duration-700 ${current === i ? "text-[#D4AF37]" : "text-white/10 group-hover:text-white/30"}`}>
              0{i + 1}
            </span>
            <div className={`h-[2px] rounded-full transition-all duration-1000 ${current === i ? "w-16 bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]" : "w-4 bg-white/10 group-hover:w-8"}`} />
          </button>
        ))}
      </div>

      {/* Decor - v4 Grids */}
      <div className="absolute inset-0 z-[1] opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
    </section>
  );
}