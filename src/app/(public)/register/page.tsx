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
    // ⚪ خلفية بيضاء مع التوسيط المطلق على كل الشاشات
    <main className="min-h-[100dvh]  w-full flex items-center justify-center relative overflow-hidden px-4 py-8 ">
      
      {/* 🌌 Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-slate-200/[0.3] bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-slate-100/50 blur-[120px] rounded-full" />
      </div>

      {/* 🛡️ Section Container: صغرنا العرض القصوى للموبايل */}
      <section className="relative z-10 w-full max-w-[400px] md:max-w-[540px] flex flex-col items-center justify-center">
        
        {/* الكارت الأساسي: Navy مع Glassmorphism */}
        <div className="w-full bg-navy border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
          
          {/* Edge Glow */}
          <div className="absolute -top-[10%] -right-[10%] w-32 h-32 bg-gold/10 blur-[50px] rounded-full" />
          
          <div className="relative z-10">
            {/* Header */}
            <RegisterHeader />

            {/* Form Wrapper */}
            <div className="relative">
               <RegisterFormWrapper callbackUrl={callbackUrl} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}