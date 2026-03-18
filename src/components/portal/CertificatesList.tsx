import { sql } from "@/lib/db";
import CertificateCard from "@/components/portal/CertificateCard";
import { ShieldCheck } from 'lucide-react';

export default async function CertificatesList() {
  const STUDENT_ID = '4af3f081-0b21-44a5-a358-81904ce5854e';
  
  try {
    // استعلام ليزر: جلب الشهادات والكورسات المرتبطة بها مباشرة
    const completedCourses = await sql`
      SELECT 
        c.title, 
        c.category, 
        cert.certificate_code, 
        cert.issued_at
      FROM certificates cert
      JOIN courses c ON cert.course_id = c.id
      WHERE cert.student_id = ${STUDENT_ID}
      ORDER BY cert.issued_at DESC
    `;

    if (!completedCourses || completedCourses.length === 0) {
      return (
        <div className="glass border border-white/5 rounded-[3rem] p-24 text-center bg-white/[0.01]">
          <ShieldCheck className="mx-auto size-20 text-white/5 mb-6" />
          <p className="text-white/20 font-black uppercase tracking-[.6em] text-[10px]">No Archived Credentials</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        {completedCourses.map((cert, index) => (
          <CertificateCard key={index} data={cert} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("CERT_FETCH_ERROR:", error);
    return (
      <div className="p-10 border border-red-500/10 bg-red-500/5 rounded-3xl text-red-500/40 text-[9px] font-mono text-center uppercase tracking-widest">
        CRITICAL_SYSTEM_LINK_FAILURE
      </div>
    );
  }
}