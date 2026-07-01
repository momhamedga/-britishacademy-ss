"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, BookOpen, Video, FileText, 
  History, ShieldCheck, Zap, Lock, ArrowRight, Play, Award 
} from "lucide-react";
import EnrollButton from "../portal/EnrollButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import { checkStudentVectorProgress } from "@/actions/academy-actions";

export default function CourseSidebar({ course, stats, userId }: any) {
  // 🛰️ حالة تتبع التقدم والاشتراك للطالب الحالي
  const [enrollment, setEnrollment] = useState<{ isEnrolled: boolean; progress: number }>({ 
    isEnrolled: false, 
    progress: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      if (userId && course?.id) {
        try {
          // ✅ استدعاء دالة الفحص الأصلية بدون تضارب مسميات
          const status = await checkStudentVectorProgress(course.id);
          if (status) {
            setEnrollment({
              isEnrolled: status.isEnrolled,
              progress: status.progress
            });
          }
        } catch (error) {
          console.error("🔴 Terminal Sync Error:", error);
        }
      }
      setLoading(false);
    }
    fetchStatus();
  }, [course?.id, userId]);
  
  const courseFeatures = [
    { label: "Operators Enrolled", value: stats.enrolledCount, icon: Users },
    { label: "Mission Modules", value: stats.modulesCount, icon: BookOpen },
    { label: "Live Briefings", value: stats.liveClasses, icon: Video },
    { label: "Intel Resources", value: stats.hasResources ? "Available" : "N/A", icon: FileText },
    { label: "Mission Records", value: stats.hasClassRecord ? "Archived" : "N/A", icon: History },
  ];

  const renderActionHub = () => {
    if (loading) {
      return (
        <div className="w-full py-5 bg-white/5 rounded-2xl animate-pulse text-center text-[10px] uppercase font-mono text-gold/40 tracking-widest">
          Verifying Clearance...
        </div>
      );
    }
    
    // الحالة 1: الطالب غير مشترك في المهمة تماماً
    if (!enrollment.isEnrolled) {
      return <EnrollButton courseId={course.id} userId={userId} />;
    }

    // الحالة 2: الطالب مشترك والتقدم أقل من 100%
    if (enrollment.progress < 100) {
      return (
        <div className="space-y-4 w-full">
          <div className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl">
            <div className="flex justify-between text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
              <span>Training Progress</span>
              <span className="text-gold">{enrollment.progress}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gold transition-all duration-500" style={{ width: `${enrollment.progress}%` }} />
            </div>
          </div>
          <Link href={`/courses/${course.slug}?mode=study`} className="w-full bg-emerald-600 hover:bg-emerald-500 py-5 rounded-2xl text-white font-black uppercase text-center text-xs tracking-[0.1em] transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
            <Play size={14} fill="currentColor" /> Resume Protocol 
          </Link>
        </div>
      );
    }

    // الحالة 3: 🚀 [التعديل النووي]: التقدم يساوي 100% - يظهر خيار التحميل وبجانبه خيار الدخول والمراجعة
    return (
      <div className="space-y-3 w-full">
        {/* زر تحميل الشهادة الفخم برابط لوحة الشهادات */}
        <Link 
          href="/dashboard/certificates" 
          className="w-full bg-gradient-to-r from-gold to-yellow-600 hover:opacity-90 py-5 rounded-2xl text-navy font-black uppercase text-center text-xs tracking-[0.1em] transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
        >
          <Award size={16} /> Download Certificate
        </Link>

        {/* زر إبقاء صلاحية دخول الكورس للمراجعة حتى بعد التكفيل 100% */}
        <Link 
          href={`/courses/${course.slug}?mode=study`} 
          className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl text-white font-black uppercase text-center text-[11px] tracking-[0.1em] transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(16,185,129,0.15)]"
        >
          <Play size={12} fill="currentColor" /> Review Course Intel
        </Link>
      </div>
    );
  };

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <div className="hidden lg:block sticky top-32 group z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-[2.5rem] border border-white/10 bg-navy backdrop-blur-3xl relative overflow-hidden shadow-[0_30px_60px_rgba(2,6,23,0.6)] transition-all duration-500 group-hover:border-gold/20"
        >
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                <p className="text-[9px] text-gold font-black uppercase tracking-[0.2em] italic">Access Fee</p>
              </div>
              <h3 className="text-5xl font-black text-white italic tracking-tighter">£{course.price}</h3>
            </div>
            <div className="bg-navy border border-white/10 p-2 rounded-xl">
               <Lock size={16} className="text-gold/40" />
            </div>
          </div>

          <div className="space-y-4 mb-10 relative z-10">
            <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Zap size={10} className="text-gold fill-gold" /> System Specifications
            </p>
            
            {courseFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all group/item">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-navy border border-white/5 group-hover/item:border-gold/30 transition-colors">
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

          <div className="relative z-10 space-y-4">
            {renderActionHub()}
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-all" />
        </motion.div>
      </div>

      {/* --- Mobile Hub --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] pointer-events-none px-4 pb-6">
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy via-navy/90 to-transparent -z-10" />

        <motion.div 
          initial={{ y: 100, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative pointer-events-auto w-full bg-navy/90 backdrop-blur-[30px] border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(2,6,23,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="flex items-center p-2.5">
            <div className="flex flex-col justify-center pl-6 pr-5 border-r border-white/5 py-2">
              <div className="flex items-center gap-1.5 mb-1.5">
                 <div className="relative flex h-1.5 w-1.5">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
                 </div>
                 <p className="text-[7px] font-black text-white/30 uppercase tracking-[0.4em] leading-none">Full Intel</p>
              </div>
              
              <div className="flex items-start gap-0.5">
                <span className="text-[10px] font-black text-gold mt-1">£</span>
                <p className="text-3xl font-[900] text-white italic leading-none tracking-tighter">
                  {course.price}
                </p>
              </div>
            </div>

            <div className="flex-grow pl-3 pr-1 animate-in fade-in duration-300">
              {renderActionHub()}
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- Status Bar --- */}
      <div className="lg:hidden fixed bottom-[125px] left-0 right-0 flex justify-center pointer-events-none px-10">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.6 }}
           className="flex items-center gap-2 bg-navy/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10"
         >
           <Zap size={10} className="text-gold" />
           <span className="text-[8px] text-slate-300 uppercase font-black tracking-widest italic">
             Fully SIA Accredited System
           </span>
         </motion.div>
      </div>
    </>
  );
}