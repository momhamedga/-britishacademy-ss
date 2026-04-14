"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ArrowUpRight, Zap } from 'lucide-react';
import { Course } from '@/types';

// 🎨 ألوان الهوية الملكية (OKLCH)
const COLORS = {
  navy: "oklch(25% 0.08 260)",
  gold: "oklch(75% 0.15 85)",
};

const LEVEL_CONFIG: Record<string, string> = {
  advanced: 'text-red-600 border-red-200 bg-red-50/80',
  intermediate: 'text-[oklch(25%_0.08_260)] border-[oklch(75%_0.15_85)]/30 bg-white/90',
  professional: 'text-purple-600 border-purple-200 bg-purple-50/80',
  beginner: 'text-emerald-600 border-emerald-200 bg-emerald-50/80',
};

export default function CourseCard({ course }: { course: Course }) {
  // ⚡ Performance: Tilt for Mouse only, disabled for Touch
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handlePointerMove = (e: React.PointerEvent) => {
    // تعطيل الـ Tilt على الموبايل لتحسين أداء السكرول
    if (e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const getLevelStyle = () => {
    const rawLevel = course.level?.toLowerCase().trim() || '';
    const match = Object.keys(LEVEL_CONFIG).find(key => rawLevel.includes(key));
    return match ? LEVEL_CONFIG[match] : LEVEL_CONFIG.beginner;
  };

  return (
    <Link href={`/courses/${course.slug}`} className="block h-full group @container">
      <motion.div 
        onPointerMove={handlePointerMove}
        onPointerLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.97 }} // Haptic Feedback (أهم لمسة للموبايل)
        className="relative h-full flex flex-col bg-white border border-[oklch(25%_0.08_260)]/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500"
      >
        
        {/* --- 🖼️ Image Area: Optimized for High-Res Screens --- */}
        <div className="relative h-64 @[30rem]:h-80 w-full overflow-hidden bg-slate-100">
          <Image 
            src={course.image_url || '/placeholder-course.webp'} 
            alt={course.title} 
            fill 
            className="object-cover transition-transform duration-[2s] group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true} // Performance: LCP Optimization
          />
          
          {/* Mobile-First Gradient: Darker at bottom for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
          
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest backdrop-blur-xl z-20 shadow-xl ${getLevelStyle()}`}>
            {course.level}
          </div>

          <div className="absolute bottom-4 left-5 z-20">
            <div className="bg-[oklch(25%_0.08_260)] px-4 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5 border border-white/10">
              <Zap size={12} className="text-[oklch(75%_0.15_85)]" fill="currentColor" />
              <span className="text-[oklch(75%_0.15_85)] font-black text-sm italic">£{course.price}</span>
            </div>
          </div>
        </div>

        {/* --- 🛠️ Content Area: Tactile & Clean --- */}
        <div className="p-6 md:p-8 flex flex-col flex-grow relative" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-2 mb-3">
              <span className="text-[oklch(75%_0.15_85)] font-black text-[9px] uppercase tracking-[0.4em]">
                {course.category} DIVISION
              </span>
              <div className="h-[1px] flex-1 bg-slate-100" />
          </div>
          
          <h3 className="text-[oklch(25%_0.08_260)] font-black text-xl @[30rem]:text-2xl mb-6 uppercase leading-tight tracking-tight italic line-clamp-2">
            {course.title}
          </h3>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
             <InfoBox icon={Clock} value={course.duration} />
             <InfoBox icon={Users} value="Elite Access" />
          </div>

          {/* --- Bottom Nav Area: Thumb-Zone Friendly --- */}
          <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Asset_Ref</span>
                <span className="text-[9px] font-mono font-bold text-slate-400">#BR-{course.slug.substring(0,4).toUpperCase()}</span>
            </div>

            {/* Action Button: Optimized for thumb-clicks (w-16 h-12) */}
            <motion.div 
              className="w-16 h-12 rounded-2xl bg-[oklch(25%_0.08_260)] flex items-center justify-center text-[oklch(75%_0.15_85)] shadow-lg active:scale-90 transition-transform"
            >
                <ArrowUpRight size={22} strokeWidth={3} />
            </motion.div>
          </div>
        </div>

        {/* Tactical UI Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />
      </motion.div>
    </Link>
  );
}

// Optimized Sub-component
function InfoBox({ icon: Icon, value }: any) {
    return (
        <div className="flex items-center gap-2.5 p-3.5 bg-slate-50/50 border border-slate-100/50 rounded-2xl">
            <Icon size={14} className="text-[oklch(25%_0.08_260)] opacity-40" />
            <span className="text-[10px] font-black text-[oklch(25%_0.08_260)] uppercase tracking-tight">{value}</span>
        </div>
    );
}