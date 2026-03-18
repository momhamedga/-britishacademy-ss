"use client";
import { useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldAlert, Loader2, ArrowLeft, KeyRound, CheckCircle2, Satellite } from 'lucide-react';
import Link from 'next/link';
import { requestPasswordReset } from '@/actions/portal-auth'; 

export default function ForgotAccessPage() {
  // استخدام useActionState لربط الفورم بالأكشن
  const [state, formAction, isPending] = useActionState(requestPasswordReset, null);

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 py-8 ">
      
      {/* 🌌 Cinematic Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] z-0" />
      
      {/* Dynamic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/5 blur-[120px] rounded-full animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[460px]"
      >
        <div className="glass p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Back Button - تحسين المسافة للموبايل */}
          <Link href="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-gold transition-all mb-10 group outline-none">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-gold/10 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit to Terminal</span>
          </Link>

          <AnimatePresence mode="wait">
            {state?.success ? (
              /* ✅ Success State: Transmission Complete */
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-8 py-4"
              >
                <div className="relative flex justify-center">
                   <motion.div 
                     initial={{ scale: 0 }} 
                     animate={{ scale: 1 }} 
                     className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 relative z-10"
                   >
                     <CheckCircle2 className="text-green-400" size={48} />
                   </motion.div>
                   <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-green-400 font-black uppercase tracking-[0.3em] text-lg italic">Signal Dispatched</h3>
                  <p className="text-slate-400 text-[11px] font-medium leading-relaxed max-w-[280px] mx-auto">
                    A secure recovery packet has been sent to your uplink: <br/>
                    <span className="text-white font-bold block mt-2 text-xs bg-white/5 py-2 rounded-lg border border-white/5">{state.email}</span>
                  </p>
                </div>

                <Link href="/login" className="block w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white/10 hover:border-gold/30 transition-all active:scale-[0.98]">
                  Return to Access Point
                </Link>
              </motion.div>
            ) : (
              /* 📝 Request State: The Form */
              <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }} className="space-y-8">
                
                {/* Header */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/5 border border-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[inset_0_0_15px_rgba(212,175,55,0.05)]">
                    <Satellite className="text-gold animate-bounce" size={28} strokeWidth={1.5} />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic mb-3">Identity Recovery</h1>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.25em] leading-relaxed max-w-[300px] mx-auto">
                    Initiate deep-scan to retrieve <span className="text-gold">System ID</span> & <span className="text-gold">Access Cipher</span>
                  </p>
                </div>

                <form action={formAction} className="space-y-6">
                  <div className="space-y-3 group">
                    <label className="text-[9px] font-black text-gold/60 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                      <Mail size={12} /> Registered Uplink
                    </label>
                    <div className="relative">
                      <input 
                        required
                        name="email"
                        type="email"
                        placeholder="pilot@british-academy.ae"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-6 pr-6 py-5 text-white text-sm focus:border-gold/40 focus:bg-white/[0.07] transition-all outline-none placeholder:text-slate-700"
                      />
                    </div>
                  </div>

                  {state?.error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-red-500/5 border border-red-500/10 py-4 rounded-2xl px-5 flex items-center gap-3"
                    >
                      <ShieldAlert className="text-red-400 shrink-0" size={16} />
                      <p className="text-red-400 text-[10px] font-black uppercase tracking-wider leading-none">
                        Protocol Error: {state.error}
                      </p>
                    </motion.div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    disabled={isPending}
                    className="group relative w-full py-5 bg-gold text-[#020617] font-black uppercase tracking-[0.4em] text-[11px] rounded-2xl shadow-[0_20px_40px_-15px_rgba(212,175,55,0.3)] disabled:opacity-50 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {isPending ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          <KeyRound size={16} />
                          <span>Request Identity Link</span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Device Identifier */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[8px] text-slate-700 font-bold tracking-[0.6em] uppercase opacity-50">
              Terminal: BA-REC-2026 // AD-Node-01
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}