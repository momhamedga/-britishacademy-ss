"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, ShieldCheck, Facebook, Twitter, Linkedin, Instagram, Globe, ArrowUpRight } from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/constants';
import Link from 'next/link';
import { useMediaQuery } from "@/hooks/use-media-query";

const COLORS = {
  navy: "oklch(25% 0.08 260)",
  mediumBlue: "oklch(45% 0.12 255)",
  gold: "#D4AF37",
};

export default function UnifiedTacticalFooter() {
  const currentYear = new Date().getFullYear();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <footer 
      className="relative mt-20 pt-24 pb-12 overflow-hidden border-t border-white/5"
      style={{ backgroundColor: COLORS.navy }}
    >
      {/* 🌌 Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ background: `radial-gradient(circle at 50% 100%, ${COLORS.mediumBlue}, transparent 70%)` }} 
        />
        <div 
          className="absolute inset-0" 
          style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.navy})` }} 
        />
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
            {/* الحلقات الدوارة - تظهر فقط في الديسكتوب عشان متبوظش الأبعاد في الموبايل */}
            {isDesktop && (
                <div className="absolute inset-0 -m-12 border border-[#D4AF37]/10 rounded-full animate-[spin_30s_linear_infinite]" />
            )}
            
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="relative p-7 md:p-11 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-700"
            >
              <Image 
                src="/logo.webp" 
                alt="Academy Logo" 
                width={70} 
                height={70} 
                className="brightness-125 md:w-[105px] md:h-[105px] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              />
            </motion.div>

            <div className="mt-8 text-center space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-[0.1em] uppercase italic leading-none">
                BRITISH <span className="text-[#D4AF37]">ACADEMY</span>
              </h2>
              <p className="text-[7px] md:text-[9px] text-white/30 font-bold uppercase tracking-[0.6em]">
                Strategic Intelligence Intake
              </p>
            </div>
          </motion.div>

          {/* 2. Communication Hub - Bento Style */}
          {/* هنا التغيير في الموبايل: العناصر بتترص عمودياً مع عرض كامل */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <Link href={`mailto:${CONTACT_CONFIG.email}`} className="group w-full">
              <div className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl group-hover:border-[#D4AF37]/50 transition-all duration-500">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="shrink-0 p-2 rounded-lg bg-[#D4AF37]/10">
                    <Mail size={14} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-white/40 group-hover:text-white transition-colors truncate">
                    {CONTACT_CONFIG.email}
                  </span>
                </div>
                <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#D4AF37] transition-all" />
              </div>
            </Link>

            <div className="flex items-center justify-around p-5 bg-white/[0.03] border border-white/5 rounded-2xl w-full">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -3, color: COLORS.gold }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/30 transition-all"
                >
                  <Icon size={22} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 3. Status Bar & Copyright */}
          {/* في الموبايل هنخليها Stack عمودي منظم */}
          <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
                <Globe size={11} className="text-[#D4AF37] animate-pulse" />
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">London HQ</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-full">
                <ShieldCheck size={11} className="text-[#D4AF37]" />
                <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-widest">Verified 2026</span>
              </div>
            </div>

            <div className="text-center md:text-right space-y-3">
              <p className="text-[7px] md:text-[8px] text-white/20 font-bold uppercase tracking-[0.5em] leading-relaxed max-w-[250px] md:max-w-none">
                © {currentYear} British Academy Intelligence. <br className="md:hidden" /> All Rights Reserved.
              </p>
              <p className="text-[10px] md:text-[11px] text-[#D4AF37]/60 font-black tracking-[0.3em] uppercase">
                britishacademy-ss.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📟 Tactical Scanner Line */}
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" 
      />
    </footer>
  );
}