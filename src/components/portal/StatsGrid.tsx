"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  description: string;
}

export default function StatsGrid({ label, value, icon, description }: StatsProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      /* رشقنا الـ rounded لـ rounded-xl والـ padding لـ p-4 لتفادي الضخامة */
      className="p-4 rounded-xl bg-navy border border-white/3 transition-all duration-300 group relative overflow-hidden shadow-md min-w-0 w-full"
    >
      <div className="flex items-center justify-between gap-4 relative z-10">
        {/* تصغير حجم الفريم المربع للأيقونة لـ size-9 */}
        <div className="size-9 rounded-lg bg-white/1.5 border border-white/5 flex items-center justify-center group-hover:bg-gold/5 transition-all shrink-0">
          {icon}
        </div>
        
        <div className="text-right min-w-0">
          <p className="text-[7.5px] font-black text-slate-500 uppercase tracking-widest mb-1 italic truncate">{label}</p>
          {/* تصغير حجم خط الأرقام لـ text-xl لراحة فائقة للعين */}
          <h4 className="text-lg md:text-xl font-mono font-black text-white tracking-tight uppercase italic group-hover:text-gold transition-colors truncate">
            {value}
          </h4>
        </div>
      </div>
      
      <div className="pt-2.5 mt-2.5 border-t border-white/3 flex justify-between items-center relative z-10">
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-[85%]">
          {description}
        </p>
        <div className="size-1 rounded-full bg-gold/10 group-hover:bg-gold transition-colors" />
      </div>
    </motion.div>
  );
}