import { getLatestCourses } from "@/actions/academy-actions";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseList from "@/components/courses/CourseList";
import { Metadata } from "next";

// 🌐 تحسين الـ SEO لضمان ظهور الموقع في نتائج لندن وويملبي
export const metadata: Metadata = {
  title: "Professional SIA Training Programs | British Academy London",
  description: "Explore our SIA accredited security and safety training programs in Wembley, London. Top-tier certification for Door Supervisors and CCTV Operators.",
};

export default async function CoursesPage() {
  // 🛰️ جلب البيانات مباشرة من السيرفر (Server-Side Rendering)
  // هذا يضمن أن البيانات تظهر فوراً للمستخدم ولعناكب Google
  const initialCourses = await getLatestCourses();

  return (
    <main className="relative min-h-screen selection:bg-gold/30 overflow-x-hidden "> 
      
      {/* 🌌 Cinematic Background Orbs - الإضاءات الخلفية المتحركة */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-gold/[0.04] blur-[120px] rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-[30%] right-[-10%] w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-blue-500/[0.02] blur-[100px] rounded-full" />
      </div>

      {/* Grid Pattern - شبكة تقنية تضفي مظهر الـ Terminal */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] z-0 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-28 md:pt-44 pb-24 relative z-10">
        
        <header className="flex flex-col items-center md:items-start mb-16 md:mb-24">
          {/* Status Badge - إشارة النظام يعمل */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all hover:border-gold/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            System Online: 2026 Operational Standards
          </div>
          
          {/* Hero Title - العنوان العملاق */}
          <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-black text-white font-display italic uppercase tracking-tighter leading-[0.8] mb-8 md:mb-10 text-center md:text-left overflow-visible pb-4">
            Global <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-gold via-gold/80 to-gold/40 drop-shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              Programs
            </span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 w-full justify-between mt-6">
            {/* Mission Brief - وصف المهمة */}
            <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-xl font-medium tracking-wide leading-relaxed text-center md:text-left opacity-70 border-l-0 md:border-l-[1px] md:border-white/10 md:pl-10 italic">
              A curated selection of safety and security certification programs, 
              engineered to meet the rigorous professional standards of the modern UK security sector.
            </p>
            
            {/* Tactical Counter - عداد الكورسات الديناميكي */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-center gap-5 md:gap-0">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap mb-1">Active Modules</span>
                <span className="text-5xl md:text-7xl lg:text-8xl font-display italic text-white font-black tracking-tighter tabular-nums shadow-gold/20 drop-shadow-2xl">
                    {initialCourses?.length ? initialCourses.length.toString().padStart(2, '0') : "00"}
                </span>
            </div>
          </div>
        </header>

        {/* Interactive Operations Section */}
        <section className="relative space-y-12 md:space-y-20">
          
          {/* Sticky Category Control - الفلتر المثبت */}
          <div className="sticky top-[80px] z-40">
             {/* خلفية ضبابية تظهر فقط عند التمرير خلف الفلتر */}
             <div className="relative z-10">
                <CourseFilters />
             </div>
          </div>
          
          {/* Results Grid - عرض الكورسات */}
          <div className="relative z-10">
              <CourseList initialData={initialCourses} />
          </div>
        </section>
      </div>

      {/* Terminal Footer Decor */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </main>
  );
}