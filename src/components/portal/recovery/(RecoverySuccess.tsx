// components/portal/recovery/RecoverySuccess.tsx
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const RecoverySuccess = ({ email }: { email: string }) => (
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
        <span className="text-white font-bold block mt-2 text-xs bg-white/5 py-2 rounded-lg border border-white/5">{email}</span>
      </p>
    </div>

    <Link href="/login" className="block w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white/10 hover:border-gold/30 transition-all">
      Return to Access Point
    </Link>
  </motion.div>
);