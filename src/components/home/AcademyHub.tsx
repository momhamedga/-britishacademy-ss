"use client"
import { useState, useEffect } from "react"; // 1. استيراد hooks الضرورية
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ACADEMY_HUB_ITEMS } from "@/lib/AcademyHub";

export default function AcademyHub() {
  // 2. إضافة حالة للتحقق من الجاهزية
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. منع الرندر على السيرفر لتجنب اختلاف الـ classNames
  if (!mounted) return <div className="min-h-[400px]" />; // Skeleton بسيط أو مساحة فارغة

  return (
    <section className="max-w-7xl mx-auto py-24 px-6 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-4">
        {ACADEMY_HUB_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link 
                href={item.href}
                className="group relative block aspect-square lg:aspect-[4/5] bg-white/[0.01] backdrop-blur-3xl rounded-[2rem] p-8 overflow-hidden border border-white/5 hover:border-gold/40 transition-all duration-700 shadow-2xl"
              >
                {/* الخلفية الملونة */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-white font-black text-lg md:text-xl uppercase tracking-tighter leading-tight group-hover:text-gold transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-gold text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700">
                      Access <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* 4. استبدال style jsx بـ CSS عادية أو Tailwind لتجنب مشاكل الـ Dynamic Injection */}
      <style jsx>{`
        .scan-line {
           position: absolute;
           inset: 0;
           width: 100%;
           height: 2px;
           background: rgba(212, 175, 55, 0.2);
           animation: scan 2s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}