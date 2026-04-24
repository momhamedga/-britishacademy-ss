"use client";

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/lib/membership/about';

// ✅ دالات الـ Sync الاحترافية
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function TacticalAbout() {
  // ✅ وداعاً للـ useEffect والـ useState الـ Manual
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) return <section className="min-h-[80svh] bg-navy" />;

  return (
    <section className="relative py-20 md:py-32 px-6 overflow-hidden bg-navy">
      
      {/* 🌌 High-Performance Mesh Gradient using Tailwind v4 sizes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* توهج Medium Blue */}
        <div className="absolute -top-[10%] -right-[10%] size-[70%] rounded-full opacity-30 blur-[120px] bg-mediumBlue" />
        {/* لمسة الـ Gold */}
        <div className="absolute bottom-[-10%] left-[5%] size-[40%] rounded-full opacity-5 blur-[100px] bg-gold" />
      </div>

      <div className="max-w-320 mx-auto relative z-10">
        
        {/* 🏆 Title System */}
        <div className="mb-16 md:mb-24 mt-20 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="size-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">
              {ABOUT_CONTENT.badge}
            </span>
          </motion.div>
          
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white md:text-7xl lg:text-8xl leading-[0.9]">
            {ABOUT_CONTENT.headline.split('—')[0]} 
            <span className="block text-transparent bg-clip-text bg-linear-to-b from-gold to-gold/60">
              {ABOUT_CONTENT.headline.split('—')[1] || "Training Leaders"}
            </span>
          </h2>
        </div>

        {/* 📱 Bento Cards - Tactical Dark Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-280">
          {ABOUT_CONTENT.cards.map((card, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.98 }}
              className="relative group p-8 md:p-14 bg-white/[0.03] backdrop-blur-sm rounded-[2.5rem] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
            >
              {/* الضوء الجانبي عند الهوفر */}
              <div className="absolute inset-0 bg-linear-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
                {/* Icon Container */}
                <div className="p-5 rounded-2xl bg-linear-to-br from-white/5 to-gold/10 border border-white/10 shadow-xl group-hover:border-gold/30 transition-colors">
                  <card.icon size={28} className="text-gold" strokeWidth={1.5} />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic">
                    {card.title}
                  </h4>
                  <p className="text-sm md:text-lg text-white/60 font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Tactical Corners */}
              <div className="absolute bottom-6 right-6 size-4 border-b border-r border-white/10 rounded-br-md" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0  opacity-[0.04] pointer-events-none z-40" />
    </section>
  );
}