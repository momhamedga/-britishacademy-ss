"use client"
import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';
import { INSTRUCTORS } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function InstructorsSection() {
    const [isMounted, setIsMounted] = useState(false);

  // ننتظر حتى يتم تحميل المكون بالكامل على المتصفح
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // إذا لم يتم التحميل بعد، نرجع Empty Div بنفس المساحة تقريباً لتجنب الـ Layout Shift
  if (!isMounted) {
    return <div className="pb-32 h-[500px]" />; 
  }
  return (
    <section className="pb-32 px-4 md:px-6 relative z-10  overflow-hidden">
      
      {/* 1. Cinematic Background Pattern (CSS Only for SEO Speed) */}
      <div className="absolute inset-0 opacity-5 bg-grid-gold pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Container: Carousel on Mobile / Grid on Desktop */}
        <div className="
          flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-12 /* Mobile Carousel Styles */
          md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 md:pb-0 /* Desktop Grid Overrides */
        ">
          {INSTRUCTORS.map((instructor, index) => {
            const Icon = instructor.icon;
            return (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                /* snap-center: تضمن أن الكارت يقف في نص الشاشة بالضبط عند السحب */
                className="
                  group relative flex-shrink-0 w-[88vw] snap-center h-[480px] /* Mobile Width & Height */
                  md:w-full md:h-[520px] /* Desktop Height Reset */
                  rounded-[3rem] md:rounded-[4rem] border border-white/5 bg-navy/20 
                  flex items-center justify-center overflow-hidden p-8 md:p-10 
                  hover:border-gold/20 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl
                "
              >
                {/* 2. Abstract Neural Background inside each card */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* 3. Central Cinematic Icon Logic */}
                <motion.div 
                   whileHover={{ scale: 1.05, rotate: 3 }}
                   className="relative z-10 flex flex-col items-center justify-center group-hover:scale-95 transition-transform duration-700"
                >
                   <div className="p-10 rounded-full bg-gold/5 border border-gold/10 relative">
                      {/* الأيقونة أبيض وأسود وتتحول لذهبي متوهج عند الـ Hover */}
                      <Icon size={90} className="text-white opacity-30 group-hover:text-gold group-hover:opacity-100 group-hover:drop-shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                      
                      {/* Floating Ring around the icon */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-gold/10 rounded-full scale-125"
                      />
                   </div>
                </motion.div>

                {/* 4. Glass Card Content Overlay (Cinema Style) */}
                <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6">
                  <div className="glass p-7 md:p-9 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 backdrop-blur-2xl translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] relative z-20 overflow-hidden">
                    
                    {/* Vignette Overlay inside the glass for text clarity */}
                    <div className="vignette-overlay absolute inset-0 -z-10" />

                    <div className="flex items-center gap-3 mb-3">
                       <ShieldCheck size={16} className="text-gold" />
                       <span className="text-gold text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{instructor.experience} Expert</span>
                    </div>

                    {/* Fluid Typography using Tailwind v4 base styles */}
                    <h3 className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tight leading-none mb-1 text-glow-gold">
                      {instructor.name}
                    </h3>
                    
                    <p className="text-slate-400 text-[9px] md:text-[12px] font-bold uppercase tracking-[0.15em] mb-4 opacity-70">
                      {instructor.role}
                    </p>

                    {/* Specialty - Expand & Shine on Hover */}
                    <div className="h-[1px] w-0 group-hover:w-full bg-gold/30 transition-all duration-700 mb-4" />
                    
                    <div className="flex items-center gap-2 text-slate-200 text-[10px] md:text-[13px] italic opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]">
                       <Zap size={14} className="text-gold/60 flex-shrink-0" />
                       <span className="truncate">{instructor.specialty}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 5. Fluid Carousel Indicators for Mobile */}
        <div className="flex justify-center gap-3 mt-6 md:hidden">
          {INSTRUCTORS.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-gold/30 transition-colors duration-500" />
          ))}
        </div>

      </div>
    </section>
  );
}