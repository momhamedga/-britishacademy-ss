"use client";
import { LEADERSHIP_TEAM, ACCREDITATIONS } from '@/lib/constants';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Linkedin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

// لوحة ألوان OKLCH مشبعة للفخامة التقنية
const COLORS = {
  navy: "oklch(22% 0.06 260)",
  mediumBlue: "oklch(40% 0.1 255)",
  gold: "oklch(75% 0.15 85)", // الذهب بنسخة OKLCH أكثر سطوعاً
  bgLight: "oklch(99% 0.005 260)",
};

export default function CreativeLeadershipPortal() {
  return (
    <section className="py-24 md:py-40 px-6 relative overflow-hidden select-none" >
    

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 🏆 Header: Tactical Typography */}
        <header className="mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/[0.08] bg-white/50 backdrop-blur-xl shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/50">our Team</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-[#1B2A41] leading-[0.85]">
              Leadership <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#D4AF37]/80 to-[#1B2A41]/20">team</span> <br/>
  
            </h2>
          </motion.div>
        </header>

        {/* 📱 Leadership Cards: High-Performance Interaction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {LEADERSHIP_TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* 🛡️ Accreditations: Minimalist Floating Grid */}
        <div className="border-t border-black/[0.05] pt-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
                  <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/[0.08] bg-white/50 backdrop-blur-xl shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/50">our Accreditations</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-[#1B2A41] leading-[0.85]">
              international <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#D4AF37]/80 to-[#1B2A41]/20"> Accreditations</span> <br/>
  
            </h2>
          </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ACCREDITATIONS.map((brand, i) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,1)" }}
                className="h-24 rounded-2xl border border-black/[0.03] bg-white/40 backdrop-blur-sm flex items-center justify-center group transition-all duration-500 cursor-none"
              >
                <span className="text-xl font-black text-[#1B2A41]/20 group-hover:text-[#1B2A41] group-hover:scale-110 transition-all duration-500 tracking-tighter uppercase">
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 🎞️ Grainy Texture (Noise) لزيادة حدة التفاصيل */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] pointer-events-none mix-blend-overlay" />
    </section>
  );
}

// مكون الكارت المنفصل للتحكم في الأداء (Tilt Effect)
function TeamCard({ member, index }: { member: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseSpringConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, mouseSpringConfig);
  const springY = useSpring(y, mouseSpringConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative h-[450px] group cursor-none"
    >
      <div className="absolute inset-0 rounded-[3rem] bg-white border border-black/[0.04] shadow-[0_30px_100px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-700 group-hover:shadow-[0_50px_120px_rgba(0,0,0,0.08)] group-hover:border-[#D4AF37]/20">
        
        {/* Animated Background Pulse */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

        <div className="p-10 h-full flex flex-col items-center text-center">
          {/* Avatar Area with Floating Effect */}
          <div className="relative mb-10" style={{ transform: "translateZ(50px)" }}>
            <div className="w-28 h-28 rounded-[2rem] bg-[#1B2A41] flex items-center justify-center text-white shadow-2xl rotate-3 group-hover:rotate-12 transition-transform duration-700">
              <span className="text-3xl font-black">{member.initials}</span>
            </div>
            {/* Glow Behind */}
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Info Area */}
          <div className="flex-grow space-y-3" style={{ transform: "translateZ(30px)" }}>
            <h4 className="text-2xl font-black text-[#1B2A41] tracking-tighter uppercase leading-none">
              {member.name}
            </h4>
            <div className="inline-block px-3 py-1 rounded-md bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">
              {member.role}
            </div>
            <p className="pt-4 text-sm text-black/40 font-medium leading-relaxed italic">
              "{member.description}"
            </p>
          </div>

          {/* Action Button: LinkedIn with Magnet Effect */}
          <motion.a
            href={member.linkedin}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ transform: "translateZ(60px)" }}
            className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1B2A41]/40 hover:text-[#0077b5] transition-colors"
          >
            Connect <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* Tactical Corner Element */}
        <div className="absolute bottom-[-20px] right-[-20px] w-20 h-20 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-all duration-700" />
      </div>
    </motion.div>
  );
}