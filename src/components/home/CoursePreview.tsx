import CourseList from "@/components/courses/CourseList";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function HomeCoursesPreview({ initialCourses }: { initialCourses: any[] }) {
  // بنعرض أول 3 كورسات بس كـ Preview
  const previewCourses = initialCourses?.slice(0, 3) || [];

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="w-10 h-[1px] bg-gold/50 hidden sm:block"></span>
              <span className="text-gold font-black tracking-[0.4em] text-[10px] md:text-xs uppercase flex items-center gap-2">
                <Star size={12} className="fill-gold" />
                Academic Excellence
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              Latest <br className="hidden md:block" />
              <span className="text-gold italic drop-shadow-[0_0_20px_rgba(212,175,55,0.1)]">Programs</span>
            </h2>
          </div>

          <Link href="/courses" className="group">
            <button className="glass px-8 md:px-12 py-4 md:py-5 rounded-2xl text-white text-[10px] md:text-xs font-black hover:bg-gold hover:text-navy transition-all duration-700 uppercase tracking-[0.2em] border border-white/5 flex items-center gap-4 relative overflow-hidden">
               <span className="relative z-10">Explore All Programs</span>
               <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
               {/* Hover Effect Layer */}
               <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-0" />
            </button>
          </Link>
        </div>

        {/* Courses Grid Preview */}
        <div className="relative group/list">
            {/* إحنا بنستخدم الـ CourseList اللي عملناه لأنه متجاوب أصلاً */}
            <CourseList initialData={previewCourses} />
            
            {/* Fade Overlay: بيعمل تأثير شيك إن فيه داتا أكتر */}
            <div className="absolute -bottom-10 left-0 w-full h-32 bg-gradient-to-t from-navy via-navy/50 to-transparent z-20 pointer-events-none md:hidden" />
        </div>

        {/* Bottom CTA for Mobile */}
        <div className="mt-12 flex justify-center md:hidden">
            <Link href="/courses" className="text-gold text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 border-b border-gold/20 pb-2">
                View Curriculum <ArrowRight size={14} />
            </Link>
        </div>
      </div>
    </section>
  );
}