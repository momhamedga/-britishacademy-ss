"use client";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, Fingerprint, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* 🌌 Background Overlay with Blur & Darker Tint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-all"
      />

      {/* 🔍 Cinematic Scanning Laser Effect */}
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-red-600/40 shadow-[0_0_20px_rgba(220,38,38,0.8)] z-10 pointer-events-none"
      />

      {/* 🛸 The Security Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative z-20 w-full max-w-md p-8 md:p-12 border border-red-500/20 bg-gradient-to-b from-red-500/[0.05] to-transparent rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.1)]"
      >
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

        {/* Status Badge */}
        <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]" />
                <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.3em]">Restricted Sector</span>
            </div>
        </div>

        {/* Icon & Title */}
        <div className="text-center mb-10">
          <motion.div
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6 text-red-500"
          >
            <ShieldAlert size={64} strokeWidth={1} />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white mb-3 tracking-tighter">
            Access <span className="text-red-500">Denied</span>
          </h2>
          <p className="text-slate-400 text-[10px] md:text-xs leading-relaxed uppercase tracking-[0.15em] font-bold max-w-[280px] mx-auto opacity-70">
            Clearance Level Insufficient. Please initialize identity verification to proceed.
          </p>
        </div>

        {/* 🛠️ Action Hub */}
        <div className="flex flex-col gap-4 relative z-10">
          <Link href="/register">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full group bg-red-600 hover:bg-red-500 py-5 rounded-2xl text-white font-black uppercase italic text-xs tracking-[0.1em] transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(220,38,38,0.3)]"
            >
              <Fingerprint size={18} className="group-hover:animate-bounce" />
              Create Credentials
            </motion.button>
          </Link>

          <Link href="/login" className="flex items-center justify-center gap-2 py-2 group">
            <span className="text-white/40 group-hover:text-gold text-[10px] font-black uppercase tracking-[0.3em] transition-colors">
              Existing Operator Login
            </span>
            <ArrowRight size={12} className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center opacity-20">
            <div className="flex items-center gap-2">
                <Zap size={10} className="text-white" />
                <span className="text-[8px] font-mono text-white tracking-widest uppercase">Encryption: AES-256</span>
            </div>
            <span className="text-[8px] font-mono text-white tracking-widest uppercase">ID: UNKNOWN_NODE</span>
        </div>
      </motion.div>
    </div>
  );
}