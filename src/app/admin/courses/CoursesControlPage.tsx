"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CourseTable from '@/components/admin/CourseTable';
import CourseDeploymentHub from '@/components/admin/CourseDeploymentHub';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function CoursesControlPage({ initialCourses }: { initialCourses: any[] }) {
  const [view, setView] = useState<'inventory' | 'deploy'>('inventory');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const router = useRouter();

  const handleAction = (course: any = null) => {
    setSelectedCourse(course);
    setView('deploy');
  };

  const sync = () => {
    router.refresh();
    setView('inventory');
  };

  return (
    // أضفنا pt-28 هنا عشان نهرب من الـ Navbar الأساسي للموقع
    <main className="min-h-screen bg-[var(--background)] px-4 md:px-10 pt-28 pb-20">
      <AnimatePresence mode="wait">
        {view === 'inventory' ? (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto space-y-12"
          >
            {/* Header - لغينا الـ sticky عشان ميعملش تداخل */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white/40 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--academy-gold)]/5 blur-[100px] rounded-full -mr-20 -mt-20" />
              
      <div className="relative z-10 space-y-4">
  {/* Title Section */}
  <div className="flex items-center gap-4">
    <div className="h-10 md:h-14 w-2 bg-[var(--academy-gold)] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
    <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-[var(--academy-navy)] leading-none">
      Inventory
    </h1>
  </div>

  {/* Enhanced Back Button */}
  <Link href="/admin">
    <motion.div 
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-3 ml-6 group cursor-pointer"
    >
      {/* Icon Circle */}
      <div className="size-8 md:size-10 rounded-full border border-[var(--academy-navy)]/10 bg-white shadow-sm flex items-center justify-center group-hover:bg-[var(--academy-navy)] group-hover:text-white transition-all duration-300">
        <ChevronRight className="rotate-180 size-4 md:size-5" strokeWidth={3} />
      </div>
      
      {/* Label */}
      <div className="flex flex-col">
        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--academy-navy)] leading-none group-hover:text-[var(--academy-gold)] transition-colors">
          Return_to_admin
        </span>
        <div className="h-[2px] w-0 bg-[var(--academy-gold)] group-hover:w-full transition-all duration-500 mt-1" />
      </div>
    </motion.div>
  </Link>
</div>

              <button 
                onClick={() => handleAction()}
                className="group relative w-full md:w-auto px-12 py-6 bg-[var(--academy-navy)] text-[var(--academy-gold)] rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] transition-all hover:shadow-[0_20px_40px_rgba(32,45,72,0.2)] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  new_course <span className="text-xl">+</span>
                </span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </header>

            <CourseTable initialCourses={initialCourses} onEdit={handleAction} />
          </motion.div>
        ) : (
          <motion.div
            key="deploy"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
          >
            <CourseDeploymentHub initialData={selectedCourse} onBack={sync} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}