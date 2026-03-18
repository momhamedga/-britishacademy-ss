"use client"
import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, User, Lock, Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { registerStudent } from '@/actions/portal-auth';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerStudent, null);

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-navy/20">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.05),_transparent_70%)]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[500px] px-6"
      >
        <div className="glass p-10 md:p-14 rounded-[3rem] border border-white/5 bg-black/60 backdrop-blur-3xl shadow-2xl">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gold/20">
              <UserPlus className="text-gold" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight uppercase italic">New Cadet Enrollment</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2">Initialize System Identity</p>
          </div>

          <form action={formAction} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Legal Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-gold transition-colors" size={16} />
                <input name="name" required placeholder="Ex: Mohamed Gamal" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white text-sm focus:border-gold/30 focus:outline-none transition-all" />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Communication Vector (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-gold transition-colors" size={16} />
                <input name="email" type="email" required placeholder="pilot@academy.com" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white text-sm focus:border-gold/30 focus:outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Student ID Field */}
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Identity ID</label>
                <input name="studentId" required placeholder="BA-2026-XXX" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-gold/30 focus:outline-none transition-all" />
              </div>
              {/* Password Field */}
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Access Cipher</label>
                <input name="password" type="password" required placeholder="••••••" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-gold/30 focus:outline-none transition-all" />
              </div>
            </div>

            {state?.error && (
              <p className="text-red-400 text-[10px] font-black uppercase text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20 italic tracking-widest">
                ⚠ {state.error}
              </p>
            )}

            <button 
              disabled={isPending}
              className="w-full py-5 bg-gold text-navy font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-15px_rgba(212,175,55,0.3)]"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Initiate Enrollment"}
            </button>
          </form>

          <p className="mt-8 text-center text-[8px] text-slate-600 font-bold tracking-[0.4em] uppercase opacity-40">
            Secure Terminal System Identity: BA-REG-2026
          </p>
        </div>
      </motion.div>
    </main>
  );
}