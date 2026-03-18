"use client"
import { useActionState, useEffect } from 'react'; // أضفنا useEffect لتنظيف الـ State
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Lock, User, ShieldCheck, Cpu, Fingerprint, Target } from 'lucide-react';
import { updateSettings } from '@/actions/portal-auth';

export default function SettingsForm({ initialData, studentId }: any) {
  const [state, formAction, isPending] = useActionState(updateSettings, null);

  // 🛡️ بروتوكول حماية: لو البيانات اتغيرت في السيرفر، الـ Form لازم يحس
  // استخدام key={initialData?.id} عند استدعاء المكون في الصفحة يضمن إعادة تشغيله
  
  return (
    <form action={formAction} className="relative group/form">
      {/* 🆔 تأمين الهوية عبر الـ Hidden Vector */}
      <input type="hidden" name="studentId" value={studentId} />
      
      <div className="absolute -inset-4 bg-gold/5 blur-[100px] opacity-0 group-hover/form:opacity-100 transition-opacity duration-1000" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative glass border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 overflow-hidden bg-[#020617]/40 backdrop-blur-3xl shadow-2xl"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] pointer-events-none" />

        <div className="relative z-10 space-y-8 md:space-y-10">
          
          {/* Header Module */}
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-3">
              <Cpu size={16} className="text-gold animate-pulse" />
              <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-white/80 italic">Core Identity Module</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <div className={`size-1 rounded-full animate-ping ${isPending ? 'bg-gold' : 'bg-emerald-500'}`} />
              <span className={`text-[7px] font-black uppercase tracking-widest ${isPending ? 'text-gold' : 'text-emerald-500'}`}>
                {isPending ? 'Syncing...' : 'System Online'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-8">
            
            {/* 🎖️ Operational ID (Read-Only) */}
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 flex items-center gap-2">
                <Target size={12} /> Assigned Operational ID
              </label>
              <div className="w-full bg-white/[0.01] border border-white/5 rounded-2xl px-6 py-4 flex items-center justify-between group-hover:border-gold/10 transition-colors">
                <code className="text-gold/50 font-black text-xs tracking-[0.2em] font-mono italic">
                  {initialData?.student_id || "IDENTIFYING..."}
                </code>
                <Lock size={12} className="text-slate-700" />
              </div>
            </div>

            {/* 👤 Designation Name */}
            <div className="space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gold/60 ml-1 flex items-center gap-2 group-focus-within/field:text-gold transition-colors">
                <User size={12} /> Personnel Full Designation
              </label>
              <div className="relative">
                <input 
                  name="name"
                  type="text" 
                  key={initialData?.name} // يضمن تحديث الحقل فور تغير البيانات من السيرفر
                  defaultValue={initialData?.name}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-white font-bold outline-none focus:border-gold/40 focus:bg-white/[0.05] transition-all placeholder:text-slate-800 text-sm md:text-base"
                  placeholder="Enter full designation name"
                />
                <div className="absolute inset-x-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent scale-x-0 group-focus-within/field:scale-x-100 transition-transform duration-700" />
              </div>
            </div>

            {/* 🔐 Access Cipher */}
            <div className="space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gold/60 ml-1 flex items-center gap-2 group-focus-within/field:text-gold transition-colors">
                <ShieldCheck size={12} /> Access Cipher (Security Key)
              </label>
              <div className="relative">
                <input 
                  name="password"
                  type="password" 
                  autoComplete="new-password"
                  placeholder="••••••••••••••••"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-white font-bold outline-none focus:border-gold/40 focus:bg-white/[0.05] transition-all text-sm tracking-widest"
                />
                <div className="absolute inset-x-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent scale-x-0 group-focus-within/field:scale-x-100 transition-transform duration-700" />
              </div>
              <p className="text-[7px] text-slate-600 uppercase tracking-widest font-black italic ml-1">
                Security Protocol: SHA-512 Hashing Enabled
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-8 flex flex-col md:flex-row items-center gap-6 border-t border-white/5">
            <motion.button 
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isPending}
              className="relative w-full md:w-auto overflow-hidden bg-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all disabled:opacity-50 group/btn"
            >
              <div className="absolute inset-0 bg-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              <div className="relative z-10 flex items-center justify-center gap-3 text-[#020617] transition-colors duration-500 group-hover/btn:text-white">
                {isPending ? <RefreshCcw className="animate-spin" size={16} /> : <Fingerprint size={16} />}
                <span>Synchronize Protocols</span>
              </div>
            </motion.button>
            
            <AnimatePresence>
              {(state?.message || state?.error) && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${state?.error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}
                >
                  <div className={`size-1.5 rounded-full ${state?.error ? 'bg-red-400' : 'bg-emerald-400'} animate-pulse shadow-[0_0_8px_currentColor]`} />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                    {state?.error ? 'Protocol Failure' : 'Success: Identity Synced'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </form>
  );
}