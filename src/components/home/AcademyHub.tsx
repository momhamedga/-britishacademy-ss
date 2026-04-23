"use client"
import { useTransition, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ChevronRight, Shield } from "lucide-react";
import { ACADEMY_HUB_ITEMS } from "@/lib/AcademyHub";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function AcademyHub() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="relative z-10 py-20 md:py-32 overflow-hidden bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* 1. Tactical Header */}
        <div className="mb-14 md:mb-20 flex flex-col items-center text-center md:items-start md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-black/5 bg-white px-4 py-1.5 shadow-xs"
          >
            <Shield size={10} className="text-gold fill-gold/20" />
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-navy/40">why us</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter text-navy leading-[0.9]">
            why <span className="text-transparent bg-clip-text bg-linear-to-b from-gold to-gold/60"> our academy</span>
          </h2>
        
        </div>

        {/* 2. Content Switcher */}
        {isDesktop ? <DesktopHub /> : <MobileHub />}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 📱 MOBILE VIEW: Optimized App-Style Slider                                */
/* -------------------------------------------------------------------------- */
function MobileHub() {
  const router = useRouter();
  return (
    <div className="relative -mx-6"> 
      <div className="flex overflow-x-auto pb-10 pt-2 px-6 gap-5 snap-x snap-mandatory no-scrollbar">
        {ACADEMY_HUB_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="snap-center shrink-0 w-[82vw] last:mr-6"
            >
              <div 
                onClick={() => router.push(item.href)}
                className="relative h-full overflow-hidden bg-white rounded-[2rem] p-8 border border-black/5 shadow-xl shadow-black/5 active:scale-95 transition-transform duration-300"
              >
                <div className="absolute top-0 right-0 size-32 bg-gold/5 blur-3xl -z-0" />
                
                <div className="relative z-10 flex flex-col h-full space-y-6">
                  <div className="size-14 bg-navy rounded-2xl flex items-center justify-center text-gold shadow-lg">
                    <Icon size={24} />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-navy italic leading-none">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-navy/50 leading-relaxed font-medium line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-gold font-black text-[9px] uppercase tracking-widest mt-auto">
                    Initialize Hub <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Dynamic Indicators */}
      <div className="flex justify-center gap-2">
        {ACADEMY_HUB_ITEMS.map((_, i) => (
          <div key={i} className="h-1 w-4 rounded-full bg-navy/5 overflow-hidden">
             <div className="h-full bg-gold w-0 group-active:w-full transition-all" />
          </div>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative h-full"
        >
          <div 
            onClick={() => startTransition(() => router.push(item.href))}
            className={`cursor-pointer h-full relative overflow-hidden rounded-[2.5rem] border border-black/[0.03] bg-white p-9 transition-all duration-500 hover:shadow-3xl hover:shadow-black/5 hover:-translate-y-2 ${isPending ? 'opacity-50' : ''}`}
          >
            {/* Tactical Grid Background on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,var(--color-gold)_0%,transparent_25%)] opacity-5" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-16">
                <div className="size-16 bg-slate-50 border border-black/5 rounded-2xl flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-gold transition-all duration-500 shadow-sm group-hover:shadow-navy/20">
                  <item.icon size={28} strokeWidth={1.2} />
                </div>
                <div className="size-8 rounded-full border border-black/5 flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-navy italic group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[13px] text-navy/40 leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="pt-2">
                  <div className="h-[2px] w-8 bg-gold/30 group-hover:w-full transition-all duration-700 ease-in-out" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}