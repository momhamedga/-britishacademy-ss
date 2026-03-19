"use client"; 
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface FeatureProps {
  title: string;
  description: string;
  index: number; // للـ animation delay
}

export function FeatureCard({ title, description, index }: FeatureProps) {
  // Stagger variants للـ animation
  const cardVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.15 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate" // تفعيل الأنيميشن لما يظهر في الشاشة
      viewport={{ once: true, amount: 0.5 }} // يشتغل مرة واحدة بس
      className="flex items-start gap-4 p-5 rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-xl hover:bg-gold/[0.03] transition-colors duration-500 group"
    >
      <div className="flex-shrink-0 p-2.5 rounded-xl border border-gold/10 bg-gold/[0.05] group-hover:border-gold/20 group-hover:bg-gold/10 transition-colors">
        <CheckCircle2 className="text-gold" size={18} strokeWidth={2.5} />
      </div>
      <div className="space-y-1.5 pt-0.5">
        <h4 className="text-white text-sm md:text-base font-black uppercase italic tracking-wider leading-none">
          {title}
        </h4>
        <p className="text-white/40 text-[11px] md:text-xs max-w-[340px] font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}