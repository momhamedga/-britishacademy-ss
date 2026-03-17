"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutStory() {
  return (
    <section className="py-24 md:py-40 px-6 relative overflow-hidden ">
      
      {/* عنصر ديكوري خلفي (Grid Background) لتعزيز الـ Tech Look */}
      <div className="absolute inset-0 bg-grid-gold opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* 1. الجانب البصري: تداخل الصور بتأثير سينمائي */}
        <div className="lg:col-span-6 relative order-2 lg:order-1 mt-16 lg:mt-0">
          {/* الإطار الرئيسي (Main Image Frame) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[4/5] w-full lg:w-[90%] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 z-20 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
          >
            <Image 
              src="/about-1.webp" 
              alt="British Academy Leadership and Strategic Intelligence" 
              fill 
              className="object-cover contrast-[1.1] brightness-90 group-hover:scale-105 transition-transform duration-1000" 
              sizes="(max-w-768px) 100vw, 50vw"
            />
            {/* Overlay Gradient لدمج الصورة مع التصميم */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>

          {/* الكارت العائم (Floating Glass Card) */}
          <motion.div 
            initial={{ x: 50, y: 50, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute -bottom-10 -right-4 md:-right-8 aspect-square w-[55%] rounded-[2rem] md:rounded-[3rem] overflow-hidden border-2 border-gold/20 z-30 shadow-[0_30px_60px_rgba(0,0,0,0.8)] hidden sm:block glass"
          >
            <Image 
              src="/about-2.webp" 
              alt="Global Security Operations British Academy" 
              fill 
              className="object-cover saturate-[1.1] contrast-[1.1]" 
              sizes="30vw"
            />
          </motion.div>

          {/* Gold Glow Aura */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-gold/5 blur-[120px] -z-10 rounded-full animate-pulse" />
        </div>

        {/* 2. المحتوى النصي: الـ Storytelling */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-display text-[clamp(2.8rem,8vw,4.5rem)] font-black text-white italic uppercase tracking-tighter leading-[0.85]">
                The <span className="text-gradient-gold">Legacy</span> <br /> of IAHS
              </h2>
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-[2px] bg-gold shadow-[0_0_15px_#D4AF37]"
                />
                <span className="text-gold/50 text-[10px] font-black uppercase tracking-[0.4em]">Section 01 / Evolution</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* النص الرئيسي (The Hook) */}
            <div className="relative pl-8 md:pl-12 border-l border-gold/20">
              <p className="text-white text-lg md:text-2xl font-medium leading-relaxed italic opacity-90">
                Founded on the principles of high-level defense and strategic intelligence, the British Academy has evolved into the premiere destination for global security excellence.
              </p>
            </div>

            {/* تفاصيل المنهجية */}
            <div className="grid gap-6">
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
                Our methodology combines <span className="text-white font-bold tracking-tight">"Data-First"</span> tactical efficiency with traditional British discipline. We don&apos;t just train; we engineer the leaders of homeland defense for the 2026 landscape.
              </p>
              
              {/* قائمة مميزات سريعة (Mini Features) */}
              <div className="flex flex-wrap gap-4 pt-4">
                {['Strategic Intelligence', 'Tactical Mastery', 'Homeland Defense'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-gold/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}