import { Suspense } from 'react';
import { Landmark, Loader2, ShieldCheck, DownloadCloud, Award } from 'lucide-react';
import CertificatesList from '@/components/portal/CertificatesList';
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value || "guest";

  return (
    // 🛡️ الخلفية Navy والـ Padding متناسق للموبايل
    <div className="min-h-screen space-y-12 p-5 md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-24 lg:pb-10 ">
      
      {/* 🏛️ British Academy Header - Ultra-Modern Revision */}
      <div className="relative group p-8 md:p-12 rounded-[2.5rem] bg-navy border border-white/5 overflow-hidden shadow-2xl">
        {/* Glows مستوحاة من الـ CertificationsHero */}
        <div className="absolute -left-20 -top-20 size-64 bg-gold/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-gold/15 transition-all duration-1000" />
        <div className="absolute -right-20 -bottom-20 size-64 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 rounded-[2rem] text-gold shadow-[0_0_50px_rgba(212,175,55,0.15)] group-hover:scale-105 transition-transform duration-500">
              <Award size={38} strokeWidth={1.5} /> 
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verified Credentials</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                British <span className="text-gold">Academy</span>
              </h1>
              <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] italic">
                Official Certification Ledger
              </p>
            </div>
          </div>

          {/* Quick Stats or ID */}
          <div className="bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex flex-col items-end gap-2">
             <p className="text-[9px] font-black text-gold/40 uppercase tracking-widest">Access Node: Abu Dhabi</p>
             <p className="text-[11px] font-mono text-white uppercase tracking-tighter">SEC-ID: {userId.slice(0,12).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* 🔄 المحرك الذي يجلب البيانات */}
      <div className="relative">
        {/* خط ديكوري طولي يشبه الـ Timeline */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-white/5 to-transparent hidden md:block" />

        <Suspense 
          key={userId} 
          fallback={
            <div className="flex flex-col items-center justify-center py-40">
              <div className="relative mb-8">
                 <Loader2 className="animate-spin size-16 text-gold/40" strokeWidth={1} />
                 <div className="absolute inset-0 blur-2xl bg-gold/20 animate-pulse" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[.8em] animate-pulse text-gold/60">
                Decrypting Certificates...
              </p>
            </div>
          }
        >
          <CertificatesList />
        </Suspense>
      </div>
    </div>
  );
}