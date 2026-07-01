import SettingsForm from "@/components/portal/SettingsForm";
import { sql } from "@/lib/db";
import { UserCog, Target } from 'lucide-react';
import { cookies } from "next/headers";

// ⚡ Force dynamic rendering to prevent stale cached identification states
export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const studentIdText = cookieStore.get("user_id")?.value || cookieStore.get("auth_token")?.value; 

  if (!studentIdText) return null;

  const safeVector = studentIdText.length > 5 ? studentIdText.substring(1) : studentIdText;

  // 🎯 لقط الـ UUID الحقيقي والآمن للطالب أولاً بناءً على الكوكيز النصي لمنع جليتش الـ Refresh
  const studentCheck = await sql`
    SELECT id, student_id, name, rank, email 
    FROM public.students 
    WHERE student_id = ${studentIdText} 
       OR student_id LIKE ${'%' + safeVector}
       OR id::text = ${studentIdText}
    LIMIT 1
  `;
  
  const student = studentCheck[0];

  // 🛡️ حماية تكتيكية صارمة في حالة عدم وجود بيانات
  if (!student) {
    return (
      <div className="max-w-md mx-auto h-[35vh] flex items-center justify-center border border-dashed border-red-500/20 rounded-2xl bg-red-500/5 p-4 text-center">
        <p className="text-red-400 font-mono font-black tracking-widest uppercase text-[9px] animate-pulse">
          Critical Error: Personnel Identity Not Found inside Database Vector
        </p>
      </div>
    );
  }

  return (
    /* 🎯 السحر هنا: تفتيح الحاوية بـ max-w-xl وجعل كل المحتوى سنتر بالملي لراحة تامة للعين */
    <div className="max-w-xl mx-auto space-y-5 md:space-y-6 animate-in fade-in duration-500">
      
      {/* 🚀 Header Section - Centered Layout */}
      <div className="flex flex-col items-center text-center gap-3.5 pb-2 border-b border-white/[0.03]">
        
        {/* أيقونة مصغرة ومحبوكة في السنتر */}
        <div className="p-2 bg-gold/5 border border-gold/15 rounded-xl text-gold shrink-0">
          <UserCog size={16} />
        </div>

        <div className="space-y-1.5">
          <h1 className=" md:text-lg font-black text-white tracking-tight uppercase italic leading-none">
            Personnel <span className="text-gold">Settings</span>
          </h1>
        </div>

        {/* 🎖️ Operational Vector ID Badge - ممركز وصغير جداً */}
        <div className="flex flex-col items-center gap-1 mt-1 group">
          <div className="flex items-center gap-1">
            <Target size={8} className="text-gold/40" />
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Vector ID</span>
          </div>
          <div className="px-3 py-0.5 bg-navy border border-white/[0.04] rounded-md backdrop-blur-md flex items-center gap-1.5 transition-all duration-300 group-hover:border-gold/20">
            <div className="size-1 bg-gold rounded-full" />
            <code className="text-gold font-mono font-black text-[9px] tracking-wide">
              {student.student_id} 
            </code>
          </div>
        </div>
      </div>

      {/* 📝 Information Form Workspace - Centered and Compacted */}
      <div className="w-full  border border-white/[0.01] p-1 rounded-2xl">
        <SettingsForm key={student.id} initialData={student} studentId={student.id} />
      </div>

    </div>
  );
}