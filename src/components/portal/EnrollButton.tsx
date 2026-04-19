"use client";

import { useTransition } from 'react';
import { enrollInCourse } from '@/actions/academy-actions';
import { useRouter, usePathname } from 'next/navigation';
import { Sparkles, Loader2, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EnrollButton({ courseId, userId }: { courseId: string, userId?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleEnroll = () => {
    if (!userId) {
      router.push(`/register?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    startTransition(async () => {
      try {
        const result = await enrollInCourse(courseId);
        if (result?.success) {
          router.push('/dashboard/courses');
          router.refresh();
        } else if (result?.error) {
          // استبدال الـ alert بـ console أو toast مستقبلاً
          console.error(result.error);
        }
      } catch (err) {
        console.error("UPLINK DISRUPTED");
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative group"
    >
      <button 
        onClick={handleEnroll}
        disabled={isPending}
        className={`
          relative w-full py-6 md:py-5 rounded-[1.2rem] md:rounded-[1.5rem] 
          font-black uppercase italic tracking-[0.2em] 
          transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden text-[10px] md:text-[11px]
          ${!userId 
            ? 'bg-navy border border-gold/30 text-gold hover:bg-gold/5' 
            : isPending 
              ? 'bg-white/5 text-white/20 cursor-wait' 
              : 'bg-gold text-navy shadow-[0_20px_40px_rgba(212,175,55,0.2)] active:scale-95'
          }
        `}
      >
        <AnimatePresence mode="wait">
          {!userId ? (
            <motion.div 
              key="register"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-2"
            >
              <Lock size={12} className="text-gold/50" />
              <span>Register to Access</span>
              <ArrowRight size={12} className="opacity-40 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          ) : isPending ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <Loader2 className="animate-spin text-gold" size={16} />
              <span className="animate-pulse">Establishing Vector...</span>
            </motion.div>
          ) : (
            <motion.div 
              key="enroll"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <ShieldCheck size={16} />
              <span>Initialize Enrollment</span>
              <Sparkles size={14} className="animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📱 Mobile Optimized Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-navy/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        
        {isPending && (
          <motion.div 
            layoutId="shimmer"
            className="absolute inset-0 bg-white/5 animate-shimmer" 
          />
        )}
      </button>

      {/* Decorative Border Glow (Desktop only) */}
      {!isPending && userId && (
        <div className="hidden md:block absolute -inset-[1px] bg-gold opacity-0 group-hover:opacity-20 blur-md rounded-[1.5rem] transition-opacity -z-10" />
      )}
    </motion.div>
  );
}