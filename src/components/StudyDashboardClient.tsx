"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 🛰️ أضفنا أيقونة ChevronLeft و Layout لتأمين الرجوع
import { Play, CheckCircle2, Circle, Award, BookOpen, ChevronLeft, Video, FileText, RefreshCw, Trophy, ShieldCheck, Layout } from 'lucide-react';
import { updateLessonProgress } from '@/actions/academy-actions';
import Link from 'next/link';

export default function StudyDashboardClient({ course, lessons, initialProgress,initialCompletedLessons = []}: any) {
  /*  



    // 👈 التعديل التكتيكي: بنمرر الـ updatedCompleted كـ باراميتر رابع للأكشن ليتم حفظه في الداتابيز

  
  // بقية الكود كما هو...*/
  const [completedLessons, setCompletedLessons] = useState<string[]>(initialCompletedLessons); 
  const [currentLesson, setCurrentLesson] = useState(lessons[0] || null);
  const [progress, setProgress] = useState(initialProgress || 0);

const toggleLessonComplete = async (lessonId: string) => {
    let updatedCompleted;
    if (completedLessons.includes(lessonId)) {
      updatedCompleted = completedLessons.filter(id => id !== lessonId);
    } else {
      updatedCompleted = [...completedLessons, lessonId];
    }
    
    setCompletedLessons(updatedCompleted);
    const res = await updateLessonProgress(course.id, lessons.length, updatedCompleted.length, updatedCompleted);
    if (res.success && res.progress !== undefined) {
      setProgress(res.progress);
    }
  };
  const resetCourseProtocol = async () => {
    if (confirm("Are you sure you want to reset your progress for review?")) {
      setCompletedLessons([]);
      setProgress(0);
      if (lessons.length > 0) setCurrentLesson(lessons[0]);
      await updateLessonProgress(course.id, lessons.length, 0);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white font-sans px-4 pt-28 pb-16 md:px-12 md:pt-36 selection:bg-gold/30">
      
      {/* 🌌 Top Status Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8 mb-10">
        <div className="space-y-4">
          
          {/* 🎯 زر التوجيه الخلفي التكتيكي - ينقلك فوراً لصفحة تفاصيل الدورة الأصلية */}
          <Link 
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-gold/40 text-slate-300 hover:text-gold text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 group shadow-lg"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Return_To_Base</span>
          </Link>

          <div>
            <span className="text-gold text-[9px] font-black uppercase tracking-[0.3em] block mb-2">Operation Study Portal</span>
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">{course.title}</h1>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] w-full md:w-96 space-y-3 relative overflow-hidden group">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-400">
            <span>Overall Clearance</span>
            <span className="text-gold font-mono text-xs">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-gold to-yellow-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* 🕋 The core Hub Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 🎬 Left Side: Screen & Video / Success Mission Hub */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {progress === 100 ? (
              <motion.div 
                key="success-hub"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-gradient-to-br from-white/[0.03] to-transparent border border-gold/30 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl"
              >
                <div className="absolute -top-24 -left-24 size-48 bg-gold/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 size-48 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 space-y-8 flex flex-col items-center">
                  <div className="size-24 bg-gold/10 border-2 border-gold/50 rounded-[2rem] flex items-center justify-center text-gold shadow-[0_0_50px_rgba(212,175,55,0.2)] animate-bounce">
                    <Trophy size={42} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-2">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Operation Fully Accomplished</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">Mission Completed!</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                      Your technical clearance is verified. You are now officially cleared to download your global accreditation credentials.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md pt-4">
                    <Link 
                      href="/dashboard/certificates" 
                      className="w-full py-5 bg-gradient-to-r from-gold to-yellow-600 text-navy font-black text-xs uppercase text-center rounded-2xl tracking-wider flex items-center justify-center gap-2 shadow-[0_15px_40px_rgba(212,175,55,0.25)] hover:opacity-90 transition-all"
                    >
                      <Award size={16} /> Download Certificate
                    </Link>
                    <button 
                      type="button"
                      onClick={resetCourseProtocol}
                      className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs uppercase text-center rounded-2xl tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <RefreshCw size={14} /> Review & Restart
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : currentLesson ? (
              <motion.div key="lesson-hub" className="space-y-6">
                
                <div className="w-full rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden flex items-center justify-center group bg-black">
                  {currentLesson.video_url ? (
                    currentLesson.video_url.includes('<iframe') ? (
                      <div 
                        className="w-full h-full [&_iframe]:w-full [&_iframe]:aspect-video"
                        dangerouslySetInnerHTML={{ __html: currentLesson.video_url }} 
                      />
                    ) : (
                      <div className="aspect-video w-full">
                        <iframe 
                          src={currentLesson.video_url} 
                          className="w-full h-full object-cover"
                          allowFullScreen
                        />
                      </div>
                    )
                  ) : (
                    <div className="text-center p-20">
                      <Video size={48} className="text-white/10 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">No Live Video Feed Asset Linked</p>
                    </div>
                  )}
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem]">
                  <h3 className="text-xl font-black text-gold mb-3 uppercase tracking-tight">{currentLesson.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{currentLesson.description || "No supplemental written intel provided for this operational module."}</p>
                </div>
              </motion.div>
            ) : (
              <div className="aspect-video bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem] flex items-center justify-center">
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Awaiting Module Selection...</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 📜 Right Side: Curriculum Interactive List */}
        <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] h-[600px] overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-2 mb-6 px-2">
            <BookOpen size={16} className="text-gold" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Mission Syllabus</h3>
          </div>

          <div className="space-y-3">
            {lessons.map((lesson: any, index: number) => {
              const isCurrent = currentLesson?.id === lesson.id;
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <div 
                  key={lesson.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group/item cursor-pointer
                    ${isCurrent ? 'bg-white/10 border-gold/40 shadow-lg' : 'bg-white/[0.01] border-white/5 hover:bg-white/5'}`}
                  onClick={() => progress !== 100 && setCurrentLesson(lesson)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="font-mono text-[10px] font-black opacity-30 tracking-tighter">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className={`text-xs font-black uppercase tracking-tight transition-colors ${isCurrent ? 'text-gold' : 'text-white'} ${isCompleted ? 'line-through opacity-40' : ''}`}>
                        {lesson.title}
                      </h4>
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <FileText size={10} /> {lesson.duration || "15 mins"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      toggleLessonComplete(lesson.id);
                    }}
                    className="p-2 text-slate-500 hover:text-gold transition-colors z-10"
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={20} className="text-emerald-500 fill-emerald-500/10" />
                    ) : (
                      <Circle size={20} className="opacity-40 hover:opacity-100" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}


