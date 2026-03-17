"use client"
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { Course } from "@/types";
import Link from "next/link";

export default function CourseCard({ course, index }: { course: Course, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] group border border-white/5 hover:border-gold/30 transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[440px] md:h-[500px] w-full bg-navy/20"
    >
      {/* Cinematic Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 blur-[80px] group-hover:bg-gold/15 transition-all duration-700 rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Top Section: Icon & Level */}
        <div className="flex justify-between items-start mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 blur-lg rounded-2xl scale-0 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative p-3 bg-white/5 rounded-xl text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-500 border border-white/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-gold border border-gold/20 px-3 py-1.5 rounded-full bg-gold/5">
            {course.level || 'Elite'}
          </span>
        </div>

        {/* Middle Section: Title & Description */}
        <div className="flex-grow flex flex-col">
          <div className="relative overflow-visible px-1 mb-4">
            <h3 className="text-xl md:text-[1.75rem] font-black text-white group-hover:text-gold transition-colors font-display italic uppercase tracking-tighter leading-[1.3] min-h-[60px] md:min-h-[80px] line-clamp-2">
              {course.title}
            </h3>
          </div>
          
          <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed line-clamp-2 group-hover:text-slate-200 transition-colors">
            {course.category} — Explore new horizons in software engineering with our updated 2026 curriculum.
          </p>
        </div>

        {/* Bottom Section: Meta Data & Link */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border border-navy bg-slate-800" />
                  <div className="w-6 h-6 rounded-full border border-navy bg-gold/20 flex items-center justify-center">
                    <Sparkles size={10} className="text-gold" />
                  </div>
               </div>
               <div className="flex flex-col">
                  <span className="text-[7px] text-slate-500 uppercase tracking-tighter">Duration</span>
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">{course.duration}</span>
               </div>
            </div>
            
            {/* Dynamic Link to Course Page */}
            <Link 
              href={`/courses/${course.id}`}
              className="flex items-center gap-2 text-gold text-[9px] font-black uppercase tracking-widest group/btn py-2 px-4 rounded-xl hover:bg-gold/10 transition-all border border-gold/10"
            >
              Details 
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Cinematic Bottom Neon Line */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </motion.div>
  );
}