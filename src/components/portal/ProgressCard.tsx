"use client";
import { motion } from 'framer-motion';

interface ProgressProps {
  progress: number;
}

export default function ProgressCard({ progress }: ProgressProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      /* ترشيق الـ rounded لـ rounded-xl وضغط الـ padding لـ p-4 md:p-5 */
      className="relative p-4 md:p-5 bg-navy rounded-xl border border-white/3 overflow-hidden shadow-xl w-full"
    >
      <div className="absolute -top-16 -right-16 size-48 bg-gold/2 blur-[60px] pointer-events-none" />
      
      <div className="flex justify-between items-center gap-4 mb-3 relative z-10">
        <div className="space-y-0.5">
          <h3 className="text-white text-base md:text-lg font-black italic tracking-tight uppercase leading-none">Mission Progress</h3>
          <p className="text-gold/40 text-[8px] font-black uppercase tracking-wider font-mono">
            Objective Completion Status
          </p>
        </div>
        <div className="text-right shrink-0">
          {/* تصغير التكست من 7xl المتضخم جداً إلى text-3xl و text-4xl الأنيق الهادئ */}
          <span className="text-gold font-mono font-black text-3xl md:text-4xl tracking-tighter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
            {progress}%
          </span>
        </div>
      </div>

      {/* تصغير ارتفاع شريط التحميل لـ h-2 لقتل التضخم البصري */}
      <div className="relative h-2 w-full bg-black/40 rounded-full border border-white/2 p-[1px] overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full rounded-full bg-linear-to-r from-gold/50 via-gold to-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.4)] relative"
        >
          <motion.div 
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 Tri-transparent w-10 skew-x-12"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}