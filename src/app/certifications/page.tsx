import dynamic from 'next/dynamic';
import CertificationsHero from "@/components/certifications/CertificationsHero";

// 🚀 Dynamic Imports لتحسين الأداء وسرعة التحميل (Critical for 2026 Standards)
const CertificationsPricePage = dynamic(() => import("@/components/certifications/certificationsprice"), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50 rounded-[3rem] m-6" />
});

const CertificateVerification = dynamic(() => import("@/components/certifications/CertificateVerification"), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50 rounded-[3rem] m-6" />
});

export const metadata = {
  title: 'Accreditations | British Academy',
  description: 'Internationally recognized certifications and professional accreditations.',
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* 1. الـ Hero */}
      <CertificationsHero />

      {/* 2. حاوية المكونات - قللنا الـ gap لـ 4 بس عشان يلزقوا في بعض */}
      <div className="flex flex-col gap-4 md:gap-8">
        
        <section className="px-4 md:px-8 max-w-7xl mx-auto w-full">
           <CertificationsPricePage />
        </section>

  
        <section className="px-4 md:px-8 max-w-7xl mx-auto w-full pb-12">
           <CertificateVerification />
        </section>

      </div>
    </main>
  );
}