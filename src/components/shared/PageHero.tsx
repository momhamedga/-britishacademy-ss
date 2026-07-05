"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import NeuralField from "@/components/home/hero/NeuralField";
import KineticText from "./KineticHeading";

interface PageHeroProps {
  icon?: LucideIcon;
  eyebrow: string;
  title: string;
  highlight: string;
  description?: string;
  align?: "center" | "left";
  fullHeight?: boolean;
  children?: React.ReactNode;
}

export default function PageHero({
  icon: Icon,
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  fullHeight = true,
  children,
}: PageHeroProps) {
  const isLeft = align === "left";

  return (
    <section
      className={`relative w-full overflow-hidden bg-navy px-6 ${
        fullHeight ? "min-h-screen flex flex-col items-center justify-center py-24" : "py-20 md:py-32"
      }`}
    >
      {/* 🧠 نفس الشبكة العصبية التفاعلية بتاعة الهيرو الرئيسي — هوية بصرية موحّدة */}
      <div className="absolute inset-0 z-0">
        <NeuralField />
      </div>

      {/* 🌌 توهجات تكتيكية */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] size-[70%] rounded-full opacity-20 blur-[120px] bg-mediumBlue" />
        <div className="absolute bottom-[-10%] left-[-5%] size-1/2 rounded-full opacity-10 blur-[100px] bg-gold" />
      </div>

      <div className="grain-overlay absolute inset-0 z-0 opacity-5 mix-blend-overlay pointer-events-none" />

      <div
        className={`max-w-6xl mx-auto relative z-10 w-full flex flex-col ${
          isLeft ? "items-center text-center lg:items-start lg:text-left" : "items-center text-center"
        }`}
      >
        {/* Badge بحلقة نابضة — موحّد مع الهيرو الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-gold" />
          </span>
          {Icon && <Icon size={12} className="text-gold" />}
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">{eyebrow}</span>
        </motion.div>

        {/* Kinetic Heading — نفس تأثير الصفحة الرئيسية */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-6">
          <KineticText text={title} />
          <span className="block text-transparent bg-clip-text bg-linear-to-b from-gold to-gold/40">
            <KineticText text={highlight} delayOffset={title.split(" ").length} />
          </span>
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={`text-white/50 text-base md:text-xl font-medium italic max-w-2xl ${isLeft ? "" : "mx-auto"}`}
          >
            {description}
          </motion.p>
        )}

        {children && <div className="w-full mt-12">{children}</div>}
      </div>
    </section>
  );
}
