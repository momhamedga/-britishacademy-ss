"use client"
import { useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Lock, User, ShieldCheck, Cpu, Fingerprint, Target, DatabaseZap, Activity } from 'lucide-react';
import { updateSettings } from '@/actions/portal-auth';

export default function SettingsForm({ initialData, studentId }: any) {
  const [state, formAction, isPending] = useActionState(updateSettings, null);

  return (
    <form action={formAction} className="w-full max-w-[650px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <input type="hidden" name="studentId" value={studentId} />
      
      {/* 🛡️ الكارت الـ Navy العميق - شغال "برنس" وسط الخلفية البيضا */}
      <div className="relative bg-navy border border-white/5 rounded-[3rem] md:rounded-[4.5rem] p-8 md:p-14 shadow-[0_40px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl overflow-hidden group">
        
        {/* Glow حركي ذهبي */}
        <div className="absolute -top-24 -right-24 size-96 bg-gold/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-gold/15 transition-colors duration-1000" />
        
        <div className="relative z-10 space-y-10">
          
          {/* Header Module */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <Cpu size={14} className="text-gold animate-pulse" />
                 <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gold/80 italic">Identity Node</h2>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.8]">
                {initialData?.name?.split(' ')[0] || "Agent"} <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.2px rgba(255,255,255,0.15)' }}>
                  {initialData?.name?.split(' ').slice(1).join(' ') }
                </span>
              </h2>
            </div>
          </div>

          <div className="space-y-8">
            {/* Operational ID */}
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 ml-2">Assigned Vector ID</label>
              <div className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 flex items-center justify-between">
                <code className="text-gold/60 font-black text-xs tracking-widest font-mono italic">
                  {initialData?.student_id || studentId}
                </code>
                <Lock size={12} className="text-slate-700" />
              </div>
            </div>

            {/* Designation Name */}
            <div className="space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gold/60 ml-2">Full Designation</label>
              <input 
                name="name"
                type="text" 
                defaultValue={initialData?.name}
                className="w-full bg-navy border border-white/10 rounded-2xl px-6 py-5 text-white font-bold outline-none focus:border-gold/40 transition-all text-sm uppercase italic"
              />
            </div>

            {/* Access Cipher */}
            <div className="space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gold/60 ml-2">Access Cipher</label>
              <input 
                name="password"
                type="password" 
                className="w-full bg-navy border border-white/10 rounded-2xl px-6 py-5 text-white font-bold outline-none focus:border-gold/40 transition-all text-sm tracking-widest"
                placeholder="••••••••••••••••"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <motion.button 
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className="w-full bg-white hover:bg-gold text-[#050a14] py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.5em] transition-all duration-500 shadow-xl"
            >
              {isPending ? 'Syncing...' : 'Synchronize Identity'}
            </motion.button>
          </div>

        </div>
      </div>
    </form>
  );
}