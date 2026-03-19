"use client"
import { motion } from 'framer-motion';
import { useAcademyStore, useAcademyActions } from "@/store/useAcademyStore";
import { CATEGORIES } from '@/lib/constants';

export default function CourseFilters() {
  const { activeCategory } = useAcademyStore();
  const { setActiveCategory } = useAcademyActions();

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden mb-12">
      {/* 🧭 Sector Label - التسمية العلوية */}
      <div className="flex items-center gap-3 px-2">
        <div className="h-[1px] w-6 md:w-8 bg-gold/50" />
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 italic">
          Select Mission Sector
        </span>
      </div>

      {/* 🕹️ Navigation Container */}
      <div className="relative px-1 group">
        <nav className="flex flex-nowrap md:flex-wrap items-center gap-2 md:gap-3 overflow-x-auto md:overflow-visible no-scrollbar pb-6 md:pb-0">
          
          {/* الـ Container الزجاجي المحيط بالأزرار */}
          <div className="flex p-2 bg-white/[0.02] backdrop-blur-3xl rounded-[2.8rem] border border-white/5 shadow-2xl w-max md:w-full md:grid md:grid-cols-2 lg:flex lg:w-max group-hover:border-white/10 transition-colors">
            
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              // تأكد أن activeCategory يتطابق مع الـ ID القادم من الثوابت
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    relative flex items-center justify-center gap-3 
                    px-6 md:px-10 py-4 md:py-4.5 rounded-[2.2rem] 
                    text-[10px] md:text-[11px] font-black uppercase 
                    tracking-[0.15em] transition-all duration-500 
                    flex-shrink-0 md:flex-1 lg:flex-none outline-none
                    ${isActive ? 'text-[#020617]' : 'text-white/40 hover:text-white'}
                  `}
                >
                  {/* Icon - لون الأيقونة يتغير بناءً على الحالة */}
                  <Icon 
                    size={15} 
                    className={`relative z-20 transition-colors duration-500 ${isActive ? 'text-[#020617]' : 'text-gold/50'}`} 
                  />
                  
                  <span className="relative z-20 italic">{cat.label}</span>

                  {/* 🚀 The Active Pill (Framer Motion) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-gold rounded-[2rem] shadow-[0_0_30px_rgba(212,175,55,0.3)] z-10"
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 30,
                      }}
                    />
                  )}
                  
                  {/* Hover effect - هالة خفيفة عند الوقوف بالماوس */}
                  {!isActive && (
                    <motion.div 
                      className="absolute inset-0 bg-white/5 rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity" 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
        
        {/* Mobile Fade-out mask - تلاشي جانبي في الموبايل عشان يحسس المستخدم إن فيه تكملة */}
        <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none md:hidden z-30" />
      </div>
    </div>
  );
}