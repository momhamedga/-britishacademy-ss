"use client";
import { motion } from "framer-motion";
import { Play, Star, Calendar, Users, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Course } from "@/types";

interface CourseHeroProps {
  course: Course;
}

export default function CourseHero({ course }: CourseHeroProps) {
  const getInitial = (name: string) => name?.charAt(0).toUpperCase() || "I";

  return (
    // 1. استخدام w-screen و left-1/2 لضمان خروج الـ Section عن أي container وحذفه للمسافات البيضاء
    <section className="relative min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-navy flex flex-col justify-center overflow-hidden border-none p-0 m-0">
      
      {/* 🌌 Background Glows - Ultra Modern Cinematic Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] bg-gold/[0.08] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-gold/[0.05] blur-[120px] rounded-full" />
      </div>

      {/* 2. Content Wrapper - يتحكم في المسافة الداخلية فقط */}
      <div className="w-full px-6 md:px-12 lg:px-24 py-16 md:py-28 relative z-10 max-w-[1920px] mx-auto">
        
        {/* 🧭 Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/30 mb-10 uppercase tracking-[0.2em]">
          <span className="hover:text-gold cursor-pointer transition-colors">Home</span>
          <ChevronRight size={10} />
          <span className="hover:text-gold cursor-pointer transition-colors">Programs</span>
          <ChevronRight size={10} />
          <span className="text-gold italic">{course.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 📝 Left Side: Text Content */}
          <div className="lg:col-span-7 flex flex-col space-y-8 md:space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl text-gold text-[10px] font-black uppercase tracking-[0.3em]"
              >
                {course.level || "Advanced"}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter italic uppercase drop-shadow-2xl"
              >
                {course.title}
              </motion.h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} strokeWidth={3} />
                  ))}
                </div>
                <span className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase">
                  (4.9) <span className="ml-2 text-white/20">186 Reviews</span>
                </span>
              </div>

              <p className="text-white/60 text-lg md:text-2xl leading-relaxed max-w-2xl font-medium italic border-l-2 border-gold/30 pl-6">
                {course.short_description || "Specialized training program focused on high-level tactical security and professional guard protocols."}
              </p>
            </div>

            {/* 📊 Tactical Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-y border-white/5">
              {[
                { label: "Duration", val: course.duration, icon: Calendar },
                { label: "Trainees", val: course.enrollment_count || 186, icon: Users },
                { label: "Content", val: "24 Units", icon: BookOpen },
                { label: "Status", val: "Accredited", icon: CheckCircle2 },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em]">{stat.label}</span>
                  <div className="flex items-center gap-2 text-white font-bold text-sm md:text-base italic uppercase tracking-tighter">
                    <stat.icon size={16} className="text-gold" /> {stat.val}
                  </div>
                </div>
              ))}
            </div>

            {/* 👤 Instructor Avatar Section */}
            <div className="flex items-center gap-5 group cursor-default">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/30 to-transparent border border-gold/40 flex items-center justify-center text-gold text-3xl font-black italic shadow-2xl group-hover:scale-110 transition-transform duration-500">
                {getInitial(course.instructor_name || "K")}
              </div>
              <div className="flex flex-col">
                <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] mb-1">Lead Instructor</span>
                <h4 className="text-white font-black text-xl italic uppercase tracking-tight leading-none">
                  {course.instructor_name || "Col. Khaled Al-Saeed"}
                </h4>
                <p className="text-gold/60 text-[10px] font-bold mt-2 uppercase">Tactical Operations Expert</p>
              </div>
            </div>
          </div>

          {/* 🎬 Right Side: Cinematic Video Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="lg:col-span-5 relative group"
          >
            {/* Glass Frame */}
            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden border border-white/10 p-3 bg-white/[0.02] backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <div className="relative h-full w-full rounded-[30px] overflow-hidden border border-gold/20 shadow-inner">
                <Image 
                  src={course.image_url || "/course-placeholder.webp"} 
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                />
                
                {/* Tactical Overlay */}
                <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors duration-700" />

                {/* Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gold text-navy shadow-[0_0_60px_rgba(212,175,55,0.4)] group-hover:scale-110 active:scale-95 transition-all duration-500">
                    <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-25" />
                    <Play size={36} fill="currentColor" className="ml-2 relative z-10" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative Glow behind video */}
            <div className="absolute -inset-10 bg-gold/5 blur-[100px] rounded-full pointer-events-none -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}