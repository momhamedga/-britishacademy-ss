"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, ShieldCheck, Target, ChevronRight } from 'lucide-react';
import Link from 'next/link'; // ✅ استيراد Link

// تحديث الواجهة لتشمل الـ slug و الـ thumbnail الحقيقي
interface CourseCardProps {
  title: string;
  category: string;
  progress: number;
  thumbnail?: string; // أضفت علامة استفهام للأمان
  level: string;
  duration: string;
  slug: string; // ✅ الـ slug ضروري للرابط
}

export default function CourseCard({ title, category, progress, thumbnail, level, duration, slug }: CourseCardProps) {
  const levelStyles = 
    level === 'Advanced' ? 'text-red-400 bg-red-400/10 border-red-400/20 shadow-[0_0_15px_rgba(248,113,113,0.1)]' : 
    level === 'Intermediate' ? 'text-gold bg-gold/10 border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 
    'text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]';

  return (
    // ✅ تغليف الكارت بالكامل برابط يشير لصفحة تفاصيل الكورس
    <Link href={`/courses/${slug}`} className="block group">
      <motion.div 
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        className="relative border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-5 transition-all duration-500 hover:border-gold/30 backdrop-blur-3xl bg-navy/20 shadow-2xl overflow-hidden"
      >
        {/* 🛡️ Visual Area */}
        <div className="relative h-44 md:h-52 w-full rounded-[1.6rem] md:rounded-[2rem] bg-[#0A0F1D] overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-t from-gold/[0.03] to-transparent pointer-events-none" />
          <div className="absolute w-32 h-32 bg-gold/5 blur-[40px] rounded-full group-hover:bg-gold/10 transition-colors duration-700" />

          {/* 🏛️ Course Image (Dynamic) */}
          <div className="relative w-28 h-28 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[2deg] z-10">
            <Image 
              src={thumbnail || "/logo.webp"} // ✅ يستخدم الصورة القادمة من الداتا بيز
              alt={title}
              fill 
              className="object-contain p-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
              priority 
            />
          </div>
          
          <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-[0.25em] backdrop-blur-xl z-20 ${levelStyles}`}>
            {level}
          </div>
        </div>

        {/* 📝 Content Area */}
        <div className="mt-6 px-2">
          <div className="flex items-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
             <ShieldCheck size={12} className="text-gold" />
             <span className="text-white font-black text-[9px] uppercase tracking-[0.3em]">{category}</span>
          </div>
          
          <h3 className="text-white font-black text-xl md:text-2xl mb-6 italic uppercase tracking-tighter leading-tight line-clamp-2 group-hover:text-gold transition-all duration-300">
            {title}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/5 py-5 relative">
             <div className="flex items-center gap-3 text-slate-400">
                <div className="p-1.5 rounded-lg bg-white/5 group-hover:text-gold transition-colors">
                  <Clock size={14} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{duration}</span>
             </div>
             <div className="flex items-center gap-3 text-slate-400">
                <div className="p-1.5 rounded-lg bg-white/5 text-gold/40">
                  <Target size={14} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest italic font-mono">Verified</span>
             </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.4em]">
              <span className="text-slate-600 italic">Academy Sync</span>
              <span className="text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-gold/20 via-gold/60 to-gold rounded-full relative"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
              <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">EST. 2026 Standards</span>
              <div className="flex items-center gap-2 transition-all transform group-hover:translate-x-0">
                  <span className="text-[9px] font-black text-gold uppercase tracking-[0.2em] italic opacity-0 group-hover:opacity-100 transition-opacity">Access Mission</span>
                  <div className="p-2 rounded-full bg-gold/10 text-gold border border-gold/20">
                    <ChevronRight size={12} />
                  </div>
              </div>
          </div>
        </div>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gold/0 group-hover:bg-gold/40 blur-[4px] transition-all duration-500" />
      </motion.div>
    </Link>
  );
}