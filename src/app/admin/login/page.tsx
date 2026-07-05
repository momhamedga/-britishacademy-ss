"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Zap, Loader2, Home } from 'lucide-react';
import { verifyAdminUplink } from '@/actions/portal-auth'; 

export default function AdminLogin() {
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    startTransition(async () => {
      const res = await verifyAdminUplink(pass);
      
      if (res.success) {
        router.push('/admin/courses');
      } else {
        setError(res.error || "ACCESS_DENIED");
      }
    });
  };

  return (
    /* 🎯 السحر هنا: min-h-screen مع items-center يضمن سنترة الحاوية بالملي في وسط الشاشة تماماً رأسياً وأفقياً */
    <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4 bg-transparent">
      
      {/* 🌌 Background Elements - Soft Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-slate-200/30 bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-gold/5 blur-[120px] rounded-full" />
      </div>

      {/* 🎯 زر العودة للرئيسية - متجاوب، ممركز وثابت أفقياً فوق الكارت تماماً */}
      <div className="w-full max-w-xs md:max-w-md mb-4 relative z-10 flex justify-start">
        <button 
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/2 border border-white/5 text-slate-400 hover:text-gold hover:border-gold/20 transition-all text-[9px] font-black uppercase tracking-widest active:scale-95 shadow-md backdrop-blur-md"
        >
          <Home size={12} />
          <span>Return_Home</span>
        </button>
      </div>

      {/* 🎯 الحاوية: تم تكبير أبعاد العرض والارتفاع على الداتش كارد (md:max-w-md و p-10 md:p-14) لتعطي هيبة وضخامة، مع الانكماش بمرونة على الموبايل (max-w-xs) */}
      <div className="w-full max-w-xs md:max-w-md h-auto relative z-10">
        <div className="w-full bg-navy p-7 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {/* Top Glow Decor */}
          <div className="absolute -top-10 -left-10 size-32 bg-gold/10 blur-[50px] rounded-full pointer-events-none" />
          
          {/* Header Section */}
          <div className="text-center space-y-4 relative mb-8">
            <div className="size-16 md:size-20 bg-white/3 border border-white/10 text-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Shield size={26} />
            </div>
            <h1 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter text-white">
              Admin_<span className="text-gold">Uplink</span>
            </h1>
            <p className="text-[8px] md:text-[9px] font-black opacity-30 text-white uppercase tracking-[0.3em]">Identity_Verification_Required</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 relative">
            <div className="relative group/input">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-gold transition-colors" size={16} />
              <input 
                required
                type="password" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="ENTER_ENCRYPTION_KEY"
                className="w-full p-4 md:p-5 pl-14 bg-white/2 border border-white/10 rounded-xl md:rounded-2xl text-white outline-none focus:border-gold/40 focus:bg-white/5 font-black text-xs tracking-widest transition-all placeholder:text-white/10 placeholder:tracking-normal text-center"
              />
            </div>

            {/* Error Interface Feedback */}
            {error && (
              <div className="bg-error/10 border border-error/20 py-3 rounded-xl px-4 flex items-center gap-3 overflow-hidden">
                <div className="size-1.5 rounded-full bg-error" />
                <p className="text-error text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                  {error === "INVALID_ENCRYPTION_KEY" ? "KEY_DECRYPTION_FAILED" : error}
                </p>
              </div>
            )}

            {/* Action Trigger */}
            <button 
              disabled={isPending}
              className="w-full py-4 md:py-5 bg-gold text-navy rounded-xl md:rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-3 shadow-xl shadow-gold/5 hover:shadow-gold/10 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  <span>Unlock_System</span> <Zap size={14} fill="currentColor" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

    </main>
  );
}