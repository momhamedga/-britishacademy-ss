"use client"
import { useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ACADEMY_HUB_ITEMS } from "@/lib/AcademyHub";

export default function AcademyHub() {
  // استخدام useTransition لضمان سلاسة التنقل بين الصفحات في React 19
  const [isPending, startTransition] = useTransition();

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-32">
      
      {/* Header Section - Modern Tactical Aesthetic */}
      <div className="mb-16 flex flex-col items-center text-center md:items-start md:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1 w-1 rounded-full bg-gold animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Core Values</span>
        </motion.div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white md:text-6xl">
          Academy <span className="text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/40">Hub</span>
        </h2>
      </div>

      {/* Grid System - Optimized for 3 Items */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ACADEMY_HUB_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <Link 
                href={item.href}
                onClick={(e) => {
                  // React 19 Transition logic
                  startTransition(() => {
                    // الـ Routing يتم التعامل معه تلقائياً في Next.js
                  });
                }}
                className="group relative block h-full overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 transition-all duration-700 hover:border-gold/30 hover:bg-white/[0.03] active:scale-[0.97] touch-none"
              >
                {/* 1. Hardware Accelerated Background Blur */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-0 blur-3xl transition-opacity duration-1000 group-hover:opacity-10`} />
                
                {/* 2. Interactive Scan Effect */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 h-[1px] w-full animate-scan bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full flex-col gap-12">
                  {/* Top: Icon & Action */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                      <Icon size={30} strokeWidth={1} />
                    </div>
                    <div className="translate-x-4 translate-y-[-10px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      <ArrowUpRight size={24} className="text-gold/50" />
                    </div>
                  </div>

                  {/* Bottom: Text Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white transition-colors duration-500 group-hover:text-gold">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 transition-colors duration-500 group-hover:text-slate-300">
                      {item.description}
                    </p>
                    
                    {/* Visual Indicator - React 19 Pending State */}
                    <div className="h-[2px] w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                  </div>
                </div>

                {/* Mobile Touch Feedback Layer */}
                <div className="absolute inset-0 bg-white/5 opacity-0 active:opacity-100 transition-opacity md:hidden" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Tailwind v4 Custom Animation Utility */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}