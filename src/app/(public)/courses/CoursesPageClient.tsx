"use client";

import { useSyncExternalStore, useEffect, useMemo, useTransition } from "react";
import { useAcademyStore } from "@/store/useAcademyStore";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseList from "@/components/courses/CourseList";
import { LayoutGrid, Search, List, X } from "lucide-react";

// ✅ الـ Interface الكامل والنهائي لمنع أي Error في الـ Linter
interface Course {
  id: string | number;
  title: string;
  category: string;
  slug: string;
  level: string;
  price: number;
  duration: string;
  is_sia_accredited: boolean;
  [key: string]: any; 
}

export default function CoursesPage({ initialCourses }: { initialCourses: Course[] }) {
  const [isPending, startTransition] = useTransition();

  // 1. استهلاك الـ State بذكاء (Atomic Selectors)
  const searchQuery = useAcademyStore((state) => state.searchQuery);
  const activeCategory = useAcademyStore((state) => state.activeCategory);
  const viewMode = useAcademyStore((state) => state.viewMode);
  
  const { 
    setCourses, 
    setActiveCategory, 
    setViewMode, 
    setActiveLevel, 
    setSearchQuery 
  } = useAcademyStore();

  // 2. التزامن مع الـ Client لمنع الـ Hydration Error
  const isMounted = useSyncExternalStore(
    () => () => {}, 
    () => true,     
    () => false     
  );

  useEffect(() => {
    if (initialCourses?.length > 0) {
      startTransition(() => {
        setCourses(initialCourses);
      });
    }
    // تصفية الستور عند مغادرة الصفحة للأداء
    return () => {
      setCourses([]);
      setActiveCategory('all');
      setActiveLevel('');
      setSearchQuery('');
    };
  }, [initialCourses, setCourses, setActiveCategory, setActiveLevel, setSearchQuery]);

  const categories = useMemo(() => ['all', 'Security', 'Safety', 'Medical'], []);

  const theme = {
    bg: "bg-[oklch(98%_0.01_260)]",
    navy: "text-[oklch(25%_0.08_260)]",
    navyBg: "bg-[oklch(25%_0.08_260)]",
    gold: "text-[oklch(75%_0.15_85)]",
    goldBg: "bg-[oklch(75%_0.15_85)]",
    border: "border-[oklch(25%_0.08_260/0.05)]"
  };

  if (!isMounted) return <div className={`min-h-screen ${theme.bg} animate-pulse`} />;

  return (
    <main className={`relative min-h-screen ${theme.bg} selection:bg-gold/30 overflow-x-hidden pb-20`}>
      
      <div className="md:hidden sticky top-0 z-[100] bg-[oklch(98%_0.01_260/0.8)] backdrop-blur-xl border-b border-black/[0.03] px-6 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className={`text-2xl font-black ${theme.navy} tracking-tighter leading-none italic`}>PROGRAMS</h2>
            <span className="text-[8px] font-bold opacity-30 tracking-[0.3em] uppercase mt-1">British Academy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`size-2 rounded-full ${theme.goldBg} animate-ping`} />
          </div>
        </div>

        {/* Dynamic Mobile Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity" size={14} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog..."
            className="w-full bg-white/50 border border-black/[0.05] rounded-xl py-3 pl-10 pr-4 text-[11px] font-bold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-black/5 rounded-full">
              <X size={10} />
            </button>
          )}
        </div>

        {/* Snap-Scroll Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1">
           {categories.map((cat) => {
             const isActive = (activeCategory || 'all').toLowerCase() === cat.toLowerCase();
             return (
               <button 
                 key={cat} 
                 onClick={() => startTransition(() => setActiveCategory(cat))}
                 className={`snap-start whitespace-nowrap px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95
                 ${isActive ? `${theme.navyBg} text-white shadow-lg` : 'bg-white border border-black/5 text-black/40'}`}
               >
                 {cat === 'all' ? 'All' : cat}
               </button>
             );
           })}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 md:pt-32 relative z-10">
        
        {/* --- 🖥️ Desktop Header (Ultra Impact) --- */}
        <header className="hidden md:block mb-20">
           <div className={`flex justify-between items-end border-b ${theme.border} pb-12`}>
              <h1 className={`text-8xl font-black ${theme.navy} uppercase tracking-tighter leading-[0.8]`}>
                Training <span className={`${theme.gold} italic`}>Programs</span>
              </h1>

           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 md:gap-20">
          
          {/* Sidebar with Desktop Search */}
          <aside className="hidden lg:block relative">
            <div className="sticky top-32 h-fit space-y-12">
               <div className="space-y-4">
                  <h3 className={`${theme.gold} text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3`}>
                    <div className="w-8 h-[1px] bg-gold" /> Search
                  </h3>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity" size={16} />
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type to search..."
                      className="w-full bg-white border border-navy/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold focus:outline-none focus:border-gold/50 transition-all shadow-sm"
                    />
                  </div>
               </div>
               
               <div className="space-y-6">
                  <h3 className={`${theme.gold} text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3`}>
                    <div className="w-8 h-[1px] bg-gold" /> Filter By
                  </h3>
                  <CourseFilters />
               </div>
            </div>
          </aside>

          <section className={`relative ${isPending ? 'opacity-40' : 'opacity-100'} transition-opacity duration-500`}>
            {/* View Mode Controls */}
            <div className={`hidden md:flex justify-between items-center mb-10 bg-[oklch(25%_0.08_260/0.02)] p-4 rounded-3xl border ${theme.border}`}>
                <p className={`text-[10px] font-black ${theme.navy} opacity-30 uppercase tracking-[0.2em] px-2`}>
                   Displaying {initialCourses.length} Programs
                </p>
                <div className="flex gap-2 bg-white/50 p-1 rounded-2xl border border-black/5">
                    <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? `${theme.navyBg} text-white shadow-lg` : 'text-navy/20'}`}>
                        <LayoutGrid size={18}/>
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? `${theme.navyBg} text-white shadow-lg` : 'text-navy/20'}`}>
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