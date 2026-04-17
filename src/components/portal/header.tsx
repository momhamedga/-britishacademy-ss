"use client"
import { TrendingUp, Activity, Terminal } from "lucide-react"; // ضفنا Terminal
import { motion } from "framer-motion";

interface PortalHeaderProps {
  studentName?: string;
  studentRank?: string;
}

export default function PortalHeader({ studentName = "PILOT", studentRank = "PRODIGY" }: PortalHeaderProps) {
    const firstName = studentName.split(' ')[0].toUpperCase();

    return (
      <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-in fade-in slide-in-from-top-4 duration-700 relative z-20">
        
        {/* Left Side: Identity Section */}
        <div className="w-full md:w-auto">
          <div className="flex items-center gap-3 mb-4 md:mb-5 group/link">
            <div className="relative flex size-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2.5 bg-gold shadow-[0_0_15px_#D4AF37]"></span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal size={10} className="text-gold/50 group-hover/link:text-gold transition-colors" />
              <p className="text-gold font-black tracking-[0.5em] text-[8px] md:text-[10px] uppercase italic">
               Britishacademy // 2026
              </p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-navy tracking-tighter italic uppercase leading-[0.85]">
            Welcome, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-gold/80 to-gold block md:inline md:ml-4 drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
               {firstName}
            </span>
          </h1>
        </div>

        {/* 🏆 Rank Card - Tactical Navy Design */}
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative border border-white/5 p-4 md:p-6 rounded-[2rem] flex items-center gap-4 md:gap-6 w-full md:w-auto overflow-hidden group shadow-2xl"
          style={{ 
            backgroundColor: 'oklch(25% 0.08 260)',
            backdropFilter: 'blur(40px)'
          }}
        >
          {/* الوميض الخلفي عند الهوفر */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Icon Container - Tactical Square */}
          <div className="relative size-12 md:size-16 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5 shadow-inner group-hover:border-gold/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Activity className="text-gold animate-pulse w-6 h-6 md:w-8 md:h-8 relative z-10" />
          </div>

          <div className="relative z-10">
            <p className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] mb-1.5 italic">Security Clearance</p>
            <div className="flex items-center gap-3">
               <p className="text-white font-black text-xl md:text-3xl tracking-tighter uppercase italic leading-none">
                  {studentRank}
               </p>
               <div className="flex flex-col">
                  <TrendingUp className="text-emerald-500 w-4 h-4" />
                  <div className="h-[2px] w-full bg-emerald-500/20 mt-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-full w-1/2 bg-emerald-500"
                    />
                  </div>
               </div>
            </div>
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 p-1">
             <div className="size-4 border-t-2 border-r-2 border-gold/20 rounded-tr-lg" />
          </div>
        </motion.div>
      </header>
    );
}