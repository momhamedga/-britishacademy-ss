"use client"
import { useEffect, useRef } from "react";
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
  
  // استخدام useRef لمنع التحديث المتكرر للبيانات الأولية
  const isInitialized = useRef(false);

  useEffect(() => {
    // التحديث يتم فقط في أول رندرة إذا كانت البيانات موجودة
    if (!isInitialized.current && initialData && initialData.length > 0) {
      setCourses(initialData);
      isInitialized.current = true;
    }
  }, [initialData, setCourses]);

  // منطق الفلترة اللحظي بناءً على التصنيف المختار
  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            layout // تفعيل حركة الكروت بسلاسة عند تغير الفلتر
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <CourseCard course={course} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* عرض رسالة في حال عدم وجود كورسات لهذا الفلتر */}
      {filteredCourses.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="col-span-full text-center py-32 glass rounded-[2.5rem] border border-white/5"
        >
          <p className="text-slate-500 font-display italic tracking-widest uppercase text-sm">
            Coming Soon to the Academy...
          </p>
        </motion.div>
      )}
    </div>
  );
}