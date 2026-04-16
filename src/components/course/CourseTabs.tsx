"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Info, User, ChevronRight, Target, Shield, Zap } from "lucide-react";

export default function CourseTabs({ course, fullContent }: any) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "curriculum", label: "Curriculum", icon: BookOpen },
    { id: "instructor", label: "Instructor", icon: User },
  ];

return (
  // 🛡️ التعديل الأول: شيلنا الـ space-y الكبيرة اللي كانت بتعمل فجوات وهمية
  <div className="w-full relative">
    
    {/* 📱 NAVIGATION: Ultra-Visible & Tactical Typography */}
    <div className="relative border-b border-[var(--academy-navy)]/10 mb-8">
      <div className="flex gap-8 md:gap-16 overflow-x-auto no-scrollbar scroll-smooth px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative py-6 group outline-none whitespace-nowrap"
          >
            <div className="flex items-center gap-3">
              <tab.icon 
                size={16} 
                className={`transition-all duration-700 ${
                  activeTab === tab.id 
                    ? "text-[var(--academy-gold)] scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                    : "text-[var(--academy-navy)]/30 group-hover:text-[var(--academy-navy)]/60"
                }`} 
              />
              <span className={`uppercase font-black tracking-[0.3em] text-[11px] md:text-[13px] italic transition-all duration-500 ${
                activeTab === tab.id 
                  ? "text-[var(--academy-navy)] scale-105" 
                  : "text-[var(--academy-navy)]/30 group-hover:text-[var(--academy-navy)]/60"
              }`}>
                {tab.label}
              </span>
            </div>
            
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabGlow"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--academy-gold)] to-transparent z-10"
              />
            )}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--academy-gold)] opacity-0 group-hover:opacity-40 transition-opacity" />
          </button>
        ))}
      </div>
    </div>

    {/* 📄 CONTENT AREA */}
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-h-[400px]" // 🛡️ يضمن ثبات الـ Sidebar وعدم قفزه عند التنقل
        >
          {/* --- OVERVIEW --- */}
          {activeTab === "overview" && (
            <div className="space-y-12"> {/* space داخلي فقط */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[3px] bg-[var(--academy-gold)] shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
                  <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter text-[var(--academy-navy)]">
                    Mission <span className="text-[var(--academy-gold)]">Briefing</span>
                  </h3>
                </div>
                <p className="text-[var(--academy-navy)]/80 leading-relaxed text-lg md:text-2xl font-bold max-w-4xl italic border-l-4 border-[var(--academy-gold)]/40 pl-8 py-2">
                  {course.description || "Initializing tactical sequence..."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fullContent?.benefits?.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-5 rounded-xl border border-[var(--academy-navy)]/5 bg-[var(--academy-navy)]/[0.02]">
                    <Shield size={18} className="text-[var(--academy-gold)] shrink-0" />
                    <span className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[var(--academy-navy)] italic">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- CURRICULUM --- */}
          {activeTab === "curriculum" && (
            <div className="space-y-8">
               {/* محتوى الـ Curriculum كما هو مع التأكد من عدم وجود margins خارجية ضخمة */}
               <div className="flex items-center justify-between border-b border-[var(--academy-navy)]/10 pb-6">
                  <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-[var(--academy-navy)]">
                    Operational <span className="text-[var(--academy-gold)]">Syllabus</span>
                  </h3>
               </div>
               <div className="divide-y divide-[var(--academy-navy)]/5">
                 {fullContent?.curriculum?.map((item: string, i: number) => (
                   <div key={i} className="py-6 flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-6">
                        <span className="text-lg font-black text-[var(--academy-navy)]/10 italic">{String(i + 1).padStart(2, '0')}</span>
                        <span className="uppercase text-sm md:text-lg font-black text-[var(--academy-navy)]/70 group-hover:text-[var(--academy-navy)] transition-colors italic">{item}</span>
                      </div>
                      <ChevronRight size={18} className="text-[var(--academy-navy)]/20" />
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* --- INSTRUCTOR --- */}
          {activeTab === "instructor" && (
            <div className="flex flex-col md:flex-row items-center gap-12 py-8">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-[var(--academy-gold)]/10 blur-[50px] rounded-full -z-10" />
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <div className="absolute inset-0 border-2 border-[var(--academy-gold)]/20 rotate-6 rounded-[2.5rem]" />
                  <div className="w-full h-full rounded-[2.5rem] bg-white border border-[var(--academy-navy)]/10 flex items-center justify-center shadow-lg relative z-10 overflow-hidden">
                    <User size={70} className="text-[var(--academy-navy)]/10" />
                  </div>
                </div>
              </div>
              
              <div className="text-center md:text-left space-y-4">
                <h4 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter text-[var(--academy-navy)] leading-[0.9]">
                  {course.instructor_name}
                </h4>
                <div className="flex items-center justify-center md:justify-start gap-3 text-[var(--academy-gold)]">
                  <Target size={16} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black">Lead Field Instructor</span>
                </div>
                <p className="text-[var(--academy-navy)]/70 text-base md:text-lg max-w-xl italic font-medium border-l-4 border-[var(--academy-gold)]/20 pl-6">
                  Senior tactical expert with decades of experience in high-stakes security operations.
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