"use client"
import { STATS } from '@/lib/constants';
import Counter from '@/components/ui/counter';
import { motion  } from 'framer-motion';




export default function AboutStats() {
  return (
    <section className="py-24 relative z-10   overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 md:gap-12 lg:divide-x lg:divide-white/5">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="text-center space-y-4 px-2"
            >
              <div className="relative inline-block">
                <h3 className={`text-[clamp(2.5rem,8vw,4.5rem)] font-black italic tracking-tighter leading-none flex items-center justify-center ${stat.color === 'gold' ? 'text-gold' : 'text-white'}`}>
                  {/* استدعاء العداد التفاعلي */}
                  <Counter value={stat.value} />
                  {stat.value.includes('+') && <span className="ml-1 text-[0.6em]">+</span>}
                </h3>
                {/* خط توهج خفيف تحت الرقم في الموبايل */}
                <div className={`h-px w-1/2 mx-auto mt-2 opacity-30 ${stat.color === 'gold' ? 'bg-gold shadow-[0_0_10px_#D4AF37]' : 'bg-white'}`} />
              </div>

              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-500 max-w-[150px] mx-auto leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}