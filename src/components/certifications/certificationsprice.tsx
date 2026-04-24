"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Target, Building, Clock, BarChart3, Star, Zap } from 'lucide-react';

// --- 📊 البيانات المستخرجة من تصميم الهوية المعتمد ---
const PROFESSIONAL_PROGRAMS = [
  {
    icon: Building,
    id: "FSO",
    title: "Facility Security Officer",
    duration: "3 Months",
    level: "Intermediate",
    skills: ["Facility Security", "Crisis Management", "Risk Assessment"],
    label: "Details & Registration"
  },
  {
    icon: Target,
    id: "VIP",
    title: "VIP Protection Specialist",
    duration: "6 Months",
    level: "Advanced",
    skills: ["VIP Personal Protection", "Security Planning", "Threat Management"],
    popular: true,
    label: "Register Now"
  },
  {
    icon: ShieldCheck,
    id: "CEM",
    title: "Crisis & Emergency Manager",
    duration: "4 Months",
    level: "Advanced",
    skills: ["Crisis Management", "Emergency Planning", "Incident Response"],
    label: "Details"
  }
];

export default function CertificationsPricePage() {
  return (
    <main className=" min-h-screen selection:bg-[oklch(75%_0.15_85)] selection:text-black">
      


      {/* 🛡️ 2. Programs Grid: Clean White Base */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          
     

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROFESSIONAL_PROGRAMS.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} />
            ))}
          </div>
        </div>
      </section>


    </main>
  );
}

// 🛡️ مكون الكارت التكتيكي
function ProgramCard({ program, index }: any) {
  const isPopular = program.popular;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-8 rounded-[2.5rem] border bg-white transition-all duration-500 ${
        isPopular ? 'border-[oklch(75%_0.15_85)] shadow-2xl z-10' : 'border-slate-100 shadow-sm hover:border-[oklch(75%_0.15_85)]/30'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[oklch(75%_0.15_85)] text-black px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-gold/20">
          <Zap size={10} fill="currentColor" /> Most Popular
        </span>
      )}

      <div className="mb-8">
        <h3 className="text-3xl font-black italic uppercase text-slate-900 leading-none mb-2">{program.id}</h3>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{program.title}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Duration</p>
           <p className="text-sm font-black text-slate-900 italic">{program.duration}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Level</p>
           <p className="text-sm font-black text-slate-900 italic">{program.level}</p>
        </div>
      </div>

      <div className="space-y-3 mb-10 min-h-[100px]">
        {program.skills.map((skill: string) => (
          <div key={skill} className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${isPopular ? 'bg-[oklch(75%_0.15_85)]' : 'bg-slate-200'}`} />
            <span className="text-xs font-medium text-slate-600 italic">{skill}</span>
          </div>
        ))}
      </div>

      <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all ${
        isPopular 
        ? 'bg-[oklch(75%_0.15_85)] text-black shadow-lg shadow-gold/20 hover:scale-[1.02]' 
        : 'bg-navy text-white hover:bg-navy'
      }`}>
        {program.label}
      </button>
    </motion.div>
  );
}