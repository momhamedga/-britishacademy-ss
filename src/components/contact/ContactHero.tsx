"use client"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ContactHero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // تأثير بارالاكس (Parallax) أعمق للنصوص
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative pt-32 pb-16 md:pt-52 md:pb-24 px-6 overflow-hidden"
    >

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        {/* Badge علوي متطور */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-4 mb-8"
        >
          <div className="h-[1px] w-6 md:w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] whitespace-nowrap drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            Establish Secure Connection
          </span>
          <div className="h-[1px] w-6 md:w-12 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {/* العنوان الرئيسي: استعملنا Clamp لضمان التجاوب على كل الشاشات */}
        <motion.h1 
          style={{ y: y1 }}
          className="text-[clamp(2.5rem,12vw,8rem)] font-black text-white italic uppercase tracking-tighter leading-[0.8] mb-10"
        >
          Contact <br />
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 inline-block"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
          >
            Mission Control
          </span>
        </motion.h1>
        
        {/* الوصف مع "برواز" جانبي أنيق */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative max-w-2xl group"
        >
          <div className="absolute -inset-x-4 -inset-y-2 border-x border-white/5 group-hover:border-gold/20 transition-colors duration-1000" />
          <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed px-4">
            Connect with the <span className="text-white italic">British Academy for Strategic Security</span>. 
            Our elite operators are ready for deployment briefings at 
            <span className="text-gold/80 ml-2 font-mono text-xs md:text-base tracking-tighter group-hover:text-gold transition-colors">britishacademy-ss.online</span>
          </p>
        </motion.div>
      </motion.div>

      {/* 2. عنصر الـ Scanline السفلي المتحرك */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" 
        />
        <div className="w-full h-px bg-white/5" />
      </div>
    </section>
  );
}