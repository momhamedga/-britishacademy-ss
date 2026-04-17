"use client"
import { motion } from 'framer-motion';
// مفيش داعي لاستيراد الـ Student كامل هنا، الـ number كافي للـ Progress
// بس بنسيب الـ Interface واضح عشان الـ Autocomplete

interface ProgressProps {
  progress: number; // النسبة اللي جاية من الـ Neon DB (من 0 لـ 100)
}

export default function ProgressCard({ progress }: ProgressProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 bg-navy md:p-10 rounded-[2.5rem] border border-white/5 overflow-hidden group shadow-2xl"

    >
      {/* Glow ذهبي خفيف في الزاوية */}
      <div className="absolute -top-24 -right-24 size-64 bg-gold/5 blur-[100px] pointer-events-none group-hover:bg-gold/10 transition-colors duration-1000" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 relative z-10">
        <div>
          <h3 className="text-white text-2xl md:text-3xl font-black italic mb-2 tracking-tighter uppercase">Mission Progress</h3>
          <p className="text-gold/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">
            Current Objective Completion Status
          </p>
        </div>
        <div className="text-left md:text-right w-full md:w-auto">
          <span className="text-gold font-black text-5xl md:text-7xl tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            {progress}%
          </span>
        </div>
      </div>

      <div className="relative h-4 md:h-5 w-full bg-black/40 rounded-full border border-white/5 p-[2px] overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2.5, ease: "circOut" }}
          className="h-full rounded-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.5)] relative"
        >
          {/* تأثير المسح الضوئي */}
          <motion.div 
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-20 skew-x-12"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}