"use client";
import { STATS } from '@/lib/constants';
import Counter from '@/components/ui/counter';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Globe, Users } from 'lucide-react';

export default function AboutStats() {
  return (
    <section className="py-24 relative z-10 overflow-hidden ">
      
      {/* 🌌 Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('/grid.svg')] bg-center" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Grid Layout: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-12 relative">
          
          {/* Vertical Divider for Desktop only */}
          <div className="hidden lg:block absolute inset-y-0 left-1/4 w-[1px] bg-white/5" />
          <div className="hidden lg:block absolute inset-y-0 left-2/4 w-[1px] bg-white/5" />
          <div className="hidden lg:block absolute inset-y-0 left-3/4 w-[1px] bg-white/5" />

          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Tactical Container for each Stat */}
              <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:bg-white/[0.03] transition-all duration-500">
                
                {/* 🎯 Floating Icon (Subtle) */}
                <div className="mb-4 opacity-20 group-hover:opacity-100 group-hover:text-gold transition-all duration-700">
                   {i === 0 && <Users size={16} />}
                   {i === 1 && <Globe size={16} />}
                   {i === 2 && <ShieldCheck size={16} />}
                   {i === 3 && <Activity size={16} />}
                </div>

                <div className="relative inline-block mb-2">
                  <h3 className={`text-[clamp(2rem,10vw,4.5rem)] font-black italic tracking-tighter leading-none flex items-center justify-center ${stat.color === 'gold' ? 'text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'text-white'}`}>
                    <Counter value={stat.value} />
                    {stat.value.includes('+') && (
                      <span className="text-[0.5em] ml-1 mt-1 opacity-50">+</span>
                    )}
                  </h3>
                  
                  {/* Underline Pulse Effect */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-[2px] mx-auto mt-2 rounded-full ${stat.color === 'gold' ? 'bg-gold' : 'bg-white/40'}`} 
                  />
                </div>

                <p className="text-[9px] md:text-xs font-black uppercase tracking-[0.25em] text-slate-500 max-w-[120px] leading-tight mt-4 group-hover:text-white transition-colors">
                  {stat.label}
                </p>

                {/* Background Decorative Ring */}
                <div className="absolute inset-0 border border-white/5 rounded-[2rem] scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700" />
              </div>

              {/* Mobile Separator Line (Horizontal) */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-white/10 md:hidden" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}