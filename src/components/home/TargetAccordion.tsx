"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Users } from 'lucide-react';
import { ACCREDITATION_TARGET_INFO } from '@/lib/constants/accreditation';

export default function TargetAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 md:mt-10">
      <div className={`rounded-[2rem] md:rounded-[3rem] border transition-all duration-700 ease-in-out ${
        isOpen 
        ? 'bg-white/[0.04] border-gold/40 shadow-[0_20px_60px_rgba(212,175,55,0.08)] scale-[1.02]' 
        : 'bg-white/[0.01] border-white/5 hover:border-white/10'
      }`}>
        
        {/* زر الفتح - تم تكبير مساحة اللمس وتحسين النصوص */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-full flex items-center justify-between p-6 md:p-10 text-left group transition-all"
        >
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex p-3 rounded-2xl transition-colors duration-500 ${isOpen ? 'bg-gold/10 text-gold' : 'bg-white/5 text-white/40'}`}>
              <Users size={20} />
            </div>
            <span className={`font-black uppercase text-[11px] md:text-sm tracking-[0.2em] md:tracking-[0.4em] transition-colors duration-500 ${
              isOpen ? 'text-gold' : 'text-white/70 group-hover:text-white'
            }`}>
              Target Audience
            </span>
          </div>

          <div className={`p-3 rounded-full transition-all duration-500 ${
            isOpen ? 'bg-gold text-navy rotate-180' : 'bg-white/5 text-gold'
          }`}>
             {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
          </div>
        </button>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="overflow-hidden"
            >
              <div className="px-8 md:px-14 pb-10 space-y-6">
                {/* خط فاصل أنيق */}
                <div className="h-px w-full bg-gradient-to-r from-gold/20 via-transparent to-transparent mb-8" />
                
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {ACCREDITATION_TARGET_INFO.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gold/40 group-hover/item:bg-gold transition-colors" />
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light hover:text-slate-200 transition-colors">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div> 
  );
}