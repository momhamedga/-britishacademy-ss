"use client";
import { VALUES } from '@/lib/aboutValues';
import { motion } from 'framer-motion';
import { Fingerprint } from 'lucide-react';

export default function AboutValues() {
  return (
    <section className="py-24 md:py-40 px-6 relative overflow-hidden ">
      
      {/* 🌌 Ambient DNA Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/dna-pattern.svg')] bg-repeat" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3">
               <Fingerprint size={18} className="text-gold/50 animate-pulse" />
               <span className="text-gold/40 text-[10px] font-black uppercase tracking-[0.5em]">System Core</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,8vw,4.8rem)] font-black text-white italic uppercase tracking-tighter leading-[0.85]">
              The <span className="text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">DNA</span> <br /> 
              of Excellence
            </h2>
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: 100 }}
               transition={{ duration: 1 }}
               className="h-1.5 bg-gold rounded-full mx-auto md:mx-0 shadow-[0_0_15px_rgba(212,175,55,0.5)]" 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <p className="text-slate-400 max-w-sm text-sm md:text-lg font-medium italic border-l-2 md:border-l border-gold/40 pl-6 text-left opacity-80">
              Our values are the strategic pillars engineered into every professional decision within the British Academy.
            </p>
          </motion.div>
        </div>

        {/* Values Grid: Tactical Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-gold/30 transition-all duration-700 hover:-translate-y-3 overflow-hidden shadow-2xl"
            >
              {/* Internal Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Icon Container: The Heart of the card */}
              <div className="relative z-10 w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-gold mb-10 group-hover:bg-gold group-hover:text-black transition-all duration-500 shadow-xl group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                <v.icon size={30} strokeWidth={1.2} className="group-hover:scale-110 md:group-hover:scale-125 transition-transform duration-500" />
                
                {/* Decorative Corners for Icon */}
                <div className="absolute -inset-1 border border-gold/0 group-hover:border-gold/20 rounded-[1.7rem] transition-all duration-700 scale-110 group-hover:scale-100" />
              </div>

              <div className="relative z-10 space-y-4">
                <h3 className="font-display text-xl md:text-2xl font-black text-white italic uppercase tracking-tight group-hover:text-gold transition-colors duration-500">
                  {v.title}
                </h3>
                
                <p className="text-slate-400 text-[13px] md:text-base leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {v.desc}
                </p>
              </div>

              {/* Status Indicator (Tactical Dot) */}
              <div className="absolute top-8 right-8 flex items-center gap-2">
                <span className="text-[7px] text-white/10 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">Active_Core</span>
                <div className="w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-gold group-hover:animate-ping transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute -bottom-24 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}