"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, Target, ChevronRight, Activity, Zap } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: {
    title: string;
    category: string;
    progress: number;
    image_url?: string;
    thumbnail_url?: string;
    level: string;
    duration: string;
    slug: string;
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  // تفكيك الداتا وتأمين المسميات المتطابقة مع الـ Schema بالملي
  const { title, category, progress, image_url, thumbnail_url, level, duration, slug } = course;
  const finalImage = image_url || thumbnail_url || "/logo.webp";

  const levelStyles = 
    level === 'Advanced' ? 'text-red-400 bg-red-400/10 border-red-400/20' : 
    level === 'Intermediate' ? 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20' : 
    'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';

  return (
    <Link href={`/courses/${slug}`} className="block group w-full max-w-100 mx-auto">
      {/* 🛡️ تقليص الـ border radius لـ rounded-2xl والـ padding لـ p-4 لراحة بصريّة فائقة */}
      <motion.div 
        whileHover={{ y: -4, scale: 1.005 }}
        whileTap={{ scale: 0.99 }}
        className="relative border bg-navy border-white/3 rounded-2xl p-4 transition-all duration-500 hover:border-[#D4AF37]/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden group/card"
      >
        <div className="absolute inset-0 backdrop-blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[#D4AF37]/2 blur-[80px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* 🖼️ Visual Area - ترشيق الطول لـ h-40 لقتل المسافات الزائدة سفلي الكارت */}
        <div className="relative h-40 w-full rounded-xl overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
          <div className="absolute inset-0 bg-linear-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10" />
          <div className="absolute size-32 bg-[#D4AF37]/5 blur-[50px] rounded-full z-10" />

          {/* Course Cover Image Frame */}
          <div className="absolute inset-0 w-full h-full transition-all duration-700 group-hover/card:scale-103 z-0">
            <Image 
              src={finalImage} 
              alt={title}
              fill 
              className="object-cover transition-all duration-500" 
              priority 
            />
          </div>
          
          {/* Level Badge - Ultra Compact */}
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-md border text-[7.5px] font-black uppercase tracking-widest backdrop-blur-xl z-20 shadow-lg ${levelStyles}`}>
            <span className="animate-pulse mr-1">●</span>{level}
          </div>
        </div>

        {/* 📝 Content Area - ترشيق الـ space-y لـ space-y-4 وإلغاء الـ Margins المفرطة */}
        <div className="mt-4 px-0.5 space-y-4 relative z-10">
          
          <div className="flex items-center gap-1.5">
             <div className="size-1 bg-[#D4AF37] rounded-full shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
             <span className="text-white/40 font-black text-[8px] uppercase tracking-widest font-mono">{category || "TRAINING"}</span>
          </div>
          
          {/* تصغير خط العنوان لـ text-lg ليكون محبوكاً ومريحاً جداً للعين */}
          <h3 className="text-white font-black text-base md:text-lg italic uppercase tracking-tight leading-tight line-clamp-1 transition-all duration-300 group-hover/card:text-[#D4AF37]">
            {title}
          </h3>
          
          {/* Deployment Status Tags */}
          <div className="flex flex-wrap gap-1.5 items-center"> 
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 rounded-md px-2 py-0.5 text-[7.5px] font-bold uppercase tracking-wider italic">
                <Activity size={10} className="animate-pulse" />
                Active Deployment
              </div>
              <div className="flex items-center gap-1 text-[#D4AF37] bg-white/1.5 border border-white/5 rounded-md px-2 py-0.5 text-[7.5px] font-bold uppercase tracking-wider italic">
                <Zap size={9} className="text-[#D4AF37]/50" />
                Verified Mission
              </div>
          </div>

          {/* Info Grid - ترشيق البادينج لـ py-3 لضغط طول الكارت */}
          <div className="grid grid-cols-2 gap-2 border-y border-white/3 py-3 relative">
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/3 -translate-x-1/2" />
             <div className="flex items-center gap-1.5 justify-center">
                <Clock size={12} className="text-[#D4AF37]/40" />
                <span className="text-white/50 text-[9px] font-black uppercase tracking-wider font-mono">{duration}</span>
             </div>
             <div className="flex items-center gap-1.5 justify-center">
                <Target size={12} className="text-[#D4AF37]/40" />
                <span className="text-white/50 text-[8px] font-black uppercase tracking-wider italic truncate">UK Standards</span>
             </div>
          </div>

          {/* Progress Bar - Compacted Design */}
          <div className="space-y-2 pt-0.5">
            <div className="flex justify-between items-center text-[8px] md:text-[9px] font-black uppercase tracking-widest relative">
              <span className="text-white/30 italic">Progress</span>
              <span className="text-[#D4AF37] font-mono font-black">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-black/40 rounded-lg overflow-hidden border border-white/3 relative">
              <div className="absolute inset-0 w-full h-full" style={{ background: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 6px)'}} />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "circOut", delay: 0.1 }}
                className="h-full bg-linear-to-r from-[#D4AF37]/40 via-[#F3D179] to-[#D4AF37] rounded-lg shadow-[0_0_8px_rgba(212,175,55,0.4)] relative z-10"
              />
            </div>
          </div>

          {/* Action Footer - ترشيق الـ Margin العلوي والـ Padding لقتل الفجوة السفلية */}
          <div className="mt-4 flex justify-between items-center pt-3 border-t border-white/3">
              <span className="text-[7px] text-white/10 font-bold uppercase tracking-widest font-mono">EST. 2026</span>
              <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-widest opacity-0 group-hover/card:opacity-100 -translate-x-2 group-hover/card:translate-x-0 transition-all duration-300 italic">start</span>
                  <div className="size-6 rounded-full bg-[#D4AF37] text-black transition-all duration-300 group-hover/card:rotate-[-45deg] flex items-center justify-center group-hover/card:bg-white group-hover/card:text-[#050A14] shrink-0">
                    <ChevronRight size={12} strokeWidth={3} />
                  </div>
              </div>
          </div>

        </div>
      </motion.div>
    </Link>
  );
}