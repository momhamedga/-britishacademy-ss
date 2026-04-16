// @/components/portal/CertificateCard.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, DownloadCloud, Clipboard, ClipboardCheck, ShieldCheck, Calendar } from "lucide-react";

export default function CertificateCard({ data }: { data: any }) {
  const [copied, setCopied] = useState(false);

  // دالة النسخ الذكية
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.certificate_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-navy border border-white/10 rounded-[2.5rem] p-6 md:p-10 overflow-hidden group shadow-2xl transition-all duration-500"
    >
      <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full gap-6">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 bg-gold/10 border border-gold/20 w-fit px-3 py-1 rounded-full">
              <ShieldCheck size={10} className="text-gold" />
              <span className="text-[8px] md:text-[9px] font-black text-gold uppercase tracking-[0.2em]">{data.category}</span>
            </div>
            <h3 className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">
              {data.title}
            </h3>
          </div>
          <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-2xl text-gold shadow-xl">
            <Award size={24} className="md:w-7 md:h-7" />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/5">
          <div className="space-y-1">
            <p className="text-[7px] md:text-[8px] text-slate-500 uppercase font-black tracking-[0.3em]">Issue Date</p>
            <div className="flex items-center gap-2 text-white/80 font-bold text-[10px] md:text-xs text-nowrap">
               <Calendar size={12} className="text-gold" />
               {new Date(data.issued_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[7px] md:text-[8px] text-slate-500 uppercase font-black tracking-[0.3em]">Credentials ID</p>
            <p className="text-[10px] md:text-xs text-white/80 font-mono font-bold uppercase tracking-tighter truncate">
              {data.certificate_code}
            </p>
          </div>
        </div>

        {/* 🛠️ Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          {/* زر التحميل المرتبط بـ certificate_url */}
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={data.certificate_url || "#"} // الربط بـ URL الشهادة
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex-[2] py-4 rounded-xl font-black uppercase tracking-[0.15em] text-[9px] md:text-[10px] flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.15)] 
              ${data.certificate_url ? 'bg-gold text-[#050a14] hover:bg-gold/90' : 'bg-white/5 text-white/20 pointer-events-none'}`}
          >
            <DownloadCloud size={16} />
            {data.certificate_url ? "Download Digital Certificate" : "PDF Processing..."}
          </motion.a>
          
          {/* زر النسخ للتحقق اليدوي */}
          <motion.button 
            onClick={copyToClipboard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-white/5 text-white border border-white/10 py-4 rounded-xl font-black uppercase tracking-[0.15em] text-[9px] flex items-center justify-center gap-3 transition-all backdrop-blur-sm group"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2 text-emerald-400">
                  <ClipboardCheck size={16} /> Copied!
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                  <Clipboard size={16} className="text-gold group-hover:rotate-12 transition-transform" /> Copy ID
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <a href="/certifications" className="text-center text-[8px] font-black text-gold/30 hover:text-gold uppercase tracking-[0.4em] transition-colors">
          Go to verification portal →
        </a>
      </div>
    </motion.div>
  );
}