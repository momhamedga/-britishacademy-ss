"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ShieldCheck, FileText, Share2, Search, ArrowRight, Loader2, XCircle, CheckCircle2 } from 'lucide-react';
import { verifyCertificateAction } from "@/actions/academy-actions"; // تأكد من المسار

export default function CertificateVerification() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    if (!code) return;
    setStatus('loading');
    
    const response = await verifyCertificateAction(code);
    
    if (response.success) {
      setResult(response.certificate);
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 px-6  relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative rounded-[2.5rem] border border-slate-100 bg-[#F8FAFC] p-8 md:p-12 shadow-xl shadow-slate-200/50 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[oklch(75%_0.15_85)]/5 blur-3xl rounded-full -mr-20 -mt-20" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* 🛡️ Left: Features */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <FeatureItem icon={ShieldCheck} text="Instant Verification" />
                <FeatureItem icon={FileText} text="Digital PDF Certificate" />
                <FeatureItem icon={Share2} text="Share on LinkedIn" />
              </div>
            </div>

            {/* 🔍 Center: Input & Logic */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black italic uppercase text-[oklch(25%_0.08_260)] tracking-tight">
                  Verify Your <br/> <span className="text-[oklch(75%_0.15_85)]">certificate Authenticity</span>
                </h3>
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if(status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Enter certificate code..."
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-[oklch(75%_0.15_85)] transition-all shadow-sm group-hover:shadow-md"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                  {status === 'loading' ? <Loader2 size={18} className="animate-spin text-[oklch(75%_0.15_85)]" /> : <Search size={18} />}
                </div>
              </div>

              <button 
                onClick={handleVerify}
                disabled={status === 'loading' || !code}
                className="w-full bg-[oklch(25%_0.08_260)] text-white py-4 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-[#162a45] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? "Processing..." : "Verify Now"}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

            {/* 📊 Feedback Area */}
<AnimatePresence mode="wait">
  {status === 'success' && (
    <motion.div 
      initial={{ opacity: 0, height: 0 }} 
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-[2rem] space-y-4 relative overflow-hidden"
    >
      {/* Success Badge */}
      <div className="flex items-center gap-2 text-emerald-600">
        <CheckCircle2 size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest">Valid Credential</span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 text-[11px] border-b border-emerald-100/50 pb-4">
        <div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mb-1">Student</p>
          <p className="font-bold text-[oklch(25%_0.08_260)] uppercase leading-tight">{result?.student_name}</p>
        </div>
        <div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mb-1">Program</p>
          <p className="font-bold text-[oklch(25%_0.08_260)] leading-tight">{result?.course_title}</p>
        </div>
      </div>

      {/* 📥 زرار التحميل الجديد */}
      {result?.certificate_url && (
        <motion.a 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={result.certificate_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-emerald-500 text-white py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
        >
          <FileText size={14} />
          Download Digital Certificate
        </motion.a>
      )}

      {/* LinkedIn Share (Optional placeholder) */}
      <button className="w-full border border-slate-200 bg-white text-slate-600 py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
        <Share2 size={12} />
        Add to LinkedIn
      </button>
    </motion.div>
  )}

  {status === 'error' && (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600"
    >
      <XCircle size={16} />
      <span className="text-[10px] font-black uppercase tracking-widest">Invalid Certificate Code</span>
    </motion.div>
  )}
</AnimatePresence>

              <p className="text-[9px] text-center font-medium text-slate-400 italic">
                Or scan the QR Code printed on your certificate
              </p>
            </div>

            {/* 📱 Right: QR Status */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center">
              <div className="relative p-4 bg-white rounded-3xl border border-slate-100 shadow-inner group cursor-pointer">
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[oklch(75%_0.15_85)] rounded-tl-lg" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[oklch(75%_0.15_85)] rounded-br-lg" />
                <QrCode size={120} strokeWidth={1} className={`${status === 'success' ? 'text-emerald-500' : 'text-[oklch(25%_0.08_260)]'} transition-colors duration-500`} />
              </div>
              <span className={`mt-4 text-[8px] font-black uppercase tracking-[0.4em] ${status === 'loading' ? 'animate-pulse text-[oklch(75%_0.15_85)]' : 'text-slate-300'}`}>
                {status === 'loading' ? 'Syncing...' : 'System Online'}
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureItem({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <span className="text-sm font-black italic text-[oklch(25%_0.08_260)] uppercase tracking-tight">{text}</span>
    </div>
  );
}