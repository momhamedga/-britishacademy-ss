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
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-3xl bg-white/[0.01] backdrop-blur-md border border-white/5 hover:bg-white/[0.03] hover:border-gold/20 transition-all duration-500 group"
    >
      <div className="flex items-start justify-between mb-4">
        {/* Icon Container مع تأثير توهج ذهبي عند الـ Hover */}
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-gold group-hover:bg-gold/10 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all">
          {icon}
        </div>
        
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
          <h4 className="text-2xl font-bold text-white tracking-tighter tabular-nums uppercase">
            {value}
          </h4>
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/5 flex justify-between items-center">
        <p className="text-[9px] font-medium text-slate-600 uppercase tracking-tighter">
          {description}
        </p>
        {/* إضافة مؤشر بصري صغير لتعزيز الشكل السينمائي */}
        <div className="w-1 h-1 rounded-full bg-gold/30 group-hover:bg-gold animate-pulse" />
      </div>
    </motion.div>
  );
}