"use client";
import { useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Shield } from 'lucide-react';
import { registerStudent } from '@/actions/portal-auth';
import RegisterHeader from '@/components/portal/RegisterHeader';
import IdentityInput from '@/components/portal/IdentityInput';
import SubmitButton from '@/components/portal/SubmitButton';



export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerStudent, null);

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.08),_transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-[540px]">
        <div className="glass p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
          
          <RegisterHeader />

          <form action={formAction} className="space-y-5">
            <div className="space-y-2 group">
              <label className="text-[8px] font-black text-gold/60 uppercase tracking-widest ml-2 flex items-center gap-2">
                <User size={10} /> Legal Designation
              </label>
              <input name="name" required placeholder="Full Personnel Name" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-gold/40" />
            </div>

            <div className="space-y-2 group">
              <label className="text-[8px] font-black text-gold/60 uppercase tracking-widest ml-2 flex items-center gap-2">
                <Mail size={10} /> Secure Uplink
              </label>
              <input name="email" type="email" required placeholder="pilot@british-academy.ae" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-gold/40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <IdentityInput isPending={isPending} />
              <div className="space-y-2">
                <label className="text-[8px] font-black text-gold/60 uppercase tracking-widest ml-2 flex items-center gap-2">
                  <Lock size={10} /> Access Cipher
                </label>
                <input name="password" type="password" required placeholder="••••••••" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-gold/40" />
              </div>
            </div>

            <AnimatePresence>
              {state?.error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-500/10 border border-red-500/20 py-3 rounded-xl flex items-center justify-center gap-2">
                  <Shield size={12} className="text-red-400" />
                  <p className="text-red-400 text-[9px] font-black uppercase italic">{state.error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <SubmitButton isPending={isPending} />
          </form>

          <div className="mt-10 text-center opacity-60">
            <p className="text-[7px] text-slate-700 font-bold tracking-[0.5em] uppercase">Abu Dhabi Central Node // 2026</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}