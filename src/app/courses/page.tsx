import { getLatestCourses } from "@/actions/academy-actions";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseList from "@/components/courses/CourseList";

export default async function CoursesPage() {
  const initialCourses = await getLatestCourses();

  return (
    <main className="relative min-h-screen selection:bg-gold/30 overflow-x-hidden "> 
      
      {/* Background Orbs - Optimized for all screens */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gold/5 blur-[100px] md:blur-[150px] rounded-full opacity-60" />
        <div className="absolute top-[40%] right-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-blue-500/5 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      {/* Main Container - Adjusted Padding for Mobile/Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-24 md:pt-40 pb-20 relative z-10">
        
        <header className="flex flex-col items-center md:items-start mb-12 md:mb-20">
          {/* Badge - Scaled for Mobile */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-10 transition-all">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-gold"></span>
            </span>
            Elite Engineering Standards 2026
          </div>
          
          {/* Main Title - Using Fluid Font Sizes with Clamp */}
          <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-black text-white font-display italic uppercase tracking-tighter leading-[0.85] mb-6 md:mb-8 text-center md:text-left overflow-visible pb-4 transition-all">
            Global <br className="hidden md:block" />
            <span className="text-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">Programs</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 w-full justify-between mt-4">
            {/* Description - Adjusted for readability */}
            <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-xl font-light tracking-wide leading-relaxed text-center md:text-left opacity-80 border-l-0 md:border-l-2 md:border-white/10 md:pl-8">
              A curated selection of safety and security certification programs, 
              engineered to meet the rigorous professional architecture standards of 2026.
            </p>
            
            {/* Stats Counter - Hidden or simplified on very small screens if needed */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-center gap-4 md:gap-1">
                <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">Total Curriculum</span>
                <span className="text-3xl md:text-5xl lg:text-6xl font-display italic text-white font-black tracking-tighter transition-all">
                    {initialCourses.length.toString().padStart(2, '0')}
                </span>
            </div>
          </div>
        </header>

        {/* Filters & Content Section */}
        <section className="relative space-y-8 md:space-y-16">
          {/* Sticky position adjustment for mobile headers */}
          <div className="sticky top-16 md:top-24 z-30  backdrop-blur-md -mx-4 px-4 py-4 md:py-0 md:bg-transparent md:backdrop-blur-none transition-all">
            <CourseFilters />
          </div>
          
          <div className="relative z-10">
             <CourseList initialData={initialCourses} />
          </div>
        </section>
      </div>

      {/* Footer Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </main>
  );
}