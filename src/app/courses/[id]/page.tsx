import { getCourseById } from "@/actions/academy-actions";
import { notFound } from "next/navigation";
import { Clock, BarChart, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 md:pt-44 pb-20 px-6  selection:bg-gold/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-gold transition-colors mb-12 group text-xs font-black uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to courses
        </Link>

        <div className="glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 bg-navy/40 relative overflow-hidden group">
          
          {/* Cinematic Background Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                {course.level} — 2026 Professional Standard
              </span>
              <div className="flex gap-1">
                <Sparkles size={14} className="text-gold opacity-50" />
              </div>
            </div>
            
            {/* Title with Italic Fix */}
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-[1.1] mb-10 pb-2 overflow-visible">
              {course.title}
            </h1>

            {/* Technical Specs Grid */}
            <div className="grid md:grid-cols-3 gap-8 py-10 border-y border-white/5 mb-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/5 rounded-2xl text-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Duration</p>
                  <p className="text-white font-bold text-lg">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/5 rounded-2xl text-gold">
                  <BarChart size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Complexity</p>
                  <p className="text-white font-bold text-lg">{course.level}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/5 rounded-2xl text-gold">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Certification</p>
                  <p className="text-white font-bold text-lg italic tracking-tighter uppercase font-display">Elite Verified</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="max-w-3xl">
              <h2 className="text-gold font-black uppercase tracking-[0.2em] text-[10px] mb-4">Course Overview</h2>
              <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
                This specialized program focuses on <span className="text-white font-medium">{course.category}</span>. 
                We implement the latest 2026 architectural patterns, ensuring ultra-high performance ecosystems and a cinematic UI/UX that sets your projects apart from the competition.
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-12">
               <button className="px-10 py-5 bg-gold text-navy font-black uppercase italic tracking-widest rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:scale-105 active:scale-95">
                  Enroll in Program
               </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}