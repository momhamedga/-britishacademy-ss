"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ADVANTAGES } from '@/lib/membership/membership-Advantages';

export default function MembershipBeneficiaries() {
  return (
    <section className="py-16 md:py-32 px-4 relative overflow-hidden ">
      {/* التأثيرات السينمائية الخلفية */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* الجانب الأيسر: الصورة (عرض أكبر + حدة قصوى) */}
          <div className="lg:col-span-6 xl:col-span-7 order-2 lg:order-1 group">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              /* تعديل العرض ليكون أكبر (XL: col-span-7) والأبعاد 16/9 تناسب الصورة العرضية */
              className="relative aspect-video lg:aspect-[16/9] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.6)] bg-navy-light"
            >
              {/* طبقة Sharpening برمجية لزيادة الوضوح */}
              <div className="absolute inset-0 bg-navy/5 z-10 pointer-events-none mix-blend-overlay" />
              
              <Image 
                src="/membership-1.webp" 
                alt="IAHS Professionals" 
                fill
                unoptimized // لضمان عدم ضغط الصورة نهائياً وحل البكسلة
                priority
                className="object-cover object-center transition-all duration-[2s] ease-out group-hover:scale-105 brightness-[1.08] contrast-[1.1]"
              />

              {/* تأثير التدرج السينمائي (Vignette) لتركيز الإضاءة في المنتصف */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-70 z-20" />

              {/* Floating Tech Tag */}
              <div className="absolute top-6 left-6 z-30 flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-[0.2em]">IAHS Professional Hub</span>
              </div>
            </motion.div>
          </div>

          {/* الجانب الأيمن: النصوص (أحجام ذكية وتجاوب مرن) */}
          <div className="lg:col-span-6 xl:col-span-5 order-1 lg:order-2 space-y-10 md:space-y-14">
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[clamp(2rem,6vw,3.5rem)] font-black text-white italic tracking-tighter uppercase leading-[0.85] md:leading-[0.8]"
              >
                Membership <br /> <span className="text-gold">Perks</span>
              </motion.h2>
              <div className="h-1.5 w-20 bg-gold rounded-full shadow-[0_0_15px_#D4AF37]" />
            </div>

            {/* Grid المميزات: تم ضبط التجاوب ليكون 1 عمود في الموبايل و2 في التابلت */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
              {ADVANTAGES.map((adv, idx) => (
                <motion.div
                  key={adv.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3 md:p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.07] hover:border-gold/20 transition-all duration-300 group/item"
                >
                  {/* Icon Container */}
                  <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl bg-navy-light border border-white/10 flex items-center justify-center text-gold group-hover/item:bg-gold group-hover/item:text-navy transition-all duration-500 shadow-lg">
                    <adv.icon size={20} strokeWidth={1.5} className="md:w-6 md:h-6" />
                  </div>
                  
                  <div className="min-w-0">
                    <p className="text-slate-200 text-[12px] md:text-[14px] font-semibold leading-tight group-hover/item:text-white transition-colors">
                      {adv.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}