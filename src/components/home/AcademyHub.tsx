"use client"
import { useTransition, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { ACADEMY_HUB_ITEMS } from "@/lib/AcademyHub";
import { useMediaQuery } from "@/hooks/use-media-query";

const COLORS = {
  navy: "#1B2A41",
  gold: "#D4AF37",
  background: "oklch(98% 0.01 260)",
};

export default function AcademyHub() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="relative z-10 py-16 md:py-32 overflow-hidden" style={{ backgroundColor: COLORS.background }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* 1. Header - ثبات التصميم كما طلبت */}
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

        {/* 2. Content Switcher */}
        {isDesktop ? <DesktopHub /> : <MobileHub />}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 🔥 MOBILE VIEW: The "App-Style" Slider                                     */
/* -------------------------------------------------------------------------- */
function MobileHub() {
  const router = useRouter();
  return (
    <div className="relative -mx-4"> 
      {/* Scroll الأيقونات بأسلوب الـ Snap */}
      <div className="flex overflow-x-auto pb-8 pt-4 px-4 gap-4 snap-x snap-mandatory no-scrollbar">
        {ACADEMY_HUB_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="snap-center shrink-0 w-[85%] last:mr-4"
            >
              <div 
                onClick={() => router.push(item.href)}
                className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] active:scale-[0.97] transition-transform"
              >
                {/* الديكور الخلفي للكارت */}
                <div className="absolute -top-10 -right-10 size-32 bg-gold/5 rounded-full blur-3xl" />
                
                <div className="relative z-10 space-y-6">
                  <div className="size-14 bg-gold rounded-2xl flex items-center justify-center text-white shadow-lg shadow-gold/20">
                    <Icon size={24} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-navy italic">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-gold font-black text-[10px] uppercase tracking-widest pt-2">
                    Explore Hub <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Indicator Dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {ACADEMY_HUB_ITEMS.map((_, i) => (
          <div key={i} className="size-1 rounded-full bg-gold/20" />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 🖥️ DESKTOP VIEW: The "Elite Grid"                                          */
/* -------------------------------------------------------------------------- */
function DesktopHub() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="grid grid-cols-4 gap-6">
      {ACADEMY_HUB_ITEMS.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative"
        >
          <div 
            onClick={() => startTransition(() => router.push(item.href))}
            className={`cursor-pointer block h-full overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${isPending ? 'opacity-50' : ''}`}
          >
            {/* Scan Line Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
               <div className="absolute top-0 h-[1px] w-full bg-gold/40 animate-[scan_2s_linear_infinite]" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-12">
                <div className="size-16 bg-black/[0.02] border border-black/5 rounded-2xl flex items-center justify-center text-navy group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-gold/30">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <ArrowUpRight className="text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all" />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-navy italic group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                <div className="h-0.5 w-10 bg-gold/20 group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}