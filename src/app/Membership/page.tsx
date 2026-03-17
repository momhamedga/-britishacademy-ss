import MembershipHero from '@/components/membership/MembershipHero';
import MembershipAdvantages from '@/components/membership/MembershipAdvantages';
import MembershipBeneficiaries from '@/components/membership/MembershipBeneficiaries';
import MembershipCore from '@/components/membership/MembershipCore';

export const metadata = {
  title: 'IAHS Membership | Elite Professional Identity',
  description: 'Join the International Academy for Homeland Security and gain global recognition.',
};

export default function MembershipPage() {
  return (
    <main className="relative min-h-screen ">
      {/* 1. Global Cinematic Background Effects */}
      {/* تأثير إضاءة علوي ذهبي يربط الهيرو بما قبله */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#D4AF3705,transparent_50%)] pointer-events-none z-0" />
      {/* تأثير Noise خفيف لتوحيد ملمس الصفحة بالكامل */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none z-0" />

      {/* 2. Page Sections */}
      <div className="relative z-10 flex flex-col gap-0">
        <MembershipHero />
        
        {/* Core Section: يوضح المهمة والشهادات (المعلومات الجوهرية) */}
        <MembershipCore /> 
        
        {/* Advantages: شبكة الـ 10 مميزات (التفاصيل الكاملة) */}
        <MembershipAdvantages />
        
        {/* Beneficiaries: الفئات المستهدفة مع الصورة السينمائية */}
        <MembershipBeneficiaries />
      </div>

      {/* 3. Decorative Elements Between Sections */}
      <div className="absolute top-[20%] left-0 w-full h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(212,175,55,0.02)_0%,transparent_100%)] pointer-events-none" />
    </main>
  );
}