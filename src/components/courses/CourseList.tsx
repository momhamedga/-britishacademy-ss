"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useAcademyStore } from "@/store/useAcademyStore";
import CourseCard from "@/components/ui/CourseCard";
import { Search } from "lucide-react";

export default function CourseList({ initialData = [] }: { initialData?: any[] }) {
  const storeCourses = useAcademyStore((state) => state.courses);
  const activeCategory = useAcademyStore((state) => state.activeCategory);
  const activeLevel = useAcademyStore((state) => state.activeLevel);
  const activeDuration = useAcademyStore((state) => state.activeDuration);
  const viewMode = useAcademyStore((state) => state.viewMode);

  // تحديد مصدر البيانات
  const isHomePage = initialData && initialData.length > 0;
  const dataSource = isHomePage ? initialData : storeCourses;

  const filtered = dataSource.filter(course => {
    // في الرئيسية لا نطبق الفلاتر
    if (isHomePage) return true;

    // --- 1. فتلرة الفئة (Category) ---
    // بنجرب نقارن الـ ID أو الـ Label أو حتى لو الكلمة جزء من النص
    const targetCat = activeCategory?.toLowerCase().trim() || 'all';
    const courseCat = (course.category || "").toLowerCase().trim();
    
    const matchCategory = 
      targetCat === 'all' || 
      courseCat === targetCat || 
      courseCat.includes(targetCat) || 
      targetCat.includes(courseCat);

    // --- 2. فتلرة المستوى (Level) ---
    const targetLevel = activeLevel?.toLowerCase().trim() || "";
    const courseLevel = (course.level || "").toLowerCase().trim();
    const matchLevel = targetLevel === "" || courseLevel === targetLevel;

    // --- 3. فتلرة المدة (Duration) ---
    const targetDur = activeDuration?.toLowerCase().trim() || "";
    const courseDur = (course.duration || "").toLowerCase().trim();
    const matchDuration = targetDur === "" || courseDur.includes(targetDur);

    return matchCategory && matchLevel && matchDuration;
  });

  // 🧪 Debug Tool: لو الفلتر مش شغال، افتح الـ Console وشوف القيم دي
  // console.log('Store:', activeCategory, 'Filtered:', filtered.length);

  return (
    <div className={`grid gap-8 transition-all duration-500 ${
      viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
    <AnimatePresence mode="popLayout">
  {filtered.length > 0 ? (
    filtered.map((course, index) => (
      <motion.div
        key={course.id}
        layout
        // التغيير هنا: الأنيميشن بيتحرك من تحت لفوق مع تتابع (Stagger)
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            // تتابع الظهور بناءً على ترتيب العنصر
            delay: index * 0.05, 
            duration: 0.4,
            ease: [0.2, 0.65, 0.3, 0.9] // Cubic Bezier فخم وسلس
          }
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.95, 
          transition: { duration: 0.2 } 
        }}
        // إضافة تأثير الـ Hover للشاشات الكبيرة فقط
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="h-full"
      >
        <CourseCard course={course} isListView={viewMode === 'list'} />
      </motion.div>
    ))
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="col-span-full py-32 text-center border-2 border-dashed border-navy/5 rounded-[4rem] bg-navy/[0.01]"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 rounded-full bg-navy/5 flex items-center justify-center animate-bounce">
           <Search className="text-navy/20" size={20} />
        </div>
        <p className="text-navy/30 font-black uppercase tracking-[0.3em] text-[10px]">
          No programs match your current filters
        </p>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}