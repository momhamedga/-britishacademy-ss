"use client";
import { useEffect, useState, useRef, useTransition } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const COLORS = {
  navy: "oklch(25% 0.08 260)",
  mediumBlue: "oklch(45% 0.12 255)",
  gold: "#D4AF37",
};

const CourseList = dynamic(() => import("@/components/courses/CourseList"), {
  ssr: false,
  loading: () => <CourseListSkeleton />
});

export default function HomeCoursesPreview({ initialCourses }: { initialCourses: any[] }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);
  const previewCourses = initialCourses?.slice(0, 3) || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full overflow-hidden bg-[#fcfcfd]"> 
      <section 
        className="relative py-24 md:py-36 px-6 overflow-hidden"
        style={{ backgroundColor: COLORS.navy }}
      >
        {/* 🌌 الخلفية الملكية */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div 
            className="absolute inset-0 z-10 opacity-30" 
            style={{ background: `radial-gradient(circle at 15% 50%, ${COLORS.mediumBlue}, transparent 60%)` }} 
          />
          <div 
            className="absolute inset-0 z-10" 
            style={{ background: `linear-gradient(to right, ${COLORS.navy}, transparent)` }} 
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-20">
          <header className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-16 md:mb-24 gap-8 md:gap-12 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start space-y-4 md:space-y-6">
              {/* 🏷️ Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2.5 rounded-full border border-black/5 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#1B2A41]/70">
                  PROGRAMS
                </span>
              </motion.div>
              
              {/* ✍️ Main Title - الحفاظ على الـ h2 كما طلبت */}
              <div className="space-y-1 md:space-y-2">
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">
                  OUR TRAINING
                </h2>
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-[#D4AF37]/50">
                  PROGRAMS
                </h2>
              </div>
            </div>

            {/* 🚀 Desktop Button */}
            {isDesktop && (
              <div className="pb-2">
                <Link href="/courses" className="group">
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-12 py-6 bg-[#D4AF37] text-[#0A0F1E] font-black uppercase tracking-[0.2em] text-[11px] rounded-full shadow-[0_20px_40px_rgba(212,175,55,0.25)] transition-all flex items-center gap-4 border border-white/10"
                  >
                    Explore All 
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </div>
            )}
          </header>

          {/* 3. Content Switcher */}
          {isDesktop ? (
            <DesktopView courses={previewCourses} />
          ) : (
            <MobileView courses={previewCourses} />
          )}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 🔥 MOBILE VIEW: App-Style Carousel                                         */
/* -------------------------------------------------------------------------- */
function MobileView({ courses }: { courses: any[] }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex overflow-x-auto gap-5 pb-10 -mx-6 px-6 snap-x snap-mandatory no-scrollbar">
        {courses.map((course, idx) => (
          <motion.div 
            key={course.id || idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="snap-center shrink-0 w-[88%]"
          >
            {/* هنا نمرر الكورس الفردي لـ CourseCard المخصص للموبايل أو نستخدم CourseList المعدلة */}
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
                <CourseList initialData={[course]} />
            </div>
          </motion.div>
        ))}
      </div>

      <Link href="/courses" className="w-full">
        <motion.button 
          whileTap={{ scale: 0.96 }}
          className="w-full py-5 bg-[#D4AF37] text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl flex items-center justify-center gap-3 border border-white/10"
        >
          View All Programs <ArrowRight size={14} />
        </motion.button>
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 🖥️ DESKTOP VIEW: The Standard Pro Grid                                     */
/* -------------------------------------------------------------------------- */
function DesktopView({ courses }: { courses: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <CourseList initialData={courses} /> 
    </motion.div>
  );
}

const CourseListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="aspect-[3/4] bg-white/[0.03] border border-white/10 rounded-[2.5rem] animate-pulse" />
    ))}
  </div>
);