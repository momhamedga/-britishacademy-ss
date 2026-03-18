"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, BarChart3, ShieldCheck } from 'lucide-react';

interface CourseCardProps {
  title: string;
  category: string;
  progress: number;
  thumbnail: string;
  level: string;
  duration: string;
}

export default function CourseCard({ title, category, progress, thumbnail, level, duration }: CourseCardProps) {
  // لون مخصص بناءً على المستوى
  const levelColor = level === 'Advanced' ? 'text-red-400 border-red-400/20 bg-red-400/5' : 
                     level === 'Intermediate' ? 'text-gold border-gold/20 bg-gold/5' : 
                     'text-emerald-400 border-emerald-400/20 bg-emerald-400/5';

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative bg-[#000810]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-4 transition-all duration-500 hover:border-gold/30 shadow-2xl"
    >
      {/* Visual Header (Logo Area) */}
      <div className="relative h-44 w-full rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent overflow-hidden flex items-center justify-center border border-white/5">
        <div className="relative w-24 h-24 transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0">
          <Image src={thumbnail} alt="Academy" fill className="object-contain" />
        </div>
        
        {/* Floating Badges */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${levelColor}`}>
          {level}
        </div>
      </div>

      {/* Course Info */}
      <div className="mt-6 px-2 pb-2">
        <div className="flex items-center gap-2 mb-2">
           <ShieldCheck size={12} className="text-gold" />
           <span className="text-slate-500 font-black text-[9px] uppercase tracking-[0.2em]">{category}</span>
        </div>
        
        <h3 className="text-white font-bold text-xl mb-6 line-clamp-1 italic">{title}</h3>
        
        {/* Stats Row */}
        <div className="flex items-center gap-6 mb-6">
           <div className="flex items-center gap-2 text-slate-400">
              <Clock size={14} />
              <span className="text-[10px] font-bold uppercase">{duration}</span>
           </div>
           <div className="flex items-center gap-2 text-slate-400">
              <BarChart3 size={14} />
              <span className="text-[10px] font-bold uppercase italic">Rank Required</span>
           </div>
        </div>

        {/* Tactical Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-500">Operation Progress</span>
            <span className="text-gold">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-gold/50 to-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}