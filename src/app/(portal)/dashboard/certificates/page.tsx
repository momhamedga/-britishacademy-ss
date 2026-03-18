import { Suspense } from 'react';
import { Landmark, Loader2, ShieldCheck } from 'lucide-react';
import CertificatesList from '@/components/portal/CertificatesList';
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  // 🛰️ جلب الـ ID عشان نمرره كـ Key للـ Suspense 
  // ده بيضمن إن لو اليوزر اتغير، الـ Loading يظهر تاني والبيانات تتحدث
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value || "guest";

  return (
    <div className="space-y-10 p-4 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 lg:pb-0">
      
      {/* 🏛️ British Academy Header - Cinematic Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-10 relative overflow-hidden group">
        <div className="absolute -left-10 -top-10 size-40 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex items-end gap-5 relative z-10">
          <div className="p-4 bg-gold/10 border border-gold/20 rounded-[1.5rem] text-gold shadow-[0_0_40px_rgba(212,175,55,0.1)] group-hover:border-gold/40 transition-colors">
            <Landmark size={32} /> 
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={10} className="text-emerald-500" />
              <span className="text-[8px] font-black text-emerald-500/80 uppercase tracking-[0.3em]">Authenticity Verified</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
              British Academy
            </h1>
            <p className="text-gold/50 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] mt-1">
              Verified Intelligence Credentials
            </p>
          </div>
        </div>

        <div className="hidden md:block text-right opacity-30 group-hover:opacity-100 transition-opacity">
           <p className="text-[7px] font-mono text-slate-500 uppercase tracking-[0.5em]">Sector: Credentials // ID: {userId.slice(0,8)}</p>
        </div>
      </div>

      {/* 🔄 المحرك الذي يجلب البيانات - Suspense with Unique Key */}
      <Suspense 
        key={userId} 
        fallback={
          <div className="flex flex-col items-center justify-center py-32 text-gold/20">
            <div className="relative mb-6">
               <Loader2 className="animate-spin size-12 text-gold/40" />
               <div className="absolute inset-0 blur-xl bg-gold/20 animate-pulse" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[.6em] animate-pulse text-gold/40">
              Syncing Ledger Data...
            </p>
          </div>
        }
      >
        {/* مرر الـ userId للـ List عشان تضمن إنها تجيب بياناته هو */}
        <CertificatesList />
      </Suspense>
    </div>
  );
}