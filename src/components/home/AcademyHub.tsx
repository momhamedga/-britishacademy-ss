"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ACADEMY_HUB_ITEMS } from "@/lib/AcademyHub";

export default function AcademyHub() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[400px]" />;

  return (
    <section className="max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-6 relative z-10">
      {/* العنوان للموبايل لتعزيز التجربة */}
      <div className="mb-10 md:hidden text-center">
        <h2 className="text-gold font-black text-2xl uppercase tracking-tighter italic">Academy Hub</h2>
        <p className="text-slate-500 text-[8px] uppercase tracking-[0.3em]">Select Your Operational Vector</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {ACADEMY_HUB_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={item.href}
                className="group relative block aspect-[3/4] sm:aspect-square lg:aspect-[4/5] bg-white/[0.02] backdrop-blur-3xl rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 overflow-hidden border border-white/5 hover:border-gold/40 transition-all duration-700 shadow-2xl active:scale-95"
              >
                {/* الخلفية الملونة - تظهر بـ Opacity خفيف جداً على الموبايل لتوضيح الهوية */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-5 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700`} />
                
                {/* Scan Line Effect - شغال دايماً بشكل هادئ */}
                <div className="scan-line" />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Icon Container */}
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold md:group-hover:bg-gold md:group-hover:text-navy transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    <Icon size={20} className="md:w-[26px] md:h-[26px]" strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-white font-black text-sm md:text-xl uppercase tracking-tighter leading-tight md:group-hover:text-gold transition-colors duration-500">
                      {item.title}
                    </h3>
                    
                    {/* الوصف: ظاهر على الموبايل بوضوح أقل، وكامل على الديسكطوب عند الـ Hover */}
                    <p className="text-[8px] md:text-[10px] text-slate-400 leading-relaxed md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* زر الـ Access: ظاهر دايماً على الموبايل لأنه Action Primary */}
                    <div className="flex items-center gap-1.5 text-gold text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700">
                      Access <ArrowUpRight size={12} className="md:w-[14px] md:h-[14px]" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
        .scan-line {
           position: absolute;
           inset: 0;
           width: 100%;
           height: 1px;
           background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.3), transparent);
           animation: scan 3s linear infinite;
           pointer-events: none;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(500%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}