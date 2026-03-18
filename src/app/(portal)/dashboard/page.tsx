import PortalHeader from "@/components/portal/header";
import ProgressCard from "@/components/portal/ProgressCard";
import StatsGrid from "@/components/portal/StatsGrid";
import { sql } from "@/lib/db";
import { BookOpen, ShieldCheck, Clock, Activity } from 'lucide-react';

export default async function DashboardPage() {
  const STUDENT_ID = '4af3f081-0b21-44a5-a358-81904ce5854e';

  // 1. جلب البيانات بشكل متوازي (Parallel) لسرعة البرق
  const [studentRes, coursesCountRes, avgProgressRes] = await Promise.all([
    sql`SELECT name, rank FROM students WHERE id = ${STUDENT_ID} LIMIT 1`,
    sql`SELECT COUNT(*) as total FROM student_courses WHERE student_id = ${STUDENT_ID}`,
    sql`SELECT AVG(progress) as average FROM student_courses WHERE student_id = ${STUDENT_ID}`
  ]);

  const student = studentRes[0];
  const activeCourses = parseInt(coursesCountRes[0].total || "0");
  const overallProgress = Math.round(Number(avgProgressRes[0].average) || 0);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1️⃣ هيدر البوابة - يعرض الاسم المحدث Mohamed Gamal */}
      <PortalHeader 
        studentName={student?.name || "Pilot Developer"} 
        studentRank={student?.rank || "PRODIGY"} 
      />

      {/* 2️⃣ كارت التقدم - يعكس حالة العمليات الحقيقية */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <ProgressCard progress={overallProgress} />
      </div>

      {/* 3️⃣ شبكة الإحصائيات - ستايل استخباراتي مع Neon Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsGrid 
          label="Active Operations" 
          value={activeCourses.toString().padStart(2, '0')} 
          icon={<BookOpen size={20} className="text-gold" />} 
          description="Enrolled in British Academy programs"
        />
        <StatsGrid 
          label="Security Rank" 
          value={student?.rank || "PRODIGY"} 
          icon={<ShieldCheck size={20} className="text-gold" />} 
          description="Current access level verified"
        />
        <StatsGrid 
          label="System Status" 
          value="Online" 
          icon={<Activity size={20} className="text-emerald-500" />} 
          description="Connection to Neon DB: Stable"
        />
      </div>

      {/* 4️⃣ سجل العمليات الأخير (Recent Logs) */}
      <div className="glass border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden bg-white/[0.01]">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <Clock size={80} className="text-white" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
            <div className="size-1.5 bg-emerald-500 rounded-full animate-ping" />
            Live Intelligence Feed
          </h3>
          
          <div className="space-y-4 font-mono text-[10px]">
            <p className="text-white/40 flex gap-4">
              <span className="text-gold">[10:42:01]</span>
              <span>Identity verified: {student?.name} recognized as {student?.rank} member.</span>
            </p>
            <p className="text-white/40 flex gap-4">
              <span className="text-gold">[10:42:05]</span>
              <span>Retrieving course progress from student_courses... {overallProgress}% fetched.</span>
            </p>
            <p className="text-emerald-400/60 flex gap-4 italic">
              <span>{'>'} System ready for further instructions...</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}