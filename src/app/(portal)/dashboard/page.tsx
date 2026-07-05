import PortalHeader from "@/components/portal/header";
import ProgressCard from "@/components/portal/ProgressCard";
import StatsGrid from "@/components/portal/StatsGrid";
import { sql } from "@/lib/db";
import { BookOpen, ShieldCheck, Activity } from 'lucide-react';
import { getCurrentStudentId } from "@/lib/session";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const studentId = await getCurrentStudentId();

  if (!studentId) return null;

  const studentCheck = await sql`
    SELECT id, name, rank FROM public.students
    WHERE id = ${studentId}::uuid
    LIMIT 1
  `;

  if (studentCheck.length === 0) {
    return (
      <div className="p-5 text-center bg-navy rounded-xl border border-white/5 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
        Awaiting Vector Authentication Clearance...
      </div>
    );
  }

  const realStudentUuid = studentCheck[0].id;
  const student = studentCheck[0];

  const [coursesCountRes, avgProgressRes] = await Promise.all([
    sql`SELECT COUNT(*) as total FROM public.student_courses WHERE student_id = ${realStudentUuid}::uuid`,
    sql`SELECT AVG(progress) as average FROM public.student_courses WHERE student_id = ${realStudentUuid}::uuid`
  ]);

  const activeCourses = parseInt(coursesCountRes[0]?.total || "0");
  const overallProgress = Math.round(Number(avgProgressRes[0]?.average) || 0);

  return (
    /* تم ضغط مسافات الـ space-y لـ space-y-5 لمنع الفجوات العملاقة والتمدد الرأسي */
    <div className="space-y-5 md:space-y-6 animate-in fade-in duration-500 w-full max-w-5xl mx-auto">
      
      {/* 1️⃣ Portal Strategic Header */}
      <PortalHeader 
        studentName={student?.name || "Initializing..."} 
        studentRank={student?.rank || "SECURE"} 
      />

      {/* 2️⃣ Progress Card - Ultra Compact Frame */}
      <div className="relative group w-full">
        <div className="absolute -inset-0.5 bg-linear-to-r from-gold/5 to-transparent rounded-xl blur-lg opacity-10 pointer-events-none" />
        <ProgressCard progress={overallProgress} />
      </div>

      {/* 3️⃣ Stats Grid - Responsive Grid Without Layout Leaks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-w-0">
        <StatsGrid 
          label="Active Operations" 
          value={activeCourses.toString().padStart(2, '0')} 
          icon={<BookOpen size={16} className="text-gold/80" />} 
          description="Enrolled Programs"
        />
        <StatsGrid 
          label="Security Rank" 
          value={student?.rank || "AGENT"} 
          icon={<ShieldCheck size={16} className="text-gold/80" />} 
          description="Verified Access Level"
        />
        <StatsGrid 
          label="System Status" 
          value="Online" 
          icon={<Activity size={16} className="text-emerald-500" />} 
          description="Neon DB: Stable"
        />
      </div>

      {/* 4️⃣ Intelligence Feed - Sharp Compact navy UI */}
      <div className="border bg-navy border-white/3 rounded-xl p-4 md:p-5 relative overflow-hidden shadow-2xl w-full">
        <div className="relative z-10">
          <h3 className="text-white/40 font-black text-[9px] uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_6px_#10b981]" />
            Live Intelligence Feed
          </h3>
          
          <div className="space-y-1.5 font-mono text-[9px] md:text-[10px] leading-relaxed">
            <p className="text-white/30 flex gap-2 border-l border-gold/10 pl-2.5">
              <span className="text-gold/40 font-bold">[FEED_OK]</span>
              <span>Identity verified: <span className="text-white/60">{student?.name}</span> recognized inside base matrix.</span>
            </p>
            <p className="text-white/30 flex gap-2 border-l border-gold/10 pl-2.5">
              <span className="text-gold/40 font-bold">[LOAD_OK]</span>
              <span>Retrieving operational metrics... <span className="text-gold/70">{overallProgress}%</span> progress synchronized.</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}