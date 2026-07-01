"use client";
import { motion } from "framer-motion";
import { Shield, Calendar, QrCode, Fingerprint, Download, Eye, Clock } from "lucide-react";

export default function MembershipCardClient({ profile }: { profile: any }) {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      
      {/* Section Title */}
      <div className="flex items-center gap-2 justify-center mb-4">
        <Shield size={13} className="text-gold/80" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Tactical Membership Badge</h2>
      </div>

      {/* 💳 Membership Card Layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, rotateY: 10 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        className="w-full aspect-[1.586/1] bg-navy border border-white/[0.04] rounded-2xl p-5 relative overflow-hidden shadow-2xl group"
      >
        <div className="absolute inset-0 bg-radial-to-tr from-transparent via-transparent to-gold/[0.01] pointer-events-none" />
        
        {/* --- Top Section --- */}
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-1">
            <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">Identity Feed</h4>
            <p className="text-[12px] font-black italic uppercase text-white tracking-tight">SIA Operational System</p>
          </div>
          <div className="w-9 h-7 bg-gradient-to-br from-gold/80 to-yellow-600 rounded-md p-1 border border-gold/30 shadow shrink-0">
            <div className="w-full h-[1px] bg-navy/20" />
          </div>
        </div>

        {/* --- Middle Section --- */}
        <div className="flex items-center gap-4 relative z-10 my-auto pt-4">
          <div className="size-12 bg-white/[0.015] border border-white/5 rounded-xl flex items-center justify-center text-gold/20 shrink-0">
            <Fingerprint size={24} />
          </div>
          <div className="space-y-0.5 overflow-hidden text-left">
            <span className="inline-block text-[7px] font-black bg-gradient-to-r from-gold to-yellow-600 text-navy px-2 py-0.5 rounded uppercase tracking-wider italic mb-0.5 shadow-sm">
              {profile.rank || "AGENT"}
            </span>
            <h3 className="text-base font-black uppercase text-white tracking-tight truncate max-w-[180px]">
              {profile.name}
            </h3>
            <p className="text-[8px] font-mono font-bold text-slate-500 tracking-wide truncate max-w-[180px]">
              {profile.email}
            </p>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="flex justify-between items-end relative z-10 pt-3 border-t border-white/[0.03] mt-4">
          <div className="grid grid-cols-2 gap-4 font-mono text-left">
            <div>
              <span className="block text-[6px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Clearance Code</span>
              <span className="text-[9px] font-bold text-slate-300 tracking-wide">{profile.access_code || "UNKNOWN"}</span>
            </div>
            <div>
              <span className="block text-[6px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Issue Date</span>
              <span className="text-[9px] font-bold text-slate-300 tracking-wide flex items-center gap-1">
                <Calendar size={8} className="text-gold/30" />
                {profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'JUL 2026'}
              </span>
            </div>
          </div>
          <QrCode size={26} strokeWidth={1.2} className="text-white opacity-20 shrink-0" />
        </div>
      </motion.div>

      {/* 🎯 إدارة الأزرار الذكية التكتيكية بناءً على حالة الرفع */}
      {profile.membership_card_url ? (
        <div className="grid grid-cols-2 gap-3 mt-3 w-full">
          {/* 👁️ زر عرض واستعراض بطاقة العضوية */}
          <a 
            href={profile.membership_card_url} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-white/[0.02] border border-white/10 hover:border-white/30 rounded-xl font-black text-[10px] uppercase tracking-widest text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
          >
            <Eye size={12} />
            <span>View Card Vector</span>
          </a>

          {/* 📥 زر تحميل بطاقة العضوية فوراً */}
          <a 
            href={profile.membership_card_url} 
            download={`membership-card-${profile.student_id}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-navy border border-white/5 hover:border-gold/30 rounded-xl font-black text-[10px] uppercase tracking-widest text-gold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
          >
            <Download size={12} />
            <span>Download Card</span>
          </a>
        </div>
      ) : (
        /* 🛰️ الـ Placeholder الذكي لو الداتا لسه مرفعناش ليها ملف في الآدمن هب */
        <div className="mt-3 w-full p-4 bg-white/[0.015] border border-dashed border-white/10 rounded-xl text-center space-y-1">
          <div className="flex items-center gap-2 justify-center text-gold/60">
            <Clock size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-[9px] font-black uppercase tracking-widest font-mono">Awaiting Card Generation</span>
          </div>
          <p className="text-slate-500 text-[8px] font-medium uppercase tracking-wide">
            Your verification card layout is being reviewed by the operations command.
          </p>
        </div>
      )}

    </div>
  );
}