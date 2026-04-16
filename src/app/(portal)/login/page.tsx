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
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden  px-4 py-8">
      
      {/* 🌌 Ultra-Modern Background Structure */}
      <div className="absolute inset-0 z-0 " >
        <div className="absolute  inset-0 bg-grid-gold/[0.02] bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
        {/* Dynamic Aura */}
        <div className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000 ${isDetected ? 'bg-gold/10' : 'bg-gold/5'}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[440px] "
      >
        {/* Main Tactical Card */}
        <div className="relative bg-navy glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5  backdrop-blur-[40px] shadow-2xl overflow-hidden group">
          
          {/* Scanning Line Effect (When Detected) */}
          <AnimatePresence>
            {isDetected && (
              <motion.div 
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute  left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent z-20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Header Section */}
          <div className="text-center mb-10 relative ">
            <motion.div 
              animate={isDetected ? { scale: [1, 1.05, 1], rotateY: [0, 10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden shadow-2xl"
            >
              <div className={`absolute inset-0 transition-opacity duration-500 ${isDetected ? 'opacity-100' : 'opacity-0'} bg-gold/10`} />
              <ShieldCheck className={isDetected ? "text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" : "text-white"} size={32} />
            </motion.div>
            
            <div className="space-y-1">

              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic drop-shadow-lg">Login <span className="text-gold">now</span></h1>
            </div>
          </div>

          <form action={formAction} className="space-y-6">
            
            {/* ID Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Cpu size={10} /> Identity 
                </label>
                {isDetected && <span className="text-[8px] font-black text-gold animate-pulse">VERIFIED FORMAT</span>}
              </div>
              
              <div className="relative group/input">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-500 ${isDetected ? 'text-gold' : 'text-white'}`} size={16} />
                <input 
                  required
                  name="studentId"
                  onChange={handleIdChange}
                  autoComplete="off"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-12 pr-6 py-5 text-white text-sm focus:border-gold/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-gold/5 transition-all outline-none placeholder:text-slate-600 uppercase font-black tracking-widest"
                  placeholder="BA-XXXX-XXX"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white uppercase tracking-widest px-1">Access Key</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white group-focus-within/input:text-gold transition-colors" size={16} />
                <input 
                  required
                  name="accessCode" 
                  type="password"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-12 pr-6 py-5 text-white text-sm focus:border-gold/50 focus:bg-white/[0.05] transition-all outline-none placeholder:text-slate-600"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {state?.error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/5 border border-red-500/20 py-4 rounded-2xl px-4 flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <p className="text-red-400 text-[10px] font-black uppercase tracking-widest">
                    Unauthorized: {state.error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={isPending}
              className="group relative w-full py-5 bg-gold text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-2xl shadow-[0_20px_40px_rgba(212,175,55,0.2)] overflow-hidden flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[45deg]" />
              {isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Fingerprint size={18} />
                  <span>Execute Auth</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Actions */}
          <div className="mt-10 pt-8 border-t border-white/5 space-y-6">
            <Link 
              href="/forgot-access" 
              className="text-[9px] text-white hover:text-gold transition-colors uppercase font-black tracking-[0.3em] block text-center"
            >
              forget your Identity ?
            </Link>

            <Link href="/register" className="block">
              <motion.button
                whileHover={{ bg: "rgba(255,255,255,0.05)" }}
                className="w-full py-4 border border-white/5 rounded-2xl flex items-center justify-center gap-3 group/reg transition-all"
              >
                <UserPlus size={14} className="text-gold/40 group-hover/reg:text-gold transition-colors" />
                <span className="text-[10px] font-black text-white group-hover/reg:text-white uppercase tracking-[0.2em]">
                   New Identity
                </span>
              </motion.button>
            </Link>
          </div>


        </div>
      </motion.div>
    </main>
  );
}