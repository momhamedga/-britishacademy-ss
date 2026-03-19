"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, ShieldCheck, Facebook, Twitter, Linkedin, Instagram, Globe, ArrowUpRight } from 'lucide-react';
import NeuralBackground from '../ui/NeuralBackground';
import { CONTACT_CONFIG } from '@/lib/constants';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 py-16 md:py-24 overflow-hidden border-t border-white/5 bg-navy/60">
      
      {/* 1. Pure Neural Background - العمق البصري */}
      <div className="absolute inset-0 z-0 opacity-30">
        <NeuralBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#01030a] via-transparent to-gold/5 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center px-6 space-y-12 md:space-y-16">
        
        {/* 2. Central Identity - الهوية التكتيكية */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative"
        >
          {/* Rotating Ring Decor (Mobile Focus) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-gold/5 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />

          <div className="relative flex flex-col items-center space-y-6">
            <div className="p-5 md:p-8 rounded-[2.5rem] md:rounded-[4rem] bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:border-gold/30 transition-all duration-700">
              <Image 
                src="/logo.webp" 
                alt="British Academy Logo" 
                width={90} 
                height={90} 
                className="brightness-125 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] md:w-[110px] md:h-[110px]"
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl md:text-5xl font-black text-white italic uppercase tracking-[0.1em] font-syne">
                BRITISH <span className="text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">ACADEMY</span>
              </h2>
              <div className="flex items-center justify-center gap-3 text-white/20 uppercase tracking-[0.4em] text-[7px] md:text-[9px] font-bold">
                <span className="h-[1px] w-4 md:w-8 bg-gold/30" />
                Strategic Intelligence Group
                <span className="h-[1px] w-4 md:w-8 bg-gold/30" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Modern Contact & Socials Hub */}
        <div className="flex flex-col items-center space-y-10 w-full">
          {/* Email Button - مربوط بالدومين */}
          <Link 
            href={`mailto:${CONTACT_CONFIG.email}`} 
            className="group relative w-full max-w-sm md:max-w-none inline-flex items-center justify-center gap-4 px-8 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white/50 hover:text-gold hover:border-gold/50 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Mail size={16} className="text-gold/60 group-hover:rotate-12 transition-transform" />
            <span className="font-syne font-black uppercase tracking-[0.15em] text-[10px] md:text-xs">{CONTACT_CONFIG.email}</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </Link>

          {/* Social Media - Grid Layout for Mobile */}
          <div className="flex items-center justify-center gap-6 md:gap-10">
            {[
              { Icon: Facebook, href: "#" },
              { Icon: Instagram, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Linkedin, href: "#" }
            ].map((social, index) => (
              <motion.a 
                key={index} 
                href={social.href}
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 md:p-0 rounded-full bg-white/[0.02] md:bg-transparent border border-white/5 md:border-none text-white/20 hover:text-gold transition-all duration-300 shadow-xl"
              >
                <social.Icon size={20} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* 4. Cinematic Micro-Footer */}
        <div className="w-full pt-12 flex flex-col items-center space-y-10 border-t border-white/5">
          
          {/* Status Bar */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            <div className="flex items-center gap-2 bg-white/[0.03] px-4 py-2 rounded-full border border-white/5">
              <Globe size={12} className="text-gold animate-pulse" />
              <span>London HQ</span>
            </div>
            <div className="flex items-center gap-2 bg-gold/5 border border-gold/20 px-4 py-2 rounded-full text-gold">
              <ShieldCheck size={12} />
              <span>Verified 2026</span>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="space-y-3 pb-4">
            <p className="text-[7px] md:text-[9px] text-white/10 uppercase tracking-[0.5em] md:tracking-[0.8em] font-medium max-w-xs md:max-w-none mx-auto leading-loose">
              © {currentYear} British Academy Intelligence Group. <br className="md:hidden" /> All Rights Reserved.
            </p>
            <div className="flex items-center justify-center gap-2">
               <div className="h-px w-4 bg-gold/20" />
               <p className="text-[8px] text-gold/30 font-black uppercase tracking-widest">
                 britishacademy-ss.com
               </p>
               <div className="h-px w-4 bg-gold/20" />
            </div>
          </div>
        </div>
      </div>

      {/* 📟 Tactical Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent blur-[1px]" />
    </footer>
  );
}