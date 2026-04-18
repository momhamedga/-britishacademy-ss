// src/app/admin/login/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Zap } from 'lucide-react';

export default function AdminLogin() {
  const [pass, setPass] = useState('');
  const router = useRouter();
// داخل دالة handleLogin
const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  
  // سحب الباسورد من ملف البيئة
  const secretKey = process.env.NEXT_PUBLIC_ADMIN_SECRET;

  if (pass === secretKey) { 
    // وضع Cookie تنتهي بعد 24 ساعة
    document.cookie = "admin_session=authorized; path=/; max-age=86400; samesite=strict";
    router.push('/admin/courses');
  } else {
    alert("ACCESS_DENIED: INVALID_ENCRYPTION_KEY");
  }
};

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-white shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 size-48 bg-[var(--academy-gold)]/20 blur-[100px]" />
        
        <div className="text-center space-y-4 relative">
          <div className="size-20 bg-[var(--academy-navy)] text-[var(--academy-gold)] rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase italic tracking-tighter text-[var(--academy-navy)]">Admin_Uplink</h1>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em]">Identity_Verification_Required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative">
          <div className="relative group">
            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity" size={18} />
            <input 
              type="password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="ENTER_ENCRYPTION_KEY"
              className="w-full p-6 pl-16 bg-white/50 rounded-[1.5rem] outline-none border-2 border-transparent focus:border-[var(--academy-gold)] font-black text-[12px] tracking-widest transition-all"
            />
          </div>

          <button className="w-full py-6 bg-[var(--academy-navy)] text-[var(--academy-gold)] rounded-[1.5rem] font-black uppercase tracking-[0.5em] text-[12px] flex items-center justify-center gap-3 hover:shadow-2xl active:scale-95 transition-all">
            Unlock_System <Zap size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}