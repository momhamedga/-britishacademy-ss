"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ArrowUpRight } from 'lucide-react';
import { Course } from '@/types';

const LEVEL_CONFIG: Record<string, string> = {
  advanced: 'text-red-400 border-red-400/30 bg-red-400/10 shadow-[0_0_15px_rgba(248,113,113,0.2)]',
  intermediate: 'text-gold border-gold/30 bg-gold/10 shadow-[0_0_15px_rgba(212,175,55,0.2)]',
  professional: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  beginner: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_15px_rgba(52,211,153,0.2)]',
  sia: 'text-blue-400 border-blue-400/30 bg-blue-400/10 shadow-[0_0_15px_rgba(96,165,250,0.2)]',
  security: 'text-orange-400 border-orange-400/30 bg-orange-400/10 shadow-[0_0_15px_rgba(251,146,60,0.2)]',
};

export default function CourseCard({ course }: { course: Course }) {
  
  // 🧠 Logic Matcher
  const getLevelStyle = () => {
    const rawLevel = course.level?.toLowerCase().trim() || '';
    const match = Object.keys(LEVEL_CONFIG).find(key => rawLevel.includes(key));
    return match ? LEVEL_CONFIG[match] : LEVEL_CONFIG.beginner;
  };

  const levelStyle = getLevelStyle();

  // ✨ Mobile Creative Touch (Tilt Effect Logic)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
    <Link href={`/courses/${course.slug}`} className="block h-full group perspective-1000">
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }} // تاتش الموبايل (Haptic Scale)
        className="relative h-full flex flex-col bg-navy border border-white/5 rounded-[2.8rem] overflow-hidden transition-all duration-500 md:hover:border-gold/30 md:hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
      >
        
        {/* --- 🖼️ Cinematic Image Area --- */}
        <div className="relative h-64 md:h-72 w-full overflow-hidden" style={{ transform: "translateZ(30px)" }}>
          <Image 
            src={course.image_url || '/placeholder-course.webp'} 
            alt={course.title} 
            fill 
            className="object-cover transition-all duration-1000 scale-105 group-hover:scale-115 group-hover:rotate-1 filter brightness-75 group-hover:brightness-90"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/20 to-transparent" />
          
          {/* Level Badge - 3D Lift */}
          <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-2xl z-20 transition-all duration-500 ${levelStyle}`}>
            {course.level}
          </div>

          {/* Verified Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full z-20">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[8px] font-black text-white/80 uppercase tracking-widest">HQ-Accredited</span>
          </div>

          <div className="absolute bottom-6 left-6 z-20">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="bg-gold px-5 py-2 rounded-2xl shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-500"
            >
              <span className="text-black font-black text-lg italic tracking-tighter">£{course.price}</span>
            </motion.div>
          </div>
        </div>

        {/* --- 🛠️ Content Area --- */}
        <div className="p-8 flex flex-col flex-grow relative" style={{ transform: "translateZ(50px)" }}>
          <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-gold/30 group-hover:w-12 transition-all duration-500" />
              <span className="text-gold font-bold text-[10px] uppercase tracking-[0.3em] italic">
                {course.category} Division
              </span>
          </div>
          
          <h3 className="text-white font-black text-2xl mb-6 uppercase leading-none tracking-tighter group-hover:text-gold transition-colors duration-500 line-clamp-2 italic">
            {course.title}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="flex flex-col gap-2 p-5 bg-white/[0.02] border border-white/5 rounded-[1.8rem] transition-all group-hover:bg-white/[0.04] group-hover:border-white/10">
                <div className="flex items-center gap-2 opacity-40">
                   <Clock size={14} className="text-gold" />
                   <span className="text-[9px] font-black text-white uppercase tracking-widest">Duration</span>
                </div>
                <span className="text-[12px] font-bold text-slate-100 uppercase tracking-tight italic">{course.duration}</span>
             </div>
             
             <div className="flex flex-col gap-2 p-5 bg-white/[0.02] border border-white/5 rounded-[1.8rem] transition-all group-hover:bg-white/[0.04] group-hover:border-white/10">
                <div className="flex items-center gap-2 opacity-40">
                   <Users size={14} className="text-gold" />
                   <span className="text-[9px] font-black text-white uppercase tracking-widest">Capacity</span>
                </div>
                <span className="text-[12px] font-bold text-gold uppercase tracking-tight italic">Elite Access</span>
             </div>
          </div>

          {/* --- Bottom Nav Area --- */}
          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-1 italic">Tactical System</span>
                <span className="text-[10px] font-mono text-white/40 tracking-wider">#BRIT-{course.slug.substring(0,4).toUpperCase()}</span>
            </div>

            {/* 🔥 Action Button - Magnetic Feel */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
                <div className="absolute inset-0 bg-gold blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-500" />
                <div className="w-16 h-16 rounded-3xl border border-white/10 flex items-center justify-center bg-white/[0.03] backdrop-blur-3xl group-hover:bg-gold transition-all duration-500 shadow-2xl group-hover:text-black">
                    <ArrowUpRight size={28} className="text-white/40 group-hover:text-black transition-colors" />
                </div>
            </motion.div>
          </div>
        </div>

        {/* Scanline Effect - Subtle 2026 Tech */}
        <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />
      </motion.div>
    </Link>
  );
}