import SettingsForm from "@/components/portal/SettingsForm";
import { sql } from "@/lib/db";
import { UserCog, ShieldCheck, Fingerprint, Target } from 'lucide-react';
import { cookies } from "next/headers";

export const revalidate = 0; // Force dynamic rendering

export default async function SettingsPage() {
const cookieStore = await cookies();
  
  // نتحقق من الكوكيز المتاحة بالترتيب
  const userId = cookieStore.get("user_id")?.value || cookieStore.get("auth_token")?.value; 

  const CURRENT_ID = userId || '4af3f081-0b21-44a5-a358-81904ce5854e';

  const data = await sql`
    SELECT id, student_id, name, rank, email 
    FROM students 
    WHERE id = ${CURRENT_ID} 
    LIMIT 1
  `;
  
  const student = data[0];

  // 🛡️ حماية في حالة عدم وجود بيانات
  if (!student) {
    return (
      <div className="h-[60vh] flex items-center justify-center border border-dashed border-red-500/20 rounded-[3rem] bg-red-500/5">
        <p className="text-red-400 font-black tracking-widest uppercase text-xs animate-pulse">
          Critical Error: Personnel Identity Not Found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🚀 Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gold/10 border border-gold/20 rounded-2xl text-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <UserCog size={30} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-navy tracking-tighter italic">Personnel Settings</h1>
          </div>
        </div>

        {/* 🎖️ Operational Vector ID Badge */}
        <div className="flex flex-col items-start md:items-end gap-2 group">
          <div className="flex items-center gap-2">
            <Target size={10} className="text-gold animate-pulse" />
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">student Vector ID</span>
          </div>
          <div className="px-5 py-2 bg-navy border border-white/10 rounded-xl backdrop-blur-md flex items-center gap-3 group-hover:border-gold/30 transition-all duration-500">
            <div className="size-1.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
            <code className="text-gold font-black text-sm tracking-[0.25em] font-mono">
              {student.student_id} 
            </code>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📝 Information Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* ✅ تم تغيير STUDENT_ID إلى CURRENT_ID ليتناسب مع المتغير الجديد */}
          <SettingsForm key={student.id} initialData={student} studentId={CURRENT_ID} />
        </div>

        {/* 🛡️ Status Cards */}
        <div className="space-y-6">
          <div className="glass border border-gold/20 rounded-[2rem] p-6 relative overflow-hidden bg-navy">
             <div className="relative z-10">
                <div className="flex items-center gap-2 text-gold mb-4">
                   <ShieldCheck size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Trust Level</span>
                </div>
                <h3 className="text-white font-bold text-2xl mb-1 italic uppercase">{student.rank || 'PRODIGY'}</h3>
                <p className="text-slate-500 text-[9px] uppercase tracking-widest leading-loose">
                   Your account is secured with end-to-end encryption. Rank is verified by the Academy.
                </p>
             </div>
             <Fingerprint className="absolute -right-4 -bottom-4 size-24 text-gold/5" />
          </div>


        </div>
      </div>
    </div>
  );
}