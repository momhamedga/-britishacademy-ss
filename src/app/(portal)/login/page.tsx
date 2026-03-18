"use client"
import { useActionState, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ShieldCheck, Loader2, UserPlus, Fingerprint } from 'lucide-react';
import { loginToPortal } from '@/actions/portal-auth';
import Link from 'next/link';

export default function PortalLoginPage() {
  const [state, formAction, isPending] = useActionState(loginToPortal, null);
  const [isDetected, setIsDetected] = useState(false);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // تفعيل وضع "الهوية المكتشفة" عند البدء بكتابة الكود الخاص بالأكاديمية
    setIsDetected(e.target.value.toUpperCase().startsWith('BA-'));
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden  px-4 py-8">
      
      {/* 🌌 Background Elements - Optimized for Mobile Performance */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] md:bg-[size:40px_40px] z-0" />
      
      {/* Dynamic Background Aura */}
      <motion.div 
        animate={{ 
          opacity: isDetected ? [0.1, 0.3, 0.1] : 0.1,
          scale: isDetected ? [1, 1.2, 1] : 1 
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className={`absolute inset-0 z-0 transition-colors duration-1000 ${isDetected ? 'bg-gold/10' : 'bg-transparent'}`}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[420px]"
      >
        <div className="glass p-6 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl overflow-hidden">
          
          {/* Animated Decorative Corner */}
          <div className={`absolute -top-12 -right-12 w-32 h-32 blur-[60px] rounded-full transition-all duration-1000 ${isDetected ? 'bg-gold/40' : 'bg-gold/5'}`} />

          {/* Header Section */}
          <div className="text-center mb-8 md:mb-10">
            <motion.div 
              animate={isDetected ? { 
                boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 20px rgba(212,175,55,0.4)", "0 0 0px rgba(212,175,55,0)"] 
              } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-14 h-14 md:w-16 md:h-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5"
            >
              <ShieldCheck className={isDetected ? "text-gold" : "text-white/20"} size={28} strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-[9px] font-black text-gold uppercase tracking-[0.6em] mb-1 opacity-70">Security Terminal</h2>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase italic">Access Decryption</h1>
          </div>

          <form action={formAction} className="space-y-5 md:space-y-6">
            {/* Identity Vector Input */}
            <div className="space-y-2">
              <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Vector</label>
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-gold transition-colors" size={14} />
                <input 
                  required
                  name="studentId"
                  onChange={handleIdChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl pl-12 pr-6 py-4 text-white text-sm focus:border-gold/40 focus:bg-white/[0.06] transition-all placeholder:text-slate-800 uppercase font-bold"
                  placeholder="BA-XXXX-XXX"
                />
              </div>
            </div>

            {/* Access Cipher Input */}
            <div className="space-y-2">
              <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Cipher</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-gold transition-colors" size={14} />
                <input 
                  required
                  name="accessCode" 
                  type="password"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl pl-12 pr-6 py-4 text-white text-sm focus:border-gold/40 focus:bg-white/[0.06] transition-all placeholder:text-slate-800"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {state?.error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/20 py-3 rounded-xl px-4"
                >
                  <p className="text-red-400 text-[9px] font-black uppercase text-center tracking-widest leading-relaxed">
                    ⚠ Unauthorized Access: {state.error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={isPending}
              className="w-full py-4 md:py-5 bg-gold text-[#020617] font-black uppercase tracking-[0.3em] text-[10px] rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.15)] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <Fingerprint size={16} />
                    <span>Initiate Login</span>
                    
                </>
              )}
            </motion.button>
            {/* يوضع في صفحة الـ Login */}
<Link 
  href="/forgot-access" 
  className="text-[9px] text-slate-500 hover:text-gold transition-colors uppercase tracking-widest block text-center mt-4"
>
  Lost your Identity Vector (ID/Password)?
</Link>
          </form>

          {/* 🆕 Optimized "New Recruit" Button Area */}
          <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
            <div className="flex flex-col items-center gap-3">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">New Deployment?</span>
              
              <Link href="/register" className="w-full">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 group/reg transition-all hover:bg-white/10"
                >
                  <UserPlus size={14} className="text-gold group-hover/reg:scale-110 transition-transform" />
                  <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
                    Initialize Identity Vector
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-[7px] text-slate-700 font-bold tracking-[0.4em] uppercase opacity-40">
            Academy OS v.2.6 // Abu Dhabi Terminal
          </p>
        </div>
      </motion.div>
    </main>
  );
}