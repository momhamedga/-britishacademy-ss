"use client";

import { motion } from 'framer-motion';
import { Target, Users, Briefcase, type LucideIcon } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';

export default function PlansHero({ activeType, setType }: {
  activeType: 'Corporate' | 'Individual',
  setType: (val: 'Corporate' | 'Individual') => void
}) {
  return (
    <PageHero icon={Target} eyebrow="Strategic Membership" title="Choose" highlight="Your Plan">
      <div className="w-full max-w-160 mx-auto grid grid-cols-2 gap-4 p-2 rounded-[2.5rem] bg-white/2 border border-white/5 backdrop-blur-2xl shadow-2xl">
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
    </PageHero>
  );
}

function PlanToggleButton({ icon: Icon, label, isActive, onClick }: { icon: LucideIcon; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`relative py-8 md:py-12 rounded-4xl flex flex-col items-center gap-5 transition-all duration-500 overflow-hidden ${
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
