"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, LayoutGrid } from "lucide-react";
import Image from "next/image";
import { HERO_SLIDES } from "@/lib/constants";

export default function DesktopHero() {
  const [current, setCurrent] = useState(0);
  const active = HERO_SLIDES[current];

  return (
    <div className="relative h-screen w-full bg-navy flex items-center overflow-hidden">
      
      {/* Dynamic Background Image */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image src={active.image} alt="bg" fill className="object-cover saturate-0 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(20% 0.06 260)] via-[#000B21]/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-20 relative z-10 grid grid-cols-2 gap-20 items-center">
        
        {/* Left: Tactical Info */}
        <motion.div
          key={`text-${current}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <span className="w-12 h-[2px] bg-gold" />
            <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px]">Elite Operations</span>
          </div>
          
          <h1 className="text-8xl font-black text-white italic uppercase leading-[0.8] tracking-tighter">
            {active.title} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
              {active.subtitle}
            </span>
          </h1>

          <p className="text-white/40 text-lg max-w-lg font-medium leading-relaxed">
            {active.description}
          </p>

          <div className="flex items-center gap-6 pt-4">
            <button className="px-10 py-5 bg-gold text-navy font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all group flex items-center gap-3">
              Start Briefing <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="p-5 border border-white/10 rounded-full text-white hover:bg-white/5 transition-all">
              <Play size={20} fill="white" />
            </button>
          </div>
        </motion.div>

        {/* Right: Immersive 3D-like Visual */}
        <div className="relative aspect-square">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ rotate: 5, scale: 0.9, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -5, scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative w-full h-full rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            >
              <Image src={active.image} alt="hero" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
          
          {/* Floating Widget */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-10 -left-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 bg-gold rounded-2xl flex items-center justify-center text-navy">
                <LayoutGrid size={24} />
              </div>
              <div>
                <p className="text-white font-black uppercase text-[10px] tracking-widest">Active Units</p>
                <p className="text-gold font-black text-2xl">1,240</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}