"use client"
import { 
  useTransition, 
  useMemo, 
  useCallback, 
} from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ACADEMY_HUB_ITEMS } from "@/lib/AcademyHub";

const COLORS = {
  navy: "oklch(25% 0.08 260)",
  gold: "#D4AF37",
  background: "oklch(98% 0.01 260)",
};

// انيميشن أخف وأسرع للموبايل
const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

export default function AcademyHub() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = useCallback((href: string) => {
    startTransition(() => {
      router.push(href);
    });
  }, [router]);

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-32 overflow-hidden" style={{ backgroundColor: COLORS.background }}>
      
      {/* Header - متجاوب تماماً */}
      <div className="mb-12 md:mb-16 flex flex-col items-center text-center md:items-start md:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/50 px-3 py-1 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-black/60">Why britishacademy</span>
        </motion.div>
        
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#1B2A41] md:text-6xl leading-none">
          why <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/60"> our academy</span>
        </h2>
      </div>

      {/* Grid System - تحسين الـ Gap للموبايل */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ACADEMY_HUB_ITEMS.map((item, index) => (
          <AcademyCard 
            key={item.id} 
            item={item} 
            index={index} 
            onNavigate={handleNavigation}
            isPending={isPending}
          />
        ))}
      </div>
    </section>
  );
}

function AcademyCard({ item, index, onNavigate, isPending }: any) {
  const Icon = item.icon;
  const router = useRouter();

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-20px" }}
      // استخدام will-change لتحسين أداء الـ scroll في الموبايل
      className="h-full will-change-transform"
    >
      <Link 
        href={item.href}
        onMouseEnter={() => router.prefetch(item.href)}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(item.href);
        }}
        // إضافة active:scale للموبايل (Haptic-like feel)
        className={`group relative block h-full overflow-hidden rounded-[2rem] border border-black/5 bg-white p-6 md:p-8 transition-all duration-500 
          hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] 
          active:scale-[0.98] active:bg-slate-50/50
          ${isPending ? 'opacity-70 grayscale' : ''}`}
      >
        
        {/* Scan Effect - مخفي في الموبايل لتوفير الموارد ويظهر في الـ Hover فقط */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden hidden md:block">
          <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent animate-[scan_2s_linear_infinite]" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between gap-8 md:gap-12">
          <div className="flex items-start justify-between">
            {/* Icon Container - تصغير بسيط للموبايل */}
            <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl border border-black/5 bg-black/[0.02] text-[#1B2A41] transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#D4AF37]/20">
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <ArrowUpRight size={20} className="text-[#D4AF37] md:opacity-0 md:translate-x-4 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#1B2A41] group-hover:text-[#D4AF37] transition-colors">
              {item.title}
            </h3>
            <p className="text-xs md:text-sm leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors line-clamp-3">
              {item.description}
            </p>
            {/* Progress line decoration */}
            <div className="h-[2px] w-8 bg-[#D4AF37]/20 transition-all duration-500 group-hover:w-full group-hover:bg-[#D4AF37]/50" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}