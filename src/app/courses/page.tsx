import { getLatestCourses } from "@/actions/academy-actions";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseList from "@/components/courses/CourseList";
import { Metadata } from "next";
import { Sparkles, SlidersHorizontal, LayoutGrid, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Training | British Academy",
  description: "SIA accredited security and safety training programs.",
};

export default async function CoursesPage() {
  const initialCourses = await getLatestCourses();

  return (
    <main className="relative min-h-screen bg-[#FDFDFD] selection:bg-gold/30 overflow-x-hidden">
      {/* 🌫️ Ambient Background (Desktop Only) */}
      <div className="hidden md:block fixed inset-0 bg-grid-black/[0.02] bg-[size:60px_60px] pointer-events-none" />

      {/* --- 📱 Mobile-Only: App Header (iOS Dynamic Style) --- */}
      <div className="md:hidden sticky top-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-black/[0.03] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Explore</span>
            <h2 className="text-xl font-black text-navy tracking-tighter">Programs</h2>
          </div>
          <div className="flex gap-3">
             <button className="p-3 bg-navy/5 rounded-full text-navy"><Search size={18} /></button>
             <div className="size-10 rounded-full bg-navy overflow-hidden border-2 border-gold/20 shadow-lg">
                <img src="/api/placeholder/40/40" alt="Profile" />
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-8 md:pt-32 pb-24 relative z-10">
        
        {/* --- 🖥️ Desktop Header: Classic & Powerful --- */}
        <header className="hidden md:block mb-20 border-b border-navy/5 pb-12">
        
           <h1 className="text-8xl font-black text-navy uppercase tracking-tighter leading-[0.8]">
             Training <span className="text-gold italic font-outline-navy">Programs</span>
           </h1>
        </header>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 md:gap-16">
          
          {/* --- Sidebar Section --- */}
          <aside className="relative order-2 lg:order-1">
            {/* Desktop View: Heavy Industrial Sidebar */}
            <div className="hidden lg:block sticky top-32 h-fit">
               <div className="p-8 rounded-[2.5rem] border border-navy/5 bg-white shadow-[0_20px_50px_rgba(27,49,86,0.05)]">
                  <h3 className="text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-gold" /> Parameters_Filter
                  </h3>
                  <CourseFilters />
               </div>
            </div>

            {/* Mobile View: Tab Bar Style Navigation (iPhone Feel) */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]">
               <div className="bg-navy/95 backdrop-blur-2xl rounded-[2.5rem] p-2 flex items-center justify-between shadow-2xl border border-white/10">
                  <button className="flex-1 py-4 flex flex-col items-center gap-1 text-gold">
                    <LayoutGrid size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-tighter">Courses</span>
                  </button>
                  <button className="flex-1 py-4 flex flex-col items-center gap-1 text-white/40">
                    <SlidersHorizontal size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-tighter">Filter</span>
                  </button>
                  <div className="w-[2px] h-8 bg-white/5" />
                  <button className="flex-1 py-4 flex flex-col items-center gap-1 text-white/40">
                    <Sparkles size={20} />
                    <span className="text-[8px] font-bold uppercase tracking-tighter">SIA_Auth</span>
                  </button>
               </div>
            </div>
          </aside>

          {/* --- Course List Section --- */}
          <section className="order-1 lg:order-2">
             {/* Mobile-Only Category Quick-Scroll */}
             <div className="md:hidden flex gap-3 overflow-x-auto pb-6 no-scrollbar -mx-2 px-2">
                {['All', 'Security', 'Safety', 'Medical'].map((cat) => (
                  <button key={cat} className="whitespace-nowrap px-6 py-2.5 rounded-full bg-navy/5 text-navy text-[11px] font-black uppercase tracking-wider border border-navy/5 active:bg-gold active:text-navy transition-all">
                    {cat}
                  </button>
                ))}
             </div>
             
             <CourseList initialData={initialCourses} />
          </section>
        </div>
      </div>
      
      {/* 📱 Spacer for Mobile Navigation */}
      <div className="h-28 lg:hidden" />
    </main>
  );
}