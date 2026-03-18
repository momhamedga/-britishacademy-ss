"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, ShieldCheck, Target, ChevronRight } from 'lucide-react';
import { CourseCardProps } from '@/types/cardCoursesPortal';



export default function CourseCard({ title, category, progress, thumbnail, level, duration }: CourseCardProps) {
  const levelStyles = 
    level === 'Advanced' ? 'text-red-400 bg-red-400/10 border-red-400/20' : 
    level === 'Intermediate' ? 'text-gold bg-gold/10 border-gold/20' : 
    'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative  border border-white/5 rounded-[1.8rem] md:rounded-[2.2rem] p-4 md:p-5 transition-all duration-500 hover:border-gold/20 backdrop-blur-3xl shadow-2xl"
    >
      {/* Visual Area */}
      <div className="relative h-40 md:h-48 w-full rounded-[1.4rem] md:rounded-[1.8rem] bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex items-center justify-center border border-white/5">
        <div className="relative w-24 h-24 transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <Image src={thumbnail} alt={title} fill className="object-contain p-4" priority />
        </div>
        
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full border text-[7px] font-black uppercase tracking-[0.2em] backdrop-blur-md ${levelStyles}`}>
          {level}
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-5 px-1">
        <div className="flex items-center gap-2 mb-2 opacity-70">
           <ShieldCheck size={10} className="text-gold" />
           <span className="text-white font-black text-[8px] uppercase tracking-[0.25em]">{category}</span>
        </div>
        
        <h3 className="text-white font-bold text-lg md:text-xl mb-5 italic uppercase tracking-tight line-clamp-1 group-hover:text-gold transition-colors">
          {title}
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/5 py-4">
           <div className="flex items-center gap-2 text-slate-500">
              <Clock size={12} />
              <span className="text-[9px] font-bold uppercase tracking-widest">{duration}</span>
           </div>
           <div className="flex items-center gap-2 text-slate-500">
              <Target size={12} />
              <span className="text-[9px] font-bold uppercase tracking-widest italic font-mono text-gold/50">Vector OK</span>
           </div>
        </div>

        {/* Tactical Progress */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-end text-[8px] font-black uppercase tracking-[0.3em]">
            <span className="text-slate-600 italic">Sync Status</span>
            <span className="text-gold">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-gold/40 to-gold rounded-full relative shadow-[0_0_10px_rgba(212,175,55,0.3)]"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
            <span className="text-[8px] font-black text-gold flex items-center gap-1 uppercase tracking-widest">
                Deploy <ChevronRight size={10} />
            </span>
        </div>
      </div>
    </motion.div>
  );
}