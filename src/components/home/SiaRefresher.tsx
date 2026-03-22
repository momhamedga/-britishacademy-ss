"use client"
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

// حل مشكلة التايب سكريبت (Screenshot 000134/138) بتعريف الأنيميشن بشكل منفصل
const contentVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const imageVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, rotate: -2 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function SiaRefresher() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden  selection:bg-gold/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* 1. الجانب البصري - الإبداع في العرض */}
          <motion.div 
            variants={imageVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative group"
          >
            {/* الإطار الذهبي التكتيكي (Screenshot 002110) */}
            <div className="absolute -inset-4 border border-gold/20 rounded-[2.5rem] scale-95 group-hover:scale-100 transition-transform duration-700 pointer-events-none md:block hidden" />
            
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <Image
                src="/LICENCE.webp"
                alt="SIA LICENCE Refresher"
                fill
                className="object-cover object-top transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay للموبايل يعطي عمق بصري */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 md:hidden" />
              
              {/* Floating Badge للموبايل */}
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/[0.03] border border-white/10 p-4 rounded-2xl md:hidden flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Certified SIA Training</span>
              </div>
            </div>

            {/* عنصر الزينة الخلفي (Grid) */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 blur-3xl rounded-full -z-10" />
          </motion.div>

          {/* 2. المحتوى الكتابي - تنظيم تكتيكي */}
          <motion.div 
            variants={contentVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <Zap size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Industry Standard Update</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
                SIA LICENCE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-gold via-gold/80 to-gold/20">Refresher</span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold/50 via-white/10 to-transparent md:block hidden" />
              <p className="md:pl-8 text-white/40 text-base md:text-lg leading-relaxed font-medium transition-colors hover:text-white/60">
                Stay updated with the latest security practices and regulations. Our SIA Licence Refresher course ensures that your skills and knowledge remain at the forefront of industry standards.
              </p>
            </div>

            {/* الأزرار التفاعلية - لمسة الموبايل */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              <button className="w-full sm:w-auto group relative px-10 py-5 bg-gold text-navy font-black uppercase italic tracking-widest text-[11px] rounded-sm overflow-hidden transition-all active:scale-95">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Explore Further <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>

            
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}