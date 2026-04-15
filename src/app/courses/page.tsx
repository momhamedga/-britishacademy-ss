import { getLatestCourses } from "@/actions/academy-actions";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseList from "@/components/courses/CourseList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional SIA Training Programs | British Academy London",
  description: "Explore our SIA accredited security and safety training programs in Wembley, London.",
};

export default async function CoursesPage() {
  const initialCourses = await getLatestCourses();

  return (
    <main className="relative min-h-screen bg-pearl selection:bg-gold/30"> 
      {/* 🌫️ Light Sub-Overlay */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10">
        <header className="mb-16 border-b border-navy/5 pb-12">
           <h1 className="text-6xl md:text-7xl font-black text-navy uppercase tracking-tighter leading-none">
             Training <span className="text-gold italic font-outline-navy">Programs</span>
           </h1>
           <p className="mt-4 text-navy/60 font-medium tracking-wide">50+ specialized, internationally accredited courses</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12">
          {/* Aside Section - أبيض لؤلؤي مع ظل ناعم */}
          <aside className="sticky top-32 h-fit order-2 lg:order-1">
             <div className="p-8 rounded-[2rem] border border-navy/5 bg-white shadow-[0_20px_50px_rgba(27,49,86,0.05)] transition-all">
                <h3 className="text-gold text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                  <div className="w-4 h-[1px] bg-gold" /> Filter Results
                </h3>
                <CourseFilters />
             </div>
          </aside>

          <section className="order-1 lg:order-2">
             <CourseList initialData={initialCourses} />
          </section>
        </div>
      </div>
    </main>
  );
}