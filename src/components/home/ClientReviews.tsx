"use client"
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/lib/constants/clientReviews";




export default function ClientReviews() {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. حل مشكلة الـ Hydration بنفس أسلوبك الاحترافي
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // وظائف التحكم للسحب (Touch Friendly)
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!mounted) return <ReviewsSkeleton />;

  return (
    <section className="relative py-32 px-6 overflow-hidden ">
      {/* 🌌 تأثيرات الإضاءة الخلفية v4 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
          >
            Client <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/20 italic font-light">Voices</span>
          </motion.h2>
          <p className="text-white/40 text-sm tracking-widest uppercase font-bold">What our elite community says</p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex  gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 transition-all cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none' }}
          >
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Desktop Navigation Controls */}
          <div className="hidden lg:flex absolute -inset-x-20 top-1/2 -translate-y-1/2 justify-between pointer-events-none">
            <NavButton direction="left" onClick={() => scroll('left')} />
            <NavButton direction="right" onClick={() => scroll('right')} />
          </div>
        </div>

        {/* 📱 Mobile Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {REVIEWS.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
          ))}
        </div>
      </div>
    </section>
  );
}

// مكون كرت المراجعة المنفصل
function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.div 
      className="min-w-full md:min-w-100 snap-center p-8 rounded-4xl bg-white/2 border border-white/5 backdrop-blur-3xl flex flex-col justify-between group/card hover:bg-white/5 transition-colors duration-700"
      whileHover={{ y: -10 }}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-white/5 rounded-2xl">
            <Quote size={20} className="text-gold/50" />
          </div>
          <div className="flex gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} size={12} fill="currentColor" className="text-gold" />
            ))}
          </div>
        </div>
        
        <p className="text-lg text-white/70 leading-relaxed font-medium italic">
       `{review.text}`
        </p>
      </div>

      <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
        <div>
          <h4 className="text-white font-black text-sm uppercase tracking-wider">{review.name}</h4>
          <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{review.date}</span>
        </div>
        {review.platform === "google" && (
           <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/20"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.228 1.216-3.144 2.568-6.952 2.568-6.04 0-10.744-4.888-10.744-10.928s4.704-10.928 10.744-10.928c3.264 0 5.6 1.288 7.376 2.976l2.32-2.32c-1.968-1.888-4.544-3.32-9.696-3.32-8.8 0-16 7.2-16 16s7.2 16 16 16c4.752 0 8.368-1.576 11.232-4.584 2.976-2.976 3.888-7.144 3.888-10.608 0-.672-.056-1.312-.16-1.936h-14.96z"/></svg>
           </div>
        )}
      </div>
    </motion.div>
  );
}

// مكون أزرار التنقل
function NavButton({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-5 rounded-full bg-white/2 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-gold/20 pointer-events-auto transition-all backdrop-blur-xl group"
    >
      {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </button>
  );
}

// سكيلتون التحميل
const ReviewsSkeleton = () => (
  <div className="py-32 bg-[#020617] flex justify-center gap-6 overflow-hidden px-6">
    {[1, 2, 3].map(i => (
      <div key={i} className="min-w-[400px] h-80 bg-white/2 border border-white/5 rounded-4xl animate-pulse" />
    ))}
  </div>
);