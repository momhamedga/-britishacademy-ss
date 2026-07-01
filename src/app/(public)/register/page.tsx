import { RegisterFormWrapper } from "@/components/portal/RegisterFormWrapper";
import RegisterHeader from "@/components/portal/RegisterHeader";

export default async function RegisterPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ callbackUrl?: string }> 
}) {
  const resolvedParams = await searchParams;
  const callbackUrl = resolvedParams.callbackUrl || '/dashboard';

  return (
    // 🛰️ تكتيك الهروب من التداخل: شيلنا items-center وضفنا pt-36 للديسك توب وpt-28 للموبايل
    <main className="min-h-screen w-full flex justify-center relative overflow-hidden px-4 pt-28 pb-16 md:pt-40 bg-transparent">
      
      {/* 🌌 Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-slate-200/[0.3] bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-slate-100/50 blur-[120px] rounded-full" />
      </div>

      {/* 🛡️ Section Container */}
      <section className="relative z-10 w-full max-w-[420px] md:max-w-[540px] flex flex-col items-center h-fit">
        
        {/* الكارت الأساسي: Navy مع Glassmorphism */}
        <div className="w-full bg-navy border border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
          
          {/* Edge Glow */}
          <div className="absolute -top-[10%] -right-[10%] w-32 h-32 bg-gold/10 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 w-full">
            {/* Header */}
            <RegisterHeader />

            {/* Form Wrapper */}
            <div className="relative mt-6 md:mt-8">
               <RegisterFormWrapper callbackUrl={callbackUrl} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}