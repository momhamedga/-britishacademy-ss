"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACADEMY_ABOUT_TABS } from '@/lib/constants'; 

import OverviewTab from './OverviewTab';


export default function AcademyAbout() {
  const [activeTab, setActiveTab] = useState('accreditation');

  return (
    <section className="max-w-7xl mx-auto py-16 md:py-32 px-4 sm:px-6 md:px-12 relative z-10 font-inter overflow-hidden">
      
      {/* 1. Header Hub: تحسين الخطوط لتكون متجاوبة (Responsive Fonts) */}
      <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
        <div className="w-full overflow-hidden px-2">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={activeTab}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase font-syne italic tracking-tighter leading-[0.9]"
            >
              {activeTab === 'accreditation' && <>Global <span className="text-gold">Accreditation</span></>}
              {activeTab === 'overview' && <>Discover <span className="text-gold">Who We Are</span></>}
              {activeTab === 'experience' && <>Professional <span className="text-gold">Experience</span></>}
            </motion.h2>
          </AnimatePresence>
        </div>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          className="h-[1px] bg-gold/50 mt-6 md:mt-8" 
        />
      </div>

      {/* 2. Navigation Hub: تحسين التجاوب للموبايل (Scrollable on small screens) */}
      <div className="flex justify-center mb-16 md:mb-24 overflow-x-auto no-scrollbar pb-4">
        <nav className="inline-flex p-1.5 glass rounded-[2rem] md:rounded-[2.5rem] border border-white/5 backdrop-blur-xl shadow-2xl relative min-w-max">
          {ACADEMY_ABOUT_TABS.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 md:px-12 py-3.5 md:py-5 rounded-[1.4rem] md:rounded-[1.8rem] text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-500 z-10 whitespace-nowrap
                ${activeTab === tab.id ? 'text-navy' : 'text-white/40 hover:text-white'}`}
            >
              <span className="relative z-20">{tab.title}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activePill"
                  className="absolute inset-0 bg-gold rounded-[1.2rem] md:rounded-[1.5rem] shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* 3. Content Area: Modular Tab Switching */}
      <div className="relative min-h-[500px] md:min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {activeTab === 'accreditation' && <AccreditationTab />}
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'experience' && <ExperienceTab />}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}