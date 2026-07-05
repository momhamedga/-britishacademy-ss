"use client";

import { motion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/lib/membership/about';
import PageHero from '@/components/shared/PageHero';

export default function TacticalAbout() {
  return (
    <PageHero
      eyebrow={ABOUT_CONTENT.badge}
      title="We Are"
      highlight="Global Security"
      description={ABOUT_CONTENT.description}
      align="left"
      fullHeight={false}
    >
      {/* 📱 Bento Cards - Tactical Dark Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-280 mt-4">
        {ABOUT_CONTENT.cards.map((card, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="animated-border relative group p-8 md:p-14 bg-white/3 backdrop-blur-sm rounded-[2.5rem] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-500 overflow-hidden"
          >
            {/* الضوء الجانبي عند الهوفر */}
            <div className="absolute inset-0 bg-linear-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
              {/* Icon Container */}
              <div className="p-5 rounded-2xl bg-linear-to-br from-white/5 to-gold/10 border border-white/10 shadow-xl group-hover:border-gold/30 transition-colors">
                <card.icon size={28} className="text-gold" strokeWidth={1.5} />
              </div>

              <div className="space-y-4">
                <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic">
                  {card.title}
                </h4>
                <p className="text-sm md:text-lg text-white/60 font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                  {card.desc}
                </p>
              </div>
            </div>

            {/* Tactical Corners */}
            <div className="absolute bottom-6 right-6 size-4 border-b border-r border-white/10 rounded-br-md" />
          </motion.div>
        ))}
      </div>
    </PageHero>
  );
}
