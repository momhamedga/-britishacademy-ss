"use client"; // 🚀 أساسي لتشغيل الـ Click Events والـ Scrolling والـ Navigation

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import CertificationsHero from "@/components/certifications/CertificationsHero";
import { ShieldCheck, Award, QrCode } from 'lucide-react';

// 🚀 Dynamic Imports مع Skeleton احترافي لسرعة التحميل (LCP Optimization)
const CertificationsPricePage = dynamic(() => import("@/components/certifications/certificationsprice"), {
  loading: () => <div className="h-[500px] animate-pulse bg-white/40 rounded-[2.5rem] md:rounded-[4rem] border border-white m-4" />
});

const CertificateVerification = dynamic(() => import("@/components/certifications/CertificateVerification"), {
  loading: () => <div className="h-[400px] animate-pulse bg-white/40 rounded-[2.5rem] md:rounded-[4rem] border border-white m-4" />
});

export default function CertificationsPage() {
  // 1️⃣ إنشاء مراجع (Refs) للتحكم في التنقل البرمجي
  const pricingRef = useRef<HTMLDivElement>(null);
  const verifyRef = useRef<HTMLDivElement>(null);

  // 2️⃣ دالة الـ Scroll الناعم الموحدة
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    elementRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden selection:bg-gold/20 bg-[#FAFAFA]">
      
      {/* 1. Hero Section */}
      <CertificationsHero />

      {/* 📱 Mobile Quick Stats (Glassmorphism Style) */}
      <div className="md:hidden flex justify-around p-6 bg-white/80 backdrop-blur-md border-b border-black/[0.02] -mt-8 relative z-20 rounded-t-[2.5rem] shadow-[-10px_0_30px_rgba(0,0,0,0.03)]">
         <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck size={18} className="text-gold" />
            <span className="text-[8px] font-black uppercase tracking-tighter opacity-40">Accredited</span>
         </div>
         <div className="w-[1px] h-6 bg-black/[0.05]" />
         <div className="flex flex-col items-center gap-1.5">
            <Award size={18} className="text-navy" />
            <span className="text-[8px] font-black uppercase tracking-tighter opacity-40">Verified</span>
         </div>
         <div className="w-[1px] h-6 bg-black/[0.05]" />
         <div className="flex flex-col items-center gap-1.5">
            <QrCode size={18} className="text-navy" />
            <span className="text-[8px] font-black uppercase tracking-tighter opacity-40">E-Vault</span>
         </div>
      </div>

      {/* 2. Content Sections Container */}
      <div className="flex flex-col gap-4 md:gap-16 py-8 md:py-20 relative z-10">
        
        {/* Section 1: Pricing */}
        <section ref={pricingRef} className="px-2 md:px-8 max-w-7xl mx-auto w-full group scroll-mt-32">
           <div className="md:group-hover:translate-y-[-10px] transition-all duration-700 ease-out">
              <CertificationsPricePage />
           </div>
        </section>

        {/* Section 2: Verification */}
        <section ref={verifyRef} className="px-2 md:px-8 max-w-7xl mx-auto w-full pb-32 md:pb-48 scroll-mt-32">
           <div className="relative">
              {/* Decorative Text for Desktop */}
              <div className="hidden md:block absolute -left-24 top-1/2 -translate-y-1/2 opacity-[0.03] rotate-90 text-[140px] font-black tracking-tighter text-navy select-none pointer-events-none uppercase">
                 Authentic
              </div>
              <CertificateVerification />
           </div>
        </section>
      </div>

     
      {/* Noise Texture for Cinematic Feel */}
      <div className="fixed inset-0 bg-[url('/assets/noise.png')] opacity-[0.012] pointer-events-none z-[999]" />
    </main>
  );
}