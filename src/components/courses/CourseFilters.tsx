"use client"
import { useAcademyStore } from "@/store/useAcademyStore";
import { CATEGORIES } from '@/lib/constants';

export default function CourseFilters() {
  // 1. استدعاء الـ State باستخدام Selectors (أهم خطوة للأداء)
  const activeCategory = useAcademyStore((state) => state.activeCategory);
  const activeLevel = useAcademyStore((state) => state.activeLevel);
  const activeDuration = useAcademyStore((state) => state.activeDuration);

  // 2. استدعاء الـ Actions مباشرة من الستور
  const setActiveCategory = useAcademyStore((state) => state.setActiveCategory);
  const setActiveLevel = useAcademyStore((state) => state.setActiveLevel);
  const setActiveDuration = useAcademyStore((state) => state.setActiveDuration);
  const resetFilters = useAcademyStore((state) => state.resetFilters);

  const LEVELS = [
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Specialization */}
      <div className="space-y-4">
        <h3 className="text-[12px] font-black uppercase tracking-widest text-navy/40 px-2">Specialization</h3>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-navy/5 cursor-pointer group transition-colors">
              <input 
                type="checkbox" 
                checked={activeCategory === cat.id}
                onChange={() => setActiveCategory(cat.id)}
                className="w-4 h-4 accent-gold cursor-pointer"
              />
              <span className={`text-xs font-bold transition-colors ${activeCategory === cat.id ? 'text-gold' : 'text-navy/70'}`}>
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Level */}
      <div className="space-y-4">
        <h3 className="text-[12px] font-black uppercase tracking-widest text-navy/40 px-2">Level</h3>
        <div className="flex flex-col gap-1">
          {LEVELS.map((level) => (
            <label key={level.id} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-navy/5 cursor-pointer group transition-colors">
              <input 
                type="checkbox" 
                checked={activeLevel === level.id}
                onChange={() => setActiveLevel(level.id)}
                className="w-4 h-4 accent-gold cursor-pointer"
              />
              <span className={`text-xs font-bold transition-colors ${activeLevel === level.id ? 'text-gold' : 'text-navy/70'}`}>
                {level.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-4 px-2">
        <h3 className="text-[12px] font-black uppercase tracking-widest text-navy/40">Duration</h3>
        <select 
          value={activeDuration}
          onChange={(e) => setActiveDuration(e.target.value)}
          className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3 text-[11px] font-black uppercase text-navy outline-none focus:border-gold transition-all shadow-sm"
        >
          <option value="">Select Duration</option>
          <option value="Days">Short (1-3 Days)</option> 
          <option value="Week">Medium (1 Week+)</option>
        </select>
      </div>

      <div className="pt-4 space-y-3">
        {/* زر الـ Apply في Zustand Reactive ليس إجبارياً لأن النتائج تتحدث فوراً، لكنه جيد للـ UX في الموبايل */}
        <button className="w-full bg-navy text-white font-black uppercase py-4 rounded-xl text-[10px] tracking-[0.2em] shadow-lg shadow-navy/10 active:scale-[0.98] transition-all">
          Apply Filter
        </button>
        
        {(activeCategory !== 'all' || activeLevel || activeDuration) && (
          <button 
            onClick={resetFilters} 
            className="w-full text-red-500/60 font-bold uppercase py-2 text-[10px] tracking-widest hover:text-red-500 transition-colors flex items-center justify-center gap-2"
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
}