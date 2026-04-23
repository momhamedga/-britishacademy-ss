"use client";

import { useEffect } from "react";
import { useAcademyStore } from "@/store/useAcademyStore";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseList from "@/components/courses/CourseList";
import { LayoutGrid, Search, List } from "lucide-react";

export default function CoursesPage({ initialCourses }: { initialCourses: any[] }) {
  
  // 1. استخدام Selector لكل قيمة لوحدها (ده بيمنع الـ Infinite Loop)
  const activeCategory = useAcademyStore((state) => state.activeCategory);
  const viewMode = useAcademyStore((state) => state.viewMode);
  
  // 2. استدعاء الـ Actions مباشرة من الستور (بدون الـ Hook الخارجي اللي كان مسبب المشكلة)
  const setCourses = useAcademyStore((state) => state.setCourses);
  const setActiveCategory = useAcademyStore((state) => state.setActiveCategory);
  const setViewMode = useAcademyStore((state) => state.setViewMode);
const setActiveLevel = useAcademyStore((state) => state.setActiveLevel);
useEffect(() => {
  if (initialCourses && initialCourses.length > 0) {
    setCourses(initialCourses);
  }

  // 🧹 تنظيف الستور بالكامل عند مغادرة الصفحة
  return () => {
    setCourses([]);                // مسح الكورسات
    setActiveCategory('all');      // إعادة التصنيف للكل
    setActiveLevel('');            // مسح المستوى المختار
  };
}, [initialCourses, setCourses, setActiveCategory, setActiveLevel]);
  return (
    <main className="relative min-h-screen selection:bg-gold/30 overflow-x-hidden ">
      
      {/* --- 📱 Mobile Header --- */}
      <div className="md:hidden sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-black/[0.03] px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-navy tracking-tighter leading-none">Programs</h2>
            <div className="flex items-center gap-1.5 mt-1">
               <div className="size-1.5 rounded-full bg-gold animate-pulse" />
               <span className="text-[9px] font-black text-navy/40 uppercase tracking-widest italic">Live Catalog</span>
            </div>
          </div>
          <button className="p-3 bg-navy text-white rounded-2xl shadow-xl shadow-navy/10 active:scale-90 transition-transform">
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 md:pt-32 pb-24 relative z-10">
        
        {/* --- 🖥️ Desktop Header --- */}
        <header className="hidden md:block mb-20">
           <div className="flex justify-between items-end border-b border-navy/5 pb-12">
              <h1 className="text-8xl font-black text-navy uppercase tracking-tighter leading-[0.8]">
                Training <span className="text-gold italic font-outline-navy">Programs</span>
              </h1>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 md:gap-20">
          
          <aside className="hidden lg:block relative">
            <div className="sticky top-32 h-fit space-y-10">
               <h3 className="text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                 <div className="w-8 h-[1px] bg-gold" /> Parameters
               </h3>
               <CourseFilters />
            </div>
          </aside>

          <section className="relative">
             
             {/* 📱 Mobile Category Pills (الربط المباشر بالأكشنز) */}
             <div className="md:hidden sticky top-24 z-50 py-4 -mx-6 px-6">
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                   {['all', 'Security', 'Safety', 'Medical'].map((cat) => {
                     const isActive = (activeCategory || 'all').toLowerCase() === cat.toLowerCase();
                     return (
                       <button 
                         key={cat} 
                         onClick={() => setActiveCategory(cat)}
                         className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95
                         ${isActive 
                           ? 'bg-navy text-white shadow-xl shadow-navy/20 -translate-y-0.5' 
                           : 'bg-white border border-black/5 text-navy/40'}`}
                       >
                         {cat === 'all' ? 'All Programs' : cat}
                       </button>
                     );
                   })}
                </div>
             </div>

        {/* 🛠️ Grid/List Controls - تظهر فقط في الديسكتوب */}
<div className="hidden md:flex justify-between items-center mb-10 bg-navy/[0.02] p-4 rounded-3xl border border-navy/5">
    <p className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em] px-2">
        Display Mode
    </p>
    <div className="flex gap-2 bg-white/50 p-1 rounded-2xl border border-navy/5">
        <button 
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-xl transition-all active:scale-90 ${viewMode === 'grid' ? 'bg-navy text-white shadow-lg' : 'text-navy/20 hover:text-navy/40'}`}
        >
            <LayoutGrid size={18}/>
        </button>
        <button 
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-xl transition-all active:scale-90 ${viewMode === 'list' ? 'bg-navy text-white shadow-lg' : 'text-navy/20 hover:text-navy/40'}`}
        >
            <List size={18}/>
        </button>
    </div>
</div>
             
            <CourseList />
          </section>
        </div>
      </div>
    </main>
  );
}