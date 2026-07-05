"use client";
import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Cpu } from 'lucide-react';
import { updateSettings } from '@/actions/portal-auth';

export interface SettingsInitialData {
  id: string;
  student_id: string;
  name: string;
  rank: string;
  email: string;
}

export default function SettingsForm({ initialData }: { initialData: SettingsInitialData }) {
  const [state, formAction, isPending] = useActionState(updateSettings, null);

  return (
    /* 📉 ترشيق الـ max-w لـ max-w-xl ليلتحم بالكامل مع الصفحة الممركزه */
    <form action={formAction} className="w-full max-w-xl mx-auto animate-in fade-in duration-500">

      {/* 🛡️ تصغير الـ padding لـ p-6 والـ rounded لـ rounded-2xl لمنع الضخامة المفرطة */}
      <div className="relative bg-navy border border-white/3 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-3xl overflow-hidden group">
        
        {/* Glow حركي ذهبي هادئ */}
        <div className="absolute -top-24 -right-24 size-72 bg-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-colors duration-700" />
        
        <div className="relative z-10 space-y-5">
          
          {/* Header Module - Compact Size */}
          <div className="flex flex-col items-center text-center pb-4 border-b border-white/4">
            <div className="flex items-center gap-2 mb-2">
               <Cpu size={12} className="text-gold/60 animate-pulse" />
               <h2 className="text-[8px] font-black uppercase tracking-[0.3em] text-gold/60 italic">Identity Node</h2>
            </div>
            {/* تصغير الخط من text-7xl الضخم إلى text-xl و text-2xl الأنيق والمريح للعين */}
            <h2 className="text-xl md:text-2xl font-black text-white italic tracking-tight uppercase leading-tight">
              {initialData?.name?.split(' ')[0] || "Agent"}{" "}
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                {initialData?.name?.split(' ').slice(1).join(' ') }
              </span>
            </h2>
          </div>

          <div className="space-y-4 text-left">
            {/* Operational ID - Compact Section */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-500 pl-1">Assigned Vector ID</label>
              <div className="w-full bg-white/1.5 border border-white/4 rounded-xl px-4 py-3 flex items-center justify-between">
                <code className="text-gold/50 font-mono font-black text-[11px] tracking-wide italic">
                  {initialData?.student_id}
                </code>
                <Lock size={10} className="text-slate-600" />
              </div>
            </div>

            {/* Designation Name */}
            <div className="space-y-1.5 group/field">
              <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gold/60 pl-1">Full Designation</label>
              <input 
                name="name"
                type="text" 
                defaultValue={initialData?.name}
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-gold/30 transition-all text-xs uppercase italic bg-white/0.5"
              />
            </div>

            {/* Access Cipher */}
            <div className="space-y-1.5 group/field">
              <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gold/60 pl-1">Access Cipher</label>
              <input 
                name="password"
                type="password" 
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-gold/30 transition-all text-xs tracking-widest bg-white/0.5"
                placeholder="••••••••••••••••"
              />
            </div>
          </div>

          {/* Action Button - Balanced Grid */}
          <div className="pt-2">
            <motion.button 
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isPending}
              className="w-full bg-white hover:bg-gold text-[#050a14] py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-300 shadow-md active:scale-95"
            >
              {isPending ? 'Syncing...' : 'Synchronize Identity'}
            </motion.button>

            {state?.error && (
              <p className="mt-3 text-center text-[9px] font-black uppercase tracking-widest text-red-400">
                {state.error}
              </p>
            )}
            {state?.success && (
              <p className="mt-3 text-center text-[9px] font-black uppercase tracking-widest text-emerald-400">
                {state.message}
              </p>
            )}
          </div>

        </div>
      </div>
    </form>
  );
}