"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Shield, CheckCircle2 } from 'lucide-react';
import IdentityInput from './IdentityInput';
import SubmitButton from './SubmitButton';

export default function RegisterFormView({ formAction, isPending, state, callbackUrl }: any) {
  return (
    <form action={formAction} className="space-y-4 md:space-y-5">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {/* Name Input */}
      <div className="space-y-1.5 group">
        <label className="text-[8px] font-black text-white/40 uppercase tracking-widest ml-2 flex items-center gap-2 italic">
          <User size={10} /> Legal Name
        </label>
        <input 
          name="name" required placeholder="Full Personnel Name" 
          className="w-full bg-white/2 border border-white/10 rounded-xl md:rounded-2xl px-5 py-3.5 md:py-4 text-white text-sm outline-none focus:border-gold/40 transition-all font-bold italic placeholder:text-white/10" 
        />
      </div>

      {/* Email Input */}
      <div className="space-y-1.5 group">
        <label className="text-[8px] font-black text-white/40 uppercase tracking-widest ml-2 flex items-center gap-2 italic">
          <Mail size={10} /> Email Address
        </label>
        <input 
          name="email" type="email" required placeholder="pilot@british-academy.ae" 
          className="w-full bg-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl px-5 py-3.5 md:py-4 text-white text-sm outline-none focus:border-gold/40 transition-all font-bold italic placeholder:text-white/10" 
        />
      </div>

      {/* Grid Inputs: Identity & Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <IdentityInput isPending={isPending} />
        <div className="space-y-1.5">
          <label className="text-[8px] font-black text-white/40 uppercase tracking-widest ml-2 flex items-center gap-2 italic">
            <Lock size={10} /> Access Cipher
          </label>
          <input 
            name="password" type="password" required placeholder="••••••••" 
            className="w-full bg-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl px-5 py-3.5 md:py-4 text-white text-sm outline-none focus:border-gold/40 transition-all font-bold placeholder:text-white/10" 
          />
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {state?.error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-500/10 border border-red-500/20 py-3 rounded-xl flex items-center justify-center gap-2">
            <Shield size={12} className="text-red-400" />
            <p className="text-red-400 text-[9px] font-black uppercase italic tracking-wider">{state.error}</p>
          </motion.div>
        )}
        {state?.success && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gold/10 border border-gold/20 py-3 rounded-xl flex items-center justify-center gap-2">
            <CheckCircle2 size={12} className="text-gold animate-pulse" />
            <p className="text-gold text-[9px] font-black uppercase italic tracking-wider">Identity Verified. Syncing...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <SubmitButton isPending={isPending} />
    </form>
  );
}