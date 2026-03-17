"use client"
import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden ">
      
      {/* 1. طبقة الخلفية السينمائية (The Cinematic Layer) */}
      <div className="absolute inset-0 z-0">
        {/* تدرج ظلي (Vignette) لتركيز الإضاءة في المنتصف */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 opacity-70" />

        {/* الخلفية الرئيسية - تأكد من وجود الصورة في الـ public folder */}
        <motion.div 
          initial={{ scale: 1.15, filter: "blur(10px) brightness(0)" }}
          animate={{ scale: 1, filter: "blur(0px) brightness(0.6)" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="w-full h-full bg-[url('/about-hero.webp')] bg-cover bg-center grayscale-[0.4] contrast-[1.1]" 
        />
      </div>

      {/* 2. المحتوى المركزي (The Mission Core) */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge: التأسيس */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-gold/30" />
            <span className="text-gold text-[10px] md:text-xs font-black uppercase tracking-[0.7em] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
              Elite Excellence Since 2012
            </span>
            <div className="h-[1px] w-12 bg-gold/30" />
          </div>

          {/* العنوان الضخم: Definers of Security */}
          <h1 className="font-display text-[clamp(3.5rem,12vw,9rem)] font-black text-white italic uppercase tracking-tighter leading-[0.8] mb-10">
            Definers of <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10" 
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              Security
            </span>
          </h1>
          
          {/* النص الوصفي: Briefing Style */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed italic border-l-2 border-gold/40 pl-8 text-left md:text-center md:border-l-0 md:pl-0"
          >
            British Academy (IAHS) is more than an institution; it&apos;s a global ecosystem engineered for elite security professionals and homeland defense leaders.
          </motion.p>
        </motion.div>

        {/* أزرار الحركة (Action Hub) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <button className="w-full sm:w-auto px-12 py-5 bg-gold text-navy font-black uppercase tracking-widest text-[11px] rounded-full hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-500 hover:scale-105 active:scale-95">
            Explore Our Mission
          </button>
          
          <button className="w-full sm:w-auto px-12 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-white/10 transition-all duration-500 group">
            <span className="group-hover:text-gold transition-colors">Watch Academy Story</span>
          </button>
        </motion.div>
      </div>

      {/* 3. مؤشر السكرول التكتيكي (Tactical Scroll) */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20 opacity-50">
        <span className="text-[9px] text-gold uppercase tracking-[0.5em] font-black rotate-90 origin-left translate-x-1">Scroll</span>
        <motion.div 
          animate={{ height: [40, 100, 40], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-[1px] bg-gradient-to-b from-gold via-gold/20 to-transparent" 
        />
      </div>

      {/* طبقة الـ Noise (Grain) لتعزيز المظهر السينمائي */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-40 mix-blend-overlay" />
    </section>
  );
}