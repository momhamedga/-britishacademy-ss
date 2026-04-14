"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, ShieldCheck, Zap, Globe, Users, Target } from 'lucide-react';

// 📊 البيانات بناءً على الصور المرفقة
const PRICING_DATA = {
  Individual: [
    { name: "Basic", price: "99", features: ["3 courses per month", "Digital certificates", "Email support"], popular: false },
    { name: "Pro", price: "199", features: ["Unlimited courses", "Accredited certificates", "24/7 support", "Virtual labs access"], popular: true },
  ],
  Corporate: [
    { name: "Enterprise", price: "499", features: ["Unlimited employees", "Corporate dashboard", "Performance reports", "Dedicated trainer"], popular: false },
  ]
};

export default function PricingSection({ activeType }: { activeType: 'Corporate' | 'Individual' }) {
  const [mounted, setMounted] = useState(false);

  // حل مشكلة الـ Hydration Error
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Grid الحزم */}
        <div className={`grid gap-8 justify-center ${activeType === 'Individual' ? 'md:grid-cols-2 lg:max-w-4xl mx-auto' : 'max-w-md mx-auto'}`}>
          <AnimatePresence mode="wait">
            {PRICING_DATA[activeType].map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </AnimatePresence>
        </div>

{/* 🛡️ Strategic Partners Section - Clean White Version */}
<motion.div 
  initial={{ opacity: 0, y: 40 }} 
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-32 border-t border-slate-100 pt-20  relative"
>
{/* 🎖️ Strategic Header Section */}
<div className="text-center mb-16 space-y-4">
  
  {/* 🎖️ Badge: Tactical Glassmorphism (Navy & Gold) */}
  <motion.div 
    initial={{ opacity: 0, y: 15 }} 
    animate={{ opacity: 1, y: 0 }} 
    className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50/50 px-6 py-2 backdrop-blur-md shadow-sm"
  >
    {/* لون الجولد التكتيكي من الهوية */}
    <Check size={14} className="text-[oklch(75%_0.15_85)]" />
    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[oklch(25%_0.08_260)]">
      trusted 
    </span>
  </motion.div>
  
 <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black italic uppercase tracking-tighter leading-[0.9] mb-8 text-center">
  {/* 🔵 Trusted By: Navy Color with Fluid Size */}
  <span className="text-[oklch(25%_0.08_260)] block md:inline">
    trusted by{" "}
  </span>
  
  {/* 🟡 +500 Companies: Gold Gradient with Responsive Wrap */}
  <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#D4AF37]/80 to-[#1B2A41]/20    block md:inline-block">
    +500 companies
  </span>
</h1>

</div>

  {/* 🧩 Grid الشركات - تصميم نظيف بهوية Gold/Navy */}
  <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto px-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <motion.div
        key={i}
        whileHover={{ y: -5 }}
        className="px-8 py-5 border border-slate-100 bg-[#F8FAFC] rounded-2xl transition-all hover:border-[oklch(75%_0.15_85)] hover:shadow-lg hover:shadow-gold/5 group"
      >
        <span className="font-mono text-[10px] uppercase tracking-tighter text-slate-400 group-hover:text-[oklch(25%_0.08_260)] font-bold transition-colors">
          PARTNER_REF_{i}
        </span>
      </motion.div>
    ))}
  </div>


</motion.div>
      </div>
    </div>
  );
}

function PricingCard({ plan, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1 }}
      className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 bg-white ${
        plan.popular ? 'border-[oklch(75%_0.15_85)] shadow-2xl z-10' : 'border-slate-100 shadow-sm'
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[oklch(75%_0.15_85)] text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-slate-900 text-2xl font-black italic uppercase mb-1">{plan.name}</h3>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">{plan.name} Plan Access</p>
      </div>

      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-slate-400 font-bold text-sm">SAR</span>
        <span className="text-slate-900 text-5xl font-black tracking-tighter">{plan.price}</span>
        <span className="text-slate-400 font-medium">/month</span>
      </div>

      <div className="space-y-4 mb-10">
        {plan.features.map((feat: string) => (
          <div key={feat} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-[oklch(75%_0.15_85)]/20' : 'bg-slate-100'}`}>
              <Check size={12} className={plan.popular ? 'text-[oklch(75%_0.15_85)]' : 'text-slate-400'} strokeWidth={4} />
            </div>
            <span className="text-slate-600 text-sm font-medium italic">{feat}</span>
          </div>
        ))}
      </div>

      <motion.button 
        whileTap={{ scale: 0.97 }}
        className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
          plan.popular 
          ? 'bg-[oklch(75%_0.15_85)] text-black shadow-lg shadow-gold/20' 
          : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'
        }`}
      >
        {plan.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
      </motion.button>
    </motion.div>
  );
}