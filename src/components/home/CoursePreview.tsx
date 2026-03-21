"use client"
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Loader2 } from "lucide-react";

// استيراد المكون بشكل ديناميكي مع ميزة الـ SSR False لمنع تعارض الـ Framer Motion تماماً
const CourseList = dynamic(() => import("@/components/courses/CourseList"), {
  ssr: false,
  loading: () => <CourseListSkeleton /> // عرض هيكل تحميل احترافي أثناء الربط
});

export default function HomeCoursesPreview({ initialCourses }: { initialCourses: any[] }) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // تحسين الأداء: معالجة البيانات فقط عند تغير المصدر
  const previewCourses = useMemo(() => 
    initialCourses?.slice(0, 3) || [], 
    [initialCourses]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#020617]">
      {/* 🌌 تأثير الخلفية التكتيكي (2026 Aesthetic) */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-gold/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header: Tactical Alignment --- */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center md:justify-start gap-3 mb-6"
            >
              <div className="w-12 h-px bg-linear-to-r from-gold/0 to-gold" />
              <span className="text-gold font-black tracking-[0.5em] text-[10px] uppercase flex items-center gap-2">
                <ShieldCheck size={14} className="text-gold animate-pulse" />
                Strategic Academy Intake
              </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              Elite <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-gold to-gold/40 italic">Curriculum</span>
            </h2>
          </div>

          <Link href="/courses" className="group relative">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/3 backdrop-blur-md border border-white/10 rounded-2xl text-white text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all group-hover:border-gold/50 shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-4">
                Access All Modules <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </Link>
        </div>

        {/* --- Grid Container: الـ Hydration Fix الحقيقي --- */}
        <div className="relative min-h-100">
          <AnimatePresence mode="wait">
            {!isMounted ? (
              <CourseListSkeleton key="skeleton" />
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <CourseList initialData={previewCourses} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Mobile Fade-out Overlay */}
          <div className="absolute -bottom-10 left-0 w-full h-32 bg-linear-to-t from-[#020617] via-[#020617]/50 to-transparent z-20 pointer-events-none md:hidden" />
        </div>

        {/* --- Footer Link (Mobile Only) --- */}
        <div className="mt-16 flex justify-center md:hidden">
          <Link href="/courses" className="group flex items-center gap-3 text-gold/60 hover:text-gold transition-colors font-mono text-[10px] tracking-widest uppercase border-b border-gold/10 pb-2">
            Initialize Full Search <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// 🛡️ مكون الـ Skeleton: لمنع "قفزة" التصميم وتحسين الـ SEO
const CourseListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-112.5 bg-white/2 border border-white/5 rounded-[2.5rem] animate-pulse flex flex-col p-8 space-y-4">
        <div className="w-full h-48 bg-white/5 rounded-2xl" />
        <div className="w-3/4 h-6 bg-white/10 rounded-full" />
        <div className="w-1/2 h-4 bg-white/5 rounded-full" />
        <div className="mt-auto w-full h-12 bg-gold/5 rounded-xl" />
      </div>
    ))}
  </div>
);