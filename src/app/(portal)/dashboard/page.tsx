import PortalHeader from "@/components/portal/header";
import ProgressCard from "@/components/portal/ProgressCard";
import StatsGrid from "@/components/portal/StatsGrid";
import { sql } from "@/lib/db";
import { BookOpen, ShieldCheck, Clock, Activity } from 'lucide-react';
import { cookies } from "next/headers"; // ✅ استيراد الكوكيز

// ⚡ إجبار الصفحة على التحديث الديناميكي لمنع الـ Caching
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
const cookieStore = await cookies();
  // 🛰️ جلب الـ ID الفعلي فقط
  const userId = cookieStore.get("user_id")?.value || cookieStore.get("auth_token")?.value;

  // 🛡️ لو مفيش ID، مش هنبعت بيانات Fallback عشان السايدبار ميفهمش إن فيه حد مسجل
  if (!userId) {
    // ممكن هنا تعمل redirect لصفحة اللوجين لو الـ Dashboard محمية
    // redirect('/login'); 
    return null; // أو عرض رسالة "Access Denied"
  }

  // 1. جلب البيانات بناءً على الـ ID الحقيقي فقط
  const [studentRes, coursesCountRes, avgProgressRes] = await Promise.all([
    sql`SELECT id as student_id, name, rank FROM students WHERE id = ${userId} LIMIT 1`,
    sql`SELECT COUNT(*) as total FROM student_courses WHERE student_id = ${userId}`,
    sql`SELECT AVG(progress) as average FROM student_courses WHERE student_id = ${userId}`
  ]);

  const student = studentRes[0];
  const activeCourses = parseInt(coursesCountRes[0].total || "0");
  const overallProgress = Math.round(Number(avgProgressRes[0].average) || 0);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1️⃣ هيدر البوابة - الآن سيعرض الاسم الصحيح لليوزر المسجل */}
      <PortalHeader 
        studentName={student?.name || "Initializing..."} 
        studentRank={student?.rank || "SECURE"} 
      />

      {/* باقي الكود يظل كما هو... */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <ProgressCard progress={overallProgress} />
      </div>

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

      <div className="glass border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden bg-white/[0.01]">
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
              <span>Retrieving course progress... {overallProgress}% fetched.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}