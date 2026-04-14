"use client";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, Info } from 'lucide-react';
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
        setTimeout(() => setStatus('idle'), 5000);
    }
  }

  return (
    <div className="relative p-6 md:p-12 rounded-[2rem] bg-white border border-[oklch(25%_0.08_260)]/5 shadow-xl">
      {/* Header المصغر لتحسين المساحة في الموبايل */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[oklch(25%_0.08_260)]/5">
        <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
        <h2 className="text-[oklch(25%_0.08_260)] font-black text-[10px] uppercase tracking-[0.4em]">send us a message</h2>
      </div>

      <form action={handleAction} ref={formRef} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputGroup label="full name" name="user_name" placeholder="FULL NAME" />
          <InputGroup label="email address" name="user_email" type="email" placeholder="EMAIL ADDRESS" />
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black text-[oklch(45%_0.12_255)] uppercase tracking-widest ml-1 opacity-60">Objective</label>
          <select 
            required
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full h-14 bg-[oklch(98%_0.01_260)] border border-[oklch(25%_0.08_260)]/10 rounded-xl px-4 text-xs font-bold text-[oklch(25%_0.08_260)] outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,...")' }} // اختياري لـ Custom Arrow
          >
            <option value="">INQUIRY TYPE</option>
            {CONTACT_SUBJECTS.map(s => <option key={s.value} value={s.value}>{s.label.toUpperCase()}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black text-[oklch(45%_0.12_255)] uppercase tracking-widest ml-1 opacity-60">message</label>
          <textarea 
            name="message" required rows={3}
            className="w-full bg-[oklch(98%_0.01_260)] border border-[oklch(25%_0.08_260)]/10 rounded-xl px-4 py-4 text-xs font-bold text-[oklch(25%_0.08_260)] outline-none focus:border-[#D4AF37] transition-all resize-none"
            placeholder="HOW CAN WE ASSIST?"
          />
        </div>

        {/* زر الإرسال مع Feedback مدمج */}
        <div className="space-y-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={status === 'loading'}
            className={`w-full h-14 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${
                status === 'success' ? 'bg-emerald-500' : 'bg-[oklch(25%_0.08_260)]'
            }`}
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin text-[#D4AF37]" size={20} />
            ) : status === 'success' ? (
              <CheckCircle2 className="text-white" size={20} />
            ) : (
              <>
                <span className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-[10px]"> Send message</span>
                <Send size={14} className="text-[#D4AF37]" />
              </>
            )}
          </motion.button>

          {/* رسايل الحالة (Status Messages) - سريعة جداً في الرندر */}
          <div className="min-h-[20px]">
            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-600 text-[10px] font-bold text-center uppercase tracking-widest flex items-center justify-center gap-2">
                <CheckCircle2 size={12} /> we will respond within 24 bussiness hours.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest flex items-center justify-center gap-2">
                <AlertCircle size={12} /> Transmission Failed. Check your data and retry.
              </motion.p>
            )}
            {status === 'idle' && (
              <p className="text-[oklch(25%_0.08_260)]/30 text-[9px] font-bold text-center uppercase tracking-widest flex items-center justify-center gap-2">
                <Info size={10} /> british contact.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

const InputGroup = ({ label, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black text-[oklch(45%_0.12_255)] uppercase tracking-widest ml-1 opacity-60">{label}</label>
    <input 
      {...props} required
      className="w-full h-14 bg-[oklch(98%_0.01_260)] border border-[oklch(25%_0.08_260)]/10 rounded-xl px-4 text-xs font-bold text-[oklch(25%_0.08_260)] outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all placeholder:opacity-20"
    />
  </div>
);