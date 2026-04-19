import dynamic from 'next/dynamic';
import CertificationsHero from "@/components/certifications/CertificationsHero";
import { ShieldCheck, Award, QrCode } from 'lucide-react';

// 🚀 تحسين التحميل الديناميكي مع Skeleton احترافي لعام 2026
const CertificationsPricePage = dynamic(() => import("@/components/certifications/certificationsprice"), {
  loading: () => <div className="h-[500px] animate-pulse bg-white/40 rounded-[2.5rem] md:rounded-[4rem] border border-white m-4" />
});

const CertificateVerification = dynamic(() => import("@/components/certifications/CertificateVerification"), {
  loading: () => <div className="h-[400px] animate-pulse bg-white/40 rounded-[2.5rem] md:rounded-[4rem] border border-white m-4" />
});

export const metadata = {
  title: 'Accreditations | British Academy',
  description: 'Internationally recognized certifications and professional accreditations.',
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] overflow-x-hidden selection:bg-gold/20">
      
      {/* 1. 🖥️ Desktop Header / 📱 Mobile Floating Nav */}
      <CertificationsHero />

      {/* 📱 Mobile-Only: Quick Stats Bar (iOS Style) */}
      <div className="md:hidden flex justify-around p-6 bg-white border-b border-black/[0.02] -mt-8 relative z-20 rounded-t-[2.5rem] shadow-[-20px_0_40px_rgba(0,0,0,0.02)]">
         <div className="flex flex-col items-center gap-1">
            <ShieldCheck size={20} className="text-gold" />
            <span className="text-[9px] font-black uppercase opacity-40">Accredited</span>
         </div>
         <div className="w-[1px] h-8 bg-black/[0.05]" />
         <div className="flex flex-col items-center gap-1">
            <Award size={20} className="text-navy" />
            <span className="text-[9px] font-black uppercase opacity-40">Verified</span>
         </div>
         <div className="w-[1px] h-8 bg-black/[0.05]" />
         <div className="flex flex-col items-center gap-1">
            <QrCode size={20} className="text-navy" />
            <span className="text-[9px] font-black uppercase opacity-40">E-Vault</span>
         </div>
      </div>

      {/* 2. حاوية المكونات - هندسة الديسكتوب مقابل انسيابية الموبايل */}
      <div className="flex flex-col gap-4 md:gap-12 py-4 md:py-12 bg-inherit relative z-10">
        
        {/* Section 1: Pricing/Packages */}
        <section className="px-2 md:px-8 max-w-7xl mx-auto w-full group">
           <div className="md:group-hover:translate-y-[-10px] transition-all duration-700">
              <CertificationsPricePage />
           </div>
        </section>

        {/* Section 2: Verification Engine */}
        <section className="px-2 md:px-8 max-w-7xl mx-auto w-full pb-20 md:pb-32">
           <div className="relative">
              {/* Desktop Decorative Element */}
              <div className="hidden md:block absolute -left-20 top-1/2 -translate-y-1/2 opacity-5 rotate-90 text-[120px] font-black tracking-tighter text-navy select-none pointer-events-none">
                 AUTHENTIC
              </div>
              
              <CertificateVerification />
           </div>
        </section>

      </div>

      {/* 📱 Mobile: Minimalist Bottom Dock (iPhone Navigation Feel) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] z-50">
         <div className="bg-navy/90 backdrop-blur-3xl rounded-full p-2 border border-white/10 shadow-2xl flex items-center justify-between">
            <button className="flex-1 py-3 text-gold flex justify-center"><ShieldCheck size={22}/></button>
            <div className="w-[1px] h-6 bg-white/10" />
            <button className="flex-1 py-3 text-white/40 flex justify-center"><QrCode size={22}/></button>
            <div className="w-[1px] h-6 bg-white/10" />
            <button className="flex-1 py-3 text-white/40 flex justify-center"><Award size={22}/></button>
         </div>
      </div>

      {/* 🌫️ Global Ambient Overlay */}
      <div className="fixed inset-0 bg-[url('/assets/noise.png')] opacity-[0.015] pointer-events-none z-[100]" />
    </main>
  );
}