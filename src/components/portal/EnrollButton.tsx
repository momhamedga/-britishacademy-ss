"use client"
import { useTransition } from 'react';
import { enrollInCourse } from '@/actions/portal-auth'; // الأكشن اللي كتبناه سوا
import { Sparkles, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EnrollButton({ courseId }: { courseId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // الـ UUID الثابت بتاعك من قاعدة البيانات
  const STUDENT_UUID = '4af3f081-0b21-44a5-a358-81904ce5854e';

  const handleEnroll = () => {
    startTransition(async () => {
      const result = await enrollInCourse(courseId, STUDENT_UUID);
      
      if (result?.success) {
        // تحويل لليوزر للـ dashboard عشان يشوف الكورس الجديد
        router.push('/dashboard');
      } else if (result?.error) {
        alert(result.error);
      }
    });
  };

  return (
    <button 
      onClick={handleEnroll}
      disabled={isPending}
      className="px-10 py-5 bg-gold text-navy font-black uppercase italic tracking-widest rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Syncing Terminal...
        </>
      ) : (
        <>
          Enroll in Program
          <Sparkles size={18} />
        </>
      )}
    </button>
  );
}