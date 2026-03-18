import SettingsForm from "@/components/portal/SettingsForm";
import { sql } from "@/lib/db";

import { UserCog, ShieldCheck, Fingerprint } from 'lucide-react';

export default async function SettingsPage() {
  const STUDENT_ID = '4af3f081-0b21-44a5-a358-81904ce5854e';

  // جلب بيانات الطالب الحالية لعرضها كـ Default Values
  const data = await sql`
    SELECT name, rank, email 
    FROM students 
    WHERE id = ${STUDENT_ID} 
    LIMIT 1
  `;
  
  const student = data[0];

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gold/10 border border-gold/20 rounded-2xl text-gold">
          <UserCog size={30} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter italic">Personnel Settings</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Identity & Security Protocols</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Information Form */}
        <div className="lg:col-span-2 space-y-6">
          <SettingsForm initialData={student} studentId={STUDENT_ID} />
        </div>

        {/* Right Side: Security Status Card */}
        <div className="space-y-6">
          <div className="glass border border-gold/20 rounded-[2rem] p-6 relative overflow-hidden bg-gold/[0.02]">
             <div className="relative z-10">
                <div className="flex items-center gap-2 text-gold mb-4">
                   <ShieldCheck size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Trust Level</span>
                </div>
                <h3 className="text-white font-bold text-2xl mb-1 italic">{student?.rank || 'PRODIGY'}</h3>
                <p className="text-slate-500 text-[9px] uppercase tracking-widest leading-loose">
                   Your account is secured with end-to-end encryption. Rank is verified by the Academy.
                </p>
             </div>
             <Fingerprint className="absolute -right-4 -bottom-4 size-24 text-gold/5" />
          </div>

          <div className="glass border border-white/5 rounded-[2rem] p-6">
             <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">System Access</h4>
             <ul className="space-y-3">
                <li className="flex items-center justify-between text-[10px] font-bold">
                   <span className="text-slate-500 uppercase">2FA Auth</span>
                   <span className="text-emerald-500 uppercase">Active</span>
                </li>
                <li className="flex items-center justify-between text-[10px] font-bold">
                   <span className="text-slate-500 uppercase">Session Log</span>
                   <span className="text-gold uppercase">Secure</span>
                </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}