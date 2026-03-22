"use client";
import { VALUES } from '@/lib/aboutValues';
import { motion } from 'framer-motion';
import { Fingerprint } from 'lucide-react';

export default function AboutValues() {
  return (
    <section className="py-24 md:py-40 px-6 relative overflow-hidden ">
      
      {/* 🌌 Ambient DNA Background - Deepened for 2026 Aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/dna-pattern.svg')] bg-repeat mix-blend-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section: Strategic Briefing Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3">
               <Fingerprint size={16} className="text-gold/60 animate-pulse" />
               <span className="text-gold/50 text-[9px] font-black uppercase tracking-[0.5em]">Commitment Protocol</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,7vw,4.2rem)] font-black text-white italic uppercase tracking-tighter leading-[0.9]">
              Our Commitment <br /> 
              <span className="text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">To Excellence</span>
            </h2>
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: 80 }}
               transition={{ duration: 1.2, delay: 0.5 }}
               className="h-1 bg-gold rounded-full mx-auto md:mx-0 shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <p className="text-slate-400 max-w-sm text-sm md:text-lg font-medium italic border-l border-gold/40 pl-6 text-left opacity-90 leading-relaxed">
              Integra Training Academy sets itself apart through an unwavering commitment to quality and professional evolution.
            </p>
          </motion.div>
        </div>

        {/* Values Grid: Tactical Cards with Enhanced Readability */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative p-8 md:p-10 rounded-[2rem] bg-white/[0.02] backdrop-blur-md border border-white/5 hover:border-gold/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Internal Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon: Refined & Modern */}
              <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gold/80 mb-8 group-hover:bg-gold group-hover:text-black transition-all duration-500 shadow-lg">
                <v.icon size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="relative z-10 space-y-3">
                <h3 className="font-display text-lg md:text-xl font-bold text-white uppercase tracking-tight group-hover:text-gold transition-colors duration-500">
                  {v.title}
                </h3>
                
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium group-hover:text-slate-200 transition-colors duration-500">
                  {v.desc}
                </p>
              </div>

              {/* Operational Status Dot */}
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <div className="w-1 h-1 bg-white/10 rounded-full group-hover:bg-gold group-hover:shadow-[0_0_8px_#d4af37] transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Bottom Glow Divider */}
      <div className="absolute -bottom-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}