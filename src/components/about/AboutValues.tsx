"use client"
import { VALUES } from '@/lib/aboutValues';
import { motion } from 'framer-motion';


export default function AboutValues() {
  return (
    <section className="py-32 px-6 relative  overflow-hidden">
      
      {/* خلفية جمالية خفيفة (Ambient Light) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section: التوجه البصري للأكاديمية */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-black text-white italic uppercase tracking-tighter leading-[0.85]">
              The <span className="text-gradient-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">DNA</span> <br /> of Excellence
            </h2>
            <div className="h-1 w-24 bg-gold rounded-full" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-md text-base md:text-lg font-medium italic border-l border-white/10 pl-6"
          >
            Our values are not just words; they are the strategic pillars that guide every professional decision in the British Academy.
          </motion.p>
        </div>

        {/* Values Grid: تطبيق الـ Glassmorphism */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: v.delay, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[3rem] glass border border-white/5 hover:border-gold/40 transition-all duration-700 hover:-translate-y-2 overflow-hidden"
            >
              {/* تأثير إضاءة داخلي عند الـ Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Icon Container: تفاعلي بالكامل */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gold mb-10 group-hover:bg-gold group-hover:text-navy transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <v.icon size={32} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-2xl font-black text-white mb-4 italic uppercase tracking-tight group-hover:text-gold transition-colors duration-500">
                  {v.title}
                </h3>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  {v.desc}
                </p>
              </div>

              {/* Tactical Corner Indicator */}
              <div className="absolute top-8 right-8">
                <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-gold group-hover:scale-[3] transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}