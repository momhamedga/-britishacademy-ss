import ContactHero from '@/components/contact/ContactHero';
import ContactGrid from '@/components/contact/ContactGrid';
import ContactForm from '@/components/contact/ContactForm';
import ContactMap from '@/components/contact/ContactMap';

// Metadata لضمان ظهور الصفحة بشكل احترافي في محركات البحث (SEO)
export const metadata = {
  title: 'Contact Mission Control | IAHS Academy',
  description: 'Connect with our strategic security experts in Dubai. Secure communications for elite training inquiries.',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen  overflow-hidden">
      
      {/* 1. الطبقة الخلفية الثابتة (Fixed Background Layer) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* تأثير الـ Grain السينمائي */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
        
        {/* توهج ذهبي خلفي (Ambient Glow) */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full" />
      </div>

      {/* 2. طبقة المحتوى (Content Layer) */}
      <div className="relative z-10">
        
        {/* الهيرو سيكشن - بتأثير البارالاكس والـ Typography الضخم */}
        <ContactHero />

        <section className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
          {/* Grid متطور: 12 عمود للتحكم الدقيق في التجاوب */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* الجانب الأيسر: معلومات الاتصال (عرض 5 أعمدة) */}
            <aside className="lg:col-span-5 order-2 lg:order-1">
              <div className="sticky top-32 space-y-10">
                <div className="space-y-4 px-2">
                  <h3 className="text-gold font-black uppercase tracking-[0.4em] text-[10px] italic">
                    Strategic Channels
                  </h3>
                  <div className="h-[2px] w-12 bg-gradient-to-r from-gold to-transparent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                </div>
                
                {/* استدعاء الـ Grid المطور المرتبط بالثوابت */}
                <ContactGrid />
                
                <div className="pt-6 border-t border-white/5 mx-2">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Encryption Status: <span className="text-emerald-500/80 animate-pulse">Active & Secure</span>
                  </p>
                </div>
              </div>
            </aside>
            
            {/* الجانب الأيمن: نموذج المراسلة (عرض 7 أعمدة) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ContactForm />
            </div>

          </div>
        </section>

        {/* سيكشن الخريطة - بتأثير الرادار والـ Dark Mode */}
        <ContactMap />
        
      </div>
    </main>
  );
}