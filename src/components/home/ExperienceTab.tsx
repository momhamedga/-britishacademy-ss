"use client"
import { EXPERIENCE_STEPS } from '@/lib/constants/experience';
import { motion } from 'framer-motion';
import { Fingerprint, ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function ExperienceTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      {/* Left Side: Visual Identity */}
      <div className="lg:col-span-5 relative group">
        <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 glass shadow-2xl">
          <Image 
            src="/Professional Experience Equivalence.webp" 
            alt="Experience Equivalence" 
            fill 
            className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-transparent to-navy" />
          
          {/* Interactive Floating Card */}
          <div className="absolute bottom-10 left-10 right-10 p-8 glass-dark rounded-3xl border border-white/5 backdrop-blur-2xl">
            <Fingerprint className="text-gold mb-4 animate-pulse" size={40} />
            <h4 className="text-white font-bold text-xl uppercase font-syne italic">Identity Equivalence</h4>
            <p className="text-white/40 text-[10px] mt-2 leading-relaxed tracking-widest">
              WE VALIDATE YOUR PROFESSIONAL JOURNEY THROUGH ADVANCED ACCREDITATION SYSTEMS.
            </p>
          </div>
        </div>
        
        {/* Background Glows */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gold/10 blur-[120px] rounded-full" />
      </div>

      {/* Right Side: Information Framework */}
      <div className="lg:col-span-7 space-y-12">
        <div className="space-y-6">
          <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.6em]">Professional Pathway</h3>
          <p className="text-slate-300 text-lg leading-relaxed font-light">
            Our innovative system for the accreditation of candidates' experiences is divided into specialized programs that translate field expertise into recognized professional value.
          </p>
        </div>

        {/* Dynamic Mapping for Steps from Constants */}
        <div className="space-y-4">
          {EXPERIENCE_STEPS.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-gold/20 transition-all duration-500"
            >
              <div className="flex items-start gap-8">
                <div className={`p-4 rounded-2xl bg-white/5 ${step.color} group-hover:scale-110 transition-transform`}>
                  <step.icon size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-lg uppercase font-syne tracking-tight">{step.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
                <ArrowRight className="ml-auto text-white/10 group-hover:text-gold transition-colors" size={20} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Commitment Note */}
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-gold/5 border border-gold/10">
          <ShieldCheck className="text-gold" size={20} />
          <p className="text-[11px] text-gold/80 font-bold uppercase tracking-widest">
            Fulfilling commitments effectively and reliably through special accreditation services.
          </p>
        </div>
      </div>
    </div>
  );
}