"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ShieldCheck, Zap, ArrowUpRight, Users } from 'lucide-react';
import { Course } from '@/types';

// 1. نظام الألوان التكتيكي (Mapping) - أسرع وأنظف
const LEVEL_CONFIG: Record<string, string> = {
  advanced: 'text-red-400 border-red-400/30 bg-red-400/10 shadow-[0_0_15px_rgba(248,113,113,0.2)]',
  intermediate: 'text-gold border-gold/30 bg-gold/10 shadow-[0_0_15px_rgba(212,175,55,0.2)]',
  professional: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  beginner: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_15px_rgba(52,211,153,0.2)]',
};

export default function CourseCard({ course }: { course: Course }) {
  
  // تأمين استخراج الاستايل بغض النظر عن حالة الأحرف (SIA أو sia أو Sia)
  const currentLevel = course.level?.toLowerCase() || 'beginner';
  const levelStyle = LEVEL_CONFIG[currentLevel] || LEVEL_CONFIG.beginner;

  return (
    <Link href={`/courses/${course.slug}`} className="block h-full outline-none">
      <motion.div 
        whileTap={{ scale: 0.98 }}
        className="group relative h-full flex flex-col  border border-white/10 rounded-[2.2rem] overflow-hidden transition-all duration-500 
                   md:hover:border-gold/40 md:hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
      >
        
        {/* --- Header Area --- */}
        <div className="relative h-52 sm:h-48 w-full overflow-hidden bg-navy ">
          {/* صورة اللوجو مع تأثير Scale هادئ */}
          <div className="relative w-full h-full p-8 transition-all duration-700 md:group-hover:scale-110 md:group-hover:rotate-1">
            <Image 
              src={course.image_url || '/logo.webp'} 
              alt={course.title} 
              fill 
              className="object-contain filter brightness-90 md:group-hover:brightness-110 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Level Badge - توب رايت (الآن يقرأ الألوان صح) */}
          <div className={`absolute top-5 right-5 px-3.5 py-1 rounded-full border text-[8px] font-black uppercase tracking-[0.15em] backdrop-blur-xl z-10 transition-all ${levelStyle}`}>
            {course.level}
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/5 px-4 py-2 rounded-2xl">
            <span className="text-gold font-black text-[13px] italic tracking-tighter">£{course.price}</span>
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className="p-7 flex flex-col flex-grow bg-gradient-to-b from-transparent to-white/[0.01]">
          {/* Category Label */}
          <div className="flex items-center gap-2 mb-4">
             <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-pulse" />
             <span className="text-white/40 font-bold text-[9px] uppercase tracking-[0.25em] md:group-hover:text-gold transition-colors italic">
               {course.category} Division
             </span>
          </div>
          
          {/* Title */}
          <h3 className="text-white font-black text-xl mb-5 uppercase leading-[1.1] tracking-tight md:group-hover:text-gold transition-colors line-clamp-2 italic">
            {course.title}
          </h3>
          
          {/* Technical Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
             <div className="flex flex-col gap-1 px-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-2">
                   <Clock size={12} className="text-gold/50" />
                   <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Duration</span>
                </div>
                <span className="text-[11px] font-bold text-slate-200 uppercase tracking-tighter">{course.duration}</span>
             </div>
             
             <div className="flex flex-col gap-1 px-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-2">
                   <Users size={12} className="text-gold/50" />
                   <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active</span>
                </div>
                <span className="text-[11px] font-bold text-gold uppercase tracking-tighter">
                   {course.enrollment_count || 0} Joined
                </span>
             </div>
          </div>

          {/* --- Footer Area --- */}
          <div className="mt-auto pt-5 border-t border-white/5">
            <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">British-A-SS </span>
                <div className="flex items-center gap-1.5">
                   <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                   <span className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em]">Verified</span>
                </div>
            </div>
            
            {/* Animated Progress Bar */}
            <div className="h-1 w-full bg-white/[0.03] rounded-full overflow-hidden relative">
                <motion.div 
                   initial={{ width: "0%" }}
                   whileInView={{ width: "100%" }}
                   viewport={{ once: true }}
                   transition={{ duration: 2, ease: "easeInOut" }}
                   className="h-full bg-gradient-to-r from-gold/5 via-gold to-gold/5 w-full rounded-full opacity-60"
                />
            </div>

            <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] italic group-hover:text-white/30 transition-colors">enroll</span>
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02] md:group-hover:bg-gold md:group-hover:border-gold md:group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500">
                    <ArrowUpRight size={16} className="text-white/40 md:group-hover:text-black transition-colors" />
                </div>
            </div>
          </div>
        </div>

        {/* Glow Effect on Hover (Desktop Only) */}
        <div className="absolute inset-0 bg-gold/[0.02] opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </Link>
  );
}