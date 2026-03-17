"use client"
import { ADVANTAGES } from '@/lib/membership/membership-Advantages';
import { motion } from 'framer-motion';


export default function MembershipAdvantages() {
  return (
    <section className="py-24 px-4 relative overflow-hidden ">
      {/* تأثير إضاءة خلفي سينمائي */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            Exclusive <span className="text-gold">Privileges</span>
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES.map((adv, index) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="h-full glass p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-500 shadow-2xl flex flex-col items-start gap-6">
                
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/10 group-hover:bg-gold group-hover:text-navy transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  <adv.icon size={28} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <p className="text-white font-bold italic uppercase tracking-tight text-[17px] leading-tight group-hover:text-gold transition-colors duration-300">
                    {adv.text}
                  </p>
                  <div className="h-0.5 w-0 bg-gold group-hover:w-12 transition-all duration-500 rounded-full" />
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-8 text-white/[0.03] text-6xl font-black italic select-none group-hover:text-gold/[0.05] transition-colors">
                  0{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}