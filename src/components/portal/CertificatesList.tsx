"use client";
import { useEffect, useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // ✅ إضافة Link من next/link
import { DownloadCloud, Calendar, FileClock, ChevronRight } from 'lucide-react';
import { getStudentCertificates } from '@/actions/certificates';

export default function CertificatesList({ userId }: { userId: string }) {
  const [certs, setCerts] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

useEffect(() => {
  if (userId && userId !== "guest") {
    startTransition(async () => {
      const res = await getStudentCertificates(userId);
      console.log("DEBUG_RES:", res); // 👈 ده هيعرفنا لو الداتا جاية فاضية
      if (res.success && res.data) {
        setCerts(res.data);
      } else {
        console.warn("API_RETURNED_EMPTY_OR_FAILED");
      }
    });
  }
}, [userId]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-40">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold animate-pulse">Syncing Ledger Vectors...</span>
      </div>
    );
  }

  if (certs.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
        <FileClock size={40} className="text-slate-600 mx-auto" />
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">No Credentials Secured</h3>
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
            Complete your ongoing training modules to 100% to trigger automatic certification deployment.
          </p>
        </div>
        {/* زرار سريع للرجوع للكورسات */}
        <Link href="/dashboard/courses" className="inline-flex items-center gap-2 text-gold text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
          Browse Active Courses <ChevronRight size={14} />
        </Link>
      </div>
    );
  }

  return (
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
  {certs.map((cert, index) => (
    <motion.div
      key={cert.certificate_code}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100, delay: index * 0.1 }}
      className="p-8 bg-navy border border-white/[0.03] rounded-[2.5rem] flex flex-col justify-between gap-8 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden shadow-[0_20px_50px_rgba(2,6,23,0.4)] hover:shadow-[0_30px_60px_rgba(212,175,55,0.05)]"
    >
      {/* 🌌 تأثير الإضاءة الخلفية الفخم عند الـ Hover */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-gold/0 group-hover:bg-gold/[0.03] blur-[60px] rounded-full pointer-events-none transition-all duration-700" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-white/0 group-hover:bg-white/[0.01] blur-[60px] rounded-full pointer-events-none transition-all duration-700" />

      {/* 🛡️ خط جانبي مضيء يعطي إحساس بالـ Premium Identity */}
      <div className="absolute top-1/4 left-0 w-[2px] h-1/2 bg-gradient-to-b from-transparent via-gold/0 group-hover:via-gold/50 to-transparent transition-all duration-500" />

      <div className="space-y-5 relative z-10">
        <div className="flex items-center justify-between">
          {/* Badge التخصص بتصميم زجاجي حاد وعسكري */}
          <span className="text-[9px] font-black bg-gradient-to-r from-gold to-yellow-600 text-navy px-4 py-1.5 rounded-xl uppercase tracking-[0.2em] italic shadow-[0_4px_15px_rgba(212,175,55,0.2)]">
            {cert.category || "Security"}
          </span>
          
          {/* كود التحقق داخل إطار مخصص يعطي انطباع السرية */}
          <div className="bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-lg backdrop-blur-md">
            <span className="text-[10px] font-mono font-black text-gold/50 tracking-widest group-hover:text-gold transition-colors block">
              {cert.certificate_code}
            </span>
          </div>
        </div>

        {/* عنوان الدورة بخط ضخم وحاد */}
        <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter italic leading-none pt-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gold/80 transition-all duration-500">
          {cert.title}
        </h3>
      </div>

      {/* الجزء السفلي: التحكم والتاريخ */}
      <div className="flex items-center justify-between pt-5 border-t border-white/[0.05] gap-4 relative z-10">
        <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-400 transition-colors">
          <Calendar size={13} className="text-gold/40 group-hover:text-gold/60 transition-colors" />
          <span className="text-[10px] font-mono font-black uppercase tracking-widest">
            {cert.issued_at ? new Date(cert.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Pending'}
          </span>
        </div>

        {/* زرار التحميل التكتيكي الفخم */}
        {cert.certificate_url ? (
          <a
            href={cert.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/[0.02] hover:bg-gradient-to-r hover:from-gold hover:to-yellow-500 border border-white/10 hover:border-transparent text-white hover:text-navy rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95 group/btn"
          >
            <DownloadCloud size={14} className="group-hover/btn:scale-110 transition-transform" /> 
            <span>Download Asset</span>
          </a>
        ) : (
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest border border-dashed border-white/5 px-4 py-2 rounded-xl bg-white/[0.01]">
            Digital Version Only
          </span>
        )}
      </div>
    </motion.div>
  ))}
</div>
  );
}