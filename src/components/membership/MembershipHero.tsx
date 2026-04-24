"use client";

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Briefcase } from 'lucide-react';

// ✅ دالات الـ Sync الاحترافية
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function PlansHero({ activeType, setType }: { 
  activeType: 'Corporate' | 'Individual', 
  setType: (val: 'Corporate' | 'Individual') => void 
}) {
  // ✅ وداعاً للخطوط الحمراء والـ Double Rendering
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) return <section className="min-h-[70vh] bg-navy" />;

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-navy">
      {/* Background Decor using Tailwind v4 size and blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] size-[80%] rounded-full opacity-20 blur-[120px] bg-mediumBlue" />
        <div className="absolute bottom-[-10%] left-[-5%] size-1/2 rounded-full opacity-10 blur-[100px] bg-gold" />
      </div>

      <div className="max-w-320 mt-20 mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md"
        >
          <Target size={14} className="text-gold" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Strategic Membership</span>
        </motion.div>
        
        <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-10">
          Choose <br/>
          <span className="text-transparent bg-clip-text bg-linear-to-b from-gold to-gold/40">Your Plan</span>
        </h1>

        <div className="w-full max-w-160 grid grid-cols-2 gap-4 p-2 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl shadow-2xl">
          <PlanToggleButton 
            icon={Briefcase} 
            label="Corporate" 
            isActive={activeType === 'Corporate'} 
            onClick={() => setType('Corporate')} 
          />
          <PlanToggleButton 
            icon={Users} 
            label="Individual" 
            isActive={activeType === 'Individual'} 
            onClick={() => setType('Individual')} 
          />
        </div>
      </div>
    </section>
  );
}

function PlanToggleButton({ icon: Icon, label, isActive, onClick }: any) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`relative py-8 md:py-12 rounded-[2rem] flex flex-col items-center gap-5 transition-all duration-500 overflow-hidden ${
        isActive ? 'bg-gold text-navy shadow-lg' : 'bg-white/5 text-white/40 border border-white/5'
      }`}
    >
      <div className={`p-4 rounded-2xl transition-colors ${isActive ? 'bg-navy/10' : 'bg-white/5'}`}>
        <Icon size={28} strokeWidth={isActive ? 2.5 : 1.5} />
      </div>
      <span className="text-sm md:text-xl font-black uppercase tracking-widest italic">{label}</span>
      
      {isActive && (
        <motion.div layoutId="activeGlow" className="absolute top-4 right-6 flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-navy animate-pulse" />
        </motion.div>
      )}
    </motion.button>
  );
}