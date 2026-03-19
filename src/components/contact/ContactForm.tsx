"use client"
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, Shield, Lock, Terminal, ChevronDown } from 'lucide-react';
import { CONTACT_SUBJECTS } from '@/lib/constants';
import { sendContactEmail } from '@/actions/contact';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    // إضافة قيمة الـ Select المخصص للـ FormData
    formData.set('subject', selectedSubject);
    
    setStatus('loading');
    setErrorMessage("");
    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus('success');
      formRef.current?.reset();
      setSelectedSubject("");
      setTimeout(() => setStatus('idle'), 6000);
    } else {
      setErrorMessage(result.message || "SIGNAL INTERRUPTED");
      setStatus('error');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full max-w-4xl mx-auto px-4 sm:px-0"
    >
      <div className="relative p-1 md:p-[1px] rounded-[2.5rem] bg-gradient-to-b from-navy/90 to-navy/98 overflow-hidden">
        
        <div className="p-6 sm:p-10 md:p-16 rounded-[2.5rem] bg-navy/40 backdrop-blur-2xl relative z-10 overflow-hidden">
          
          {/* 🔍 Scanline Animation */}
          <AnimatePresence>
            {status === 'loading' && (
              <motion.div 
                initial={{ top: "-10%" }} animate={{ top: "110%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-gold/10 to-transparent z-20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <SuccessView />
            ) : (
              <form action={handleAction} ref={formRef} className="space-y-10">
                
                {/* --- Form Header --- */}
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-gold uppercase tracking-[0.5em]">System_Online</span>
                    </div>
                    <h2 className="text-white/40 text-[9px] font-mono tracking-tighter italic">ENCRYPTION: AES-256 BIT ACTIVE</h2>
                  </div>
                  <Lock size={16} className="text-white/10" />
                </div>

                {/* --- Grid Inputs --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <CustomInput label="Operator ID" name="user_name" placeholder="E.G. JOHN DOE" icon={<Terminal size={14}/>} />
                  <CustomInput label="Secure Frequency" name="user_email" type="email" placeholder="AGENT@SECURE.COM" icon={<Shield size={14}/>} />
                </div>

                {/* --- Custom Modern Select --- */}
                <div className="space-y-4 relative">
                  <label className="text-[10px] font-black text-gold/60 uppercase tracking-[0.4em] ml-2 block">Inquiry_Sector</label>
                  
                  <div 
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className={`group w-full bg-white/[0.02] border ${isSelectOpen ? 'border-gold/50' : 'border-white/10'} rounded-2xl px-6 py-5 flex items-center justify-between cursor-pointer transition-all hover:bg-white/[0.05] active:scale-[0.99]`}
                  >
                    <span className={`font-mono text-sm ${selectedSubject ? 'text-white' : 'text-white/20'}`}>
                      {selectedSubject ? CONTACT_SUBJECTS.find(s => s.value === selectedSubject)?.label.toUpperCase() : "--- DEPLOYMENT SECTOR ---"}
                    </span>
                    <ChevronDown size={18} className={`text-gold/40 transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isSelectOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-50 left-0 right-0 mt-2 p-2 rounded-2xl bg-navy border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden"
                      >
                        {CONTACT_SUBJECTS.map((sub) => (
                          <div
                            key={sub.value}
                            onClick={() => { setSelectedSubject(sub.value); setIsSelectOpen(false); }}
                            className="px-4 py-3 rounded-xl text-white/60 hover:text-gold hover:bg-gold/5 transition-all text-xs font-mono uppercase tracking-widest cursor-pointer"
                          >
                            {sub.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* --- Textarea --- */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gold/60 uppercase tracking-[0.4em] ml-2 block">Mission_Briefing</label>
                  <textarea 
                    name="message" required rows={4}
                    placeholder="DESCRIBE THE SITUATION..."
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-6 text-white text-sm focus:border-gold/50 focus:bg-white/[0.05] outline-none transition-all resize-none font-mono placeholder:text-white/10"
                  />
                </div>

                {/* --- Submit Button --- */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                  className="w-full relative py-6 bg-gold text-[#050a18] font-black uppercase tracking-[0.8em] text-[12px] rounded-2xl shadow-[0_20px_40px_rgba(212,175,55,0.15)] group overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Send size={18} />}
                    {status === 'loading' ? 'TRANSMITTING...' : 'EXECUTE MISSION'}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                </motion.button>

              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

const CustomInput = ({ label, icon, ...props }: any) => (
  <div className="space-y-4 group">
    <label className="flex items-center gap-3 text-[10px] font-black text-gold/60 uppercase tracking-[0.4em] ml-2 transition-colors group-focus-within:text-gold">
      {icon} {label}
    </label>
    <div className="relative">
      <input 
        {...props} required
        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-white text-sm focus:border-gold/50 focus:bg-white/[0.04] outline-none transition-all font-mono placeholder:text-white/5"
      />
      <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-focus-within:opacity-100 blur-md transition-opacity pointer-events-none" />
    </div>
  </div>
);

const SuccessView = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
    className="py-20 flex flex-col items-center text-center space-y-8"
  >
    <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-2 border-dashed border-gold/20 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle2 size={56} className="text-gold" />
        </div>
        <div className="absolute inset-0 bg-gold/20 blur-[50px] rounded-full" />
    </div>
    <div className="space-y-2">
        <h3 className="text-4xl font-black text-white italic tracking-tighter">MISSION LOGGED</h3>
        <p className="text-gold/60 font-mono text-xs tracking-[0.3em]">ENCRYPTED DATA RECEIVED BY COMMAND</p>
    </div>
  </motion.div>
);