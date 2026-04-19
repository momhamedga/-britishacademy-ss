"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Shield, CheckCircle2 } from 'lucide-react';
import IdentityInput from './IdentityInput';
import SubmitButton from './SubmitButton';

export default function RegisterFormView({ formAction, isPending, state, callbackUrl }: any) {
  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="space-y-2 group">
        <label className="text-[8px] font-black text-gold/60 uppercase tracking-widest ml-2 flex items-center gap-2 italic">
          <User size={10} /> Legal 
        </label>
        <input 
          name="name" required placeholder="Full Personnel Name" 
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-gold/40 transition-all font-bold italic" 
        />
      </div>

      <div className="space-y-2 group">
        <label className="text-[8px] font-black text-gold/60 uppercase tracking-widest ml-2 flex items-center gap-2 italic">
          <Mail size={10} /> Email
        </label>
        <input 
          name="email" type="email" required placeholder="pilot@british-academy.ae" 
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-gold/40 transition-all font-bold italic" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <IdentityInput isPending={isPending} />
        <div className="space-y-2">
          <label className="text-[8px] font-black text-gold/60 uppercase tracking-widest ml-2 flex items-center gap-2 italic">
            <Lock size={10} /> Access Cipher
          </label>
          <input 
            name="password" type="password" required placeholder="••••••••" 
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-gold/40 transition-all font-bold" 
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state?.error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-500/10 border border-red-500/20 py-4 rounded-2xl flex items-center justify-center gap-2">
            <Shield size={14} className="text-red-400" />
            <p className="text-red-400 text-[10px] font-black uppercase italic tracking-wider">{state.error}</p>
          </motion.div>
        )}
        {state?.success && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gold/10 border border-gold/20 py-4 rounded-2xl flex items-center justify-center gap-2">
            <CheckCircle2 size={14} className="text-gold animate-pulse" />
            <p className="text-gold text-[10px] font-black uppercase italic tracking-wider">Identity Verified. Syncing...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <SubmitButton isPending={isPending} />
    </form>
  );
}