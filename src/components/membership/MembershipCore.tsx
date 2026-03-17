"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { ACCREDITED_ADVANTAGES, CERTIFICATE_IMAGES } from '@/lib/membership/certificate-data';
import { MEMBERSHIP_ADVANTAGES } from '@/lib/membership/membership-data';
import { TABS_MEMBERSHIP } from '@/lib/constants';

export default function MembershipCore() {
  const [activeTab, setActiveTab] = useState('membership');
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % CERTIFICATE_IMAGES.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + CERTIFICATE_IMAGES.length) % CERTIFICATE_IMAGES.length);

  const currentAdvantages = activeTab === 'certificate' ? ACCREDITED_ADVANTAGES : MEMBERSHIP_ADVANTAGES;

  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden ">
      {/* Dynamic Background: إضاءة متحركة خفيفة */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. Navigation Tabs: تصميم Glassmorphism متطور */}
        <div className="flex justify-center mb-24">
          <div className="inline-flex gap-2 p-2 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl">
            {TABS_MEMBERSHIP.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                   setActiveTab(tab.id);
                   setCurrentImg(0); // إعادة تصفير السلايدر عند النقل
                }}
                className={`relative px-6 md:px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-[0.15em] text-[10px] md:text-xs transition-all duration-500 ${
                  activeTab === tab.id ? 'text-navy' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon size={16} className={activeTab === tab.id ? 'text-navy' : 'text-gold'} />
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabGlow" 
                    className="absolute inset-0 bg-gold rounded-[1.5rem] shadow-[0_0_30px_rgba(212,175,55,0.4)]" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* الجانب الأيسر: Visual Showcase */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {activeTab === 'certificate' ? (
                <motion.div 
                  key="cert-slider"
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: 10 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative group perspective-1000"
                >
                  {/* إطار الشهادة السينمائي */}
                  <div className="relative aspect-[4/3] w-full max-w-[580px] mx-auto rounded-[2.5rem] overflow-hidden border border-white/20 bg-navy-light/50 backdrop-blur-2xl p-3 md:p-6 shadow-[0_40px_100px_rgba(0,0,0,0.7)] group-hover:border-gold/30 transition-all duration-700">
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10" />
                    
                    <motion.div
                      key={currentImg}
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full"
                    >
                      <Image 
                        src={CERTIFICATE_IMAGES[currentImg]} 
                        alt="Elite Certificate" 
                        fill
                        unoptimized // للحفاظ على الحدة القصوى للخطوط في الشهادة
                        className="object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
                      />
                    </motion.div>

                    {/* أزرار التحكم المختفية بتصميم نيون */}
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button onClick={prevImg} className="p-4 bg-navy/80 backdrop-blur-xl border border-white/10 rounded-full text-gold hover:bg-gold hover:text-navy transition-all transform hover:-translate-x-2">
                        <ChevronLeft size={24}/>
                      </button>
                      <button onClick={nextImg} className="p-4 bg-navy/80 backdrop-blur-xl border border-white/10 rounded-full text-gold hover:bg-gold hover:text-navy transition-all transform hover:translate-x-2">
                        <ChevronRight size={24}/>
                      </button>
                    </div>
                  </div>

                  {/* العداد السفلي (Dots) */}
                  <div className="flex justify-center gap-3 mt-8">
                    {CERTIFICATE_IMAGES.map((_, i) => (
                      <motion.div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ${currentImg === i ? 'w-10 bg-gold shadow-[0_0_10px_#D4AF37]' : 'w-2 bg-white/10'}`} 
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="membership-visual"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="relative aspect-square max-w-[500px] mx-auto rounded-[4rem] border border-gold/20 bg-gradient-to-tr from-gold/10 via-transparent to-white/5 flex flex-col items-center justify-center p-10 shadow-[0_0_80px_rgba(212,175,55,0.05)] overflow-hidden"
                >
                   {/* خلفية تقنية متحركة */}
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[1px] border-dashed border-gold/10 rounded-full scale-75" 
                  />
                  
                  <div className="relative z-10 text-center space-y-6">
                    <div className="w-24 h-24 bg-gold/10 rounded-[2rem] flex items-center justify-center mx-auto text-gold border border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                       <ShieldCheck size={48} strokeWidth={1.2} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-white tracking-widest uppercase italic">Official<br/><span className="text-gold">Core Identity</span></h3>
                      <div className="flex justify-center gap-1">
                        {[1,2,3].map(i => <Sparkles key={i} size={12} className="text-gold/40" />)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* الجانب الأيمن: المحتوى النصي */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-12 bg-gold" />
                    <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Global Recognition</span>
                  </div>
                  
                  <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white italic uppercase leading-[0.85] tracking-tighter">
                    {TABS_MEMBERSHIP.find(t => t.id === activeTab)?.title.split(' ').map((word, i) => 
                      word === 'Mission' || word === 'Certificates' ? <span key={i} className="text-gold block drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">{word}</span> : word + ' '
                    )}
                  </h2>
                  
                  <div className="space-y-5 text-slate-400 text-lg leading-relaxed font-medium max-w-xl">
                    {TABS_MEMBERSHIP.find(t => t.id === activeTab)?.content.map((p, i) => (
                      <p key={i} className="hover:text-slate-200 transition-colors">{p}</p>
                    ))}
                  </div>
                </div>

                {/* قائمة المميزات: تصميم Interactive Cards */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gold/40 uppercase tracking-[0.5em] ml-2">Exclusive Benefits</h4>
                  <div className="grid gap-3">
                    {currentAdvantages.map((adv, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-gold/40 hover:bg-white/[0.06] transition-all duration-500 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-navy-light border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500">
                          <adv.icon size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-slate-200 text-sm md:text-base font-bold group-hover:text-white transition-colors">
                          {adv.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}