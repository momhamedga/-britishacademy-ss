import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FEATURE_POINTS } from "@/lib/constants";
import { FeatureCard } from "./feature-card";
import Link from "next/link";

export function FeatureGrid() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden ">
      {/* 🌌 Cinematic background */}
      <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/5 blur-[120px] rounded-full animate-pulse z-0" />

      <div className="container mx-auto px-8 md:px-20 relative z-10 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
        {/* 📝 Left Side: The Content */}
        <div className="flex-1 space-y-16 max-w-4xl">
          <div className="text-left space-y-3 max-w-2xl">
            {/* Badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-xl">
                <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                <span className="text-white/50 text-[10px] font-medium uppercase tracking-[0.4em]">
                  Mission Parameters
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-10 overflow-hidden">
              <h1 className="text-6xl md:text-[100px] font-black text-white italic uppercase leading-[0.9] tracking-tighter">
                Unlock a world
              </h1>
              <h2 className="text-5xl md:text-[70px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37]/90 via-[#D4AF37] to-[#D4AF37]/50 italic uppercase leading-[0.9] tracking-tighter">
                of Opportunities
              </h2>
            </div>
            <p className="text-white/40 text-[11px] md:text-xs max-w-lg leading-relaxed font-bold uppercase tracking-[0.2em]">
              Our comprehensive training programs are designed to help you:
            </p>
          </div>

          {/* Feature Grid: Staggered animation on view */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 border-l border-white/10 pl-10">
            {FEATURE_POINTS.map((point, index) => (
              <FeatureCard
                key={point.id}
                title={point.title}
                description={point.description}
                index={index}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center gap-10">
                      <Link href={"/about"}>
                            <button className="group relative px-12 py-5 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#020617] font-bold uppercase italic tracking-widest text-[11px] overflow-hidden transition-all duration-500 rounded-sm shadow-xl hover:shadow-[#D4AF37]/20">
              <span className="relative z-10 flex items-center gap-3">
                Who We Are <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />
            </button>
                      </Link>
          </div>
        </div>

        {/* 🛡️ Right Side: The Security Image with Hexagon frame */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end flex-shrink-0 z-0">
          <div className="relative group p-1 rounded-3xl backdrop-blur-3xl overflow-hidden scale-90 md:scale-100">
            {/* Hexagon Clip - تم تطبيقه باستخدام SVG للمرونة */}
            <div className="relative z-10 p-0.5 rounded-[30px] overflow-hidden group-hover:scale-[1.03] transition-transform duration-500 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9)]">
              <Image
                src="/security-guard.webp" // تأكد من وضع الصورة في public folder
                alt="Security Guard Infiltration Protocol"
                width={500}
                height={600}
                className="object-cover object-center w-[300px] h-[400px] md:w-[460px] md:h-[580px]"
                priority
              />
              <div className="absolute inset-0 bg-gold/10 blur-[80px] rounded-full animate-pulse z-[-1] " />
              <div className="absolute inset-0 vignette-overlay z-10 opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />
            </div>
            {/* Hexagon Border - تم تطبيقه باستخدام SVG للمرونة */}
            <svg
              viewBox="0 0 100 115"
              className="absolute inset-0 z-1 pointer-events-none fill-none stroke-gold/20 stroke-1 group-hover:stroke-gold/40 transition-colors"
            >
              <polygon points="50,0 100,28.87 100,86.60 50,115.47 0,86.60 0,28.87" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}