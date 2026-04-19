"use client";
import { motion } from 'framer-motion';
import { Mail, ShieldAlert, Loader2, KeyRound } from 'lucide-react';

interface RecoveryFormProps {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  state: any;
}

export const RecoveryForm = ({ formAction, isPending, state }: RecoveryFormProps) => {
  return (
    <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }} className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
          Identity <span className="text-gold">Recovery</span>
        </h1>
   
      </div>

      <form action={formAction} className="space-y-6">
        <div className="space-y-3">
          <label className="text-[9px] font-black text-gold/60 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
            <Mail size={12} /> Registered Uplink
          </label>
          <input 
            required name="email" type="email" placeholder="pilot@british-academy.ae"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white text-sm focus:border-gold/40 outline-none transition-all placeholder:text-slate-700 font-bold italic"
          />
        </div>

        {state?.error && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-red-500/5 border border-red-500/10 py-4 rounded-2xl px-5 flex items-center gap-3">
            <ShieldAlert className="text-red-400" size={16} />
            <p className="text-red-400 text-[10px] font-black uppercase italic tracking-wider">
              Protocol Error: {state.error}
            </p>
          </motion.div>
        )}

        <button disabled={isPending} className="group relative w-full py-5 bg-gold text-[#020617] font-black uppercase tracking-[0.4em] text-[11px] rounded-2xl overflow-hidden transition-all active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]">
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
        </button>
      </form>
    </motion.div>
  );
};