"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const CourseList = dynamic(() => import("@/components/courses/CourseList"), {
  ssr: false,
  loading: () => <CourseListSkeleton />
});

export default function HomeCoursesPreview({ initialCourses }: { initialCourses: any[] }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🛡️ معالجة صارمة للبيانات: منع التكرار وضمان العدد 3
  const previewCourses = useMemo(() => {
    if (!initialCourses || !Array.isArray(initialCourses)) return [];
    
    const unique = [];
    const seenIds = new Set();

    for (const course of initialCourses) {
      if (course?.id && !seenIds.has(course.id)) {
        seenIds.add(course.id);
        unique.push(course);
      }
      if (unique.length === 3) break;
    }
    
    return unique;
  }, [initialCourses]);

  if (!mounted) return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <CourseListSkeleton />
      </div>
    </section>
  );

  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-navy">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] size-[600px] bg-gold/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex flex-col lg:flex-row items-center justify-between mb-16 md:mb-28 gap-10">
          <div className="flex flex-col items-center lg:items-start space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
              <ShieldCheck size={14} className="text-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/80">Academy Programs</span>
            </div>
            <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
               OUR <span className="text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/60">TRAINING</span>
            </h2>
          </div>

          {isDesktop && (
            <Link href="/courses">
              <motion.button 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-gold text-navy font-black uppercase tracking-[0.2em] text-[10px] rounded-full shadow-2xl transition-all flex items-center gap-4 group"
              >
                Explore Programs <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </Link>
          )}
        </header>

        <div className="relative">
          <AnimatePresence mode="wait">
            {isDesktop ? (
              <motion.div 
                key="home-desktop-wrapper" // 🔥 Key فريد لإجبار المكون على إعادة الرسم
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
              >
                {/* نرسل البيانات كـ props ونعتمد على التعديل اللي عملناه في CourseList */}
                <CourseList initialData={previewCourses} />
              </motion.div>
            ) : (
              <div className="flex flex-col gap-12">
                <div className="flex overflow-x-auto gap-6 pb-12 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
                  {previewCourses.map((course, idx) => (
                    <div key={`home-mob-${course.id || idx}`} className="snap-center shrink-0 w-[85vw]">
                      <div className="rounded-[3rem] bg-white overflow-hidden shadow-2xl border border-white/10">
                        {/* تمرير مصفوفة تحتوي على كورس واحد فقط لقتل أي تكرار داخلي */}
                        <CourseList initialData={[course]} />
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/courses" className="px-4">
                   <button className="w-full py-6 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl backdrop-blur-md">
                     View All Programs
                   </button>
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const CourseListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
    {[1, 2, 3].map((i) => (
      <div key={i} className="aspect-[4/5] bg-white/5 border border-white/10 rounded-[2.5rem] animate-pulse" />
    ))}
  </div>
);