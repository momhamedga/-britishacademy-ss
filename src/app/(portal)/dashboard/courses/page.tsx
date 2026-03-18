import CourseCard from "@/components/portal/CourseCard";
import { sql } from "@/lib/db";

export default async function CoursesPage() {
  const STUDENT_ID = '4af3f081-0b21-44a5-a358-81904ce5854e';

  // جلب الكورسات مع التقدم الحقيقي لكل كورس
  const courses = await sql`
    SELECT 
      c.title, 
      c.category, 
      c.duration, 
      c.level,
      sc.progress
    FROM courses c
    JOIN student_courses sc ON c.id = sc.course_id
    WHERE sc.student_id = ${STUDENT_ID}
    ORDER BY sc.progress DESC
  `;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header>
        <h1 className="text-4xl font-bold text-white tracking-tighter italic mb-2">Deployed Operations</h1>
        <p className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Active Missions & Field Training</p>
      </header>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard 
              key={index}
              title={course.title}
              category={course.category}
              progress={course.progress}
              level={course.level}
              duration={course.duration}
              thumbnail="/logo.webp" // اللوجو الذهبي للأكاديمية
            />
          ))}
        </div>
      ) : (
        <div className="glass p-12 rounded-[2.5rem] border border-white/5 text-center">
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No active deployments found in your sector.</p>
        </div>
      )}
    </div>
  );
}