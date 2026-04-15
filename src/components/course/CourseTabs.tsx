"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Info, User, CheckCircle2, ChevronRight, Shield } from "lucide-react";

export default function CourseTabs({ course, fullContent }: any) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "curriculum", label: "Curriculum", icon: BookOpen },
    { id: "instructor", label: "Instructor", icon: User },
  ];

  return (
    <div className="space-y-6 bg-navy md:space-y-10">
      {/* 📱 Mobile-Friendly Tab Navigation */}
      <div className="relative overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 border-b border-white/5">
        <div className="flex gap-2 md:gap-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-3 px-4 py-4 transition-all duration-300 group`}
            >
              <tab.icon size={16} className={`${activeTab === tab.id ? "text-gold" : "text-white/20 group-hover:text-white/50"}`} />
              <span className={`uppercase font-black tracking-[0.2em] text-[10px] md:text-xs italic ${
                activeTab === tab.id ? "text-white" : "text-white/20 group-hover:text-white/40"
              }`}>
                {tab.label}
              </span>
              
              {/* Active Indicator Line */}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 📄 Content Area with Framer Motion */}
      <div className="relative min-h-[450px] bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-6 md:p-12 overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* --- OVERVIEW --- */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={18} className="text-gold opacity-50" />
                    <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white">Mission Objective</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base font-medium">
                    {course.description}
                  </p>
                </div>

                {fullContent?.overview && (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 italic text-slate-300 text-sm leading-relaxed">
                    {fullContent.overview}
                  </div>
                )}
                
                {/* Benefits / Outcomes Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {fullContent?.benefits?.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gold/60">
                         <CheckCircle2 size={12} className="text-gold" /> {benefit}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* --- CURRICULUM --- */}
            {activeTab === "curriculum" && (
              <div className="space-y-4">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">Syllabus Breakdown</h3>
                    <span className="text-[10px] font-mono text-white/20">{fullContent?.curriculum?.length || 0} MODULES LOADED</span>
                 </div>
                 
                 <div className="grid gap-3">
                    {fullContent?.curriculum?.map((item: string, i: number) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i} 
                        className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] transition-all cursor-default"
                      >
                        <div className="flex items-center gap-5">
                          <span className="text-[10px] font-mono text-gold/40 group-hover:text-gold transition-colors font-black">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="uppercase text-[11px] md:text-sm font-black tracking-tight text-white/80 group-hover:text-white transition-colors italic">
                            {item}
                          </span>
                        </div>
                        <ChevronRight size={14} className="text-white/10 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                      </motion.div>
                    ))}
                 </div>
              </div>
            )}

            {/* --- INSTRUCTOR --- */}
            {activeTab === "instructor" && (
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="relative group">
                   <div className="absolute -inset-1 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative">
                      {/* لو مفيش صورة، نحط placeholder تكتيكي */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/10 to-transparent">
                         <User size={40} className="text-gold/20" />
                      </div>
                   </div>
                </div>
                
                <div className="text-center md:text-left space-y-4">
                  <div>
                    <h4 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white">
                      {course.instructor_name}
                    </h4>
                    <p className="text-gold text-[10px] md:text-xs uppercase tracking-[0.3em] font-black mt-1">Lead Tactical Instructor</p>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-md italic">
                    Certified security expert with over 15 years of operational experience in high-risk environments and professional training.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}