"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, LayoutGrid, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/constants";
import NeuralField from "./NeuralField";
import MagneticButton from "./MagneticButton";
import AnimatedCounter from "./AnimatedCounter";
import KineticLine from "@/components/shared/KineticHeading";

const SLIDE_DURATION = 8000;

export default function DesktopHero() {
  const [current, setCurrent] = useState(0);
  const active = HERO_SLIDES[current];
  const sectionRef = useRef<HTMLElement>(null);

  // 🖱️ Spotlight يتبع الماوس عبر متغيرات CSS (بدون إعادة رندر React)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      section.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  // 🎛️ Tilt ثلاثي الأبعاد لبانل الصورة بناءً على موضع الماوس
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-8, 8]), springConfig);

  function handlePanelMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handlePanelLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] lg:h-screen w-full bg-navy flex items-center overflow-hidden"
      style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
    >
      {/* 🧠 خلفية الشبكة العصبية التفاعلية */}
      <div className="absolute inset-0 z-0">
        <NeuralField />
      </div>

      {/* 🖱️ توهج يتبع المؤشر */}
      <div className="absolute inset-0 z-1 cursor-spotlight" />

      {/* 🌌 Dynamic Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={active.image}
            alt="Academy Background"
            fill
            priority
            sizes="100vw"
            className="object-cover saturate-0 grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-navy via-navy/95 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* 🎞️ نسيج سينمائي */}
      <div className="grain-overlay absolute inset-0 z-2 opacity-5 mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* 🎯 Left: Tactical Info Section */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Badge بحلقة نابضة */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <span className="relative flex size-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full size-2.5 bg-gold" />
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
                Elite Security Briefing — {active.accent}
              </span>
            </motion.div>

            {/* Kinetic Heading */}
            <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white italic uppercase leading-[0.9] tracking-tighter">
              <AnimatePresence mode="wait">
                <div key={`heading-${current}`}>
                  <KineticLine text={active.title} />
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-gold via-gold/80 to-white">
                    <KineticLine text={active.subtitle} delayOffset={active.title.split(" ").length} />
                  </span>
                </div>
              </AnimatePresence>
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-white/40 text-xs lg:text-sm max-w-md mx-auto lg:mx-0 font-medium leading-relaxed italic"
              >
                {active.description}
              </motion.p>
            </AnimatePresence>

            {/* 🎯 أزرار الأكشن — الزرار الأساسي مغناطيسي */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link href="/courses">
                <MagneticButton className="group relative px-7 py-4 bg-gold text-navy font-black uppercase tracking-[0.15em] text-[11px] rounded-xl flex items-center gap-2 shadow-[0_20px_40px_rgba(212,175,55,0.25)] overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Mission
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>
              </Link>

              <Link
                href="/about"
                className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <span className="size-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all">
                  <Play size={12} className="fill-current ml-0.5" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Watch Overview</span>
              </Link>
            </motion.div>
          </div>

          {/* 🖼️ Right: Visual Component */}
          <div className="relative flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                onPointerMove={handlePanelMove}
                onPointerLeave={handlePanelLeave}
                style={{ rotateX, rotateY, transformPerspective: 1000 }}
                initial={{ scale: 0.95, opacity: 0, x: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 1.05, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="animated-border relative w-full max-w-120 aspect-4/5 lg:max-h-[65vh] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image
                  src={active.image}
                  alt="Security Training"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent" />

                {/* 🎖️ Animated Stats Widget مع عداد حي */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 left-6 right-6 bg-navy/80 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl"
                >
                  <div className="size-9 bg-gold rounded-lg flex items-center justify-center text-navy shrink-0 shadow-lg">
                    <LayoutGrid size={18} />
                  </div>
                  <div>
                    <p className="text-white/30 font-black uppercase text-[7px] tracking-widest">Active_Deployment</p>
                    <p className="text-white font-black text-lg tabular-nums tracking-tighter leading-none">
                      <AnimatedCounter value={1240} /> <span className="text-[9px] text-emerald-400 font-bold ml-1">+12%</span>
                    </p>
                  </div>
                </motion.div>

                {/* ✨ شارة عائمة إضافية */}
                <motion.div
                  animate={{ y: [0, 8, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-5 right-5 size-11 bg-navy/80 backdrop-blur-xl border border-gold/20 rounded-xl flex items-center justify-center shadow-xl"
                >
                  <Sparkles size={16} className="text-gold" />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Cinematic Glow */}
            <div className="absolute -z-10 size-full bg-gold/5 blur-[120px] rounded-full" />
          </div>

        </div>
      </div>

      {/* 🧭 Slide Navigation — شريط تقدّم بدل النقاط */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-16 lg:translate-x-0 flex gap-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="relative h-1 w-10 rounded-full bg-white/10 overflow-hidden"
          >
            {idx === current && (
              <motion.span
                key={current}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                className="absolute inset-0 bg-gold origin-left"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
