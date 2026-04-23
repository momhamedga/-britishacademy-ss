import { Play, Star, Calendar, Users, BookOpen, CheckCircle2, ChevronRight, Share2, Heart } from "lucide-react";
import Image from "next/image";
import { Course } from "@/types";
import Link from "next/link";

interface CourseHeroProps {
  course: Course;
}

export default function CourseHero({ course }: CourseHeroProps) {
  
  // React 19: لا داعي لـ useMemo هنا، الـ Compiler سيتكفل بالتحسين
  const getInitial = (name: string) => name?.charAt(0).toUpperCase() || "I";

  return (
    <section className="relative  min-h-screen w-full bg-navy overflow-hidden">
      
      {/* 🌌 Ultra-Modern Background Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-gold/[0.07] blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-gold/4 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-450 mx-auto px-6 md:px-12 lg:px-20 py-20">
        
      {/* 🧭 Advanced Tactical Breadcrumbs */}
<nav className="hidden mt-15 md:flex items-center gap-4 text-[11px] font-black text-white/20 mb-16 uppercase tracking-[0.4em] select-none">
  



  {/* Catalog */}
          <Link href={"/courses"}>
            <div className="group cursor-pointer flex items-center gap-4">
    <span className="hover:text-gold/80 transition-all duration-300">Catalog</span>
    <ChevronRight size={10} className="text-white/10" />
  </div>
          </Link>

  {/* Active Page: Fire Marshal Training */}
  <div className="relative group">
    <span className="text-gold italic font-black tracking-[0.3em]">
      {course.title}
    </span>
    {/* الخط الرفيع اللي في الصورة */}
    <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold/40 scale-x-100 origin-left transition-transform duration-500" />
    
    {/* لمسة إضافية: توهج خفيف تحت الكلمة النشطة */}
    <div className="absolute -bottom-2 left-0 w-full h-[4px] bg-gold/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
</nav>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* 📝 Left Side: Tactical Information */}
          <div className="lg:col-span-7 mt-5 space-y-10">
            
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <span className="px-5 py-2 rounded-full bg-gold text-navy text-[9px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  {course.level || "Elite Operation"}
                </span>
                <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/60 text-[9px] font-black uppercase tracking-widest">
                  {course.category || "Security"}
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase italic drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {course.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? "text-gold font-outline-2" : ""}>{word} </span>
                ))}
              </h1>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-navy bg-white/10 backdrop-blur-sm" />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-navy bg-gold flex items-center justify-center text-[8px] font-black text-navy">+82</div>
                </div>
                <div className="h-4 w-[1px] bg-white/10" />
                <div className="flex items-center gap-2">
                   <Star size={14} className="text-gold fill-gold" />
                   <span className="text-white font-black text-xs">4.9</span>
                   <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Expert Rating</span>
                </div>
              </div>

              <p className="text-white/50 text-xl md:text-3xl leading-snug max-w-3xl font-medium italic border-l-4 border-gold/40 pl-8 py-2">
                {course.short_description || "Deploying next-gen tactical protocols for professional safety specialists."}
              </p>
            </div>

            {/* 📊 High-Performance Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-3xl">
              {[
                { label: "Duration", val: course.duration, icon: Calendar },
                { label: "Strength", val: "64kg Muscle Avg", icon: Users }, // لمسة شخصية لبايلوت
                { label: "Accreditation", val: "Global SIA", icon: CheckCircle2 },
                { label: "Content", val: "Pro Units", icon: BookOpen },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2 text-gold/40">
                    <stat.icon size={14} />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                  </div>
                  <div className="text-white font-black text-sm uppercase tracking-tight italic">{stat.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 🎬 Right Side: Cinematic Glass Player */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <div className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 p-3 bg-white/5 backdrop-blur-3xl shadow-2xl">
                <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden">
                  <Image 
                    src={course.image_url || "/placeholder.jpg"} 
                    alt="Tactical Training" 
                    fill 
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-6 right-6 flex flex-col gap-3">
                    <button className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-gold hover:text-navy transition-all active:scale-90">
                      <Heart size={20} />
                    </button>
                    <button className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-gold hover:text-navy transition-all active:scale-90">
                      <Share2 size={20} />
                    </button>
                  </div>

                  {/* Play Trigger */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <button className="group/btn relative w-28 h-28 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-20" />
                      <div className="absolute inset-0 bg-gold/20 rounded-full scale-150 blur-2xl" />
                      <div className="relative w-full h-full bg-gold rounded-full flex items-center justify-center text-navy shadow-[0_0_50px_rgba(212,175,55,0.5)] group-hover/btn:scale-110 transition-all duration-500">
                        <Play size={32} fill="currentColor" className="ml-2" />
                      </div>
                    </button>
                    <span className="text-white font-black text-[10px] uppercase tracking-[0.4em] drop-shadow-lg">Watch Preview</span>
                  </div>
                </div>
              </div>

         
            </div>
          </div>

        </div>
      </div>



    </section>
  );
}