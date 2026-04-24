"use client";

import { useDeferredValue } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAcademyStore } from "@/store/useAcademyStore";
import CourseCard from "@/components/ui/CourseCard";
import { Search } from "lucide-react";

export default function CourseList({ initialData = [] }: { initialData?: any[] }) {
  // 1.Selectors ذرية - سحب فقط ما نحتاجه لمنع إعادة الرندر غير الضرورية
  const storeCourses = useAcademyStore((state) => state.courses);
  const activeCategory = useAcademyStore((state) => state.activeCategory);
  const activeLevel = useAcademyStore((state) => state.activeLevel);
  const activeDuration = useAcademyStore((state) => state.activeDuration);
  const viewMode = useAcademyStore((state) => state.viewMode);
  
  // 2. استخدام useDeferredValue للبحث
  // دي بتخلي الـ UI يفضل 60fps وأنت بتكتب بسرعة، لأنها بتأجل تحديث القائمة تقنياً للأجزاء غير العاجلة
  const searchQuery = useAcademyStore((state) => state.searchQuery);
  const deferredQuery = useDeferredValue(searchQuery);

  const isHomePage = initialData?.length > 0;
  const dataSource = isHomePage ? initialData : storeCourses;

  // 3. الفلترة - الـ React Compiler هيتكفل بجعل هذه العملية Memoized تلقائياً
  const filtered = dataSource.filter((course) => {
    if (isHomePage) return true;

    // فلترة البحث (Title + Slug) باستخدام القيمة المؤجلة
    const matchesSearch = !deferredQuery || 
      course.title?.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      course.slug?.toLowerCase().includes(deferredQuery.toLowerCase());

    if (!matchesSearch) return false;

    // فلترة التصنيفات
    const targetCat = activeCategory?.toLowerCase().trim() || 'all';
    const matchesCategory = targetCat === 'all' || course.category?.toLowerCase().includes(targetCat);

    // فلترة المستويات
    const matchesLevel = !activeLevel || course.level?.toLowerCase() === activeLevel.toLowerCase();

    // فلترة المدة
    const matchesDuration = !activeDuration || course.duration?.toLowerCase().includes(activeDuration.toLowerCase());

    return matchesCategory && matchesLevel && matchesDuration;
  });

  return (
    <div className={`grid gap-8 transition-all duration-500 ${
      viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          filtered.map((course, index) => (
            <motion.div
              key={course.id}
              layout // ميزة جبارة لتحريك العناصر لمكانها الجديد عند الفلترة
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: index * 0.02, // Stagger effect سريع جداً
                  duration: 0.3,
                  ease: [0.2, 0.8, 0.2, 1] 
                }
              }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <CourseCard course={course} isListView={viewMode === 'list'} />
            </motion.div>
          ))
        ) : (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-32 text-center border-2 border-dashed border-black/[0.03] rounded-[4rem] bg-white/40 backdrop-blur-md"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="size-14 rounded-2xl bg-[oklch(25%_0.08_260/0.05)] flex items-center justify-center">
                 <Search className="text-[oklch(25%_0.08_260/0.2)]" size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[oklch(25%_0.08_260)] font-black uppercase tracking-[0.2em] text-[10px]">
                  No Matches Found
                </p>
                <p className="text-[oklch(25%_0.08_260/0.4)] text-[9px] font-medium uppercase">
                  Try refining your search terms
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}