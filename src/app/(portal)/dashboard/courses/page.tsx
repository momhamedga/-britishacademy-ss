// 🎯 تأكد أن هذا هو الكارت الجديد والمعدل تماماً
import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import { LayoutGrid, Check, ZodiacLibra } from "lucide-react";
import CourseCard from "@/components/portal/CourseCard";

// ⚡ Force dynamic rendering to prevent stale cached deployment matrices
export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const cookieStore = await cookies();
  const studentIdText = cookieStore.get("user_id")?.value || cookieStore.get("auth_token")?.value;

  let courses: any[] = [];

  if (studentIdText) {
    const safeVector = studentIdText.length > 5 ? studentIdText.substring(1) : studentIdText;

    // 🎯 لقط الـ UUID الحقيقي أولاً لمنع اختفاء الكورسات عند الـ Refresh
    const studentRow = await sql`
      SELECT id FROM public.students 
      WHERE student_id = ${studentIdText} 
         OR student_id LIKE ${'%' + safeVector}
         OR id::text = ${studentIdText}
      LIMIT 1
    `;

    if (studentRow.length > 0) {
      const realStudentUuid = studentRow[0].id;

      // 📡 جلب الكورسات بناءً على الـ UUID المضمون والمؤمن
      courses = await sql`
        SELECT 
          c.id, c.title, c.category, c.duration, c.level, c.slug, c.image_url, sc.progress, c.price
        FROM public.courses c
        INNER JOIN public.student_courses sc ON c.id = sc.course_id
        WHERE sc.student_id = ${realStudentUuid}::uuid
        ORDER BY sc.enrolled_at DESC
      `;
    }
  }

  return (
    /* 🎯 السحر هنا: w-full مع max-w-5xl و mx-auto لضمان أن الصفحة تكون ملموسة وفي السنتر على كل الشاشات */
    <div className="w-full max-w-5xl mx-auto px-4 py-2 text-white antialiased">
      
      {/* 🛰️ Tactical Header - محبوك بدون أي مسافات مفرطة */}
      <div className="relative group p-4 md:p-5 rounded-xl bg-navy border border-white/[0.03] overflow-hidden shadow-2xl mb-6">
        <div className="absolute -left-20 -top-20 size-48 bg-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-all duration-700" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gradient-to-br from-gold/10 to-transparent border border-gold/15 rounded-xl text-gold shrink-0">
              <ZodiacLibra size={18} strokeWidth={1.5} /> 
            </div>
            
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  <Check size={9} className="text-emerald-500" />
                  <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest">Verified Assets</span>
                </div>
              </div>
              
              <h1 className="text-lg md:text-xl font-black text-white tracking-tight uppercase italic leading-none">
                my <span className="text-gold">courses</span>
              </h1>
            </div>
          </div>

          {/* الإحصائية السريعة للديسك توب */}
          <div className="hidden sm:flex flex-col items-end border-r-2 border-gold/20 pr-4">
             <span className="text-white/30 text-[7px] font-black uppercase tracking-widest">Total Active</span>
             <span className="text-xl md:text-2xl font-black text-white italic font-mono leading-none mt-0.5">
               {courses.length < 10 ? `0${courses.length}` : courses.length}
             </span>
          </div>
        </div>
      </div>

      {/* ⚡ The Mission Grid - تم تصفيف الأعمدة بدقة لمنع أي ضربات أفقيّة وعموديّة */}
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pb-12 w-full">
          {courses.map((item) => {
            if (!item) return null;
            
            const courseData = {
              ...item,
              title: item.title || "Mission Unnamed",
              level: item.level || "Beginner",
            };

            return (
              /* 🎯 justify-start مع h-full للتأكد أن الكروت مرصوصة بسيمترية كاملة بدون تمطيط قسري */
              <div key={item.id} className="relative group w-full flex flex-col justify-start h-full min-w-0">
                {/* رقم المهمة خلف الكارت - شفاف ومريح للعين */}
                <div className="hidden xl:block absolute -top-6 -left-3 text-slate-800/5 font-black text-[3.5rem] select-none group-hover:text-gold/10 transition-colors duration-500 italic -z-10 leading-none font-mono">
                  {courses.indexOf(item) + 1 < 10 ? `0${courses.indexOf(item) + 1}` : courses.indexOf(item) + 1}
                </div>

                {/* الـ Container الخارجي الممسوك بالملي لقتل أي تداخل */}
                <div className="relative w-full h-full transform-gpu transition-all duration-300 group-hover:-translate-y-1">
                  <div className="shadow-xl rounded-xl overflow-hidden h-full">
                    <CourseCard course={courseData} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 🛡️ Empty State */
        <div className="relative py-14 rounded-xl border border-white/[0.03] bg-navy overflow-hidden text-center shadow-2xl">
          <div className="relative z-10 flex flex-col items-center gap-3 max-w-xs mx-auto px-4">
            <LayoutGrid size={28} className="text-slate-600 animate-pulse" />
            <div className="space-y-1">
              <p className="text-gold/60 font-black text-[9px] uppercase tracking-widest">Empty Sector</p>
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wide leading-relaxed">
                No active deployments found. Awaiting assignment clearance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}