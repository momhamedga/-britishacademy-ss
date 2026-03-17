"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Rocket, Eye, ArrowUpRight, CheckCircle2, Shield } from 'lucide-react';
import { ACADEMY_SERVICES, ACADEMY_VALUES, DISCOVER_IDENTITY } from '@/lib/constants/overview';

export default function OverviewTab() {
  return (
    <div className="space-y-20 md:space-y-32 pb-10">
      
      {/* 1. Introduction Header - تحسين التباعد والخط */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative p-8 md:p-16 lg:p-20 rounded-[2.5rem] md:rounded-[4rem] bg-white/[0.02] border border-white/5 overflow-hidden group"
      >
         <div className="relative z-10 max-w-4xl">
            <h3 className="text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-6">Our Identity</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed italic font-display">
               "{DISCOVER_IDENTITY.aboutDetailed}"
            </p>
            <div className="mt-8 md:mt-12 p-6 md:p-8 rounded-3xl bg-gold/5 border border-gold/10 inline-block">
               <p className="text-gold text-[10px] md:text-[11px] font-bold uppercase tracking-widest flex items-center gap-3">
                  <Shield size={16} /> {DISCOVER_IDENTITY.purpose}
               </p>
            </div>
         </div>
         <div className="absolute -bottom-20 -right-20 w-64 h-64 md:w-80 md:h-80 bg-gold/5 blur-[100px] rounded-full" />
      </motion.div>

      {/* 2. Mission & Vision Cards - ضبط التجاوب وأحجام العناوين */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {[
          { title: "Mission", icon: Rocket, content: DISCOVER_IDENTITY.mission },
          { title: "Vision", icon: Eye, content: DISCOVER_IDENTITY.vision }
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 relative group"
          >
            <item.icon className="text-gold mb-8 md:mb-10 w-10 h-10 md:w-12 md:h-12" />
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 font-display italic uppercase tracking-tighter">
              {item.title}
            </h3>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light font-sans">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>

{/* 3. Detailed Services Grid - النسخة الـ Balanced والفخمة */}
<div className="space-y-16 md:space-y-20">
  <div className="text-center px-4">
    <h2 className="text-4xl md:text-6xl font-black text-white uppercase font-display italic tracking-tighter">
      Our Services
    </h2>
  </div>
  
  {/* max-w-[1200px] عشان الكروت متبقاش عريضة بزيادة عن اللزوم */}
  <div className="flex flex-col gap-6 md:gap-8 px-4 md:px-0 max-w-[1200px] mx-auto">
    {ACADEMY_SERVICES.map((service, idx) => (
      <motion.div 
        key={idx} 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        /* صغرنا الـ min-h والـ h عشان الكارت يكون رشيق */
        className="group relative w-full min-h-[300px] md:h-[380px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#000B21] flex items-center shadow-xl"
      >
        <Image 
          src={service.img} 
          alt={service.title} 
          fill 
          className="object-cover img-cinematic transition-transform duration-[1.5s] group-hover:scale-105 opacity-30" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B21] via-[#000B21]/90 to-transparent" />

        <div className="relative z-10 p-8 md:p-14 w-full md:w-3/4 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-5 transform -translate-x-6 group-hover:translate-x-0 transition-transform duration-500">
            <div className="h-[1px] w-12 bg-gold/50" />
            <service.icon className="text-gold" size={28} />
          </div>

          {/* العنوان بقى text-5xl بدلاً من 8xl عشان التوازن البصري */}
          <h4 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase font-display italic leading-tight tracking-tighter mb-4 drop-shadow-xl">
            {service.title}
          </h4>

          <p className="max-w-lg text-white/40 text-[11px] md:text-sm leading-relaxed uppercase tracking-[0.2em] font-sans group-hover:text-white/70 transition-colors">
            {service.desc}
          </p>

          <div className="mt-8 flex items-center gap-3 group/btn cursor-pointer">
            <span className="text-gold/80 font-bold text-[10px] uppercase tracking-[0.3em]">Explore</span>
            <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover/btn:bg-gold transition-all duration-500">
               <ArrowUpRight className="text-white group-hover/btn:text-navy group-hover/btn:rotate-45 transition-all" size={18} />
            </div>
          </div>
        </div>

        {/* الأيقونة الخلفية صغرت وبقت أنعم */}
        <div className="hidden md:block absolute right-12 bottom-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
           <service.icon size={120} className="text-white" />
        </div>
      </motion.div>
    ))}
  </div>
</div>
      {/* 4. Core Values - تحسين العرض في الموبايل */}
      <div className="space-y-12 px-4 md:px-0">
        <h2 className="text-lg md:text-2xl font-black text-white font-display uppercase tracking-[0.3em] text-center italic">
          Core Values & Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACADEMY_VALUES.map((val, idx) => (
            <div key={idx} className="p-6 md:p-8 glass border border-white/5 rounded-[1.5rem] md:rounded-[2rem] flex items-start gap-4 md:gap-6 hover:border-gold/30 transition-all group">
              <div className="p-3 rounded-xl bg-gold/10 text-gold shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-white font-bold text-[12px] md:text-sm uppercase tracking-widest mb-2 font-display italic leading-none">{val.title}</h4>
                <p className="text-white/40 text-[11px] md:text-xs leading-relaxed font-light font-sans">{val.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}