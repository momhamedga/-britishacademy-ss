"use client"
import { motion, Variants } from "framer-motion";
import { Award, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

// تعريف الأنيميشن (Screenshot 000134/138 Fix) لضمان Green TS Code
const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
  }
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function StrategicAdvantages() {
  return (
    <section className="relative w-full py-24 md:py-40  overflow-hidden selection:bg-gold/30">
      
    
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start"
        >
          
          {/* 1. الكرت الأول: Unparalleled Expertise (مستوحى من الصورة) */}
          <motion.div 
            variants={cardVariants}
            className="group relative h-full flex flex-col p-10 md:p-14 bg-white/[0.03] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:bg-white/[0.06] hover:border-white/10"
          >
            {/* الديكور الخلفي (Tactile Elements) */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-gold/5 blur-3xl rounded-full group-hover:bg-gold/10 transition-colors pointer-events-none" />
            
            <div className="space-y-8 flex-grow">
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-gold/10 border border-gold/20 text-gold group-hover:scale-110 transition-transform">
                  <Zap size={28} />
                </div>
                <div className="flex flex-col">
                  <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px]">Strategic Excellence</span>
                  <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.85] italic transition-all group-hover:text-gold">
                    Expertise<br className="md:hidden"/> Delivered
                  </h3>
                </div>
              </div>
              
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium transition-colors group-hover:text-white">
              {` British Training Academy, we understand the importance of exceptional training. That's why we have assembled a team of seasoned trainers – each with over 15 years of experience. They're experts in their fields and passionate about empowering individuals to reach their full potential.`}
              </p>
            </div>
            
            <Link href="/about" className="mt-12 flex justify-end">
              <div className="inline-flex items-center gap-3 text-gold/60 group-hover:text-gold font-mono uppercase text-[9px] tracking-widest pb-1 border-b border-gold/10 group-hover:border-gold/30">
                Explore Academy Hub <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
              </div>
            </Link>
          </motion.div>

          {/* 2. الكرت الثاني: Prices Competitively (مستوحى من الصورة والسكشن السابق) */}
          <motion.div 
            variants={cardVariants}
            className="group relative h-full flex flex-col p-10 md:p-14 bg-white/[0.03] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:bg-white/[0.06] hover:border-white/10"
          >
            {/* الديكور الخلفي للموبايل - Adapted لمسة الموبايل */}
            <div className="absolute bottom-0 right-0 w-full h-[50%] bg-gradient-to-t from-gold/5 via-transparent to-transparent opacity-60 pointer-events-none md:hidden" />
            
            <div className="space-y-8 flex-grow">
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-gold/10 border border-gold/20 text-gold group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <div className="flex flex-col">
                  <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px]">Optimal Pricing Models</span>
                  <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.85] italic transition-all group-hover:text-gold">
                    Strategic <br className="md:hidden"/> Pricing
                  </h3>
                </div>
              </div>
              
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium transition-colors group-hover:text-white">
                Our courses are priced competitively, ensuring you receive the best training at the lowest prices. This unique combination of knowledge, real-world experience, and dedication sets us apart and ensures you receive the very best accredited training available.
              </p>
            </div>
            
            {/* زر الحجز - لمسة الموبايل Haptic Active State (Screenshot 000134/138 Fix) */}
            <Link href="/courses" className="mt-12 lg:w-auto">
              <button className="relative w-full lg:w-auto group/btn px-10 py-5 bg-gold text-navy font-black text-[11px] uppercase italic tracking-widest rounded-sm overflow-hidden transition-all active:scale-95 shadow-2xl hover:bg-white hover:text-black">
                <span className="relative z-10 flex items-center justify-center gap-3">
                   Reserve Your Spot <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"/>
              </button>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* ديكور v4 الخفي (Grid Pattern) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(var(--color-gold)/0.03)_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none" />
    </section>
  );
}

// مكون السهم المساعد
function ArrowRight({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}