"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CONTACT_INFO_CARDS, CONTACT_CONFIG } from '@/lib/constants';
import { ChevronRight, Target, MapPin, Navigation, Share2, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function ContactGrid() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="space-y-4 min-h-[600px] animate-pulse bg-[oklch(98%_0.01_260)] rounded-[2rem]" />;

  return (
    <div className="flex flex-col gap-6 @container">
      {/* 1. قائمة الكروت الأساسية - Container Queries Optimization */}
      <div className="grid grid-cols-1 gap-3">
        {CONTACT_INFO_CARDS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 5 }}
            className="group relative p-4 rounded-2xl bg-white border border-[oklch(25%_0.08_260)]/5 hover:border-[#D4AF37]/40 hover:shadow-[0_10px_30px_-15px_oklch(45%_0.12_255_/_0.2)] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[oklch(25%_0.08_260)] flex items-center justify-center text-[#D4AF37] ring-4 ring-[oklch(25%_0.08_260)]/5">
                <item.icon size={18} />
              </div>
              <div className="flex-1">
                <span className="text-[8px] font-black text-[oklch(45%_0.12_255)] uppercase tracking-[0.2em] block mb-0.5">
                  {item.label}
                </span>
                <h3 className="text-[oklch(25%_0.08_260)] font-bold text-xs @[20rem]:text-sm">{item.value}</h3>
              </div>
              <ChevronRight size={14} className="opacity-20 group-hover:opacity-100 group-hover:text-[#D4AF37] transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. الخريطة التكتيكية - PPR Ready UI */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative rounded-[2.5rem] bg-white border border-[oklch(25%_0.08_260)]/5 shadow-2xl overflow-hidden group/map"
      >
        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[oklch(25%_0.08_260)]/5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[8px] font-black text-[oklch(25%_0.08_260)] uppercase tracking-widest">Live_HQ_Feed</span>
        </div>

        <div className="h-[250px] @[30rem]:h-[320px] w-full relative">
          <iframe
            src="http://googleusercontent.com/maps.google.com/4"
            width="100%" height="100%"
            className="grayscale contrast-125 brightness-100 transition-all duration-1000 group-hover/map:grayscale-0"
            style={{ border: 0 }} loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[80%] py-3 bg-[oklch(25%_0.08_260)] text-[#D4AF37] rounded-xl flex items-center justify-center gap-2 shadow-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em]"
          >
            <Navigation size={14} /> GPS Navigation
          </motion.a>
        </div>
      </motion.div>

      {/* 3. Social Media Tactical HUD - الإضافة الجديدة */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 px-2">
          <Share2 size={12} className="text-[#D4AF37]" />
          <span className="text-[9px] font-black text-[oklch(25%_0.08_260)] uppercase tracking-[0.3em]">Digital_Presence</span>
          <div className="h-px flex-1 bg-[oklch(25%_0.08_260)]/5" />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Twitter, link: "#", color: "hover:bg-sky-50" },
            { icon: Instagram, link: "#", color: "hover:bg-pink-50" },
            { icon: Linkedin, link: "#", color: "hover:bg-blue-50" },
            { icon: Github, link: "#", color: "hover:bg-slate-100" }
          ].map((soc, idx) => (
            <motion.a
              key={idx}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              href={soc.link}
              className={`aspect-square rounded-2xl bg-white border border-[oklch(25%_0.08_260)]/5 flex items-center justify-center text-[oklch(25%_0.08_260)]/40 hover:text-[oklch(25%_0.08_260)] transition-all ${soc.color}`}
            >
              <soc.icon size={18} strokeWidth={1.5} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* 4. Footer Coordinates */}
      <div className="px-2 flex justify-between items-center opacity-30">
         <span className="text-[7px] font-mono font-bold uppercase tracking-tight text-[oklch(25%_0.08_260)]">Lat: 51.5049° N</span>
         <span className="text-[7px] font-mono font-bold uppercase tracking-tight text-[oklch(25%_0.08_260)]">Lon: 0.0194° W</span>
      </div>
    </div>
  );
}