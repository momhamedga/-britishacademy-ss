"use client"
import { motion } from 'framer-motion';
import { CONTACT_INFO_CARDS } from '@/lib/constants'; // استيراد البيانات المركزية

export default function ContactGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
      {CONTACT_INFO_CARDS.map((item, i) => (
        <motion.div
          key={item.id} // استخدام id فريد من الثوابت لضمان أداء أفضل
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: i * 0.1, 
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] // تنعيم الحركة (Bezier Curve)
          }}
          className="group relative p-6 rounded-[2rem]  border border-white/5 hover:border-gold/30  transition-all duration-500 overflow-hidden"
        >
          {/* تأثير توهج داخلي خفيف عند الـ Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-center gap-5 relative z-10">
            {/* أيقونة بتصميم Glass-Box */}
            <div className="w-14 h-14 rounded-2xl bg-navy-light/50 backdrop-blur-md flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy group-hover:scale-110 transition-all duration-500 shadow-xl border border-white/5">
              <item.icon size={24} strokeWidth={1.2} />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-black text-gold/40 uppercase tracking-[0.2em] group-hover:text-gold/70 transition-colors">
                {item.label}
              </span>
              <h3 className="text-white font-bold text-sm md:text-base tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                {item.value}
              </h3>
              <p className="text-slate-500 text-[11px] font-medium leading-none">
                {item.detail}
              </p>
            </div>
          </div>

          {/* عنصر ديكوري: خط جانبي ذهبي يظهر في الـ Hover */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-gold group-hover:h-1/2 transition-all duration-500 rounded-r-full" />
        </motion.div>
      ))}
    </div>
  );
}