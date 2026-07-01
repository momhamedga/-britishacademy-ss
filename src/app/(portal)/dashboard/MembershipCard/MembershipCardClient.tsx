"use client";
import { motion } from "framer-motion";
import { Shield, Calendar, QrCode, Wifi, Fingerprint } from "lucide-react";

export default function MembershipCardClient({ profile }: { profile: any }) {
  return (
    <div className="w-full max-w-xl mx-auto">
      
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <Shield size={16} className="text-gold" />
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Tactical Membership Badge</h2>
      </div>

      {/* 💳 Premium Cyberpunk Membership Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotateY: 15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 90 }}
        className="w-full aspect-[1.586/1] bg-navy border-2 border-white/[0.04] rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_30px_70px_rgba(2,6,23,0.8)] group transition-all duration-700 hover:border-gold/30 hover:shadow-[0_40px_80px_rgba(212,175,55,0.06)]"
        style={{ perspective: 1000 }}
      >
        {/* Neon Blur Glows */}
        <div className="absolute inset-0 bg-radial-to-tr from-transparent via-transparent to-gold/[0.02] pointer-events-none" />
        <div className="absolute -top-24 -right-24 size-56 bg-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-all duration-700" />
        <div className="absolute -bottom-24 -left-24 size-56 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        {/* Security Matrix Grid Lines */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-white/[0.02]" />

        {/* --- Card Top Section --- */}
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Secured Identity Feed</h4>
            </div>
            <p className="text-[15px] font-black italic uppercase text-white tracking-tighter">SIA Operational System</p>
          </div>

          {/* Golden Smart EMV Chip */}
          <div className="relative group-hover:scale-105 transition-transform duration-500">
            <div className="w-11 h-9 bg-gradient-to-br from-gold/80 to-yellow-600 rounded-lg p-1.5 flex flex-col justify-between border border-gold/40 shadow-[0_4px_15px_rgba(212,175,55,0.3)]">
              <div className="w-full h-[2px] bg-navy/30 rounded-full" />
              <div className="w-full h-3 border-t border-b border-navy/20" />
            </div>
            <Wifi size={12} className="absolute -right-5 top-2 text-gold/40 animate-pulse" />
          </div>
        </div>

        {/* --- Card Middle Section --- */}
        <div className="flex items-center gap-6 relative z-10 my-auto">
          {/* Virtual Fingerprint Scanner */}
          <div className="size-16 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center text-gold/30 group-hover:text-gold/60 group-hover:border-gold/20 transition-all duration-500 relative overflow-hidden backdrop-blur-md">
            <Fingerprint size={32} strokeWidth={1.2} className="animate-pulse" />
            <div className="absolute inset-x-0 h-[1px] bg-gold/40 top-0 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>

          <div className="space-y-1">
            <span className="inline-block text-[8px] font-black bg-gradient-to-r from-gold to-yellow-600 text-navy px-2.5 py-0.5 rounded-md uppercase tracking-widest italic mb-1 shadow-md">
              {profile.rank || "AGENT"}
            </span>
            <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight leading-none truncate max-w-xs group-hover:text-gold transition-colors duration-500">
              {profile.name}
            </h3>
            <p className="text-[9px] font-mono font-bold text-slate-500 tracking-wide truncate max-w-[200px] md:max-w-xs">
              {profile.email}
            </p>
          </div>
        </div>

        {/* --- Card Bottom Section --- */}
        <div className="flex justify-between items-end relative z-10 pt-4 border-t border-white/[0.04]">
          <div className="grid grid-cols-2 gap-6 font-mono">
            <div>
              <span className="block text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Clearance Code</span>
              <span className="text-[11px] font-bold text-slate-300 tracking-wider">
                {profile.access_code || "UNKNOWN"}
              </span>
            </div>
            <div>
              <span className="block text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Issue Date</span>
              <span className="text-[10px] font-bold text-slate-300 tracking-wider flex items-center gap-1">
                <Calendar size={10} className="text-gold/40" />
                {profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'JUL 2026'}
              </span>
            </div>
          </div>

          {/* Verification QR Code */}
          <div className="opacity-30 group-hover:opacity-60 transition-opacity duration-500">
            <QrCode size={36} strokeWidth={1.5} className="text-white" />
          </div>
        </div>

      </motion.div>
    </div>
  );
}