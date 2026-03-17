"use client"
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function MembershipHero() {
  return (
    <section className="pt-48 pb-24 px-4 relative overflow-hidden ">
      
      {/* 1. Animated Tech Background Lines */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* 2. Enhanced Badge with Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md mb-8 group hover:border-gold/50 transition-colors duration-500"
        >
          <ShieldCheck size={14} className="text-gold animate-pulse" />
          <span className="text-gold text-[11px] font-black uppercase tracking-[0.4em]">
            Elite Engineering Faculty
          </span>
        </motion.div>

        {/* 3. Hero Title with Cinematic Animation */}
        <div className="relative mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-[clamp(3rem,10vw,7.5rem)] font-black text-white italic uppercase tracking-[ -0.05em] leading-[0.85]"
          >
            GLOBAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-gold via-gold/80 to-gold/40 drop-shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              COMMANDER
            </span>
          </motion.h1>
          
          {/* Subtle reflection effect below the main title */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full opacity-[0.03] select-none pointer-events-none blur-sm">
             <h1 className="text-[clamp(3rem,10vw,7.5rem)] font-black text-white italic uppercase tracking-[-0.05em] leading-[0.85] scale-y-[-1]">
               COMMANDER
             </h1>
          </div>
        </div>

        {/* 4. Subtext with Improved Spacing */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="max-w-3xl mx-auto text-slate-400 text-sm md:text-xl font-medium leading-relaxed tracking-wide italic"
        >
          An interconnected mixture of <span className="text-white">professional veterans</span> and 
          international security architects dedicated to <span className="text-gold">elite engineering standards</span>.
        </motion.p>

        {/* 5. Call to Action Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold via-gold/20 to-transparent" />
          <span className="text-[10px] text-gold/40 uppercase tracking-[0.5em] font-bold">Scroll to Explore</span>
        </motion.div>
      </div>

      {/* 6. Cinematic Light Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[150px] -z-10 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy-light/20 rounded-full blur-[120px] -z-10" />
      
    </section>
  );
}