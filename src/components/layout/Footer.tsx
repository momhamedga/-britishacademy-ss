"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, ShieldCheck, Facebook, Twitter, Linkedin, Instagram, Globe, ArrowUpRight } from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/constants';
import Link from 'next/link';

// توحيد الألوان مع الهيرو وسكشن الكورسات (The Royal Palette)
const COLORS = {
  navy: "oklch(25% 0.08 260)",     // درجة الـ Navy الملكية الأساسية
  mediumBlue: "oklch(45% 0.12 255)", // درجة التوهج اللي استخدمناها في الكورسات
  gold: "#D4AF37",                 // الذهب الثابت معنا
};

export default function UnifiedTacticalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative mt-20 pt-24 pb-12 overflow-hidden border-t border-white/5"
      style={{ backgroundColor: COLORS.navy }} // نفس خلفية السكاشن اللي فوق
    >
      
      {/* 🌌 Atmospheric Background - الربط البصري مع الهيرو */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* توهج سفلي ناعم بنفس لون سكشن الكورسات */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ background: `radial-gradient(circle at 50% 100%, ${COLORS.mediumBlue}, transparent 70%)` }} 
        />
        {/* التدرج الخطي لدمج الفوتر مع الصفحة */}
        <div 
          className="absolute inset-0" 
          style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.navy})` }} 
        />
        {/* خط ذهبي رفيع جداً في الأعلى */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        <div className="flex flex-col items-center space-y-16">
          
          {/* 1. Identity Core - اللوجو المتفاعل */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center group"
          >
            {/* الحلقات الدوارة - متوافقة مع أنيميشن الهيرو */}
            <div className="absolute inset-0 -m-12 border border-[#D4AF37]/10 rounded-full animate-[spin_30s_linear_infinite] hidden md:block" />
            
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="relative p-7 md:p-11 rounded-[3.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl group-hover:border-[#D4AF37]/30 transition-all duration-700"
            >
              <Image 
                src="/logo.webp" 
                alt="Academy Logo" 
                width={85} 
                height={85} 
                className="brightness-125 md:w-[105px] md:h-[105px] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              />
            </motion.div>

            <div className="mt-8 text-center space-y-2">
              <h2 className="text-2xl md:text-5xl font-black text-white tracking-[0.1em] uppercase italic">
                BRITISH <span className="text-[#D4AF37]">ACADEMY</span>
              </h2>
              <p className="text-[7px] md:text-[9px] text-white/30 font-bold uppercase tracking-[0.6em]">
                Strategic Intelligence Intake
              </p>
            </div>
          </motion.div>

          {/* 2. Communication Hub - Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
            <Link href={`mailto:${CONTACT_CONFIG.email}`} className="group">
              <div className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl group-hover:border-[#D4AF37]/50 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                    <Mail size={14} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-white/40 group-hover:text-white transition-colors">{CONTACT_CONFIG.email}</span>
                </div>
                <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>

            <div className="flex items-center justify-around p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -3, color: COLORS.gold }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/20 transition-all"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 3. Status Bar & Copyright */}
          <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
                <Globe size={11} className="text-[#D4AF37] animate-pulse" />
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">London HQ</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-full">
                <ShieldCheck size={11} className="text-[#D4AF37]" />
                <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-widest">Verified 2026</span>
              </div>
            </div>

            <div className="text-center md:text-right space-y-2">
              <p className="text-[7px] md:text-[8px] text-white/10 font-bold uppercase tracking-[0.7em]">
                © {currentYear} British Academy Intelligence. All Rights Reserved.
              </p>
              <p className="text-[9px] text-[#D4AF37]/40 font-black tracking-[0.3em] uppercase">
                britishacademy-ss.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📟 Tactical Scanner Line - اللمسة النهائية */}
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" 
      />
    </footer>
  );
}