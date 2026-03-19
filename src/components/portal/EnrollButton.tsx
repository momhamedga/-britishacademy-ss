"use client"
import { useTransition } from 'react';
import { enrollInCourse } from '@/actions/academy-actions'; // تأكد من المسار الصحيح للأكشن
import { Sparkles, Loader2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EnrollButton({ courseId }: { courseId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // 🛡️ الـ UUID الثابت للطالب (سيتم استبداله لاحقاً بنظام Auth حقيقي)
  const STUDENT_UUID = '4af3f081-0b21-44a5-a358-81904ce5854e';

  const handleEnroll = () => {
    // 🚦 بداية عملية التسجيل التكتيكية
    startTransition(async () => {
      try {
        const result = await enrollInCourse(courseId, STUDENT_UUID);
        
        if (result?.success) {
          // 🎉 نجاح التسجيل - تحويل فوري للداشبورد مع "تطهير الكاش"
          router.push('/dashboard');
          router.refresh(); // مهم جداً عشان الأرقام تتحدث فوراً
        } else if (result?.error) {
          // ⚠️ عرض الخطأ (مثلاً: المسجل مسبقاً)
          alert(result.error); 
        }
      } catch (err) {
        console.error("Critical Connection Failure:", err);
        alert("TERMINAL ERROR: CONNECTION LOST");
      }
    });
  };

  return (
    <button 
      onClick={handleEnroll}
      disabled={isPending}
      className={`
        relative w-full py-5 rounded-2xl font-black uppercase italic tracking-widest 
        transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden
        ${isPending 
          ? 'bg-white/10 text-white/40 cursor-not-allowed' 
          : 'bg-gold text-[#020617] hover:bg-white hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(212,175,55,0.2)]'
        }
      `}
    >
      {/* تأثير لمعان (Shine Effect) عند التحميل */}
      {isPending && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine-slow" />
      )}

      {isPending ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          <span className="animate-pulse">Establishing Vector...</span>
        </>
      ) : (
        <>
          Initialize Enrollment
          <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
        </>
      )}
    </button>
  );
}