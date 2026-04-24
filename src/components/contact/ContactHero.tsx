"use client";

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { useMediaQuery } from "@/hooks/use-media-query";

// ✅ دالات الـ Sync الاحترافية لضمان ثبات الـ UI
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function TacticalContactHero() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  // ✅ الحل النهائي لمشاكل الـ Mounted والخطوط الحمراء
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) return <section className="min-h-[85svh] w-full bg-navy" />;

  return (
    <section className="relative min-h-[85svh] w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-navy">
      
      {/* 🌌 Background Elements - v4 Semantic Colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full rounded-full opacity-25 blur-[150px] bg-mediumBlue" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Glow Line - v4 Gold Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <div className="max-w-320 mx-auto relative z-10 w-full">
        
        {/* 1. Shared Header Section */}
        <div className="mb-12 md:mb-20 flex flex-col items-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="size-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">
              Get in touch
            </span>
          </motion.div>
          
          {/* Headline - Responsive with clamp-like behavior */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-6">
            Contact <br className="lg:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-gold to-gold/50">
              Us
            </span>
          </h1>

          {/* Sub-text */}
          <p className="text-white/50 text-xl md:text-2xl font-medium italic max-w-160 mx-auto">
            {` "We're here to answer your inquiries and provide professional support."`}
          </p>
        </div>

        {/* 2. Content Switcher */}
        {isDesktop ? <DesktopView /> : <MobileView />}

      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none z-20" />
    </section>
  );
}

function MobileView() {
  return (
    <div className="relative -mx-4"> 


      <div className="flex justify-center gap-1 mt-6">
        <div className="size-1.5 rounded-full bg-gold" />
        <div className="size-1.5 rounded-full bg-gold/20" />
      </div>
    </div>
  );
}

function DesktopView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-320 mx-auto mt-16 md:mt-24 px-4 md:px-0">
    </div>
  );
}