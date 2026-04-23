"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare } from "lucide-react";
import { REVIEWS } from "@/lib/constants/clientReviews";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function ClientReviews() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!mounted) return <ReviewsSkeleton />;

  return (
    <section className="relative py-20 md:py-48 overflow-hidden ">
      {/* 🌌 الـ Background "الخرافية" - نيون خفيف وتدرجات ناعمة */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#D4AF3715,transparent_50%)] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 size-[500px] bg-navy/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10 px-4 md:px-12">
 <header className="flex flex-col items-center text-center mb-16 md:mb-28">
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--academy-gold)]/20 bg-[var(--academy-gold)]/5 mb-8 shadow-[0_4px_15px_-3px_rgba(var(--academy-gold),0.1)]"
  >
    <div className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--academy-gold)] opacity-40"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--academy-gold)]"></span>
    </div>
    <span className="font-[var(--font-sans)] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[var(--academy-gold-dark)]">
       Reviews
    </span>
  </motion.div>
  
  <h2 className="font-[var(--font-display)] text-5xl md:text-[105px] font-black italic uppercase tracking-tighter text-[var(--academy-navy)] leading-[0.95] md:leading-[0.85]">
    Client <span className="text-transparent bg-clip-text bg-gradient-to-b from-[var(--academy-gold)] via-[var(--academy-gold)] to-[var(--academy-gold-dark)] filter drop-shadow-sm">
      Reviews
    </span> 

  </h2>


</header>
        {/* 🎡 Carousel Wrapper مع تحسينات الموبايل */}
        <div className="relative group/main">
          <div 
            ref={scrollRef}
            className="flex gap-5 md:gap-10 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-16 md:pb-24 px-2 md:px-0"
          >
            {REVIEWS.map((review) => (
              <div key={review.id} className="snap-center shrink-0">
                <ReviewCard review={review} isDesktop={isDesktop} />
              </div>
            ))}
          </div>

          {/* 🏹 Navigation - بتصميم "Glassmorphism" للديسكتوب */}
          {isDesktop && (
            <div className="absolute top-1/2 -inset-x-20 -translate-y-1/2 flex justify-between opacity-0 group-hover/main:opacity-100 transition-all duration-500 pointer-events-none">
              <NavButton direction="left" onClick={() => handleScroll('left')} />
              <NavButton direction="right" onClick={() => handleScroll('right')} />
            </div>
          )}
        </div>

        {/* Indicator خطي ذكي */}
        <div className="flex justify-center">
          <div className="h-[3px] w-32 bg-navy/5 rounded-full overflow-hidden">
             <ScrollProgress containerRef={scrollRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, isDesktop }: { review: any, isDesktop: boolean }) {
  return (
    <motion.div 
      whileHover={isDesktop ? { y: -10 } : {}}
      className="
        relative flex flex-col justify-between bg-white
        border border-black/[0.03] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]
        /* تصغير العرض والارتفاع قليلاً للرشاقة */
        w-[85vw] md:w-[420px] h-[380px] md:h-[420px] 
        p-7 md:p-10 rounded-[2.5rem] md:rounded-[3rem]
        transition-all duration-500
      "
    >
      {/* 🕊️ أيقونة خلفية هادئة جداً باستخدام الـ Navy الجديد بشفافية منخفضة */}
      <Quote className="absolute top-8 right-10 size-20 md:size-28 text-[var(--academy-navy)]/[0.012] pointer-events-none z-0" />

      <div className="space-y-5 md:space-y-6 relative z-10">
        <div className="flex justify-between items-center">
          {/* صندوق الأيقونة أصغر وأرق */}
          <div className="size-10 md:size-12 rounded-xl md:rounded-2xl bg-[var(--academy-gold)]/5 flex items-center justify-center text-[var(--academy-gold)] border border-[var(--academy-gold)]/10">
            <Quote className="size-5 md:size-6 opacity-50" strokeWidth={1.5} fill="currentColor" />
          </div>
          
          <div className="flex gap-0.5 bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-black/[0.02]">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                fill={i < review.rating ? "var(--academy-gold)" : "none"} 
                className={`size-2.5 md:size-3 ${i < review.rating ? "text-[var(--academy-gold)]" : "text-[var(--academy-navy)]/10"}`} 
              />
            ))}
          </div>
        </div>
        
        {/* تصغير خط المحتوى - Font Display used here */}
        <p className="font-[var(--font-sans)] text-[14px] md:text-[17px] text-[var(--academy-navy)]/80 leading-relaxed md:leading-normal font-medium italic tracking-tight line-clamp-5">
          &quot;{review.text}&quot;
        </p>
      </div>

      {/* الفوتر - مصغر ومنظم */}
      <div className="mt-auto pt-6 border-t border-slate-100/60 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative isolate">
            {/* Avatar بـ Ring أبيض ناعم */}
            <div className="size-11 md:size-13 rounded-full bg-[var(--academy-navy)] flex items-center justify-center text-[var(--academy-gold)] font-bold text-xs md:text-sm overflow-hidden ring-2 ring-white shadow-md">
              {review.name.charAt(0)}
            </div>
            
            {/* Verified Badge مصغر جداً وبدقة عالية */}
            <div className="absolute -bottom-0.5 -right-0.5 z-30 flex items-center justify-center">
                <div className="absolute size-4 md:size-5 bg-white rounded-full shadow-sm" />
                <CheckCircle2 
                  className="relative z-40 text-[#3B82F6] fill-[#3B82F6]/10 size-3.5 md:size-4.5" 
                  strokeWidth={2.5}
                />
            </div>
          </div>

          <div className="flex flex-col">
            {/* استخدام Syne للعناوين مع تصغير الحجم */}
            <h4 className="font-[var(--font-display)] text-[var(--academy-navy)] font-extrabold text-[11px] md:text-[13px] uppercase tracking-wider leading-none">
              {review.name}
            </h4>
            <span className="font-[var(--font-sans)] text-[8px] md:text-[10px] text-[var(--academy-navy)]/40 uppercase font-bold tracking-[0.1em] mt-1">
              Verified Graduate
            </span>
          </div>
        </div>
        
        {/* Google Icon Box - Slimmed down */}
        <div className="size-10 md:size-12 bg-white rounded-xl md:rounded-[1.1rem] flex items-center justify-center border border-black/[0.04] shadow-sm hover:bg-slate-50 transition-colors">
           <GoogleIcon className="size-5 md:size-6" />
        </div>
      </div>
    </motion.div>
  );
}
// المكونات الفرعية (Sub-components)
function ScrollProgress({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });
  return <motion.div style={{ scaleX }} className="h-full bg-gold origin-left" />;
}

function NavButton({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="size-16 md:size-20 rounded-full bg-white/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/5 text-navy pointer-events-auto flex items-center justify-center transition-all hover:bg-[#0A1D37] hover:text-gold active:scale-90 group/btn"
    >
      {direction === 'left' ? <ChevronLeft size={30} /> : <ChevronRight size={30} />}
    </button>
  );
}

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const ReviewsSkeleton = () => (
  <div className="py-40 flex justify-center gap-10 overflow-hidden px-8">
    {[1, 2, 3].map(i => (
      <div key={i} className="w-[480px] h-[480px] bg-slate-50 rounded-[4rem] animate-pulse shrink-0" />
    ))}
  </div>
);