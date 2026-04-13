"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, ShieldCheck, Target, ChevronRight } from 'lucide-react';
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
    <Link href={`/courses/${slug}`} className="block group w-full">
      <motion.div 
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.97 }}
        className="relative border border-white/10 rounded-[2.5rem] p-4 md:p-5 transition-all duration-500 hover:border-[#D4AF37]/40 backdrop-blur-3xl bg-[#0F172A]/40 shadow-2xl overflow-hidden group/card"
      >
        {/* 🛡️ Visual Area - Glass Container */}
        <div className="relative h-48 md:h-56 w-full rounded-[2rem] overflow-hidden flex items-center justify-center bg-black/20 border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
          
          {/* Animated Background Glow */}
          <div className="absolute w-40 h-40 bg-[#D4AF37]/5 blur-[50px] rounded-full group-hover/card:bg-[#D4AF37]/15 transition-all duration-700" />

          {/* 🏛️ Course Image */}
          <div className="relative w-32 h-32 md:w-36 md:h-36 transition-all duration-700 group-hover/card:scale-110 group-hover/card:rotate-2 z-10">
            <Image 
              src={thumbnail || "/logo.webp"} 
              alt={title}
              fill 
              className="object-contain p-4 drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]" 
              priority 
            />
          </div>
          
          <div className={`absolute top-5 right-5 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-xl z-20 shadow-xl ${levelStyles}`}>
            {level}
          </div>
        </div>

        {/* 📝 Content Area */}
        <div className="mt-8 px-2">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
             <span className="text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">{category}</span>
          </div>
          
          <h3 className="text-white font-black text-2xl md:text-3xl mb-6 italic uppercase tracking-tighter leading-tight line-clamp-2 transition-all duration-300 group-hover/card:text-[#D4AF37]">
            {title}
          </h3>
          
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/5 py-6">
             <div className="flex items-center gap-3">
                <Clock size={16} className="text-[#D4AF37]/60" />
                <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{duration}</span>
             </div>
             <div className="flex items-center gap-3">
                <Target size={16} className="text-[#D4AF37]/60" />
                <span className="text-white/60 text-[10px] font-black uppercase tracking-widest italic">Verified</span>
             </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="text-white/20 italic">Mission Progress</span>
              <span className="text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]">{progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37] to-[#F3D179] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 flex justify-between items-center group/btn">
              <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">EST. 2026 Standards</span>
              <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest opacity-0 group-hover/card:opacity-100 -translate-x-4 group-hover/card:translate-x-0 transition-all duration-500 italic">Access Mission</span>
                  <div className="p-2.5 rounded-full bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform group-hover/card:rotate-[-45deg]">
                    <ChevronRight size={14} strokeWidth={3} />
                  </div>
              </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}