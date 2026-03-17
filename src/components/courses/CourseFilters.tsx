"use client"
import { motion } from 'framer-motion';
import { useAcademyStore, useAcademyActions } from "@/store/useAcademyStore";
import { CATEGORIES } from '@/lib/constants';



export default function CourseFilters() {
  const { activeCategory } = useAcademyStore();
  const { setActiveCategory } = useAcademyActions();

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      {/* Label Section */}
      <div className="flex items-center gap-3 px-1">
        <div className="h-[1px] w-6 md:w-8 bg-gold/50" />
        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
          Filter by Sector
        </span>
      </div>

      {/* Container الرئيسي: بيسمح بالتمرير في الموبايل والترتيب المنظم في الديسكتوب */}
      <div className="w-full relative px-1">
        <nav className="flex flex-nowrap md:flex-wrap items-center gap-2 md:gap-3 overflow-x-auto md:overflow-visible no-scrollbar pb-4 md:pb-0">
          <div className="flex p-1.5 glass rounded-[2.5rem] border border-white/5 backdrop-blur-2xl shadow-2xl w-max md:w-full md:grid md:grid-cols-4 lg:flex lg:w-max">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-3.5 md:py-4 rounded-[1.8rem] text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] transition-all duration-700 z-10 whitespace-nowrap 
                    ${isActive ? 'text-navy' : 'text-slate-400 hover:text-white'} 
                    flex-shrink-0 md:flex-1 lg:flex-none transition-all`}
                >
                  <Icon 
                    size={14} 
                    className={`${isActive ? 'text-navy' : 'text-gold/60'} transition-colors duration-500 flex-shrink-0`} 
                  />
                  
                  <span className="relative z-20">{cat.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-gold rounded-[1.6rem] shadow-[0_15px_35px_rgba(212,175,55,0.4)]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
        
        {/* تأثير الـ Gradient الصغير في الأطراف (فقط في الموبايل) ليوحي بوجود تمرير */}
        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-navy to-transparent pointer-events-none md:hidden" />
      </div>
    </div>
  );
}