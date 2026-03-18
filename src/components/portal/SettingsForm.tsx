"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCcw, Lock, User } from 'lucide-react';
import { updateSettings } from '@/actions/portal-auth';

export default function SettingsForm({ initialData }: any) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // دالة التعامل مع إرسال الفورم للـ Server Action
  async function handleAction(formData: FormData) {
    setLoading(true);
    setMessage('');
    
    try {
      const result = await updateSettings(formData);
      if (result.success) {
        setMessage('Identity protocol synchronized successfully.');
      } else {
        setMessage('Error: Protocol synchronization failed.');
      }
    } catch (error) {
      setMessage('Terminal Error: Connection lost.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleAction} className="space-y-6">
      <div className="glass border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8">
        
        {/* حقل الاسم - مربوط بـ Mohamed Gamal */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-1 flex items-center gap-2">
            <User size={12} /> Full Personnel Name
          </label>
          <input 
            name="name" // ضروري للـ Server Action
            type="text" 
            defaultValue={initialData?.name}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-gold/50 transition-all placeholder:text-white/10"
            placeholder="Enter your full name"
          />
        </div>

        {/* حقل الباسورد الجديد - لتعزيز أمن الـ Prodigy Member */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold ml-1 flex items-center gap-2">
            <Lock size={12} /> Access Password (Cipher)
          </label>
          <input 
            name="password"
            type="password" 
            placeholder="••••••••"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-gold/50 transition-all"
          />
          <p className="text-[8px] text-slate-500 uppercase tracking-widest ml-1 italic">Leave blank to keep current access code.</p>
        </div>

        {/* الرتبة - ثابتة للقراءة فقط بناءً على البيانات */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Current Designation</label>
          <div className="w-full bg-navy/40 border border-gold/10 rounded-2xl px-6 py-4 text-gold font-black italic uppercase tracking-widest text-sm flex justify-between items-center">
             <span>{initialData?.rank} Member</span>
             <div className="size-2 bg-gold rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]" />
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="pt-4 flex flex-col md:flex-row items-center gap-6">
          <button 
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-gold text-navy px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <RefreshCcw className="animate-spin" size={16} /> : <Save size={16} />}
            Synchronize Data
          </button>
          
          {message && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={`text-[10px] font-black uppercase tracking-widest ${message.includes('Error') ? 'text-red-400' : 'text-emerald-400'}`}
            >
              {message}
            </motion.span>
          )}
        </div>
      </div>
    </form>
  );
}