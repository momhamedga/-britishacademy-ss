"use client"
import { useState, useEffect, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HERO_SLIDES } from "@/lib/constants";

// --- المتغيرات اللونية بناءً على طلبك ---
const colors = {
  navy: "oklch(25% 0.08 260)",      // Academy Navy
  mediumBlue: "oklch(45% 0.12 255)", // Medium Blue المتناسق
  bgLight: "oklch(98% 0.01 260)",   // Background
  gold: "#D4AF37",                  // Gold Accent
};

const PrimaryButton = ({ children, className = "", ...props }: any) => (
  <button 
    className={`group relative px-6 py-3 bg-[#D4AF37] text-[oklch(25%_0.08_260)] font-black uppercase tracking-widest text-[10px] rounded-md transition-all duration-300 hover:bg-[#EBC04F] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const OutlineButton = ({ children, className = "", ...props }: any) => (
  <button 
    className={`group relative px-6 py-3 border border-[#D4AF37]/50 text-white font-black uppercase tracking-widest text-[10px] rounded-md transition-all duration-300 hover:border-[#D4AF37] hover:bg-white/5 active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);

function HeroContent() {
  const searchParams = useSearchParams();
  
  const initialSlide = useMemo(() => {
    const slideIndex = parseInt(searchParams.get("slide") || "0");
    return slideIndex < HERO_SLIDES.length ? slideIndex : 0;
  }, [searchParams]);

  const [current, setCurrent] = useState(initialSlide);
  const active = HERO_SLIDES[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col w-full overflow-hidden" style={{ backgroundColor: colors.bgLight }}>
      
      {/* القسم الرئيسي - Hero Section */}
      <section className="relative min-h-screen lg:h-[95dvh] w-full flex items-center pt-32 pb-20 lg:pt-0 lg:pb-0 overflow-hidden" style={{ backgroundColor: colors.navy }}>
        
        {/* طبقة الخلفية المتدرجة - Medium Blue Gradient */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 z-10" style={{ background: `radial-gradient(circle at 20% 50%, ${colors.mediumBlue}22, transparent)` }} />
            <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(to right, ${colors.navy}, transparent)` }} />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-20 flex flex-col lg:flex-row items-center gap-16">
          
          {/* الجانب الأيسر: المحتوى النصي */}
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs mb-6 block">
              {active.accent || "Global Security Platform"}
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 italic uppercase">
              {active.title} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#D4AF37] to-[#F3D179]">
                {active.subtitle}
              </span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0">
              {active.description}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <Link href="/login">
                <PrimaryButton className="flex items-center gap-3">
                  Start for Free <ArrowRight size={14} />
                </PrimaryButton>
              </Link>
              <Link href="/courses">
                <OutlineButton>Browse Programs</OutlineButton>
              </Link>
            </div>
          </motion.div>

<motion.div
  key={`image-${current}`}
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="flex-1 relative flex justify-center items-center w-full max-w-[550px]"
>
  {/* 1. التوهج الخلفي (Back Glow) - كبرنا الـ Blur شوية ليعطي عمق */}
  <div 
    className="absolute w-[90%] h-[90%] blur-[150px] rounded-full opacity-30 animate-pulse" 
    style={{ backgroundColor: colors.mediumBlue }} 
  />

  {/* 2. الحاوية البيضاوية الخارجية (The Outer Ring) */}
  <div className="relative w-[300px] h-[400px] md:w-[420px] md:h-[520px] rounded-[240px] border-[3px] border-[#D4AF37]/30 p-3 overflow-hidden flex justify-center items-center group">
    
    {/* تأثير لمعان ذهبي خارجي (Outer Gold Shadow) */}
    <div className="absolute inset-0 rounded-[240px] shadow-[0_0_80px_rgba(212,175,55,0.1)] pointer-events-none" />

    {/* 3. الحاوية الداخلية (The Image Wrapper) */}
    <div className="relative w-full h-full rounded-[230px] overflow-hidden border border-[#D4AF37]/50 shadow-inner">
      <Image 
        src={active.image}
        alt={active.title}
        fill
        className="object-cover saturate-[1.2] contrast-[1.1] group-hover:scale-110 transition-transform duration-[5000ms] ease-out"
        priority
      />
      
      {/* Overlay - تدرج لوني لإظهار النص إذا تداخل مع الصورة */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      
      {/* لمعة ذهبية متحركة عند الـ Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  </div>

  {/* 4. العنصر العائم (Status Badge) */}
  <motion.div 
    initial={{ x: 30, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="absolute bottom-12 -left-2 md:-left-12 bg-[#0F172A]/90 border border-[#D4AF37]/30 px-5 py-3 rounded-2xl backdrop-blur-xl hidden sm:flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
  >
    <div className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </div>
    <span className="text-white text-[10px] font-bold uppercase tracking-[0.1em]">
      24/7 AI Security Training
    </span>
  </motion.div>
</motion.div>
    </div>
  </section>

      {/* الشريط الذهبي الموحد */}
      <div className="w-full py-6 relative z-30 border-y border-white/5" style={{ backgroundColor: colors.gold }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-around items-center gap-8 md:gap-4">
            {[
              { label: "Trainees", value: "1,200" },
              { label: "Courses", value: "65+" },
              { label: "Certificates", value: "15+" },
              { label: "Satisfaction", value: "98%" }
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <span className="text-[oklch(25%_0.08_260)] font-black text-2xl md:text-3xl tracking-tighter">{stat.value}</span>
                <span className="text-[oklch(25%_0.08_260)]/70 font-black uppercase text-[10px] tracking-widest leading-none">{stat.label}</span>
                {idx !== 3 && <div className="hidden md:block h-8 w-[1px] bg-[oklch(25%_0.08_260)]/10 ml-10" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <Suspense fallback={<div className="h-screen bg-[oklch(25%_0.08_260)] animate-pulse" />}>
      <HeroContent />
    </Suspense>
  );
}