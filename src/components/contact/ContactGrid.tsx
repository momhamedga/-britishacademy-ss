"use client"
import { motion } from 'framer-motion';
import { CONTACT_INFO_CARDS } from '@/lib/constants';
import { ChevronRight, Zap, Target } from 'lucide-react';

export default function ContactGrid() {
  return (
    // شبكة مرنة جداً تبدأ بـ 1 وتصل لـ 2 في الشاشات المتوسطة وترجع لـ 1 في الـ Large
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 relative px-2 md:px-0">
      
      {/* 🌌 خط ديكوري خلفي يظهر فقط في الموبايل لربط العناصر بصرياً */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent md:hidden pointer-events-none" />

      {CONTACT_INFO_CARDS.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          
          // 🖐️ سحر اللمس للموبايل (Haptic Feel)
          whileTap={{ scale: 0.96, shadow: "0px 0px 20px rgba(212,175,55,0.2)" }}
          
          // التعديل هنا: أضفنا فئات Hover الخاصة بالديسك توب
          className="group relative p-5 md:p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 active:border-gold/40 transition-all duration-300 overflow-hidden backdrop-blur-md cursor-pointer
                     lg:hover:border-gold/40 lg:hover:bg-white/[0.05] lg:hover:-translate-y-1 lg:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          {/* تأثير نبض خلفي (يظهر في الموبايل عند الضغط وفي الديسكتوب عند الـ Hover) */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-gold/5 blur-3xl rounded-full group-active:bg-gold/10 group-hover:bg-gold/10 transition-colors" />

          <div className="flex flex-row items-center gap-4 md:gap-6 relative z-10">
            
            {/* 💠 أيقونة بستايل "الحاوية الأمنية" */}
            <div className="relative shrink-0">
              {/* التعديل هنا: تأثيرات الـ Hover والـ Active للأيقونة */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-navy/80 border border-white/10 flex items-center justify-center text-gold shadow-2xl transition-all duration-300
                             group-active:bg-gold group-active:text-navy group-active:scale-105
                             group-hover:scale-110 group-hover:bg-gold/10 group-hover:border-gold/30">
                 <item.icon size={24} strokeWidth={1.5} className="md:w-7 md:h-7 transition-transform group-hover:-translate-y-1" />
              </div>
              {/* نقطة حالة نابضة */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full border-2 border-navy animate-pulse z-10" />
            </div>

            {/* 📝 النصوص بـ Hierarchy واضح */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <Target size={10} className="text-gold animate-spin-slow group-hover:text-gold transition-colors" />
                <span className="text-[9px] md:text-[10px] font-black text-gold/40 uppercase tracking-[0.3em] group-hover:text-gold transition-colors">
                  {item.label}
                </span>
              </div>
              
              <h3 className="text-white font-black text-sm md:text-lg tracking-wide truncate group-active:text-gold group-hover:text-gold transition-colors group-hover:translate-x-1 transition-transform">
                {item.value}
              </h3>
              
              <p className="text-slate-500 text-[10px] md:text-xs font-medium leading-tight line-clamp-2 md:line-clamp-none group-hover:text-slate-300 transition-colors">
                {item.detail}
              </p>
            </div>

            {/* ➡️ سهم مؤشر مضيء ومتحرك */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-gold border border-white/10 group-active:bg-gold group-active:text-navy group-hover:bg-gold group-hover:text-navy group-hover:translate-x-1 transition-all">
              <ChevronRight size={16} />
            </div>
          </div>

          {/* خط المسح الضوئي (Scanline) يشتغل عند اللمس (whileTap) في الموبايل */}
          <motion.div 
            initial={{ x: '-100%' }}
            whileTap={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none md:hidden"
          />
        </motion.div>
      ))}
    </div>
  );
}