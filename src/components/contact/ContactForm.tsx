"use client"
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { CONTACT_SUBJECTS } from '@/lib/constants';
import { sendContactEmail } from '@/actions/contact';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    setStatus('loading');
    setErrorMessage("");

    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus('success');
      formRef.current?.reset();
      setTimeout(() => setStatus('idle'), 6000);
    } else {
      setErrorMessage(result.message || "TRANSMISSION INTERRUPTED");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-5 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-[#020617]/40 backdrop-blur-2xl border border-white/5 shadow-2xl relative group overflow-hidden w-full max-w-4xl mx-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-6"
          >
            <div className="relative">
               <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full" />
               <CheckCircle2 size={60} className="text-gold relative z-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase tracking-widest italic">Mission Confirmed</h3>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Your briefing has been received successfully. Expect a response from our intelligence unit shortly.
              </p>
            </div>
          </motion.div>
        ) : (
          <form 
            key="form" 
            ref={formRef}
            action={handleAction}
            noValidate 
            className="relative z-10 space-y-6 md:space-y-10"
          >
            <AnimatePresence>
              {status === 'error' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-4 text-red-400">
                    <AlertCircle size={20} className="shrink-0" />
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black uppercase tracking-tighter">System Alert</span>
                       <span className="text-xs font-medium uppercase">{errorMessage}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gold uppercase tracking-[0.3em] ml-2">Full Identity</label>
                <input 
                  required 
                  name="user_name"
                  type="text" 
                  placeholder="AGENT FULL NAME" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 md:py-5 text-white text-sm focus:border-gold/50 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-700 font-medium" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gold uppercase tracking-[0.3em] ml-2">Secure Email</label>
                <input 
                  required 
                  name="user_email"
                  type="email" 
                  placeholder="ID@BRITISHACADEMY-SS.COM" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 md:py-5 text-white text-sm focus:border-gold/50 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-700 font-medium" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gold uppercase tracking-[0.3em] ml-2">Mission Objective</label>
              <div className="relative group/select">
                <select 
                  required
                  name="subject"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 md:py-5 text-white text-sm focus:border-gold/50 focus:outline-none transition-all appearance-none cursor-pointer font-medium"
                >
                  <option value="" className="bg-[#020617] text-slate-500">SELECT DEPARTMENT</option>
                  {CONTACT_SUBJECTS.map((sub) => (
                    <option key={sub.value} value={sub.value} className="bg-[#020617] text-white">
                      {sub.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold/40 group-focus-within/select:rotate-180 transition-transform">▼</div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gold uppercase tracking-[0.3em] ml-2">Strategic Briefing</label>
              <textarea 
                required
                name="message"
                rows={5} 
                placeholder="DESCRIBE YOUR MISSION REQUIREMENTS..." 
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 md:py-5 text-white text-sm focus:border-gold/50 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-slate-700 resize-none font-medium leading-relaxed" 
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-5 md:py-6 bg-gold text-[#020617] font-black uppercase tracking-[0.5em] text-[11px] rounded-2xl shadow-xl shadow-gold/5 hover:shadow-gold/20 transition-all flex items-center justify-center gap-4 disabled:opacity-50 overflow-hidden relative"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span className="animate-pulse">Processing Data...</span>
                </>
              ) : (
                <>
                  <span>Initiate Deployment</span>
                  <Send size={18} />
                </>
              )}
            </motion.button>
          </form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}