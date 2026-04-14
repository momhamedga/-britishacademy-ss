"use client";
import Counter from '@/components/ui/counter';
import { STATS_DATA } from '@/lib/constants/constants';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Building2 } from 'lucide-react';

const COLORS = {
  bgLight: "oklch(98% 0.01 260)",
  gold: "#D4AF37",
};

export default function AboutStats() {
  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: COLORS.bgLight }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          
          {STATS_DATA.map((stat, i) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center p-6 md:p-10 rounded-[1.5rem] bg-white border border-black/[0.05] shadow-sm hover:shadow-md transition-all duration-500">
                
                {/* 1. الأيقونة (نفس ترتيب الصورة 213916) */}
                <div className="mb-6 text-slate-400 group-hover:text-[#D4AF37] transition-colors">
                   {i === 0 && <Award size={32} strokeWidth={1.5} />}
                   {i === 1 && <Building2 size={32} strokeWidth={1.5} />}
                   {i === 2 && <BookOpen size={32} strokeWidth={1.5} />}
                   {i === 3 && <Users size={32} strokeWidth={1.5} />}
                </div>

                {/* 2. الرقم (مع حل مشكلة الـ TypeError) */}
                <div className="mb-2">
                  <h3 className="text-3xl md:text-5xl font-black text-[#1B2A41] tracking-tight flex items-baseline justify-center">
                    {/* تحويل القيمة لنص هنا بيحل الخطأ تماماً */}
                    <Counter value={stat.value.toString()} />
                    <span className="text-[0.7em] ml-0.5 text-[#1B2A41] font-bold">{stat.suffix}</span>
                  </h3>
                </div>

                {/* 3. النصوص (مطابقة للصورة 213916) */}
                <div className="space-y-1">
                  <p className="text-[11px] md:text-sm font-bold text-slate-600 uppercase tracking-wide">
                    {stat.label.en}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">
                    {stat.label.ar}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}