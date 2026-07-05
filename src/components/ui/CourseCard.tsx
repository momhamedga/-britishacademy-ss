"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ArrowUpRight, Zap } from 'lucide-react';
import type { Course } from '@/types';

const LEVEL_CONFIG: Record<string, string> = {
  advanced: 'text-red-600 bg-red-50/80 border-red-100',
  intermediate: 'text-slate-900 bg-white/80 border-gold/20',
  professional: 'text-purple-600 bg-purple-50/80 border-purple-100',
  beginner: 'text-emerald-600 bg-emerald-50/80 border-emerald-100',
};

export default function CourseCard({ course, isListView = false }: { course: Course, isListView?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || isListView) return; 
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
    <Link href={`/courses/${course.slug}`} className="block h-auto group @container perspective-1000 w-full min-w-0">
      <motion.div 
        onPointerMove={handlePointerMove}
        onPointerLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX: isListView ? 0 : rotateX, rotateY: isListView ? 0 : rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.99 }}
        /* 🎯 التعديل الجوهري: في وضع اللستة الكارت بياخد العرض الكامل w-full، وبيتحول لأفقي md:flex-row في الديسك توب */
        className={`relative h-auto flex transition-all duration-500 bg-white border border-slate-100 rounded-xl p-4 shadow-[0_10px_30px_rgba(15,23,42,0.03)] hover:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.1)] overflow-hidden group/card w-full ${
          isListView ? 'flex-col md:flex-row md:items-stretch gap-5' : 'flex-col'
        }`}
      >
        
        {/* --- 🖼️ Media Section: ضبط ذكي للأبعاد في الوضعين العمودي والأفقي --- */}
        <div className={`relative rounded-lg overflow-hidden border border-black/2 bg-slate-50 shrink-0 transition-all duration-500 ${
          isListView 
            ? 'aspect-16/10 w-full md:w-60 md:aspect-auto md:h-auto' // في الديسك توب بياخد طول الحاوية تلقائي وبمقاس محكوم، وفي الموبايل بيفرد بكامل المساحة بالـ aspect الموزون
            : 'aspect-16/10 w-full'
        }`}>
          <Image 
            src={course.image_url || '/logo.webp'} 
            alt={course.title} 
            fill 
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
          
          <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded border text-[7px] font-black uppercase tracking-widest backdrop-blur-md z-20 shadow-sm ${getLevelStyle()}`}>
            {course.level}
          </div>

          <div className="absolute bottom-2.5 left-2.5 z-20 flex items-center gap-1">
             <div className="bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded-md shadow flex items-center gap-1 border border-white/10">
               <Zap size={8} className="text-gold" fill="currentColor" />
               <span className="text-gold font-black text-[10px] font-mono">£{course.price}</span>
             </div>
          </div>
        </div>

        {/* --- 🛠️ Content Section: فرد المساحة بالكامل والتوزيع المتناسق --- */}
        <div className="flex-grow flex flex-col justify-between min-w-0 pt-2 md:pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
                <span className="text-gold font-black text-[7.5px] uppercase tracking-widest font-mono">
                  {course.category}
                </span>
                <div className="h-px w-4 bg-gold/40 rounded-full" />
                {course.is_sia_accredited && (
                  <span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-[6.5px] font-black uppercase tracking-wider ml-auto md:ml-0">SIA Accredited</span>
                )}
            </div>
            
            <h3 className="text-slate-900 font-black text-sm md:text-base uppercase tracking-tight leading-tight italic group-hover:text-gold transition-colors duration-300 line-clamp-1">
              {course.title}
            </h3>
          </div>
          
          {/* الـ Controls السفلية ملحومة وموزونة بالشعرة في الوضعين */}
          <div className="flex flex-row items-center justify-between border-t border-slate-100 pt-3 mt-4 w-full gap-4">
            
            {/* مقاييس المدة والوصول */}
            <div className="flex gap-4 font-mono shrink-0">
               <div className="flex items-center gap-1.5">
                  <Clock size={11} className="text-slate-400" />
                  <span className="text-[9px] font-black text-slate-800 uppercase tracking-tight">{course.duration}</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <Users size={11} className="text-slate-400" />
                  <span className="text-[9px] font-black text-slate-800 uppercase tracking-tight">Elite Access</span>
               </div>
            </div>

            {/* سهم التحويل والـ ID التكتيكي */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[8px] font-mono font-bold text-slate-400 hidden sm:block opacity-0 group-hover/card:opacity-100 transition-opacity">#BR-{course.slug.substring(0,4).toUpperCase()}</span>
              <motion.div className="size-8 rounded-lg flex items-center justify-center shadow-sm bg-slate-900 text-gold group-hover:bg-gold group-hover:text-slate-900 transition-all duration-300">
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </motion.div>
            </div>

          </div>
        </div>

      </motion.div>
    </Link>
  );
}