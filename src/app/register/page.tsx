import { RegisterFormWrapper } from "@/components/portal/RegisterFormWrapper";
import RegisterHeader from "@/components/portal/RegisterHeader";

export default async function RegisterPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ callbackUrl?: string }> 
}) {
  const resolvedParams = await searchParams;
  const callbackUrl = resolvedParams.get?.('callbackUrl') || '/dashboard';

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 py-10">
      {/* الخلفية التكتيكية - Server Rendered */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.08),_transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

      <section className="relative z-10 w-full max-w-[540px]">
        <div className="glass p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
          <RegisterHeader />
          
          {/* هذا هو الجزء الوحيد الذي سيحمل كود JavaScript للمتصفح */}
          <RegisterFormWrapper callbackUrl={callbackUrl} />

          <div className="mt-10 text-center opacity-40">
            <p className="text-[7px] text-slate-400 font-bold tracking-[0.5em] uppercase italic">
              Abu Dhabi Central Node // System v4.0.2
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}