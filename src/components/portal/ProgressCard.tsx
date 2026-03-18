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
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative p-8 rounded-[2rem] bg-white/[0.02] backdrop-blur-3xl border border-white/5 overflow-hidden group"
    >
      {/* 🌌 تأثير الإضاءة الخلفية (Glow) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] -z-10 group-hover:bg-gold/10 transition-colors duration-1000" />
      
      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
          <h3 className="text-white text-xl font-bold italic mb-1 tracking-tight">Mission Progress</h3>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] opacity-70">
            Current Objective Completion
          </p>
        </div>
        <div className="text-right">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold font-black text-5xl tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            {progress}%
          </motion.span>
        </div>
      </div>

      {/* ⚡ الـ Progress Bar السينمائي */}
      <div className="relative h-4 w-full bg-white/5 rounded-full border border-white/10 p-[2px] overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 shadow-[0_0_25px_rgba(212,175,55,0.4)] relative"
        >
          {/* تأثير الـ Shine اللي بيمسح البار باستمرار */}
          <motion.div 
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/3 skew-x-12"
          />
        </motion.div>
      </div>

      {/* تفصيلة صغيرة: خطوط ديكورية في الخلفية */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
    </motion.div>
  );
}