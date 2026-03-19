"use client";
import { ADVANTAGES } from '@/lib/membership/membership-Advantages';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Star } from 'lucide-react';

export default function MembershipAdvantages() {
  return (
    <section className="py-24 px-4 relative overflow-hidden ">
      {/* 🌌 Cinematic Background - تحسين الإضاءة الخلفية */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <Star className="text-gold fill-gold animate-pulse" size={14} />
            <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em] italic">Elite Status Only</span>
            <Star className="text-gold fill-gold animate-pulse" size={14} />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
            Exclusive <span className="text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Privileges</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
             <ShieldCheck size={20} className="text-gold/50" />
             <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* 📱 Grid Optimized for Mobile (1 col) and Desktop (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {ADVANTAGES.map((adv, index) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative h-full"
            >
              {/* Card Main Container */}
              <div className="relative h-full overflow-hidden glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-3xl transition-all duration-700 shadow-2xl group-hover:border-gold/40 group-hover:shadow-gold/5">
                
                {/* ⚡ Tactical Top Highlight (Hover Effect) */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Icon Evolution */}
                <div className="relative mb-10 inline-block">
                    <div className="absolute -inset-4 bg-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-[1.5rem]  border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-500 shadow-2xl overflow-hidden">
                        {/* Inner Glow in Icon */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-30" />
                        <adv.icon size={30} strokeWidth={1.2} className="relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="relative z-10 space-y-4">
                   <div className="flex items-center gap-2 mb-1">
                      <Zap size={10} className="text-gold opacity-40 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Module {index + 1}</span>
                   </div>
                   
                   <h3 className="text-white font-black italic uppercase tracking-tight text-xl md:text-2xl leading-[1.1] group-hover:text-gold transition-colors duration-500">
                     {adv.text}
                   </h3>
                   
                   {/* Description (Optional Placeholder if you want to add more data later) */}
                   <p className="text-white/40 text-xs font-medium leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                      Unlocking advanced operational capabilities and exclusive strategic assets for verified members.
                   </p>
                </div>

                {/* Cinematic Number Background */}
                <div className="absolute -bottom-4 -right-2 text-[120px] font-black italic select-none text-white/[0.02] group-hover:text-gold/[0.04] group-hover:-translate-y-4 transition-all duration-700 leading-none">
                  {index + 1}
                </div>

                {/* Bottom Shine */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 📱 Mobile Call to Action (Optional) */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 text-center lg:hidden"
        >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/60">
                Swipe to explore more privileges <Zap size={10} className="text-gold animate-bounce" />
            </div>
        </motion.div>
      </div>
    </section>
  );
}