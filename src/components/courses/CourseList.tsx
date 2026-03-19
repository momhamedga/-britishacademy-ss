"use client"
import { useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAcademyStore, useAcademyActions } from "@/store/useAcademyStore";
import CourseCard from "@/components/ui/CourseCard";
import { Course } from "@/types";

interface CourseListProps {
  initialData: Course[];
}

export default function CourseList({ initialData }: CourseListProps) {
  const { courses, activeCategory } = useAcademyStore();
  const { setCourses } = useAcademyActions();
  const isInitialized = useRef(false);

  // مزامنة البيانات مع الـ Store عند أول تحميل
  useEffect(() => {
    if (initialData?.length > 0 && !isInitialized.current) {
      setCourses(initialData);
      isInitialized.current = true;
    }
  }, [initialData, setCourses]);

  // منطق الفلترة مع ضمان عدم اختفاء البيانات أثناء التحميل
  const filteredCourses = useMemo(() => {
    const dataSource = courses.length > 0 ? courses : initialData;

    if (!activeCategory || activeCategory === 'all') {
      return dataSource;
    }
    
    return dataSource.filter(course => 
      course.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [courses, initialData, activeCategory]);

  return (
    <div className="relative min-h-[600px]">
      {/* تأثير الإضاءة الخلفية الذهبية */}
      <div className="absolute inset-0 bg-gold/[0.02] blur-[150px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.05 
              }}
            >
              {/* 🛡️ التعديل الأهم: نمرر الكائن كاملاً للكارت */}
              {/* كدة الكارت هيقدر يوصل لـ course.price و course.slug */}
              <CourseCard course={course} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Tactical Empty State - يظهر لو مفيش كورسات في القسم ده */}
        {filteredCourses.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="col-span-full text-center py-40 glass rounded-[3rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl overflow-hidden relative"
          >
             <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
             <div className="relative z-10 space-y-6">
                <div className="mx-auto w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center bg-gold/5 animate-pulse shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                   <span className="text-gold text-xl italic font-black">!</span>
                </div>
                <div className="space-y-2">
                   <p className="text-gold font-display italic tracking-[0.5em] uppercase text-[10px] font-black">Sector Restricted</p>
                   <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest italic">
                     No active missions found for <span className="text-white">"{activeCategory}"</span>
                   </h4>
                </div>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-[9px] text-gold border border-gold/30 px-6 py-2 rounded-full hover:bg-gold hover:text-navy transition-all uppercase font-black"
                >
                  Re-establish Connection
                </button>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}