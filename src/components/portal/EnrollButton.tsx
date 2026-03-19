"use client";
import { useTransition } from 'react';
import { enrollInCourse } from '@/actions/academy-actions';
import { useRouter, usePathname } from 'next/navigation'; // أضفنا usePathname
import { Sparkles, Loader2, Lock, ArrowRight } from 'lucide-react';

export default function EnrollButton({ courseId, userId }: { courseId: string, userId?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname(); // للحصول على مسار الكورس الحالي ديناميكياً

  const handleEnroll = () => {
    // 🛡️ التكتيك: إذا كان زائراً، نرسله للتسجيل مع "تذكرة عودة" (callbackUrl)
    if (!userId) {
      router.push(`/register?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    startTransition(async () => {
      try {
        const result = await enrollInCourse(courseId);
        
        if (result?.success) {
          // نجاح العملية -> انتقال للوحة التحكم
          router.push('/dashboard/courses');
          router.refresh();
        } else if (result?.error) {
          // إظهار الخطأ (يمكنك استبدال alert بـ Toast لاحقاً)
          alert(result.error); 
        }
      } catch (err) {
        alert("CRITICAL: UPLINK DISRUPTED");
      }
    });
  };

  return (
    <button 
      onClick={handleEnroll}
      disabled={isPending}
      className={`
        relative w-full py-5 rounded-[1.5rem] font-black uppercase italic tracking-[0.15em] 
        transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden text-[11px]
        ${!userId 
          ? 'bg-white/[0.03] text-gold border border-gold/20 hover:bg-gold/10' 
          : isPending 
            ? 'bg-white/10 text-white/40 cursor-not-allowed' 
            : 'bg-gold text-black hover:scale-[1.02] shadow-[0_0_30px_rgba(212,175,55,0.2)]'
        }
      `}
    >
      {/* تأثير اللمعان الخلفي عند التحميل */}
      {isPending && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      )}

      {!userId ? (
        <> 
          <Lock size={14} className="opacity-70" /> 
          Authorize Access 
          <ArrowRight size={12} className="ml-1 opacity-40" />
        </>
      ) : isPending ? (
        <> 
          <Loader2 className="animate-spin" size={16} /> 
          Establishing Vector... 
        </>
      ) : (
        <> 
          Initialize Enrollment 
          <Sparkles size={16} /> 
        </>
      )}
    </button>
  );
}