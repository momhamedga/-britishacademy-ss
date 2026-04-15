"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, BookOpen, Video, FileText, 
  History, ShieldCheck, Zap, Lock, ArrowRight 
} from "lucide-react";
import EnrollButton from "../portal/EnrollButton";

export default function CourseSidebar({ course, stats, userId }: any) {
  
  const courseFeatures = [
    { label: "Operators Enrolled", value: stats.enrolledCount, icon: Users },
    { label: "Mission Modules", value: stats.modulesCount, icon: BookOpen },
    { label: "Live Briefings", value: stats.liveClasses, icon: Video },
    { label: "Intel Resources", value: stats.hasResources ? "Available" : "N/A", icon: FileText },
    { label: "Mission Records", value: stats.hasClassRecord ? "Archived" : "N/A", icon: History },
  ];

  return (
    <>
      {/* --- Desktop Sidebar (Visible on Large Screens) --- */}
      <div className="hidden lg:block  sticky top-32 group">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-[2.5rem] border  border-white/10 bg-navy backdrop-blur-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-gold/20"
        >
          {/* Tactical Header */}
          <div className="flex  justify-between items-start mb-10 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                <p className="text-[9px] text-gold font-black uppercase tracking-[0.2em] italic">Access Fee</p>
              </div>
              <h3 className="text-5xl font-black text-white italic tracking-tighter">£{course.price}</h3>
            </div>
            <div className="bg-white/[0.03] border border-white/10 p-2 rounded-xl">
               <Lock size={16} className="text-white/20" />
            </div>
          </div>

          {/* Tactical Briefing List */}
          <div className="space-y-4 mb-10 relative z-10">
            <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Zap size={10} className="text-gold fill-gold" /> System Specifications
            </p>
            
            {courseFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all group/item">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 group-hover/item:border-gold/30 transition-colors">
                    <feature.icon size={14} className="text-gold/60 group-hover/item:text-gold group-hover/item:rotate-12 transition-all" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase italic tracking-wide group-hover/item:text-slate-200 transition-colors">
                    {feature.label}
                  </span>
                </div>
                <span className="text-[11px] text-white font-black italic font-mono">
                  {feature.value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="relative z-10 space-y-4">
            <EnrollButton courseId={course.id} userId={userId} />
         
          </div>

          {/* Background Aesthetics */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-all" />
        </motion.div>
      </div>

      {/* --- Mobile Floating Command Bar (Creative UX) --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-10 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="pointer-events-auto max-w-md mx-auto bg-[#080808] border border-white/10 p-3 rounded-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.8)] flex items-center justify-between backdrop-blur-2xl"
        >
          <div className="pl-5">
            <div className="flex items-center gap-1.5 mb-0.5">
               <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
               <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Investment</p>
            </div>
            <p className="text-2xl font-black text-white italic leading-none tracking-tighter">£{course.price}</p>
          </div>

          {/* نستخدم الـ EnrollButton هنا لكن بستايل مخصص لو أمكن أو نغلفه */}
          <div className="w-[180px]">
            <EnrollButton courseId={course.id} userId={userId} />
          </div>
        </motion.div>
      </div>

      {/* Security Footer (Mobile Only - visible above the bar) */}
      <div className="lg:hidden mb-24 flex items-center gap-3 justify-center opacity-40">
        <ShieldCheck size={12} className="text-gold" />
        <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest italic">
          Fully SIA Accredited Training System
        </span>
      </div>
    </>
  );
}