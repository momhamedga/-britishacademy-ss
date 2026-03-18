"use client"
import { useActionState, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Lock, User, ShieldCheck, Loader2, UserPlus } from 'lucide-react';
import { loginToPortal } from '@/actions/portal-auth';
import Link from 'next/link';

export default function PortalLoginPage() {
  const [state, formAction, isPending] = useActionState(loginToPortal, null);
  
  // ⚡ حالة مراقبة الهوية لتغيير الأجواء البصرية
  const [isDetected, setIsDetected] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // دالة لمراقبة مدخلات الطالب وتفعيل الـ Identity Aura
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.toUpperCase().startsWith('BA-')) {
      setIsDetected(true);
    } else {
      setIsDetected(false);
    }
  };

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden group/main bg-[#020617]"
    >
      {/* Dynamic Background Aura */}
      <motion.div 
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        animate={{
          opacity: isDetected ? 0.6 : 0.3,
          background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, ${isDetected ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.1)'}, transparent 80%)`,
        }}
      />
      
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[440px] px-4"
      >
        <div className="p-8 md:p-12 rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          
          <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full transition-all duration-1000 ${isDetected ? 'bg-gold/30' : 'bg-gold/10'}`} />

          <div className="text-center mb-10">
            <motion.div 
              animate={isDetected ? { rotateY: 180, scale: 1.1 } : { rotateY: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
            >
              <ShieldCheck className="text-gold" size={30} strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-[10px] font-black text-gold uppercase tracking-[0.8em] mb-1 opacity-80">Secure Terminal</h2>
            <h1 className="text-2xl font-bold text-white tracking-tighter">STUDENT ACCESS</h1>
          </div>

          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Identity Vector</label>
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-gold transition-colors" size={16} />
                <input 
                  required
                  name="studentId"
                  onChange={handleIdChange}
                  autoComplete="off"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white text-sm focus:border-gold/30 focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-slate-700 uppercase"
                  placeholder="BA-XXXX-XXX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Access Cipher</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-gold transition-colors" size={16} />
                <input 
                  required
                  name="accessCode" 
                  type="password"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white text-sm focus:border-gold/30 focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {state?.error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 py-3 rounded-xl"
              >
                <p className="text-red-400 text-[10px] font-black uppercase text-center tracking-widest px-2">
                  ⚠ {state.error}
                </p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(212,175,55,0.2)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isPending}
              className="w-full py-5 bg-gold text-[#020617] font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <span className="relative z-10">Initiate Decryption</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center space-y-4">
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-[0.2em]">
              New Recruit?
            </p>
            <Link href="/register">
              <motion.div 
                whileHover={{ gap: '12px' }}
                className="flex items-center justify-center gap-2 text-gold group/link cursor-pointer"
              >
                <UserPlus size={14} className="group-hover/link:rotate-12 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-gold/20 pb-0.5 group-hover/link:border-gold transition-all">
                  Initialize Identity Vector
                </span>
              </motion.div>
            </Link>
          </div>

          <p className="mt-8 text-center text-[8px] text-slate-600 font-bold tracking-[0.3em] uppercase opacity-50">
            System Identity: BA-OS-2026
          </p>
        </div>
      </motion.div>
    </main>
  );
}