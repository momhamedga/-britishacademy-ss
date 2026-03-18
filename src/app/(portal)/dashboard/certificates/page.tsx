import { Suspense } from 'react';
import { Landmark, Loader2 } from 'lucide-react';
import CertificatesList from '@/components/portal/CertificatesList';

export const dynamic = "force-dynamic";

export default function CertificatesPage() {
  return (
    <div className="space-y-10 p-6 md:p-10 animate-in fade-in duration-700">
      
      {/* 🏛️ British Academy Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-10">
        <div className="flex items-end gap-4">
          <div className="p-3.5 bg-gold/10 border border-gold/20 rounded-2xl text-gold shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <Landmark size={32} /> 
          </div>
          <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">British Academy</h1>
            <p className="text-gold/50 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Verified Intelligence Credentials</p>
          </div>
        </div>
      </div>

      {/* 🔄 المحرك الذي يجلب البيانات في الخلفية */}
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-24 text-gold/20">
          <Loader2 className="animate-spin size-10 mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[.5em] animate-pulse">Establishing Secure Link...</p>
        </div>
      }>
        <CertificatesList />
      </Suspense>
    </div>
  );
}