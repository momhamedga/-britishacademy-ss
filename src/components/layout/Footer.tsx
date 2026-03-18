"use client"
import Image from 'next/image';
import { Mail, ShieldCheck, Facebook, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';
import NeuralBackground from '../ui/NeuralBackground';
import { CONTACT_CONFIG } from '@/lib/constants'; // استدعاء الثوابت اللي عدلناها
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-20 py-16 md:py-24 overflow-hidden border-t border-white/5 font-inter ">
      {/* 1. Pure Neural Background - العمق البصري */}
      <div className="absolute inset-0 z-0 opacity-40">
        <NeuralBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center px-6 space-y-10 md:space-y-14">
        
        {/* 2. Central Identity - الهوية المركزية */}
        <div className="group relative">
          <div className="absolute -inset-12 bg-gold/5 rounded-full blur-[100px] group-hover:bg-gold/15 transition-all duration-1000" />
          <div className="relative flex flex-col items-center space-y-4 md:space-y-6">
            <div className="p-6 md:p-8 rounded-[3rem] md:rounded-[4rem] bg-white/[0.01] backdrop-blur-2xl border border-white/5 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:border-gold/20">
              <Image 
                src="/logo.webp" 
                alt="British Academy Logo" 
                width={100} 
                height={100} 
                className="brightness-125 drop-shadow-[0_0_20px_rgba(212,175,55,0.2)] md:w-[110px] md:h-[110px]"
              />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase font-syne tracking-[0.15em]">
                British <span className="text-gold">Academy</span>
              </h2>
              <div className="flex items-center justify-center gap-2 md:gap-4 text-white/30 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-[10px] font-bold">
                <div className="h-px w-6 md:w-10 bg-gold/20" />
                Strategic Security Ecosystem
                <div className="h-px w-6 md:w-10 bg-gold/20" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Modern Contact & Socials Hub */}
        <div className="flex flex-col items-center space-y-8 w-full pt-4">
          {/* Email Button - مربوط بالدومين الجديد */}
          <Link 
            href={`mailto:${CONTACT_CONFIG.email}`} 
            className="group relative inline-flex items-center gap-3 md:gap-5 px-8 md:px-12 py-4 md:py-5 bg-white/[0.02] border border-white/5 rounded-full text-white/40 hover:text-gold hover:border-gold/40 transition-all duration-500 overflow-hidden text-[10px] md:text-xs"
          >
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Mail size={16} className="text-gold/50 group-hover:scale-110 group-hover:rotate-12 transition-all" />
            <span className="font-syne font-black uppercase tracking-[0.2em]">{CONTACT_CONFIG.email}</span>
          </Link>

          {/* Social Media - الحد الأدنى من التصميم مع أقصى تأثير */}
          <div className="flex items-center gap-8">
            {[
              { Icon: Facebook, href: "#" },
              { Icon: Instagram, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Linkedin, href: "#" }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.href}
                className="text-white/20 hover:text-gold transition-all duration-500 hover:-translate-y-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
              >
                <social.Icon size={22} strokeWidth={1} />
              </a>
            ))}
          </div>
        </div>

        {/* 4. Cinematic Micro-Footer */}
        <div className="w-full pt-12 md:pt-16 flex flex-col items-center space-y-8 border-t border-white/5">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            <span className="flex items-center gap-2">
              <Globe size={10} className="text-gold/30" />
              London HQ / Global Operations
            </span>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-gold/20" />
            <span className="flex items-center gap-2 border border-white/10 px-3 py-1.5 rounded-full bg-white/[0.01]">
              <ShieldCheck size={10} className="text-gold" />
              Intelligence Certified 2026
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-[7px] md:text-[9px] text-white/10 uppercase tracking-[0.6em] md:tracking-[1em] font-medium text-center leading-relaxed">
              © British Academy Intelligence Group. Secure Deployment
            </p>
            <p className="text-[6px] text-gold/20 uppercase tracking-[0.5em] font-bold">
              britishacademy-ss.com
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}