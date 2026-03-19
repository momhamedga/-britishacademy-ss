"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, ShieldCheck, Sparkles, Fingerprint, Maximize2 } from 'lucide-react';
import { ACCREDITED_ADVANTAGES, CERTIFICATE_IMAGES } from '@/lib/membership/certificate-data';
import { MEMBERSHIP_ADVANTAGES } from '@/lib/membership/membership-data';
import { TABS_MEMBERSHIP } from '@/lib/constants';

export default function MembershipCore() {
  const [activeTab, setActiveTab] = useState('membership');
  const [currentImg, setCurrentImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % CERTIFICATE_IMAGES.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + CERTIFICATE_IMAGES.length) % CERTIFICATE_IMAGES.length);

  const currentAdvantages = activeTab === 'certificate' ? ACCREDITED_ADVANTAGES : MEMBERSHIP_ADVANTAGES;

  return (
    <section className="py-16 md:py-32 px-4 relative overflow-hidden ">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. Mobile-Optimized Tabs (Sticky-friendly Segmented Control) */}
        <div className="flex justify-center mb-16 md:mb-24">
          <div className="flex w-full max-w-[400px] p-1.5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] relative">
            {TABS_MEMBERSHIP.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                   setActiveTab(tab.id);
                   setCurrentImg(0);
                }}
                className={`relative flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.6rem] text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-500 z-10 ${
                  activeTab === tab.id ? 'text-black' : 'text-white/40'
                }`}
              >
                <tab.icon size={14} />
                <span className="hidden xs:block">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabGlow" 
                    className="absolute inset-0 bg-gold rounded-[1.6rem] -z-10 shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          
          {/* 🖼️ الجانب الأيسر: Visual Showcase (With Touch Drag) */}
          <div className="lg:col-span-6 w-full">
            <AnimatePresence mode="wait">
              {activeTab === 'certificate' ? (
                <motion.div 
                  key="cert-slider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative"
                >
                  {/* Certificate Frame with Drag Support for Mobile */}
                  <motion.div 
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (info.offset.x > 50) prevImg();
                      else if (info.offset.x < -50) nextImg();
                    }}
                    className="relative aspect-[4/3] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-navy-light/20 backdrop-blur-3xl p-2 md:p-6 shadow-2xl group touch-pan-y"
                  >
                    <div className="absolute top-4 right-4 z-30 md:hidden">
                        <div className="bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                            <Fingerprint size={16} className="text-gold animate-pulse" />
                        </div>
                    </div>

                    <motion.div
                      key={currentImg}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <Image 
                        src={CERTIFICATE_IMAGES[currentImg]} 
                        alt="Elite Certificate" 
                        fill
                        unoptimized
                        className="object-contain p-2 transition-transform duration-700"
                      />
                    </motion.div>

                    {/* Desktop Hover Controls */}
                    <div className="hidden md:flex absolute inset-x-6 top-1/2 -translate-y-1/2 justify-between z-30 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={prevImg} className="p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-gold hover:bg-gold hover:text-black transition-all"><ChevronLeft size={24}/></button>
                        <button onClick={nextImg} className="p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-gold hover:bg-gold hover:text-black transition-all"><ChevronRight size={24}/></button>
                    </div>
                  </motion.div>

                  {/* Mobile Hint & Pagination */}
                  <div className="flex flex-col items-center gap-4 mt-8">
                    <p className="md:hidden text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Swipe to flip credentials</p>
                    <div className="flex gap-2">
                        {CERTIFICATE_IMAGES.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-500 ${currentImg === i ? 'w-8 bg-gold' : 'w-2 bg-white/10'}`} />
                        ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="identity-visual"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-square w-full max-w-[450px] mx-auto rounded-[3rem] border border-gold/10 bg-gradient-to-b from-gold/5 to-transparent flex items-center justify-center p-8 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-dashed border-gold/20 rounded-full" 
                  />
                  
                  <div className="relative z-10 text-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 md:w-28 md:h-28 bg-navy border border-gold/30 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                    >
                        <ShieldCheck size={40} className="text-gold md:w-14 md:h-14" strokeWidth={1} />
                    </motion.div>
                    <h3 className="text-2xl md:text-4xl font-black text-white uppercase italic leading-none tracking-tighter">
                      Verified <br/><span className="text-gold">Operator</span>
                    </h3>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ✍️ الجانب الأيمن: المحتوى النصي (Interactive List) */}
          <div className="lg:col-span-6 space-y-10 md:space-y-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-gold" />
                    <span className="text-gold text-[9px] font-black uppercase tracking-[0.3em]">IAHS Protocol</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase leading-[0.9] tracking-tighter">
                    {activeTab === 'membership' ? 'Strategic ' : 'Accredited '} 
                    <span className="text-gold">{activeTab === 'membership' ? 'Identity' : 'Certificates'}</span>
                  </h2>
                </div>

            {/* Benefits List - Styled as Interactive Mobile Tiles */}
<div className="grid gap-3">
  {currentAdvantages.map((adv, idx) => (
    <motion.div 
      key={idx}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-300"
    >
      {/* Icon Box */}
      <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl  border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
        {/* تم حذف md:size لأنها غير مدعومة برمجياً في المكون وتسبب Error */}
        <adv.icon size={22} strokeWidth={1.5} />
      </div>

      <div className="flex flex-col">
        <span className="text-white/90 text-[13px] md:text-base font-bold italic uppercase tracking-tight group-hover:text-white">
          {adv.text}
        </span>
        <span className="text-[8px] text-white/20 uppercase tracking-widest font-black mt-0.5 group-hover:text-gold/40">
          Authorized Perk
        </span>
      </div>
    </motion.div>
  ))}
</div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}