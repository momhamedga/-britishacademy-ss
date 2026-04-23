"use client";
import { useActionState, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ShieldCheck, Loader2, UserPlus, Fingerprint, Cpu } from 'lucide-react';
import { loginToPortal } from '@/actions/portal-auth';
import Link from 'next/link';

export default function PortalLoginPage() {
  const [state, formAction, isPending] = useActionState(loginToPortal, null);
  const [isDetected, setIsDetected] = useState(false);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDetected(e.target.value.toUpperCase().startsWith('BA-'));
  };

  return (
    // ⚪ خلفية بيضاء نظيفة مع التوسيط المطلق
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden px-4 py-8 ">
      
      {/* 🌌 Background Elements - Soft Accents */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-slate-200/[0.3] bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
        {/* هالة ضوئية ناعمة تتفاعل مع الإدخال */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[500px] h-[280px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] transition-all duration-1000 ${isDetected ? 'bg-gold/20' : 'bg-slate-100'}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        // تصغير عرض الفورم في الموبايل ليكون ملموم أكتر
        className="relative z-10 w-full max-w-[360px] md:max-w-[420px]"
      >
        {/* Main Card - Navy & Gold Theme */}
        <div className="relative bg-navy p-6 md:p-10 rounded-[1.8rem] md:rounded-[2.5rem] border border-white/5 backdrop-blur-[30px] shadow-2xl overflow-hidden group transition-all duration-500">
          
          {/* Scanning Line */}
          <AnimatePresence>
            {isDetected && (
              <motion.div 
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent z-20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Header Section */}
          <div className="text-center mb-6 md:mb-8 relative">
            <motion.div 
              animate={isDetected ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-14 h-14 md:w-20 md:h-20 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 relative overflow-hidden shadow-2xl"
            >
              <div className={`absolute inset-0 transition-opacity duration-700 ${isDetected ? 'opacity-100' : 'opacity-0'} bg-gold/10`} />
              <ShieldCheck className={isDetected ? "text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" : "text-white/30"} size={28} />
            </motion.div>
            
            <h1 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
              Login <span className="text-gold">now</span>
            </h1>
          </div>

          <form action={formAction} className="space-y-4 md:space-y-5">
            
            {/* ID Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Cpu size={10} /> Identity 
                </label>
                {isDetected && <span className="text-[8px] font-black text-gold animate-pulse tracking-widest uppercase">Verified</span>}
              </div>
              
              <div className="relative group/input">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isDetected ? 'text-gold' : 'text-white/20'}`} size={16} />
                <input 
                  required
                  name="studentId"
                  onChange={handleIdChange}
                  autoComplete="off"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl pl-12 pr-6 py-4 md:py-5 text-white text-sm focus:border-gold/40 focus:bg-white/[0.05] transition-all outline-none placeholder:text-white/10 uppercase font-black tracking-widest"
                  placeholder="BA-XXXX-XXX"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Access Key</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-gold transition-colors" size={16} />
                <input 
                  required
                  name="accessCode" 
                  type="password"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl pl-12 pr-6 py-4 md:py-5 text-white text-sm focus:border-gold/40 focus:bg-white/[0.05] transition-all outline-none placeholder:text-white/10 font-bold"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence mode="popLayout">
              {state?.error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 py-3 rounded-xl px-4 flex items-center gap-3 overflow-hidden"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <p className="text-red-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                    {state.error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={isPending}
              className="group relative w-full py-4 md:py-5 bg-gold text-navy font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px] rounded-xl md:rounded-2xl shadow-xl shadow-gold/10 overflow-hidden flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <Fingerprint size={18} />
                  <span>login in</span>
                </>
              )}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[45deg]" />
            </motion.button>
          </form>

          {/* Footer Actions */}
          <div className="mt-6 md:mt-8 pt-5 border-t border-white/5 space-y-4">
            <Link 
              href="/forgot-access" 
              className="text-[8px] md:text-[9px] text-white/30 hover:text-gold transition-colors uppercase font-black tracking-[0.2em] block text-center"
            >
              forget password ?
            </Link>

            <Link href="/register" className="block">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 border border-white/5 rounded-xl flex items-center justify-center gap-3 bg-white/5 hover:bg-white/[0.08] transition-all"
              >
                <UserPlus size={14} className="text-gold/50" />
                <span className="text-[9px] md:text-[10px] font-black text-white/60 uppercase tracking-[0.1em]">
                   New Student
                </span>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}