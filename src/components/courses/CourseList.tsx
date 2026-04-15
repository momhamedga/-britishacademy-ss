"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useAcademyStore } from "@/store/useAcademyStore";
import CourseCard from "@/components/ui/CourseCard";
import { Course } from "@/types";

export default function CourseList({ initialData }: { initialData: Course[] }) {
  const { courses, activeCategory, activeLevel, activeDuration } = useAcademyStore();
  const dataSource = courses.length > 0 ? courses : initialData;

  const filtered = dataSource.filter(course => {
    // 1. فلتر التخصص
    const matchCategory = !activeCategory || activeCategory === 'all' 
      ? true 
      : course.category?.toLowerCase() === activeCategory.toLowerCase();

    // 2. فلتر المستوى (بناءً على الـ Union Type الجديد)
    const matchLevel = !activeLevel 
      ? true 
      : course.level?.toLowerCase() === activeLevel.toLowerCase();

    // 3. فلتر المدة (استخدام duration بدلاً من duration_tag)
    const matchDuration = !activeDuration 
      ? true 
      : course.duration?.toLowerCase().includes(activeDuration.toLowerCase());

    return matchCategory && matchLevel && matchDuration;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          filtered.map((course, i) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
            <p className="text-navy/40 font-bold uppercase text-xs tracking-widest">
              No courses match your selected filters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}