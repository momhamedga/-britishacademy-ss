import CourseCard from "@/components/portal/CourseCard";
import { sql } from "@/lib/db";
import { Layers } from 'lucide-react';
import { cookies } from "next/headers";

// ⚡ إجبار الصفحة على التحديث الديناميكي
export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  // 🛰️ جلب الهوية الحقيقية من الكوكيز
  const cookieStore = await cookies();
  // تأكد أنك تستخدم نفس اسم الكوكي المستخدم في الـ Login
  const userId = cookieStore.get("user_id")?.value || cookieStore.get("auth_token")?.value;
  console.log("🔍 Debug: Searching for courses for student_id:", userId);
// جرب تعديل الـ Query ليكون هكذا داخل CoursesPage
const courses = userId ? await sql`
  SELECT 
    c.id,
    c.title, 
    c.category, 
    c.duration, 
    c.level, 
    c.slug,
    c.image_url,
    sc.progress
  FROM courses c
  INNER JOIN student_courses sc ON c.id = sc.course_id
  WHERE sc.student_id::text = ${userId}::text  -- ✅ تحويل الطرفين لنص لضمان المطابقة
  ORDER BY sc.enrolled_at DESC
` : [];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 px-4 md:px-0">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-gold/10 border border-gold/20 rounded-[1.5rem] text-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <Layers size={32} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">Deployed Ops</h1>
            <p className="text-gold/60 text-[10px] font-black uppercase tracking-[0.5em] mt-1">Sector 7 Active Missions</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
           <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
             Signal Status: {courses.length > 0 ? 'Optimal' : 'Scanning...'}
           </span>
        </div>
      </header>

      {/* Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 pb-20 lg:pb-0">
          {courses.map((course) => (
            <CourseCard
              
              key={course.id}
              {...course}
              // ✅ نستخدم الصورة من قاعدة البيانات، وإذا لم توجد نضع الـ logo كاحتياط
              thumbnail={course.image_url || "/logo.webp"} 
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass p-20 rounded-[3rem] border border-white/5 text-center bg-white/[0.01] backdrop-blur-md">
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse">
            No active deployments found in your sector.
          </p>
        </div>
      )}
    </div>
  );
}