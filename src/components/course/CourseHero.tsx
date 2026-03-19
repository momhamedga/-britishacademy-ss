"use client";
import { motion } from "framer-motion";
import { Target, ShieldCheck, Clock, BarChart, Award, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

export default function CourseHero({ course }: any) {
  return (
    <div className="relative mb-12 md:mb-24">
      
      {/* 🌌 Background Radar Effect (Mobile Optimization) */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none animate-pulse" />

      {/* 🔙 Back Navigation - تكتيكية أكتر */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link href="/courses" className="inline-flex items-center gap-3 text-slate-500 hover:text-gold transition-all mb-8 md:mb-12 group text-[9px] font-black uppercase tracking-[0.4em] italic">
          <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/5 group-hover:border-gold/20 transition-colors bg-white/[0.02]">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="hidden sm:inline">Return to Mission Selection</span>
          <span className="sm:hidden text-gold/60">Back to Intel</span>
        </Link>
      </motion.div>

      {/* Badges Stack - منظمة للموبايل */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-10">
        <motion.span 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-xl border border-gold/30 bg-gold/5 text-gold text-[8px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
        >
          <Target size={12} className="animate-pulse" />
          {course.level} Operations
        </motion.span>
        
        {course.is_sia_accredited && (
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
          >
            <ShieldCheck size={12} /> SIA Approved
          </motion.span>
        )}
      </div>

      {/* Course Title - Cinematic Typography */}
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-10 md:mb-16 max-w-5xl"
      >
        {course.title.split(' ').map((word: string, i: number) => (
          <span key={i} className={i === 0 ? "text-white" : "text-white/90"}>
            {word}{' '}
          </span>
        ))}
        <span className="inline-block w-3 h-3 md:w-6 md:h-6 bg-gold rounded-full ml-2 animate-pulse" />
      </motion.h1>

      {/* 📊 Quick Stats Grid - Mobile Creative Layout */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-0 border-t border-white/10 md:border-b md:bg-white/[0.01] overflow-hidden rounded-2xl md:rounded-none"
      >
        {[
          { label: 'Duration', val: course.duration, icon: Clock },
          { label: 'Expertise', val: course.level, icon: BarChart },
          { label: 'Investment', val: `£${course.price}`, icon: Award, color: 'text-gold' }
        ].map((stat, i) => (
          <div 
            key={i} 
            className={`
              flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-5 md:p-10 
              bg-white/[0.03] md:bg-transparent border border-white/5 md:border-none rounded-2xl md:rounded-none
              hover:bg-white/[0.05] transition-all group relative
              ${i === 2 ? "col-span-2 md:col-span-1" : ""}
            `}
          >
            {/* Icon Box */}
            <div className={`
              p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10 
              ${stat.color || 'text-white/40'} group-hover:text-gold transition-colors
              bg-black/20 backdrop-blur-md
            `}>
              <stat.icon size={20} className="md:w-6 md:h-6" />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[7px] md:text-[8px] text-slate-500 uppercase font-black tracking-[0.3em] italic">
                  {stat.label}
                </p>
                <Zap size={8} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-white font-black text-sm md:text-2xl tracking-tight uppercase italic group-hover:text-gold transition-colors">
                {stat.val}
              </p>
            </div>

            {/* Vertical Divider (Desktop Only) */}
            {i < 2 && <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-white/10" />}
          </div>
        ))}
      </motion.div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  );
}