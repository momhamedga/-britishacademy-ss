import { RegisterFormWrapper } from "@/components/portal/RegisterFormWrapper";
import RegisterHeader from "@/components/portal/RegisterHeader";

export default async function RegisterPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ callbackUrl?: string }> 
}) {
  // فك التشفير عن البارامترز (Next.js 15 Standard)
  const resolvedParams = await searchParams;
  const callbackUrl = resolvedParams.callbackUrl || '/dashboard';

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden  px-4 py-12 md:py-20">
      
      {/* 🌌 الـ Base Layer: خلفية الصفحة الأساسية */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-gold/[0.03] bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_85%)]" />
        {/* المركز المضيء خلف الكارت */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <section className="relative z-10 w-full max-w-[580px] flex flex-col items-center justify-center">
        
        {/* 🛡️ الكارت الأساسي: تغيير للـ Navy مع الـ Glassmorphism */}
        <div className="w-full bg-navy border border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden group">
          
          {/* تأثير الـ Edge Glow الخفي */}
          <div className="absolute -top-[10%] -right-[10%] w-40 h-40 bg-gold/10 blur-[60px] rounded-full group-hover:bg-gold/20 transition-colors duration-700" />
          
          {/* محتوى الصفحة */}
          <div className="relative z-10 space-y-10">
            
            {/* Header: متوقع جواه العناوين اللي هنغير ألوانها */}
            <div className="text-center space-y-2">
              <RegisterHeader />
              {/* ملاحظة: تأكد إن RegisterHeader بيستخدم text-white للعنوان و text-gold للفرعي */}
            </div>

            {/* Form Wrapper: الكود التفاعلي */}
            <div className="relative">
               <RegisterFormWrapper callbackUrl={callbackUrl} />
            </div>

  
          </div>
        </div>



      </section>
    </main>
  );
}