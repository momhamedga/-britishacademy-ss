"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { CONTACT_SUBJECTS } from '@/lib/constants';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // هنا سيتم ربط الـ API الخاص بالإرسال لاحقاً
    setTimeout(() => {
      setStatus('success');
      // إعادة النموذج للحالة الطبيعية بعد 5 ثوانٍ
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-2xl relative group overflow-hidden"
    >
      {/* زخرفة الخلفية - أيقونة الطائرة الورقية (إشارة للإرسال) */}
      <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000 pointer-events-none">
        <Send size={280} className="text-white rotate-12" />
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center py-16 text-center space-y-4"
          >
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest">Message Transmitted</h3>
            <p className="text-slate-500 text-sm max-w-[280px]">
              Your briefing has been sent to <strong>britishacademy-ss.online</strong>. We will contact you shortly.
            </p>
          </motion.div>
        ) : (
          <form key="form" onSubmit={handleSubmit} className="relative z-10 space-y-5 md:space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div className="space-y-2.5">
                <label className="text-[9px] md:text-[10px] font-black text-gold uppercase tracking-[0.3em] ml-2">Full Identity</label>
                <input 
                  required 
                  name="user_name"
                  type="text" 
                  placeholder="AGENT FULL NAME" 
                  className="w-full bg-navy-light/20 border border-white/5 rounded-xl md:rounded-2xl px-5 py-4 md:py-5 text-white text-sm focus:border-gold/40 focus:bg-navy-light/40 focus:outline-none transition-all placeholder:text-slate-600 font-medium" 
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[9px] md:text-[10px] font-black text-gold uppercase tracking-[0.3em] ml-2">Secure Email</label>
                <input 
                  required 
                  name="user_email"
                  type="email" 
                  // تحديث الـ Placeholder ليعكس الدومين الجديد
                  placeholder="ID@BRITISHACADEMY-SS.ONLINE" 
                  className="w-full bg-navy-light/20 border border-white/5 rounded-xl md:rounded-2xl px-5 py-4 md:py-5 text-white text-sm focus:border-gold/40 focus:bg-navy-light/40 focus:outline-none transition-all placeholder:text-slate-600 font-medium" 
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[9px] md:text-[10px] font-black text-gold uppercase tracking-[0.3em] ml-2">Mission Objective</label>
              <div className="relative">
                <select 
                  required
                  name="subject"
                  className="w-full bg-navy-light/20 border border-white/5 rounded-xl md:rounded-2xl px-5 py-4 md:py-5 text-white text-sm focus:border-gold/40 focus:outline-none transition-all appearance-none cursor-pointer font-medium"
                >
                  <option value="" className="bg-navy text-slate-500">SELECT DEPARTMENT</option>
                  {CONTACT_SUBJECTS.map((sub) => (
                    <option key={sub.value} value={sub.value} className="bg-navy text-white">
                      {sub.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold/40 text-[10px]">▼</div>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[9px] md:text-[10px] font-black text-gold uppercase tracking-[0.3em] ml-2">Strategic Briefing</label>
              <textarea 
                required
                name="message"
                rows={5} 
                placeholder="DESCRIBE YOUR REQUIREMENTS..." 
                className="w-full bg-navy-light/20 border border-white/5 rounded-xl md:rounded-2xl px-5 py-4 md:py-5 text-white text-sm focus:border-gold/40 focus:bg-navy-light/40 focus:outline-none transition-all placeholder:text-slate-600 resize-none font-medium" 
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'loading'}
              className="w-full py-5 md:py-6 bg-gold text-navy font-black uppercase tracking-[0.4em] text-[10px] md:text-xs rounded-xl md:rounded-2xl shadow-[0_20px_40px_rgba(212,175,55,0.1)] hover:shadow-gold/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group/btn"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <span>Initiate Deployment</span>
                  <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}