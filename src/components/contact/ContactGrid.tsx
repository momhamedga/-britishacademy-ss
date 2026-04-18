"use client";
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { CONTACT_INFO_CARDS } from '@/lib/constants';
import { ChevronRight, Navigation, Share2, Twitter, Instagram, Linkedin, Github, Shield, Globe, Target, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useMediaQuery } from "@/hooks/use-media-query";

export default function TacticalContactGrid() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[600px] animate-pulse bg-white/5 rounded-[3rem]" />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {isDesktop ? <DesktopBentoLayout /> : <MobileNativeLayout />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 🖥️ DESKTOP BENTO GRID: The Command Hub                                    */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* 🖥️ DESKTOP ADAPTIVE LAYOUT: Optimized for Sidebar (col-span-5)           */
/* -------------------------------------------------------------------------- */
function DesktopBentoLayout() {
  return (
    // بدل ما نخليه 12 عمود، هنخليه عمود واحد أو اتنين بالكتير عشان يناسب الـ Sidebar
    <div className="flex flex-col gap-6 w-full">
      
      {/* 1. Brand Header Card - Simplified for Sidebar */}
      <motion.div 
        className="p-8 rounded-[2.5rem] bg-white border border-[oklch(25%_0.08_260)]/5 shadow-sm relative overflow-hidden"
      >
        <span className="text-[9px] font-black text-[oklch(25%_0.08_260)]/40 uppercase tracking-[0.4em] mb-2 block">STATUS_ACTIVE</span>
        <h2 className="text-3xl font-black text-[oklch(25%_0.08_260)] italic uppercase leading-none">
          Tactical <span className="text-[#D4AF37]">Inbound</span>
        </h2>
      </motion.div>

      {/* 2. Interactive Map Widget - High Aspect Ratio */}
      <motion.div 
        className="h-[300px] rounded-[2.5rem] overflow-hidden border border-[oklch(25%_0.08_260)]/10 shadow-xl relative group/map"
      >
        <iframe
          src="https://www.google.com/maps/embed?..." // استخدم رابط Embed حقيقي هنا
          className="w-full h-full grayscale contrast-[1.1] transition-all group-hover/map:grayscale-0"
          style={{ border: 0 }}
          loading="lazy"
        />
        <div className="absolute top-4 left-4 z-20">
           <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[oklch(25%_0.08_260)]/10 flex items-center gap-2">
              <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-[oklch(25%_0.08_260)] uppercase tracking-widest">LIVE_SIGNAL</span>
           </div>
        </div>
      </motion.div>

      {/* 3. Contact Info Cards - Vertical List */}
      <div className="space-y-3">
        {CONTACT_INFO_CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            whileHover={{ x: 8 }}
            className="p-5 rounded-[1.8rem] bg-white border border-[oklch(25%_0.08_260)]/5 flex items-center gap-4 group cursor-pointer"
          >
            <div className="size-12 rounded-xl bg-[oklch(25%_0.08_260)] text-[#D4AF37] flex items-center justify-center shrink-0">
              <card.icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[7px] font-black text-[oklch(45%_0.12_255)] uppercase tracking-[0.2em] truncate">{card.label}</p>
              <p className="text-sm font-bold text-[oklch(25%_0.08_260)] truncate tracking-tight">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. Social & Coordinates HUD - Compact Base */}
      <div className="p-6 rounded-[2.5rem] bg-[oklch(25%_0.08_260)] relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex gap-3">
            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
              <Link key={i} href="#">
                <motion.div whileHover={{ y: -5 }} className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                  <Icon size={18} />
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="text-right">
             <p className="text-[6px] font-mono text-white/20 uppercase leading-tight">
                25.2048° N <br /> 55.2708° E
             </p>
          </div>
        </div>
      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 📱 MOBILE NATIVE LAYOUT: App-Like Experience                              */
/* -------------------------------------------------------------------------- */
function MobileNativeLayout() {
  return (
    <div className="flex flex-col gap-8 pb-40 px-4  min-h-screen">
      
      {/* 1. App Bar - Ultra Modern HUD */}
      <div className="flex justify-between items-center pt-4">
        <div className="size-12 rounded-2xl bg-white border border-navy/5 flex items-center justify-center shadow-sm">
          <Shield size={20} className="text-[#D4AF37]" />
        </div>
        <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-navy/5 shadow-sm">
          <span className="text-[10px] font-black text-navy uppercase tracking-[0.2em]">System_Online</span>
        </div>
        <div className="size-12 rounded-2xl bg-navy flex items-center justify-center text-[#D4AF37] shadow-lg">
          <Share2 size={20} />
        </div>
      </div>

      {/* 2. Hero Section - Cinematic Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <h2 className="text-5xl font-black text-navy italic leading-[0.8] uppercase tracking-tighter">
          Tactical <br />
          <span className="text-[#D4AF37]">Access</span>
        </h2>
        <p className="text-[10px] font-medium text-navy/40 mt-4 uppercase tracking-[0.3em]">Ready for secure synchronization</p>
      </motion.div>

      {/* 3. Bento Map Widget - Full Screen Style */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        className="relative h-[400px] rounded-[3.5rem] overflow-hidden border-4 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178653942004!2d55.2707828!3d25.1882042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6831d17743d1%3A0xc04961f67f642468!2sDubai%20Design%20District!5e0!3m2!1sen!2sae!4v1713500000000!5m2!1sen!2sae" // مربوطة بالـ Dubai Design District
          className="w-full h-full grayscale contrast-[1.2] brightness-[0.9] scale-110"
          style={{ border: 0 }}
          loading="lazy"
        />
        {/* Map Floating HUD */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
          <div className="p-3 bg-navy text-white rounded-2xl flex items-center gap-2 shadow-2xl">
            <div className="size-2 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest">DXB_NODE_LOCKED</span>
          </div>
          <div className="size-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
             <Navigation size={18} className="text-navy" />
          </div>
        </div>

        {/* Dynamic Navigation Trigger */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%]">
          <button className="w-full py-5 bg-white/90 backdrop-blur-xl rounded-3xl text-navy font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-3">
             Initiate Navigation
          </button>
        </div>
      </motion.div>

      {/* 4. Social Grid - App Icon Style */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { Icon: Twitter, label: "Feed" },
          { Icon: Instagram, label: "Visuals" },
          { Icon: Linkedin, label: "Pro" },
          { Icon: Github, label: "Code" }
        ].map((soc, i) => (
          <motion.div 
            key={i}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="aspect-square w-full bg-white rounded-[1.8rem] border border-navy/5 shadow-sm flex items-center justify-center text-navy/40 active:text-[#D4AF37] active:bg-navy transition-all duration-300">
              <soc.Icon size={24} strokeWidth={1.5} />
            </div>
            <span className="text-[8px] font-black text-navy/30 uppercase tracking-widest">{soc.label}</span>
          </motion.div>
        ))}
      </div>

      {/* 5. Contact Cards - Actionable Items */}
      <div className="space-y-4">
        {CONTACT_INFO_CARDS.map((item) => (
          <motion.div 
            key={item.id}
            whileTap={{ x: 10 }}
            className="p-6 bg-white rounded-[2.5rem] border border-navy/5 flex items-center gap-5 shadow-sm active:shadow-inner transition-all"
          >
            <div className="size-14 rounded-2xl bg-navy/5 flex items-center justify-center text-[#D4AF37] ring-8 ring-navy/[0.02]">
              <item.icon size={24} />
            </div>
            <div className="flex-1">
              <span className="text-[8px] font-black text-navy/40 uppercase tracking-[0.2em] block mb-1">{item.label}</span>
              <h3 className="text-[13px] font-bold text-navy tracking-tight">{item.value}</h3>
            </div>
            <div className="size-8 rounded-full bg-navy text-white flex items-center justify-center">
               <ChevronRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>


    </div>
  );
}
