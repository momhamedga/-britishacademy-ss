"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ACCREDITATION_TYPES } from '@/lib/constants/accreditation';

export default function AboutAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <h4 className="text-gold text-[9px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
        Types of Accreditation <span className="h-[1px] flex-1 bg-gold/20"></span>
      </h4>
      {ACCREDITATION_TYPES.map((item) => (
        <div key={item.id} className={`rounded-2xl border transition-all duration-500 ${openIndex === item.id ? 'bg-white/[0.04] border-gold/30' : 'bg-transparent border-white/5'}`}>
          <button onClick={() => setOpenIndex(openIndex === item.id ? null : item.id)} className="w-full flex items-center justify-between p-5 text-left group">
            <span className={`font-bold uppercase text-[11px] tracking-tight transition-colors ${openIndex === item.id ? 'text-gold' : 'text-white/80 group-hover:text-white'}`}>
              {item.id}. {item.title}
            </span>
            <ChevronDown className={`text-gold size-4 transition-transform duration-500 ${openIndex === item.id ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openIndex === item.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="px-6 pb-6 text-slate-300 text-[11px] leading-relaxed border-t border-white/5 pt-4">
                  {item.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}