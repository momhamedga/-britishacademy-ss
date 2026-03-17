"use client"
import { Target, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHAT_IS_ACCREDITATION } from '@/lib/constants/accreditation';
import AboutAccordion from './AboutAccordion';
import TargetAccordion from './TargetAccordion';

export default function AccreditationTab() {
  return (
    <div className="space-y-24 md:space-y-48 pb-20 selection:bg-gold/40">
      
      {/* 1. Cinematic Hero Section - نظام الإضاءة المركزة */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative p-10 md:p-24 rounded-[3rem] md:rounded-[5rem] bg-navy/20 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl group"
      >
        {/* خلفية شبكية ذهبية (bg-grid-gold) اللي عرفناها في الـ CSS */}
        <div className="absolute inset-0 bg-grid-gold opacity-20 pointer-events-none" />
        
        {/* Glow Effects - لزيادة العمق */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full group-hover:bg-gold/15 transition-all duration-1000" />
        
        <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold-light text-[10px] font-black tracking-[0.3em] uppercase"
            >
              <Zap className="w-4 h-4 fill-gold-light animate-pulse" />
              Elite Standards
            </motion.div>
            
            {/* تعديل الـ Gradient ليكون أكثر وضوحاً على الخلفية الكحلية */}
            <h3 className="text-5xl md:text-8xl font-display font-black italic uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gold/40">
              {WHAT_IS_ACCREDITATION.title}
            </h3>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -left-6 top-0 w-[2px] h-full bg-gradient-to-b from-gold-light via-gold/20 to-transparent" />
            <p className="text-slate-300 text-lg md:text-2xl leading-relaxed font-sans font-light pl-8">
              <span className="text-6xl md:text-8xl font-display font-black text-gold-light float-left mr-5 mt-2 leading-none italic drop-shadow-[0_0_20px_rgba(244,223,78,0.4)]">
                {WHAT_IS_ACCREDITATION.content.charAt(0)}
              </span>
              {WHAT_IS_ACCREDITATION.content.slice(1)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. Framework & Stats - توزيع هندسي متزن */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
        
        {/* Left Column (The Logic) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="order-2 lg:order-1 lg:col-span-7 glass p-8 md:p-20 rounded-[4rem] border-white/10"
        >
          <div className="flex flex-col gap-3 mb-16">
            <span className="text-gold text-[10px] font-black uppercase tracking-[0.8em] opacity-60">Protocol</span>
            <h2 className="text-white text-3xl md:text-6xl font-display italic tracking-tighter uppercase">
              Accreditation Framework
            </h2>
          </div>
          <AboutAccordion />
        </motion.div>

        {/* Right Column (The Visual Impact) */}
        <div className="order-1 lg:order-2 lg:col-span-5 space-y-16">
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-10 md:p-16 rounded-[4rem] relative overflow-hidden"
          >
            {/* Scan Line Effect - من الـ CSS اللي عرفناه */}
            <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent h-1/2 w-full animate-scan pointer-events-none opacity-20" />
            
            <div className="flex items-center gap-6 mb-12">
              <div className="p-4 rounded-2xl bg-gold/10 border border-gold/20">
                <Target className="text-gold-light w-8 h-8" />
              </div>
              <h3 className="text-white text-2xl md:text-4xl font-display uppercase italic tracking-tighter leading-none">
                The Impact
              </h3>
            </div>
            <TargetAccordion />
          </motion.div>
          
   {/* Stats Grid - Ultra-Clean & Fixed Clipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "IDENTITY", val: "GLOBAL", grad: "from-white/10" },
              { label: "STANDARD", val: "ELITE", grad: "from-gold/10" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className={`relative p-10 md:p-14 rounded-[3.5rem] bg-gradient-to-br ${stat.grad} to-transparent border border-white/5 flex flex-col justify-center min-h-[300px] overflow-hidden group`}
              >
                {/* Content Wrapper with extra padding to prevent clipping */}
                <div className="relative z-10 py-4"> 
                  <h4 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-white italic uppercase tracking-tighter leading-[1.1] mb-6 group-hover:text-gold-light transition-colors duration-500 break-words">
                    {stat.val}
                  </h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.6em] font-black group-hover:text-gold transition-colors">
                    {stat.label}
                  </p>
                </div>

                {/* الرقم الخلفي - تحسين التموضع لعدم التداخل */}
                <span className="absolute -bottom-6 -right-2 text-[8rem] md:text-[10rem] font-black text-white/[0.03] italic select-none pointer-events-none transition-all group-hover:text-white/[0.07]">
                  {i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}