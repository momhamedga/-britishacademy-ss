"use client";
import { useSyncExternalStore, useRef, memo,  useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/lib/constants/clientReviews";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function ClientReviews() {
  const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;
const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const scrollRef = useRef<HTMLDivElement>(null);



const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  
  if (!isMounted) return <ReviewsSkeleton />;
  return (
    <section className="relative py-20 md:py-48 bg-transparent">
      <div className="max-w-360 mx-auto relative z-10 px-4 md:px-12">
        <header className="flex flex-col items-center text-center mb-16 md:mb-28">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-gold/10 bg-gold/5 mb-8"
          >
            <div className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </div>
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-gold-dark">
                Reviews
            </span>
          </motion.div>
          
          <h2 className="font-black text-5xl md:text-[105px] font-black italic uppercase tracking-tighter text-navy leading-[0.85]">
            Client 
            {/* ✅ v4: bg-linear-to-b هو السنتاكس الجديد للجرادينت */}
            <span className="text-transparent bg-clip-text bg-linear-to-b from-gold to-gold-dark">
              Reviews
            </span> 
          </h2>
        </header>

        <div className="relative group/main">
          <div 
            ref={scrollRef}
            className="flex gap-5 md:gap-10 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-16 md:pb-24 will-change-transform"
          >
            {REVIEWS.map((review) => (
              <div key={review.id} className="snap-center shrink-0">
                <ReviewCard review={review} isDesktop={isDesktop} />
              </div>
            ))}
          </div>

          {isDesktop && (
            <div className="absolute top-1/2 -inset-x-20 -translate-y-1/2 flex justify-between opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 pointer-events-none">
              <NavButton direction="left" onClick={() => handleScroll('left')} />
              <NavButton direction="right" onClick={() => handleScroll('right')} />
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {/* ✅ v4: h-0.5 تعادل 2px */}
          <div className="h-0.5 w-32 bg-navy/5 rounded-full overflow-hidden">
             <ScrollProgress containerRef={scrollRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

const ReviewCard = memo(({ review, isDesktop }: { review: any, isDesktop: boolean }) => {
  return (
    <motion.div 
      whileHover={isDesktop ? { y: -5 } : {}}
      className="
        relative flex flex-col justify-between bg-white
        border border-navy/5 shadow-sm
        w-[85vw] md:w-105 h-95 md:h-105 
        p-7 md:p-10 rounded-2xl md:rounded-3xl
      "
    >
      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-center">
          <div className="size-10 md:size-12 rounded-xl bg-gold/5 flex items-center justify-center text-gold">
            <Quote className="size-5" strokeWidth={1.5} fill="currentColor" />
          </div>
          
          <div className="flex gap-0.5 px-3 py-1.5 rounded-full bg-slate-50">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                fill={i < review.rating ? "var(--color-gold)" : "none"} 
                className={`size-3 ${i < review.rating ? "text-gold" : "text-slate-200"}`} 
              />
            ))}
          </div>
        </div>
        
        <p className="font-sans text-[15px] md:text-[17px] text-navy/80 leading-relaxed font-medium italic line-clamp-5">
          &quot;{review.text}&quot;
        </p>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-11 md:size-13 rounded-full bg-navy flex items-center justify-center text-gold font-bold ring-2 ring-white shadow-sm">
            {review.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <h4 className="font-display text-navy font-black text-xs md:text-sm uppercase tracking-wider">
              {review.name}
            </h4>
            <span className="text-[9px] text-navy/40 uppercase font-bold mt-1">
              Verified Graduate
            </span>
          </div>
        </div>
        <GoogleIcon className="size-5 opacity-20" />
      </div>
    </motion.div>
  );
});

ReviewCard.displayName = "ReviewCard";
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