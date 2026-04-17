"use client"
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
// استيراد الـ Types لضمان التوافق الكامل
import { StudentRank } from '@/types/portal'; 

interface StatsProps {
  label: string;
  value: string | number | StudentRank; // السماح بقيم الرتب السينمائية
  icon: ReactNode;
  description: string;
}

export default function StatsGrid({ label, value, icon, description }: StatsProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, borderColor: 'oklch(var(--gold) / 0.3)' }}
      className="p-6 rounded-[2rem] bg-navy border border-white/5 transition-all duration-500 group relative overflow-hidden"
   
    >
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="size-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/20 transition-all">
          {icon}
        </div>
        
        <div className="text-right">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">{label}</p>
          <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic group-hover:text-gold transition-colors">
            {value}
          </h4>
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
        <p className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[80%]">
          {description}
        </p>
        <div className="size-1.5 rounded-full bg-gold/20 group-hover:bg-gold animate-pulse shadow-[0_0_8px_#D4AF37]" />
      </div>
    </motion.div>
  );
}