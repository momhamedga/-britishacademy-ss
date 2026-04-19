import CourseCard from "@/components/ui/CourseCard";
import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import { Shield, Target, Zap, ChevronRight, LayoutGrid, ShieldCheck, Award, Check, ZodiacLibra } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value || cookieStore.get("auth_token")?.value;

  const courses = userId ? await sql`
    SELECT 
      c.id, c.title, c.category, c.duration, c.level, c.slug, c.image_url, sc.progress, c.price
    FROM courses c
    INNER JOIN student_courses sc ON c.id = sc.course_id
    WHERE sc.student_id::text = ${userId}::text
    ORDER BY sc.enrolled_at DESC
  ` : [];

  return (
    <div className="min-h-screen  relative overflow-hidden transition-colors duration-500">
      
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-slate-100 blur-[100px] rounded-full pointer-events-none" />

      {/* Container الأساسي - وسعنا الـ Max Width للديسك توب */}
      <div className="max-w-[1800px] mx-auto px-5 md:px-16 py-8 md:py-20 relative z-10">
        
        {/* 🛰️ Tactical Header - المحاذاة والبادينج */}
        <div className="relative group p-8 md:p-16 rounded-[3rem] bg-navy border border-white/5 overflow-hidden shadow-2xl mb-16 md:mb-24">
          <div className="absolute -left-20 -top-20 size-80 bg-gold/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-gold/15 transition-all duration-1000" />
          <div className="absolute -right-20 -bottom-20 size-80 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
              <div className="p-6 bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 rounded-[2.5rem] text-gold shadow-[0_0_60px_rgba(212,175,55,0.2)] group-hover:scale-110 transition-transform duration-700">
                <ZodiacLibra size={42} strokeWidth={1.2} /> 
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Verified Assets</span>
                  </div>
                  <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest hidden md:block">Sector: Alpha-7</span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                  my <span className="text-gold">courses</span>
                </h1>
              </div>
            </div>

            {/* إحصائية سريعة في الهيدر للديسك توب */}
            <div className="hidden lg:flex flex-col items-end border-r-2 border-gold/20 pr-10">
               <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Total courses</span>
               <span className="text-6xl font-black text-white italic">{courses.length < 10 ? `0${courses.length}` : courses.length}</span>
            </div>
          </div>
        </div>

        {/* ⚡ The Mission Grid - هندسة التوزيع */}
        {courses && courses.length > 0 ? (
          <div className="
            /* الموبايل: كروت عريضة جداً ومسافات عمودية ضخمة */
            flex flex-col gap-20 
            /* الديسك توب: شبكة 3 أعمدة مع كروت مكبرة */
            md:grid md:grid-cols-2 lg:grid-cols-3 
            /* مسافات جانبية ورأسية واسعة جداً */
            gap-x-12 gap-y-24 md:gap-y-32 
            pb-40
          ">
            {courses.map((item) => {
              if (!item) return null;
              
              const courseData = {
                ...item,
                title: item.title || "Mission Unnamed",
                level: item.level || "Beginner",
              };

              return (
                <div key={item.id} className="relative group max-w-[550px] mx-auto w-full">
                  {/* رقم المهمة خلف الكارت - تكبير الحجم */}
                  <div className="hidden xl:block absolute -top-16 -left-10 text-slate-50 font-black text-[14rem] select-none group-hover:text-gold/10 transition-colors duration-700 italic -z-10 leading-none">
                    {courses.indexOf(item) + 1 < 10 ? `0${courses.indexOf(item) + 1}` : courses.indexOf(item) + 1}
                  </div>

                  {/* الحاوية الخارجية للكارت - زيادة الـ Scale والـ Padding */}
                  <div className="relative transform-gpu transition-all duration-700 group-hover:-translate-y-6">
                    <div className="shadow-[0_30px_70px_rgba(0,0,0,0.04)] group-hover:shadow-[0_50px_100px_rgba(212,175,55,0.12)] rounded-[3.5rem] transition-all duration-700">
                      {/* تكبير الكارت نفسه من خلال Container الكلاسات */}
                      <div className="scale-100 md:scale-[1.05] lg:scale-[1.1] origin-center">
                        <CourseCard course={courseData} />
                      </div>
                    </div>
                  </div>
                  
                  {/* تفاصيل إضافية تظهر عند الحوم في الديسك توب */}
                  <div className="hidden md:flex absolute -bottom-14 left-1/2 -translate-x-1/2 items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="w-10 h-[1px] bg-gold/50" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Initialize Data</span>
                    <ChevronRight size={14} className="text-gold animate-pulse" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative py-48 rounded-[4rem] border border-slate-100 bg-slate-50/50 backdrop-blur-3xl overflow-hidden group">
            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              <LayoutGrid size={64} className="text-slate-200 animate-pulse" />
              <div className="space-y-4">
                <p className="text-gold/60 font-black text-sm uppercase tracking-[1em]">Empty Sector</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                  No active deployments found. Awaiting your first mission assignment.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none z-0" />
    </div>
  );
}