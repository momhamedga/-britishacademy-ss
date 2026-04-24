"use client";

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO_CARDS } from '@/lib/constants';
import { ChevronRight, Navigation, Share2, Twitter, Instagram, Linkedin, Github, Shield } from 'lucide-react';
import Link from 'next/link';
import { useMediaQuery } from "@/hooks/use-media-query";

// ✅ دالات الـ Sync لمنع أي Hydration mismatch
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function TacticalContactGrid() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  // ✅ استخدام الـ Standard الجديد بتاعنا
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) return <div className="min-h-[600px] animate-pulse bg-white/5 rounded-[3rem]" />;

  return (
    <div className="w-full max-w-320 mx-auto px-4 py-8">
      {isDesktop ? <DesktopBentoLayout /> : <MobileNativeLayout />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 🖥️ DESKTOP ADAPTIVE LAYOUT: Optimized for Strategic Workspace              */
/* -------------------------------------------------------------------------- */
function DesktopBentoLayout() {
  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* 1. Brand Header Card */}
      <motion.div className="p-8 rounded-[2.5rem] bg-white border border-navy/5 shadow-sm relative overflow-hidden">
        <span className="text-[9px] font-black text-navy/40 uppercase tracking-[0.4em] mb-2 block">STATUS_ACTIVE</span>
        <h2 className="text-3xl font-black text-navy italic uppercase leading-none">
          Tactical <span className="text-gold">Inbound</span>
        </h2>
      </motion.div>

      {/* 2. Interactive Map Widget */}
      <motion.div className="h-[300px] rounded-[2.5rem] overflow-hidden border border-navy/10 shadow-xl relative group/map">
        <iframe
          src="https://www.google.com/maps/embed?pb=..." 
          className="size-full grayscale contrast-[1.1] transition-all group-hover/map:grayscale-0"
          style={{ border: 0 }}
          loading="lazy"
        />
        <div className="absolute top-4 left-4 z-20">
           <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-navy/10 flex items-center gap-2">
              <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-navy uppercase tracking-widest">LIVE_SIGNAL</span>
           </div>
        </div>
      </motion.div>

      {/* 3. Contact Info Cards */}
      <div className="space-y-3">
        {CONTACT_INFO_CARDS.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ x: 8 }}
            className="p-5 rounded-[1.8rem] bg-white border border-navy/5 flex items-center gap-4 group cursor-pointer"
          >
            <div className="size-12 rounded-xl bg-navy text-gold flex items-center justify-center shrink-0">
              <card.icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[7px] font-black text-mediumBlue uppercase tracking-[0.2em] truncate">{card.label}</p>
              <p className="text-sm font-bold text-navy truncate tracking-tight">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. Social & Coordinates HUD */}
      <div className="p-6 rounded-[2.5rem] bg-navy relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex gap-3">
            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
              <Link key={i} href="#">
                <motion.div whileHover={{ y: -5 }} className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold">
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
/* 📱 MOBILE NATIVE LAYOUT: The "Phone-First" Protocol                        */
/* -------------------------------------------------------------------------- */
function MobileNativeLayout() {
  return (
    <div className="flex flex-col gap-8 pb-40 px-4 min-h-screen">
      
      {/* 1. App Bar */}
      <div className="flex justify-between items-center pt-4">
        <div className="size-12 rounded-2xl bg-white border border-navy/5 flex items-center justify-center shadow-sm">
          <Shield size={20} className="text-gold" />
        </div>
        <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-navy/5 shadow-sm">
          <span className="text-[10px] font-black text-navy uppercase tracking-[0.2em]">System_Online</span>
        </div>
        <div className="size-12 rounded-2xl bg-navy flex items-center justify-center text-gold shadow-lg">
          <Share2 size={20} />
        </div>
      </div>

      {/* 2. Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
        <h2 className="text-5xl font-black text-navy italic leading-[0.8] uppercase tracking-tighter">
          Tactical <br />
          <span className="text-gold">Access</span>
        </h2>
        <p className="text-[10px] font-medium text-navy/40 mt-4 uppercase tracking-[0.3em]">Ready for secure synchronization</p>
      </motion.div>

      {/* 3. Bento Map Widget */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        className="relative h-[400px] rounded-[3.5rem] overflow-hidden border-4 border-white shadow-2xl group"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=..." 
          className="size-full grayscale contrast-[1.2] brightness-[0.9] scale-110"
          style={{ border: 0 }}
          loading="lazy"
        />
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
          <div className="p-3 bg-navy text-white rounded-2xl flex items-center gap-2 shadow-2xl">
            <div className="size-2 bg-gold rounded-full animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest">DXB_NODE_LOCKED</span>
          </div>
          <div className="size-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
             <Navigation size={18} className="text-navy" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%]">
          <button className="w-full py-5 bg-white/90 backdrop-blur-xl rounded-3xl text-navy font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-3">
             Initiate Navigation
          </button>
        </div>
      </motion.div>

      {/* 4. Social Grid */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { Icon: Twitter, label: "Feed" },
          { Icon: Instagram, label: "Visuals" },
          { Icon: Linkedin, label: "Pro" },
          { Icon: Github, label: "Code" }
        ].map((soc, i) => (
          <motion.div key={i} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2">
            <div className="aspect-square w-full bg-white rounded-[1.8rem] border border-navy/5 shadow-sm flex items-center justify-center text-navy/40 active:text-gold active:bg-navy transition-all duration-300">
              <soc.Icon size={24} strokeWidth={1.5} />
            </div>
            <span className="text-[8px] font-black text-navy/30 uppercase tracking-widest">{soc.label}</span>
          </motion.div>
        ))}
      </div>

      {/* 5. Contact Cards */}
      <div className="space-y-4">
        {CONTACT_INFO_CARDS.map((item) => (
          <motion.div 
            key={item.id}
            whileTap={{ x: 10 }}
            className="p-6 bg-white rounded-[2.5rem] border border-navy/5 flex items-center gap-5 shadow-sm active:shadow-inner transition-all"
          >
            <div className="size-14 rounded-2xl bg-navy/5 flex items-center justify-center text-gold ring-8 ring-navy/[0.02]">
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