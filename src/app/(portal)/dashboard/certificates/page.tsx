import { Suspense } from 'react';
import { Loader2, ShieldCheck, Award } from 'lucide-react';
import CertificatesList from '@/components/portal/CertificatesList';
import { cookies } from "next/headers";

// ⚡ Force dynamic rendering to prevent stale cached states
export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value || "guest";

  return (
    /* 📉 تقليص الـ padding العلوي والـ space-y لإلغاء أي تداخل أو ضخامة مفرطة */
    <div className="space-y-6 md:space-y-8 px-2 pt-4 pb-16 md:px-4 animate-in fade-in duration-500">
      
      {/* 🏛️ British Academy Header - Ultra-Compact Revision */}
      <div className="max-w-5xl mx-auto relative group p-5 md:p-8 rounded-2xl bg-navy border border-white/[0.03] overflow-hidden shadow-2xl">
        {/* Glows خافتة ومريحة */}
        <div className="absolute -left-20 -top-20 size-48 bg-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-all duration-700" />
        <div className="absolute -right-20 -bottom-20 size-48 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            {/* ترشيق الـ Container لـ p-3.5 والأيقونة لـ 26 */}
            <div className="p-3.5 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-xl text-gold shadow-[0_0_30px_rgba(212,175,55,0.08)] group-hover:scale-105 transition-transform duration-500 shrink-0">
              <Award size={26} strokeWidth={1.5} /> 
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck size={10} className="text-emerald-500" />
                  <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest">Verified Credentials</span>
                </div>
              </div>
              
              {/* تصغير الخط من text-6xl المتضخم إلى text-xl و text-2xl الأنيق والمريح */}
              <h1 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tight leading-none">
                British <span className="text-gold">Academy</span>
              </h1>
              <p className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.35em] italic">
                Official Certification Ledger
              </p>
            </div>
          </div>

          {/* Quick Stats Node - نسخة مرشقة ومحبوكة */}
          <div className="bg-white/[0.015] border border-white/[0.04] p-3 rounded-xl flex flex-col sm:items-end gap-1 shrink-0 font-mono">
             <p className="text-[7px] font-black text-gold/40 uppercase tracking-widest">Access Node: Abu Dhabi</p>
             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tight">
               SEC-ID: <span className="text-gold">{userId.slice(0, 12).toUpperCase()}</span>
             </p>
          </div>
        </div>
      </div>

      {/* 🔄 المحرك التكتيكي لجلب البيانات - تم تقليل الـ max-w لـ max-w-5xl ليتناسق بصرياً */}
      <div className="max-w-5xl mx-auto relative">
        <Suspense 
          key={userId} 
          fallback={
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative mb-5">
                 <Loader2 className="animate-spin size-10 text-gold/30" strokeWidth={1.5} />
                 <div className="absolute inset-0 blur-xl bg-gold/10 animate-pulse" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.5em] animate-pulse text-gold/50">
                Decrypting Certificates...
              </p>
            </div>
          }
        >
          <CertificatesList userId={userId} />
        </Suspense>
      </div>

    </div>
  );
}