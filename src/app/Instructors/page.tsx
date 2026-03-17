import { Metadata } from "next";
import InstructorsSection from "./InstructorsSection";

export const metadata: Metadata = {
  title: "Elite Instructors | British Academy for Security & Safety",
  description: "Meet our world-class strategic commanders and safety architects.",
};

export default function InstructorsPage() {
  return (
    <main className="relative min-h-screen  overflow-x-hidden ">
      {/* Dynamic Background - CSS Only for SEO speed */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-20%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gold/5 blur-[120px] rounded-full opacity-50 animate-pulse" />
      </div>

      {/* Cinematic Header with Fluid Font */}
      <div className="relative pt-32 md:pt-48 pb-12 px-6 max-w-7xl mx-auto z-10 text-center md:text-left">
        <header className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]">
             Command & Control Faculty
          </div>
          
<h1 className="flex flex-col items-center md:items-start transition-all duration-500">
  {/* كلمة Global - ممكن تكون كبيرة عادي */}
  <span className="text-[clamp(1rem,7vw,4.5rem)] font-black text-white italic uppercase tracking-tighter leading-none">
    Global
  </span>

  {/* كلمة Commanders - هي المشكلة، فلازم نصغرها ونضغط حروفها أكتر */}
  <span className="text-[clamp(1rem,5.5vw,4.5rem)] font-[900] text-gold italic uppercase tracking-[-0.07em] md:tracking-tighter leading-[0.8] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
    Commanders
  </span>
</h1>

          <p className="text-slate-400 text-sm md:text-lg max-w-2xl font-light tracking-wide leading-relaxed opacity-70 border-l-0 md:border-l md:border-white/10 md:pl-8 mx-auto md:mx-0">
            Our faculty consists of international security architects and risk management veterans 
            dedicated to elite engineering standards.
          </p>
        </header>
      </div>

      <InstructorsSection />
    </main>
  );
}