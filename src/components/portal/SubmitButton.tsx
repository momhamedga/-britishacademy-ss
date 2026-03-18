"use client";
import { motion } from 'framer-motion';
import { Loader2, Fingerprint, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <div className="space-y-4 w-full">
      {/* 🚀 Main Submit Button */}
      <motion.button 
        whileTap={{ scale: 0.97 }}
        disabled={isPending}
        className="group relative w-full py-5 bg-gold text-[#020617] font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl transition-all shadow-[0_20px_40px_-15px_rgba(212,175,55,0.3)] disabled:opacity-50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <div className="relative z-10 flex items-center justify-center gap-3">
          {isPending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <Fingerprint size={16} />
              <span>Initiate Enrollment</span>
            </>
          )}
        </div>
      </motion.button>

      {/* 🔐 Secondary Login Link */}
      {!isPending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-gold transition-colors group"
          >
            <span>Already have an identity?</span>
            <span className="text-gold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Access Terminal <ArrowRight size={10} />
            </span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}