"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, Target, ChevronRight, Activity, Zap } from 'lucide-react'; // ضيف Zap هنا
import Link from 'next/link';

interface CourseCardProps {
  title: string;
  category: string;
  progress: number;
  thumbnail?: string;
  level: string;
  duration: string;
  slug: string;
}

export default function CourseCard({ title, category, progress, thumbnail, level, duration, slug }: CourseCardProps) {
  const levelStyles = 
    level === 'Advanced' ? 'text-red-400 bg-red-400/10 border-red-400/20' : 
    level === 'Intermediate' ? 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20' : 
    'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';

  return (
    <Link href={`/courses/${slug}`} className="block group w-full max-w-[500px] mx-auto lg:max-w-none">
      <motion.div 
        whileHover={{ y: -8, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative border bg-navy border-white/5 rounded-[3rem] p-5 md:p-6 transition-all duration-500 hover:border-[#D4AF37]/30 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden group/card"
      >
        {/* Backdrop Blur Layer */}
        <div className="absolute inset-0 backdrop-blur-3xl pointer-events-none" />

        {/* Glow خلفي - Tactical Glow */}
        <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[120px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-1500 pointer-events-none" />

        {/* 🛡️ Visual Area - Updated for full frame image */}
        <div className="relative h-48 sm:h-52 md:h-60 w-full rounded-[2.5rem] overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 z-10" />
          
          <div className="absolute w-32 h-32 md:w-48 md:h-48 bg-[#D4AF37]/10 blur-[70px] rounded-full group-hover/card:bg-[#D4AF37]/20 transition-all duration-1000 z-10" />

          {/* 🏛️ Course Image - 🚨 التعديل هنا لملء الإطار */}
          <div className="absolute inset-0 w-full h-full transition-all duration-1000 group-hover/card:scale-105 group-hover/card:rotate-1 z-0">
            <Image 
              src={thumbnail || "/logo.webp"} 
              alt={title}
              fill 
              /* 🚨 استخدام object-cover هنا مهم جداً لملء الإطار */
              className="object-cover p-2 group-hover/card:p-0 transition-all duration-700 drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]" 
              priority 
            />
          </div>
          
          {/* Level Badge */}
          <div className={`absolute top-4 sm:top-5 right-4 sm:right-5 px-3.5 sm:px-4 py-1.5 rounded-full border text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-xl z-20 shadow-xl ${levelStyles}`}>
            <span className="animate-pulse mr-1">●</span>{level}
          </div>
        </div>

        {/* 📝 Content Area */}
        <div className="mt-8 px-1 sm:px-2 space-y-6 relative z-10">
          <div className="flex items-center gap-2">
             <div className="size-1.5 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
             <span className="text-white/40 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em] italic">{category}</span>
          </div>
          
          <h3 className="text-white font-black text-xl sm:text-2xl md:text-3xl italic uppercase tracking-tighter leading-[0.9] line-clamp-2 transition-all duration-500 group-hover/card:text-[#D4AF37]">
            {title}
          </h3>
          
          <div className="flex flex-wrap gap-2 items-center"> {/* 🚨 تجاوب المسافات */}
              <div className="flex items-center gap-3 text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 rounded-full px-4 py-1.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest italic w-fit">
                <Activity size={12} className="animate-pulse" />
                Active Deployment
              </div>
              <div className="flex items-center gap-2 text-[#D4AF37] bg-white/[0.03] border border-white/5 rounded-full px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest italic w-fit">
                <Zap size={10} className="text-[#D4AF37]/60" />
                Verified Mission
              </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-5 relative">
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/5 -translate-x-1/2" />
             <div className="flex items-center gap-2 justify-center">
                <Clock size={15} className="text-[#D4AF37]/50" />
                <span className="text-white/60 text-[9px] sm:text-[10px] font-black uppercase tracking-widest font-mono italic">{duration}</span>
             </div>
             <div className="flex items-center gap-2 justify-center">
                <Target size={15} className="text-[#D4AF37]/50" />
                <span className="text-white/60 text-[9px] sm:text-[10px] font-black uppercase tracking-widest italic truncate">British Standards</span> {/* 🚨 التعديل ليكون أكثر إثارة */}
             </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-4 pt-2"> {/* 🚨 مسافة تكتيكية */}
            <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] relative">
              <span className="text-white/30 italic">Mission Progress</span>
              <span className="text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] font-mono">{progress}%</span>
              <div className="absolute bottom-[-10px] left-0 w-full h-[1px] bg-white/5 rounded-full" /> {/* Tactical line */}
            </div>
            <div className="h-3 md:h-3.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
               {/* Background pattern inside progress bar */}
              <div className="absolute inset-0 w-full h-full" style={{ background: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 6px)'}} />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "circOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[#D4AF37]/50 via-[#F3D179] to-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)] relative z-10"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/5 group/btn">
              <span className="text-[8px] sm:text-[9px] text-white/10 font-bold uppercase tracking-widest font-mono">EST. 2026 STANDARDS</span> {/* 🚨 التعديل ليكون أكثر سرية */}
              <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest opacity-0 group-hover/card:opacity-100 -translate-x-3 group-hover/card:translate-x-0 transition-all duration-500 italic">start Course</span>
                  <div className="size-9 rounded-full bg-[#D4AF37] text-black transition-all duration-300 group-hover/card:rotate-[-45deg] flex items-center justify-center group-hover/card:bg-white group-hover/card:text-[#050A14]">
                    <ChevronRight size={16} strokeWidth={4} />
                  </div>
              </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}