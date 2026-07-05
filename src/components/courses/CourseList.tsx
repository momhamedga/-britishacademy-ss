"use client";

import { useDeferredValue } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAcademyStore } from "@/store/useAcademyStore";
import { Search } from "lucide-react";
import CourseCard from "../ui/CourseCard";
import type { Course } from "@/types";

export default function CourseList({ initialData = [] }: { initialData?: Course[] }) {
  const storeCourses = useAcademyStore((state) => state.courses);
  const activeCategory = useAcademyStore((state) => state.activeCategory);
  const activeLevel = useAcademyStore((state) => state.activeLevel);
  const activeDuration = useAcademyStore((state) => state.activeDuration);
  const viewMode = useAcademyStore((state) => state.viewMode);
  
  const searchQuery = useAcademyStore((state) => state.searchQuery);
  const deferredQuery = useDeferredValue(searchQuery);

  const isHomePage = initialData?.length > 0;
  const dataSource = isHomePage ? initialData : storeCourses;

  const filtered = dataSource.filter((course) => {
    if (isHomePage) return true;
    const matchesSearch = !deferredQuery || 
      course.title?.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      course.slug?.toLowerCase().includes(deferredQuery.toLowerCase());
    if (!matchesSearch) return false;

    const targetCat = activeCategory?.toLowerCase().trim() || 'all';
    const matchesCategory = targetCat === 'all' || course.category?.toLowerCase().includes(targetCat);
    const matchesLevel = !activeLevel || course.level?.toLowerCase() === activeLevel.toLowerCase();
    const matchesDuration = !activeDuration || course.duration?.toLowerCase().includes(activeDuration.toLowerCase());

    return matchesCategory && matchesLevel && matchesDuration;
  });

  const isList = !isHomePage && viewMode === 'list';

  const gridClasses = isHomePage 
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
    : viewMode === 'list' 
      ? 'grid-cols-1 gap-4' // مسافة أصغر ومحبوكة بين السطور في وضع القائمة
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6';

  return (
    <div className={`grid items-start transition-all duration-500 w-full min-w-0 ${gridClasses}`}>
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          filtered.map((course, index) => (
            <motion.div
              key={course.id}
              layout 
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.015, duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }
              }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              /* 🎯 السحر هنا: لو وضع List بنلغي الـ max-w والـ mx-auto عشان الكارت يملأ العرض المتاح ويفرد تكتيكياً */
              className={`h-auto w-full min-w-0 flex flex-col justify-start transition-all duration-500 ${
                isList ? 'max-w-none' : 'max-w-95 mx-auto'
              }`}
            >
              {/* نمرر الـ isListView صراحة للكارت */}
              <CourseCard course={course} isListView={isList} />
            </motion.div>
          ))
        ) : (
          <motion.div layout className="col-span-full py-16 text-center border border-slate-100 rounded-xl bg-white shadow-sm">
            <div className="flex flex-col items-center gap-3 max-w-xs mx-auto px-4">
              <div className="size-11 rounded-xl bg-slate-50 flex items-center justify-center border border-black/2">
                 <Search className="text-slate-400" size={16} />
              </div>
              <div className="space-y-0.5">
                <p className="text-slate-900 font-black uppercase tracking-widest text-[9px]">No Matches Found</p>
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wide leading-relaxed">Try refining your search terms</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}