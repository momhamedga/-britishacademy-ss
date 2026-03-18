"use client"
import { TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface PortalHeaderProps {
  studentName?: string;
  studentRank?: string;
}

export default function PortalHeader({ studentName = "PILOT", studentRank = "PRODIGY" }: PortalHeaderProps) {
    const firstName = studentName.split(' ')[0].toUpperCase();

    return (
      <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-in fade-in slide-in-from-top-4 duration-700 relative z-10">
        <div className="w-full md:w-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-gold shadow-[0_0_12px_#D4AF37]"></span>
            </div>
            <p className="text-gold font-black tracking-[0.4em] text-[8px] md:text-[10px] uppercase italic">
              Terminal Link: Established // 2026
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase group">
            Welcome, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/20 to-gold block md:inline md:ml-3">
               {firstName}
            </span>
          </h1>
        </div>

        {/* 🏆 Rank Card - Cinematic Glassmorphism */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative bg-[#020617]/40 border border-white/10 backdrop-blur-3xl p-4 md:p-5 rounded-2xl md:rounded-[2rem] flex items-center gap-4 md:gap-5 w-full md:w-auto overflow-hidden group"
        >
          {/* التأثير الضوئي الخلفي */}
          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* ✅ التصحيح هنا: استخدام الكلاسات للحجم بدل الـ Props */}
          <div className="relative size-10 md:size-14 rounded-xl bg-gradient-to-br from-gold/20 to-transparent flex items-center justify-center border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Activity className="text-gold animate-pulse w-5 h-5 md:w-6 md:h-6" />
          </div>

          <div className="relative">
            <p className="text-slate-500 text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] mb-1">Authorization Level</p>
            <div className="flex items-baseline gap-2">
               <p className="text-white font-black text-lg md:text-xl tracking-tighter uppercase italic leading-none">
                  {studentRank}
               </p>
               <TrendingUp className="text-emerald-500 w-3 h-3" />
            </div>
          </div>
        </motion.div>
      </header>
    );
}