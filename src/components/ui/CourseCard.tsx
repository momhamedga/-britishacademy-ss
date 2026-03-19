"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ShieldCheck, Target, ChevronRight, Zap } from 'lucide-react';
import { Course } from '@/types'; // نستخدم الـ Interface الموحدة

export default function CourseCard({ course }: { course: Course }) {
  
  // نظام ألوان تكتيكي بناءً على المستوى (Level) القادم من الداتا بيز
  const getLevelStyles = (lvl: string) => {
    switch (lvl) {
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/20 shadow-[0_0_10px_rgba(248,113,113,0.1)]';
      case 'Intermediate': return 'text-gold bg-gold/10 border-gold/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]';
      case 'Professional': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]';
    }
  };

  return (
    <Link href={`/courses/${course.slug}`}>
      <motion.div 
        whileHover={{ y: -8, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="group relative border border-white/5 rounded-[2.5rem] p-5 transition-all duration-500 hover:border-gold/30 backdrop-blur-3xl bg-white/[0.01] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer h-full flex flex-col"
      >
        {/* إضاءة خلفية تكتيكية عند الهوفر */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-gold/5 blur-[50px] group-hover:bg-gold/15 transition-all duration-700 pointer-events-none" />

        {/* المساحة البصرية / اللوجو */}
        <div className="relative h-48 w-full rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex items-center justify-center border border-white/5 group-hover:border-gold/20 transition-colors">
          <div className="relative w-32 h-32 transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 group-hover:drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]">
            <Image 
              src={course.image_url || '/logo.webp'} 
              alt={course.title} 
              fill 
              className="object-contain p-4 filter grayscale group-hover:grayscale-0 transition-all duration-700" 
              priority 
            />
          </div>
          
          {/* Badge: السعر يظهر فوق الصورة بشكل فخم */}
          <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
            <span className="text-gold font-black text-xs">£{course.price}</span>
          </div>

          {/* Badge: المستوى */}
          <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-[0.2em] backdrop-blur-xl z-20 ${getLevelStyles(course.level)}`}>
            {course.level}
          </div>
        </div>

        {/* منطقة المحتوى */}
        <div className="mt-6 px-1 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
             <ShieldCheck size={12} className="text-gold" />
             <span className="text-white font-bold text-[9px] uppercase tracking-[0.3em]">{course.category}</span>
          </div>
          
          <h3 className="text-white font-black text-xl mb-4 italic uppercase tracking-tighter line-clamp-2 group-hover:text-gold transition-colors leading-none min-h-[2.5rem]">
            {course.title}
          </h3>
          
          {/* الإحصائيات التكتيكية */}
          <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/5 py-5 relative">
             <div className="flex items-center gap-2.5 text-slate-400 group-hover:text-slate-200 transition-colors">
                <Clock size={14} className="text-gold/50" />
                <span className="text-[10px] font-black uppercase tracking-widest">{course.duration}</span>
             </div>
             <div className="flex items-center gap-2.5 text-slate-400">
                <Zap size={14} className="text-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest italic font-mono text-gold/60">
                   {course.enrollment_count || 0} Joined
                </span>
             </div>
          </div>

          {/* شريط التقدم (أو الحالة التجميلية) */}
          <div className="mt-auto space-y-3">
            <div className="flex justify-between items-end text-[8px] font-black uppercase tracking-[0.4em]">
              <span className="text-slate-500 italic group-hover:text-gold transition-colors">Access Granted</span>
              <span className="text-gold">Ready</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div 
                initial={{ width: "10%" }}
                whileInView={{ width: "100%" }}
                className="h-full bg-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              />
            </div>
          </div>

          {/* سهم الانتقال */}
          <div className="mt-6 flex justify-end">
              <div className="text-[9px] font-black text-white/20 group-hover:text-gold flex items-center gap-2 uppercase tracking-[0.4em] transition-all">
                  Inspect Intel <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
          </div>
        </div>

        {/* تأثير الخط الذهبي في الأسفل عند الهوفر */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </motion.div>
    </Link>
  );
}