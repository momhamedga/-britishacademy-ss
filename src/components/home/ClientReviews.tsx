"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/lib/constants/clientReviews";

// ألوان الهوية متكيفة مع الخلفية الفاتحة
const COLORS = {
  bgLight: "oklch(98% 0.01 260)",
  navy: "oklch(25% 0.08 260)",
  gold: "#D4AF37",
  textDark: "oklch(20% 0.02 260)"
};

export default function ClientReviews() {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  // التحكم في السحب اليدوي
  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -el.clientWidth : el.clientWidth;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!mounted) return <ReviewsSkeleton />;

  return (
    <section 
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ backgroundColor: COLORS.bgLight }}
    >
      {/* 🌌 لمسة إضاءة ناعمة جداً في الخلفية الفاتحة */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16 md:mb-24 space-y-4">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/50 px-3 py-1 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-black/60">testimonials </span>
        </motion.div>
        
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#1B2A41] md:text-6xl leading-none">
          what our  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/60"> trainees say</span>
        </h2>
        </header>

        {/* Carousel Container */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none' }}
          >
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Navigation - Floating Styled Buttons */}
          <div className="hidden lg:flex absolute -inset-x-16 top-1/2 -translate-y-1/2 justify-between pointer-events-none">
            <NavButton direction="left" onClick={() => handleScroll('left')} />
            <NavButton direction="right" onClick={() => handleScroll('right')} />
          </div>
        </div>

        {/* Mobile Pagination - Bento Style Dots */}
        <div className="flex justify-center gap-3 mt-8 lg:hidden">
          {REVIEWS.slice(0, 5).map((_, i) => (
            <div key={i} className="w-8 h-1 rounded-full bg-black/5 overflow-hidden">
               <motion.div 
                className="h-full bg-[#D4AF37]" 
                initial={{ x: "-100%" }}
                whileInView={{ x: "0%" }}
                transition={{ delay: i * 0.1 }}
               />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: any }) {
  return (
    <motion.div 
      className="min-w-[85vw] md:min-w-[400px] snap-center p-8 md:p-10 rounded-[2.5rem] bg-white border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-500"
      whileHover={{ y: -8 }}
    >
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 rounded-2xl bg-black/[0.02] flex items-center justify-center">
            <Quote size={20} className="text-[#D4AF37] opacity-40" />
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < review.rating ? "#D4AF37" : "none"} className={i < review.rating ? "text-[#D4AF37]" : "text-black/10"} />
            ))}
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-black/80 leading-relaxed font-medium italic tracking-tight">
          `{review.text}`
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-black/[0.03] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 flex items-center justify-center text-white font-black text-xs">
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-black font-black text-[11px] uppercase tracking-wider">{review.name}</h4>
            <span className="text-[9px] text-black/30 uppercase font-bold tracking-widest">{review.date}</span>
          </div>
        </div>
        
        {review.platform === "google" && (
           <div className="p-2 bg-black/[0.02] rounded-full">
             <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black/20"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.228 1.216-3.144 2.568-6.952 2.568-6.04 0-10.744-4.888-10.744-10.928s4.704-10.928 10.744-10.928c3.264 0 5.6 1.288 7.376 2.976l2.32-2.32c-1.968-1.888-4.544-3.32-9.696-3.32-8.8 0-16 7.2-16 16s7.2 16 16 16c4.752 0 8.368-1.576 11.232-4.584 2.976-2.976 3.888-7.144 3.888-10.608 0-.672-.056-1.312-.16-1.936h-14.96z"/></svg>
           </div>
        )}
      </div>
    </motion.div>
  );
}

function NavButton({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) {
  return (
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-6 rounded-full bg-white shadow-xl border border-black/[0.03] text-black/20 hover:text-[#D4AF37] pointer-events-auto transition-all"
    >
      {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </motion.button>
  );
}

const ReviewsSkeleton = () => (
  <div className="py-32 bg-white flex justify-center gap-6 overflow-hidden px-6">
    {[1, 2, 3].map(i => (
      <div key={i} className="min-w-100 h-96 bg-black/2 rounded-[2.5rem] animate-pulse" />
    ))}
  </div>
);