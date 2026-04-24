// @/components/portal/CertificatesList.tsx
import { sql } from "@/lib/db";
import CertificateCard from "@/components/portal/CertificateCard";
import { ShieldCheck, DatabaseZap } from 'lucide-react';
import { cookies } from "next/headers";

export default async function CertificatesList() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value || cookieStore.get("auth_token")?.value;

  if (!userId) {
    return (
      <div className="bg-navy border border-white/5 rounded-[2.5rem] p-20 text-center">
        <ShieldCheck className="mx-auto size-16 text-white/5 mb-6" />
        <p className="text-white/20 font-black uppercase tracking-[.6em] text-[10px]">Access Denied</p>
      </div>
    );
  }
  
  try {
    // 🛰️ الاستعلام التكتيكي المحدث بناءً على تعديلك
    const completedCourses = await sql`
      SELECT 
        cert.certificate_code,
        cert.issued_at,
        cert.certificate_url,
        c.title,
        c.category,
        s.name as student_name
      FROM public.certificates cert
      INNER JOIN public.students s ON cert.student_id::uuid = s.id::uuid
      INNER JOIN public.courses c ON cert.course_id::uuid = c.id::uuid
      WHERE cert.student_id = ${userId}
      ORDER BY cert.issued_at DESC
    `;

    if (!completedCourses || completedCourses.length === 0) {
      return (
        <div className="bg-navy border border-white/5 rounded-[2.5rem] p-20 text-center">
          <DatabaseZap className="mx-auto size-16 text-gold/5 mb-6" />
          <p className="text-gold/20 font-black uppercase tracking-[.6em] text-[10px]">No Certificates Found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000">
        {completedCourses.map((cert, index) => (
          // هنا الـ cert بقى جواه الـ certificate_url والـ title والـ student_name
          <CertificateCard key={index} data={cert} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("🔴 DB_FETCH_ERROR:", error);
    return (
      <div className="p-10 border border-red-500/10 bg-red-500/5 rounded-3xl text-red-400 text-[10px] font-black text-center uppercase tracking-[0.4em]">
        ⚠️ Critical Link Failure: Check Database Connection
      </div>
    );
  }
}