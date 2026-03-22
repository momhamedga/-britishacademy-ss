"use client"
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from "lucide-react";

// 1. الواجهة الكاملة لمنع أي تعارض في الأنواع (TypeScript Safe)
interface Course {
  id: string | number;
  title: string;
  duration?: string;
  level?: string;
  image?: string;
}

// 2. التحميل الديناميكي لضمان أداء 100/100 في الـ Lighthouse
const CourseList = dynamic(() => import("@/components/courses/CourseList"), {
  ssr: false,
  loading: () => <CourseListSkeleton />
});

export default function HomeCoursesPreview({ initialCourses }: { initialCourses: Course[] }) {
  const [isMounted, setIsMounted] = useState(false);

  // 🔥 الحل السحري اللي وصلت له لإبادة الـ Hydration Error تماماً
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const previewCourses = useMemo(() => 
    initialCourses?.slice(0, 3) || [], 
    [initialCourses]
  );

  // التفاعلات البصرية (Variants) بنوعها الصريح
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative py-24 md:py-40 px-6 overflow-hidden ">
      
      {/* 🌌 تأثيرات الإضاءة بمعايير Tailwind v4 Canonical */}
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-gold/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-100 h-100 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-20 md:mb-32 gap-12">
          <div className="text-center lg:text-left space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/3 border border-white/5 backdrop-blur-xl"
            >
              <Sparkles size={14} className="text-gold/60" />
              <span className="text-white/40 font-bold tracking-[0.4em] text-[9px] uppercase">
                Future Intelligence Intake
              </span>
            </motion.div>
            
            <h2 className="text-6xl md:text-[100px] font-black text-white tracking-tighter uppercase leading-[0.8] transition-all">
              OUR 
 <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-white via-white/80 to-gold/30 italic">SERVICES</span>
            </h2>
          </div>

          <Link href="/courses" className="hidden lg:block group">
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative px-12 py-6 bg-white/2 border border-white/10 rounded-4xl overflow-hidden transition-all group-hover:border-gold/20 shadow-2xl"
            >
              <div className="relative z-10 flex items-center gap-4 text-white font-black text-[11px] uppercase tracking-widest">
                Explore Modules <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          </Link>
        </div>

        {/* Content Container */}
        <div className="relative min-h-100">
          <AnimatePresence mode="wait">
            {!isMounted ? (
              <CourseListSkeleton key="skeleton" />
            ) : (
              <motion.div
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <CourseList initialData={previewCourses} /> 
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* لمسة الموبايل للملاحة السريعة */}
          <div className="mt-16 lg:hidden flex justify-center">
            <Link href="/courses" className="w-full">
              <button className="w-full py-5 bg-gold text-[#020617] font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-transform">
                View All Courses
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Pattern Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(var(--color-gold)/0.03)_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none" />
    </section>
  );
}

const CourseListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {[1, 2, 3].map((i) => (
      <div key={i} className="aspect-4/5 bg-white/2 border border-white/5 rounded-4xl animate-pulse flex flex-col p-10 space-y-6">
        <div className="w-full h-1/2 bg-white/5 rounded-3xl" />
        <div className="w-3/4 h-8 bg-white/5 rounded-full" />
        <div className="mt-auto w-1/2 h-12 bg-white/5 rounded-2xl" />
      </div>
    ))}
  </div>
);