"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, Info, ShieldCheck, User, Mail, MessageSquare, Zap } from 'lucide-react';
import { CONTACT_SUBJECTS } from '@/lib/constants';
import { sendContactEmail } from '@/actions/contact';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedSubject, setSelectedSubject] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    if (!selectedSubject) {
      setStatus('error');
      return;
    }
    formData.set('subject', selectedSubject);
    setStatus('loading');
    
    try {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setStatus('success');
        formRef.current?.reset();
        setSelectedSubject("");
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 6000);
    }
  }

  return (
    <div className="w-full relative">
      {/* 🖥️ DESKTOP VERSION: Command Center Interface */}
      <div className="hidden lg:block relative p-12 rounded-[3rem] bg-white border border-navy/5 shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <ShieldCheck size={120} className="text-navy" />
        </div>
        
        <FormHeader title="send us a message" />

        <form action={handleAction} ref={formRef} className="space-y-8 relative z-10">
          <div className="grid grid-cols-2 gap-6">
            <InputGroup icon={User} label="full name" name="user_name" placeholder="EX: JOHN DOE" />
            <InputGroup icon={Mail} label="email address" name="user_email" type="email" placeholder="EMAIL@DOMAIN.COM" />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.3em] ml-1">Objective</label>
            <div className="relative">
               <select 
                required
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full h-16 bg-[oklch(99%_0.01_260)] border border-navy/10 rounded-2xl px-6 text-[13px] font-bold text-navy outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">INQUIRY TYPE</option>
                {CONTACT_SUBJECTS.map(s => <option key={s.value} value={s.value}>{s.label.toUpperCase()}</option>)}
              </select>
              <Zap size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.3em] ml-1">message</label>
            <textarea 
              name="message" required rows={4}
              className="w-full bg-[oklch(99%_0.01_260)] border border-navy/10 rounded-2xl px-6 py-5 text-[13px] font-bold text-navy outline-none focus:border-[#D4AF37] transition-all resize-none"
              placeholder="HOW CAN WE ASSIST YOUR OPERATIONS?"
            />
          </div>

          <SubmitButton status={status} />
        </form>
      </div>

      {/* 📱 MOBILE VERSION: App-Like Native Interface */}
      <div className="lg:hidden bg-white rounded-[2.5rem] p-8 shadow-xl border border-navy/5 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              key="success-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 flex flex-col items-center text-center space-y-6"
            >
              <div className="size-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 ring-8 ring-emerald-500/5">
                 <CheckCircle2 size={48} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-navy uppercase italic">Transmission Received</h3>
                <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest leading-loose">
                  Our tactical team will respond <br /> within 24 business hours.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form-screen" exit={{ opacity: 0, y: -20 }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="size-10 rounded-xl bg-navy flex items-center justify-center text-[#D4AF37]">
                   <MessageSquare size={18} />
                </div>
                <h2 className="text-xs font-black text-navy uppercase tracking-[0.4em]">send message</h2>
              </div>

              <form action={handleAction} ref={formRef} className="space-y-6">
                <MobileInput label="full name" name="user_name" placeholder="YOUR NAME" />
                <MobileInput label="email address" name="user_email" type="email" placeholder="EMAIL ADDRESS" />
                
                <div className="space-y-2">
                   <select 
                    required
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full h-14 bg-navy/[0.03] border-none rounded-2xl px-5 text-xs font-black text-navy outline-none appearance-none"
                  >
                    <option value="">INQUIRY TYPE</option>
                    {CONTACT_SUBJECTS.map(s => <option key={s.value} value={s.value}>{s.label.toUpperCase()}</option>)}
                  </select>
                </div>

                <textarea 
                  name="message" required rows={3}
                  className="w-full bg-navy/[0.03] border-none rounded-2xl px-5 py-5 text-xs font-bold text-navy outline-none resize-none"
                  placeholder="HOW CAN WE ASSIST?"
                />

                <SubmitButton status={status} isMobile />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* 💠 SUB-COMPONENTS FOR REUSABILITY */

const FormHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-navy/5">
    <div className="size-3 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
    <h2 className="text-navy font-black text-[11px] uppercase tracking-[0.5em]">{title}</h2>
  </div>
);

const InputGroup = ({ label, icon: Icon, ...props }: any) => (
  <div className="space-y-3 group/input">
    <label className="text-[10px] font-black text-navy/40 uppercase tracking-[0.3em] ml-1 transition-colors group-focus-within/input:text-[#D4AF37]">{label}</label>
    <div className="relative">
      <input 
        {...props} required
        className="w-full h-16 bg-[oklch(99%_0.01_260)] border border-navy/10 rounded-2xl px-14 text-[13px] font-bold text-navy outline-none focus:border-[#D4AF37] transition-all placeholder:opacity-20"
      />
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within/input:text-[#D4AF37] transition-colors">
        <Icon size={18} strokeWidth={1.5} />
      </div>
    </div>
  </div>
);

const MobileInput = ({ label, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black text-navy/30 uppercase tracking-widest ml-1">{label}</label>
    <input 
      {...props} required
      className="w-full h-14 bg-navy/[0.03] border-none rounded-2xl px-5 text-xs font-bold text-navy outline-none placeholder:opacity-30"
    />
  </div>
);

const SubmitButton = ({ status, isMobile = false }: { status: string, isMobile?: boolean }) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    disabled={status === 'loading'}
    className={`w-full ${isMobile ? 'h-16 rounded-[1.8rem]' : 'h-18 rounded-2xl'} flex items-center justify-center gap-4 transition-all duration-500 shadow-xl ${
        status === 'success' ? 'bg-emerald-500' : 'bg-navy'
    }`}
  >
    {status === 'loading' ? (
      <Loader2 className="animate-spin text-[#D4AF37]" size={24} />
    ) : status === 'success' ? (
      <CheckCircle2 className="text-white" size={24} />
    ) : (
      <>
        <span className="text-[#D4AF37] font-black uppercase tracking-[0.5em] text-[11px]">Initiate Transmission</span>
        <Send size={16} className="text-[#D4AF37] -rotate-12 transition-transform group-hover:translate-x-1" />
      </>
    )}
  </motion.button>
);