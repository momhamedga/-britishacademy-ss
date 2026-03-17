"use client"
import { Target, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHAT_IS_ACCREDITATION } from '@/lib/constants/accreditation';
import AboutAccordion from './AboutAccordion';
import TargetAccordion from './TargetAccordion';

export default function AccreditationTab() {
  return (
    <div className="space-y-12 md:space-y-32 pb-10 md:pb-20">
      
      {/* 1. What is Accreditation Section - تم تحسين الهيكلية والتجاوب */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative p-6 md:p-16 lg:p-20 rounded-[2rem] md:rounded-[4rem] bg-white/[0.02] border border-white/5 overflow-hidden group shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start relative z-10">
          
          {/* العنوان - Responsive Font Size */}
          <div className="w-full lg:w-2/5 space-y-4">
            <div className="inline-flex p-3 rounded-xl bg-gold/10 text-gold mb-2">
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-3xl opacity-45 sm:text-4xl md:text-5xl lg:text-7xl font-black text-white font-display italic uppercase leading-[1.1] tracking-tighter">
              {WHAT_IS_ACCREDITATION.title}
            </h3>
            <div className="h-1 w-12 md:w-20 bg-gold/50 rounded-full" />
          </div>

          {/* المحتوى النصي - تحسين القراءة ومنع قص الـ Drop Cap */}
          <div className="w-full lg:w-3/5">
            <p className="text-slate-400 text-base md:text-lg lg:text-xl leading-relaxed font-light font-sans relative">
              <span className="text-4xl md:text-6xl font-black text-gold float-left mr-3 mt-1 leading-none font-display italic">
                {WHAT_IS_ACCREDITATION.content.charAt(0)}
              </span>
              {WHAT_IS_ACCREDITATION.content.slice(1)}
            </p>
          </div>
        </div>

        {/* تأثيرات خلفية ناعمة */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold/5 blur-[100px] rounded-full opacity-50" />
      </motion.div>

      {/* 2. Detailed Framework & Target Audience */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* Left Column: Types of Accreditation - ترتيب الموبايل أولاً */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1 lg:col-span-7 bg-white/[0.01] backdrop-blur-3xl p-6 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/10"
        >
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="h-px w-6 md:w-10 bg-gold" />
            <h3 className="text-gold text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.6em]">
              Types of Accreditation
            </h3>
          </div>
          <AboutAccordion />
        </motion.div>

        {/* Right Column: Impact & Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 lg:col-span-5 space-y-6 md:space-y-10 w-full"
        >
          {/* كارت التأثير - Glassmorphism */}
          <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border-white/5 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <Target className="text-gold w-5 h-5 md:w-6 md:h-6" />
              <h3 className="text-white text-lg md:text-2xl font-black font-display uppercase italic tracking-tighter leading-none pt-1">
                The Impact
              </h3>
            </div>
            <TargetAccordion />
          </div>
          
{/* Quick Stats Grid - الإصلاح النهائي لعدم خروج النص عن الكادر */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mt-10 px-4 md:px-0">
  {[
    { label: "IDENTITY", val: "GLOBAL" },
    { label: "STANDARD", val: "ELITE" }
  ].map((stat, i) => (
    <div 
      key={i} 
      className="group relative p-8 md:p-12 lg:p-14 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-all duration-500 flex flex-col justify-center min-h-[200px] md:min-h-[280px] overflow-hidden shadow-2xl"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 w-full">
        {/* تم تقليل الحجم قليلاً واستخدام break-words لضمان عدم الخروج عن الكادر */}
        <h4 className="text-4xl md:text-6xl lg:text-7xl font-black text-white font-display italic uppercase tracking-tighter leading-[0.9] group-hover:text-gold transition-all duration-500 break-words max-w-full drop-shadow-2xl">
          {stat.val}
        </h4>
        
        <div className="flex items-center gap-3 mt-4 md:mt-6">
          <div className="h-[1px] w-8 md:w-12 bg-gold/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 hidden md:block" />
          <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold group-hover:text-slate-200 transition-colors">
            {stat.label}
          </p>
        </div>
      </div>

      {/* الرقم الخلفي صغرناه شوية ونقلناه عشان ميزحمش الكلمة الأساسية */}
      <span className="absolute -bottom-4 -right-2 text-8xl md:text-9xl font-black text-white/[0.03] pointer-events-none select-none italic group-hover:text-white/[0.06] transition-colors font-display">
        {i + 1}
      </span>
    </div>
  ))}
</div>
        </motion.div>

      </div>
    </div>
  );
}