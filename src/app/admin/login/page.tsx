"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Zap, Loader2 } from 'lucide-react';
import { verifyAdminUplink } from '@/actions/portal-auth'; // ✅ استيراد الأكشن الآمن

export default function AdminLogin() {
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    startTransition(async () => {
      // 🛰️ استدعاء الفحص من السيرفر بأمان مطلق
      const res = await verifyAdminUplink(pass);
      
      if (res.success) {
        router.push('/admin/courses');
      } else {
        setError(res.error || "ACCESS_DENIED");
      }
    });
  };

  return (
    // 🛡️ تكتيك المساحة الموزونة والهروب من النيف بار الثابت فوق
    <main className="min-h-screen w-full flex justify-center relative overflow-hidden px-4 pt-28 pb-16 md:pt-40 bg-transparent">
      
      {/* 🌌 Background Elements - Soft Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-slate-200/[0.3] bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md h-fit relative z-10">
        <div className="w-full bg-navy p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {/* Top Glow Decor */}
          <div className="absolute -top-10 -left-10 size-32 bg-gold/10 blur-[50px] rounded-full pointer-events-none" />
          
          {/* Header Section */}
          <div className="text-center space-y-4 relative mb-8">
            <div className="size-16 md:size-20 bg-white/[0.03] border border-white/10 text-gold rounded-[1.8rem] flex items-center justify-center mx-auto shadow-xl">
              <Shield size={28} />
            </div>
            <h1 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter text-white">
              Admin_<span className="text-gold">Uplink</span>
            </h1>
            <p className="text-[9px] font-black opacity-30 text-white uppercase tracking-[0.3em]">Identity_Verification_Required</p>
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
                className="w-full p-5 pl-14 bg-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl text-white outline-none focus:border-gold/40 focus:bg-white/[0.05] font-black text-[12px] tracking-widest transition-all placeholder:text-white/10 placeholder:tracking-normal"
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