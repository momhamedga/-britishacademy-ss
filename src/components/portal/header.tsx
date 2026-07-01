"use client";
import { TrendingUp, Activity, Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface PortalHeaderProps {
  studentName?: string;
  studentRank?: string;
}

export default function PortalHeader({ studentName = "PILOT", studentRank = "PRODIGY" }: PortalHeaderProps) {
    const firstName = studentName.split(' ')[0].toUpperCase();

    return (
      <header className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-4 relative z-20 pb-1 border-b border-white/[0.02]">
        
        {/* Left Side: Identity Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 group/link">
            <div className="relative flex size-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full size-1.5 bg-gold shadow-[0_0_8px_#D4AF37]"></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal size={8} className="text-gold/40" />
              <p className="text-gold/50 font-mono font-black tracking-[0.3em] text-[8px] uppercase">
                britishacademy // 2026
              </p>
            </div>
          </div>

          {/* 🎯 قفل الأزمة اللونيّة: غيرنا الـ text-navy لـ text-white وصغرنا الخط لـ text-2xl */}
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase italic leading-none">
            Welcome,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gold/90 to-gold md:ml-1 drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]">
               {firstName}
            </span>
          </h1>
        </div>

        {/* 🏆 Rank Card - Compact Fluid Frame */}
        <motion.div 
          whileHover={{ y: -1 }}
          /* تصغير الـ padding لـ p-2.5 والحواف لـ rounded-xl لمنع تضخم الكارت رأسيًا */
          className="relative border border-white/[0.04] p-2.5 rounded-xl flex items-center gap-3 w-full sm:w-auto overflow-hidden group shadow-xl backdrop-blur-md"
          style={{ backgroundColor: 'oklch(22% 0.05 260)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Icon Container - Ultra Compact size-8 */}
          <div className="relative size-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5 shrink-0">
            <Activity className="text-gold animate-pulse size-4 relative z-10" />
          </div>

          <div className="relative z-10 min-w-0 pr-2">
            <p className="text-slate-500 text-[7.5px] font-black uppercase tracking-[0.25em] mb-0.5 italic">Clearance</p>
            <div className="flex items-center gap-2">
               <p className="text-white font-mono font-black text-sm md:text-base tracking-tight uppercase italic leading-none">
                  {studentRank}
               </p>
               <div className="flex flex-col shrink-0">
                  <TrendingUp className="text-emerald-500 size-3" />
               </div>
            </div>
          </div>
        </motion.div>
      </header>
    );
}