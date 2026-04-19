"use client";
import { useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { requestPasswordReset } from '@/actions/portal-auth'; 
import { RecoveryForm } from '@/components/portal/recovery/RecoveryForm';
import { RecoverySuccess } from '@/components/portal/recovery/(RecoverySuccess';

export default function ForgotAccessPage() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, null);

  return (
    <main className="min-h-screen  w-full flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/5 blur-[120px] rounded-full animate-pulse" />

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-[460px]">
        <div className="glass p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 bg-navy backdrop-blur-3xl shadow-2xl overflow-hidden">
          
          {/* Global Back Button */}
          <Link href="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-gold transition-all mb-10 group outline-none">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-gold/10">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit to login</span>
          </Link>

          <AnimatePresence mode="wait">
            {state?.success ? (
              <RecoverySuccess email={state.email} />
            ) : (
              <RecoveryForm 
                formAction={formAction} 
                isPending={isPending} 
                state={state} 
              />
            )}
          </AnimatePresence>


        </div>
      </motion.div>
    </main>
  );
}