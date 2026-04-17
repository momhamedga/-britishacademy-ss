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
    <div className="min-h-screen space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
      
      {/* 1️⃣ هيدر البوابة */}
      <PortalHeader 
        studentName={student?.name || "Initializing..."} 
        studentRank={student?.rank || "SECURE"} 
      />

      {/* 2️⃣ Progress Card - مع تأثير توهج خلفي */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/10 to-transparent rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <ProgressCard progress={overallProgress} />
      </div>

      {/* 3️⃣ Stats Grid - التجاوب 1 موبايل، 2 تابلت، 3 ديسك توب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatsGrid 
          label="Active Operations" 
          value={activeCourses.toString().padStart(2, '0')} 
          icon={<BookOpen size={20} className="text-gold" />} 
          description="Enrolled Programs"
        />
        <StatsGrid 
          label="Security Rank" 
          value={student?.rank || "PRODIGY"} 
          icon={<ShieldCheck size={20} className="text-gold" />} 
          description="Verified Access Level"
        />
        <StatsGrid 
          label="System Status" 
          value="Online" 
          icon={<Activity size={20} className="text-emerald-500" />} 
          description="Neon DB: Stable"
        />
      </div>

      {/* 4️⃣ Intelligence Feed - تحويلها لـ Navy بالكامل */}
      <div className="border bg-navy border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden shadow-2xl"
        >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <h3 className="text-white/80 font-black text-[9px] md:text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
            <div className="size-2 bg-emerald-500 rounded-full animate-ping shadow-[0_0_10px_#10b981]" />
            Live Intelligence Feed
          </h3>
          
          <div className="space-y-4 font-mono text-[9px] md:text-[11px] leading-relaxed">
            <p className="text-white/40 flex gap-3 md:gap-4 border-l border-gold/20 pl-4">
              <span className="text-gold/60">[10:42:01]</span>
              <span>Identity verified: <span className="text-white/80">{student?.name}</span> recognized.</span>
            </p>
            <p className="text-white/40 flex gap-3 md:gap-4 border-l border-gold/20 pl-4">
              <span className="text-gold/60">[10:42:05]</span>
              <span>Retrieving mission progress... <span className="text-gold">{overallProgress}%</span> fetched.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}