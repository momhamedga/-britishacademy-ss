import { getCourseBySlug } from "@/actions/academy-actions";
import { notFound } from "next/navigation";
import { 
  Clock, BarChart, ShieldCheck, ArrowLeft, Target, 
  Award, CheckCircle2, BookOpen, MapPin, AlertTriangle,
  Zap, ChevronRight
} from "lucide-react";
import Link from "next/link";
import EnrollButton from "@/components/portal/EnrollButton";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return {
    title: `${course?.title || 'Course Details'} | British Academy`,
    description: course?.short_description || "Professional SIA accredited security training.",
  };
}

export default async function CourseDetailsPage({ params }: { params: any }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) notFound();

  // 🛠️ معالجة البيانات القادمة من JSONB لضمان ظهورها
  const fullContent = typeof course.full_content === 'string' 
    ? JSON.parse(course.full_content) 
    : course.full_content;

  return (
    <main className="min-h-screen pt-24 md:pt-44 pb-20 px-4 md:px-6 relative overflow-hidden  selection:bg-gold/30">
      
      {/* 🌌 High-End Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-gold/[0.05] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-blue-500/[0.02] blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 🔙 Navigation - Optimized for Mobile */}
        <Link href="/courses" className="inline-flex items-center gap-3 text-slate-500 hover:text-gold transition-all mb-8 md:mb-12 group text-[10px] font-black uppercase tracking-[0.4em] italic">
          <div className="p-2 rounded-full border border-white/5 group-hover:border-gold/20 bg-white/[0.02] transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="hidden sm:inline">Return to Mission Selection</span>
          <span className="sm:hidden">Back</span>
        </Link>

        {/* 🏛️ Main Container */}
        <div className="glass rounded-[2rem] md:rounded-[4rem] border border-white/10 bg-white/[0.01] backdrop-blur-3xl relative overflow-hidden shadow-2xl">
          
          {/* Header Section with Video/Image Placeholder Vibe */}
          <div className="relative p-6 md:p-20 pb-10 md:pb-14">
            <div className="relative z-10">
              {/* Badges Stack */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-[9px] font-black uppercase tracking-widest">
                  <Target size={10} className="animate-pulse" />
                  {course.level} Ops
                </span>
                
                {fullContent?.location && (
                  <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                    <MapPin size={10} className="text-gold" /> {fullContent.location}
                  </span>
                )}

                {course.is_sia_accredited && (
                  <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                    <ShieldCheck size={10} /> SIA Verified
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl max-w-4xl">
                {course.title}
              </h1>
            </div>
          </div>

          {/* 📊 Technical Grid - Responsive 1 to 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-y border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-white/[0.01]">
            {[
              { label: 'Duration', val: course.duration, icon: Clock, color: 'text-gold' },
              { label: 'Expertise', val: course.level, icon: BarChart, color: 'text-gold' },
              { label: 'Investment', val: `£${course.price}`, icon: Award, color: 'text-emerald-400' }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-5 p-8 md:p-10 hover:bg-white/[0.02] transition-colors group">
                <div className={`p-4 bg-white/5 rounded-2xl ${stat.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 uppercase font-black tracking-[0.3em] mb-1 italic">{stat.label}</p>
                  <p className="text-white font-black text-xl md:text-2xl tracking-tight uppercase italic">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-20">
            <div className="grid lg:grid-cols-5 gap-12 md:gap-20">
              
              {/* Left Column: Briefing */}
              <div className="lg:col-span-3 space-y-12 md:space-y-16">
                
                {/* Overview */}
                <section className="relative">
                  <h2 className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-6 flex items-center gap-3 italic">
                    <div className="h-[1px] w-8 bg-gold/50" /> Mission Overview
                  </h2>
                  <div className="space-y-6">
                    <p className="text-white text-xl md:text-2xl font-light leading-relaxed italic border-l-2 border-gold/20 pl-6">
                      {course.short_description}
                    </p>
                    <div className="text-slate-400 text-base md:text-lg font-light leading-relaxed space-y-4">
                      {fullContent?.overview}
                    </div>
                  </div>
                </section>

                {/* Requirements - Tactical Warning Box */}
                {fullContent?.requirements && (
                  <section className="relative p-6 md:p-8 rounded-3xl border border-red-500/20 bg-red-500/[0.03] overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <AlertTriangle size={80} />
                    </div>
                    <h2 className="text-red-500 font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3 italic">
                      <Zap size={14} className="animate-pulse" /> Critical Entry Requirements
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed italic relative z-10">
                      {fullContent.requirements}
                    </p>
                  </section>
                )}

                {/* Curriculum - Terminal Style */}
                <section>
                  <h2 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 flex items-center gap-3 opacity-60">
                    <BookOpen size={14} /> Intelligence Modules
                  </h2>
                  <div className="grid gap-3">
                    {fullContent?.curriculum?.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-gold/[0.02] transition-all group cursor-default">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[10px] text-gold/40 italic">MOD_0{idx + 1}</span>
                          <span className="text-slate-300 group-hover:text-white transition-colors text-xs md:text-sm font-bold uppercase tracking-wide">{item}</span>
                        </div>
                        <ChevronRight size={14} className="text-slate-700 group-hover:text-gold transition-colors" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: CTA & Benefits */}
              <div className="lg:col-span-2 space-y-8">
                <div className="sticky top-32">
                  <div className="p-8 md:p-10 rounded-[2.5rem] border border-gold/30 bg-[#0A0A0A] relative overflow-hidden shadow-2xl shadow-gold/5 group/cta">
                    {/* Interior Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 blur-[60px] rounded-full" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                        <ShieldCheck size={40} className="text-gold" />
                      </div>
                      <h4 className="text-white font-black uppercase tracking-[0.2em] text-lg mb-2 italic">Initiate Authorization</h4>
                      <p className="text-slate-500 text-[9px] uppercase tracking-widest mb-8 italic font-bold">Secure deployment slot immediately</p>
                      
                      <div className="w-full transform group-hover/cta:scale-[1.02] transition-transform">
                        <EnrollButton courseId={course.id} />
                      </div>
                      
                      <div className="mt-8 pt-8 border-t border-white/5 w-full">
                         <h5 className="text-[9px] font-black text-gold/60 uppercase tracking-[0.3em] mb-6 italic text-center">Tactical Advantages</h5>
                         <ul className="text-left space-y-4">
                            {fullContent?.benefits?.map((benefit: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-[10px] md:text-xs text-slate-400 italic font-medium">
                                <div className="mt-1 p-0.5 rounded-full bg-gold/20">
                                  <CheckCircle2 size={10} className="text-gold" />
                                </div>
                                {benefit}
                              </li>
                            ))}
                         </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Security Footer Note */}
                  <p className="mt-6 text-center text-[8px] text-slate-600 uppercase tracking-widest italic leading-loose">
                    Transmission Encrypted // British Academy Tactical Training Center <br/>
                    Wembley Vector Sector // 2026 Protocol
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}