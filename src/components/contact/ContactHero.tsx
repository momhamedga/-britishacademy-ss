"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronRight, CornerDownRight } from 'lucide-react';
import { useMediaQuery } from "@/hooks/use-media-query";

const COLORS = {
  navy: "oklch(25% 0.08 260)",
  mediumBlue: "oklch(45% 0.12 255)",
  gold: "#D4AF37",
};

const QUICK_CONTACTS = [
  { id: 1, name: "Portal Support", detail: "secure-link.hq", icon: Mail },
  { id: 2, name: "Global Hotline", detail: "+44 Tactical Node", icon: Phone },
];

export default function TacticalContactHero() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      className="relative min-h-[85svh] w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ backgroundColor: COLORS.navy }}
    >
      {/* 🌌 Background Elements - الربط مع الهيرو الأساسي */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full opacity-[0.25] blur-[150px]"
          style={{ backgroundColor: COLORS.mediumBlue }} 
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Glow Line - لمسة خفيفة للأكاديمية */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* 1. Shared Header Section - الحفاظ على h2 و span */}
        <div className="mb-12 md:mb-20 flex flex-col items-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">
              Get in touch
            </span >
          </motion.div>
          
          {/* Headline - Centered - ثبات التصميم */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-6">
            Contact <br className="lg:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/50">
              Us
            </span>
          </h1>

          {/* Sub-text - ثبات التصميم */}
          <p className="text-white/50 text-xl md:text-2xl font-medium italic max-w-2xl mx-auto">
          {` "We're here to answer your inquiries and provide professional support."`}
          </p>
        </div>

        {/* 2. Content Switcher */}
        {isDesktop ? <DesktopView /> : <MobileView />}

      </div>

      {/* Noise Overaly */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none z-20" />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 🔥 MOBILE VIEW: The "Native App" Connection                                 */
/* -------------------------------------------------------------------------- */
function MobileView() {
  return (
    <div className="relative -mx-4"> 
      {/* 1. Tactical Contact Stacks */}
      <div className="flex overflow-x-auto gap-4 pb-10 px-4 snap-x snap-mandatory no-scrollbar">
     
      </div>

      {/* 2. Primary Mobile CTA */}
      <div className="px-6 mt-2">
        <button className="w-full py-6 bg-gold text-navy font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl active:scale-95 active:brightness-95 transition-all">
           British Connection
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-1 mt-6">
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 🖥️ DESKTOP VIEW: The "Strategic Elite" Grid                                 */
/* -------------------------------------------------------------------------- */
function DesktopView() {
  return (
    /* أضفنا mt-16 للشاشات الصغيرة و mt-24 للشاشات الكبيرة 
       لضمان عدم تداخل الكروت مع الهيدر (Navbar) الثابت
    */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-7xl mx-auto mt-16 md:mt-24 px-4 md:px-0">
   
    </div>
  );
}