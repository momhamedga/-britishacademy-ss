"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ArrowUpRight, Zap, ShieldCheck, Award, Play } from 'lucide-react';
import { Course } from '@/types';

// 🎨 الهوية الملكية الموحدة
const COLORS = {
  navy: "var(--academy-navy)",
  gold: "var(--academy-gold)",
  background: "var(--background)",
};

const LEVEL_CONFIG: Record<string, string> = {
  advanced: 'text-red-600 bg-red-50/80 border-red-100',
  intermediate: 'text-navy bg-white/80 border-gold/20',
  professional: 'text-purple-600 bg-purple-50/80 border-purple-100',
  beginner: 'text-emerald-600 bg-emerald-50/80 border-emerald-100',
};

export default function CourseCard({ course }: { course: Course & { progress?: number | null } }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // 🛰️ فحص إذا كان الكارت معروض جوة لوحة التحكم وله نسبة تقدم (Progress)
  const hasProgress = course.progress !== undefined && course.progress !== null;
  const progressValue = hasProgress ? Number(course.progress) : 0;

  const handlePointerMove = (e: React.PointerEvent) => {
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
    <Link href={`/courses/${course.slug}`} className="block h-full group @container perspective-1000">
      <motion.div 
        onPointerMove={handlePointerMove}
        onPointerLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.98 }}
        className="relative h-full flex flex-col bg-white rounded-[3rem] p-3 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_40px_100px_-20px_rgba(15,23,42,0.15)] transition-all duration-700 overflow-hidden"
      >
        
        {/* --- 🖼️ Media Section: Compact & Responsive Aspect Ratio --- */}
        <div className="relative aspect-[16/10] w-full rounded-[2rem] overflow-hidden shadow-inner group-hover:shadow-lg transition-all duration-700">
          <Image 
            src={course.image_url || '/logo.webp'} 
            alt={course.title} 
            fill 
            priority 
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          
          {/* Subtle Overlay: أخف وأرقى */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-80" />
          
          {/* Floating Level */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-xl border text-[7px] font-black uppercase tracking-widest backdrop-blur-md z-20 shadow-sm ${getLevelStyle()}`}>
            {course.level}
          </div>

          {/* Price & Badge */}
          <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
             <div className="bg-navy/80 backdrop-blur-lg px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 border border-white/10 group-hover:border-gold/40 transition-colors">
               <Zap size={10} className="text-gold" fill="currentColor" />
               <span className="text-gold font-black text-sm italic">£{course.price}</span>
             </div>
             
             {course.is_sia_accredited && (
                <div className="size-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 text-white shadow-lg">
                    <ShieldCheck size={16} />
                </div>
             )}
          </div>
        </div>

        {/* --- 🛠️ Content Section --- */}
        <div className="p-7 md:p-9 flex flex-col flex-grow relative" style={{ transform: "translateZ(50px)" }}>
          <div className="flex items-center gap-3 mb-4">
              <span className="text-gold font-black text-[10px] uppercase tracking-[0.5em] drop-shadow-sm">
                {course.category}
              </span>
              <div className="h-[1.5px] w-8 bg-gold/30 rounded-full" />
          </div>
          
          <h3 className="text-navy font-black text-2xl @[30rem]:text-3xl mb-6 uppercase leading-[0.95] tracking-tighter italic group-hover:text-gold transition-colors duration-500 line-clamp-2">
            {course.title}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
             <InfoBox icon={Clock} value={course.duration} label="Course_Time" />
             <InfoBox icon={Users} value={hasProgress ? `Sync Active` : `Elite Access`} label="Entry_Tier" />
          </div>

          {/* 🛰️ [شريط التقدم التكتيكي] يظهر فقط للطالب المشترك */}
          {hasProgress && (
            <div className="w-full bg-slate-100 p-4 rounded-2xl border border-black/[0.02] mb-6 space-y-2">
              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-wider text-slate-400">
                <span>Operational_Progress</span>
                <span className={progressValue === 100 ? "text-gold animate-pulse" : "text-navy"}>
                  {progressValue === 100 ? "Completed_100%" : `Syncing_${progressValue}%`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${progressValue === 100 ? 'bg-gradient-to-r from-gold to-yellow-500' : 'bg-navy'}`}
                />
              </div>
            </div>
          )}

          {/* --- Bottom Nav Area --- */}
          <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Asset_Identity</span>
                <span className="text-[11px] font-mono font-bold text-navy/40 group-hover:text-gold transition-colors">#BR-{course.slug.substring(0,4).toUpperCase()}</span>
            </div>

            {/* الأيقونة الذكية المتغيرة بناءً على نسبة التقدم */}
            <motion.div 
              className={`size-16 rounded-[1.5rem] flex items-center justify-center shadow-xl transition-all duration-500 group-hover:rotate-12
                ${progressValue === 100 
                  ? 'bg-gradient-to-r from-gold to-yellow-500 text-navy shadow-gold/20' 
                  : 'bg-navy text-gold group-hover:bg-gold group-hover:text-navy'}`}
            >
              {hasProgress ? (
                progressValue === 100 ? (
                  <Award size={26} strokeWidth={2.5} className="animate-bounce" />
                ) : (
                  <Play size={22} fill="currentColor" strokeWidth={0} />
                )
              ) : (
                <ArrowUpRight size={28} strokeWidth={3} />
              )}
            </motion.div>
          </div>
        </div>

        {/* Decorative Grid Layer */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
      </motion.div>
    </Link>
  );
}

function InfoBox({ icon: Icon, value, label }: any) {
    return (
        <div className="flex flex-col gap-1.5 p-4 bg-background rounded-3xl border border-black/[0.03] hover:border-gold/20 transition-all group/box">
            <div className="flex items-center gap-2">
                <Icon size={12} className="text-navy opacity-30 group-hover/box:text-gold group-hover/box:opacity-100 transition-all" />
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</span>
            </div>
            <span className="text-[11px] font-black text-navy uppercase tracking-tight">{value}</span>
        </div>
    );
}