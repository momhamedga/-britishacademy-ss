"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useAcademyStore } from "@/store/useAcademyStore";
import CourseCard from "@/components/ui/CourseCard";

export default function CourseList({ initialData = [] }: { initialData: any[] }) {
  // التعديل الجوهري: نستخدم Selectors لكل قيمة لوحدها لضمان الـ Reactivity
  const courses = useAcademyStore((state) => state.courses);
  const activeCategory = useAcademyStore((state) => state.activeCategory);
  const activeLevel = useAcademyStore((state) => state.activeLevel);
  const activeDuration = useAcademyStore((state) => state.activeDuration);
  const viewMode = useAcademyStore((state) => state.viewMode);

  const dataSource = courses.length > 0 ? courses : initialData;

  const filtered = dataSource.filter(course => {
    const matchCategory = !activeCategory || activeCategory.toLowerCase() === 'all' 
      ? true 
      : course.category?.toLowerCase() === activeCategory.toLowerCase();
    
    const matchLevel = !activeLevel ? true : course.level?.toLowerCase() === activeLevel.toLowerCase();
    const matchDuration = !activeDuration ? true : course.duration?.toLowerCase().includes(activeDuration.toLowerCase());

    return matchCategory && matchLevel && matchDuration;
  });

  return (
    <div className={`grid gap-8 transition-all duration-500 ${
      viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
    }`}>
      <AnimatePresence mode="popLayout">
        {filtered.map((course) => (
          <motion.div key={course.id} layout transition={{ duration: 0.3 }}>
            <CourseCard course={course} isListView={viewMode === 'list'} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}