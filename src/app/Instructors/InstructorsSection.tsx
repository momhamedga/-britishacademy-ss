"use client";
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Star, Award, Fingerprint } from 'lucide-react';
import { INSTRUCTORS } from '@/lib/constants';
import { useEffect, useState, useRef } from 'react';

export default function InstructorsSection() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // منع الـ Hydration Error وضمان ظهور المساحة المطلوبة أثناء التحميل
  if (!isMounted) return <div className="pb-32 h-[600px] " />;

  return (
    <section className="pb-32 px-4 md:px-6 relative z-10 overflow-hidden ">
      
      {/* 🌌 Cinematic Background Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.02)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header - Visible only on Mobile to establish context quickly */}
        <div className="flex flex-col items-center mb-12 space-y-4 md:hidden">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 backdrop-blur-md">
                <Star size={10} className="text-gold fill-gold" />
                <span className="text-[9px] text-gold font-black uppercase tracking-[0.3em]">Master Faculty</span>
            </div>
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter text-center">
                The <span className="text-gold">Architects</span>
            </h2>
        </div>

        {/* Container: Carousel on Mobile / Static Grid on Desktop */}
        <div 
          ref={scrollRef}
          className="
            flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-5 pb-12 
            md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 md:pb-0 
          "
        >
          {INSTRUCTORS.map((instructor, index) => {
            const Icon = instructor.icon;
            // حل مشكلة الـ ID: نحوله لـ String ثم نأخذ أول 8 أحرف (لو كان طويلاً)
            const displayId = String(instructor.id).padStart(5, '0').slice(0, 8);

            return (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                className="
                  group relative flex-shrink-0 w-[85vw] snap-center h-[520px] 
                  md:w-full md:h-[580px] 
                  rounded-[3rem] md:rounded-[4.5rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent
                  flex items-center justify-center overflow-hidden p-6 md:p-10 
                  hover:border-gold/20 transition-all duration-700 shadow-2xl touch-pan-x
                "
              >
                {/* 🎯 Card Internal Tech Pattern */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                {/* Tactical ID Badge (Mobile Only) */}
                <div className="absolute top-8 left-8 z-30 flex items-center gap-2 md:hidden">
                    <Fingerprint size={14} className="text-gold/40" />
                    <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest italic font-mono">
                      UNIT_ID: {displayId}
                    </span>
                </div>

                {/* 🎨 Center: Animated Pulsing Icon */}
                <div className="relative z-10 flex flex-col items-center justify-center transform group-hover:scale-90 transition-transform duration-1000">
                   <motion.div 
                     animate={{ 
                       boxShadow: ["0 0 20px rgba(212,175,55,0)", "0 0 40px rgba(212,175,55,0.05)", "0 0 20px rgba(212,175,55,0)"] 
                     }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="p-12 rounded-[2.5rem] bg-black/40 border border-white/5 relative overflow-hidden"
                   >
                      <Icon size={80} className="text-white opacity-20 group-hover:text-gold group-hover:opacity-100 group-hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-700" />
                      
                      {/* Corner Accents */}
                      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/30 rounded-tr-lg" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/30 rounded-bl-lg" />
                   </motion.div>
                </div>

                {/* 🪟 The Glass Info Panel */}
                <div className="absolute inset-x-3 bottom-3">
                  <div className="glass p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 backdrop-blur-3xl translate-y-4 group-hover:translate-y-0 transition-all duration-700 relative z-20 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    
                    {/* Subtle Internal Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 blur-[60px] rounded-full pointer-events-none" />

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-gold" />
                            <span className="text-gold text-[9px] font-black uppercase tracking-[0.2em]">{instructor.experience} Expert</span>
                        </div>
                        <Award size={14} className="text-white/20 group-hover:text-gold/50 transition-colors" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none mb-1 group-hover:text-gold transition-colors duration-500">
                      {instructor.name}
                    </h3>
                    
                    <p className="text-slate-400 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-5">
                      {instructor.role}
                    </p>

                    {/* Specialty Section - Slides up on Hover */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                       <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                          <Zap size={14} />
                       </div>
                       <span className="text-white/80 text-[11px] md:text-[13px] font-medium italic truncate">
                        {instructor.specialty}
                       </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 📱 Mobile Dynamic Indicator */}
        <div className="flex flex-col items-center gap-4 mt-2 md:hidden">
            <div className="flex gap-2">
                {INSTRUCTORS.map((_, i) => (
                    <motion.div 
                        key={i} 
                        className="h-1 bg-white/10 rounded-full"
                        animate={{ 
                          width: [8, 24, 8],
                          backgroundColor: ["rgba(255,255,255,0.1)", "rgba(212,175,55,0.5)", "rgba(255,255,255,0.1)"]
                        }} 
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                    />
                ))}
            </div>
            <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.5em] animate-pulse">
                Swipe to Authorize
            </span>
        </div>

      </div>
    </section>
  );
}