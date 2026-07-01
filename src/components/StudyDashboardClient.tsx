"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, Circle, Award, BookOpen, ChevronLeft, Video, FileText, RefreshCw, Trophy, ShieldCheck } from 'lucide-react';
import { updateLessonProgress } from '@/actions/academy-actions';
import Link from 'next/link';

export default function StudyDashboardClient({ course, lessons, initialProgress, initialCompletedLessons = [] }: any) {
  const [completedLessons, setCompletedLessons] = useState<string[]>(initialCompletedLessons); 
  const [currentLesson, setCurrentLesson] = useState(lessons[0] || null);
  const [progress, setProgress] = useState(initialProgress || 0);

  const toggleLessonComplete = async (lessonTitle: string) => {
    if (!lessonTitle) return; 
    
    let updatedCompleted;
    if (completedLessons.includes(lessonTitle)) {
      updatedCompleted = completedLessons.filter(title => title !== lessonTitle);
    } else {
      updatedCompleted = [...completedLessons, lessonTitle];
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
      await updateLessonProgress(course.id, lessons.length, 0, []);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white font-sans px-4 pt-28 pb-16 md:px-12 md:pt-36 selection:bg-gold/30">
      
      {/* 🌌 Top Status Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8 mb-10">
        <div className="space-y-4">
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
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* 🏆 1. كارت التهنئة العلوي الفخم: يظهر بانسيابية فقط عند الـ 100% دون حجب الدروس */}
        <AnimatePresence>
          {progress === 100 && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="w-full bg-gradient-to-r from-gold/10 via-white/[0.02] to-transparent border border-gold/30 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-5">
                <div className="size-14 bg-gold/10 border border-gold/40 rounded-xl flex items-center justify-center text-gold shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                  <Trophy size={24} />
                </div>
                <div className="space-y-1 text-left">
                  <h2 className="text-lg font-black uppercase italic tracking-tight text-white">Mission Fully Accomplished!</h2>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Your accreditation certificate is unlocked and ready for deployment.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Link 
                  href="/dashboard/certificates" 
                  className="px-5 py-3 bg-gold text-navy font-black text-[10px] uppercase rounded-xl tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 text-center justify-center w-full md:w-auto"
                >
                  <Award size={14} /> Get Certificate
                </Link>
                <button 
                  type="button"
                  onClick={resetCourseProtocol}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-[10px] uppercase rounded-xl tracking-wider flex items-center gap-2 transition-all active:scale-95 text-center justify-center w-full md:w-auto"
                >
                  <RefreshCw size={12} /> Restart
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📚 2. الـ Study Interface الرئيسي: يظل تفاعلي وشغال دائماً بدون كراش */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Video Player Screen */}
          <div className="lg:col-span-8 space-y-6">
            {currentLesson ? (
              <div className="space-y-6">
                <div className="w-full rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden flex items-center justify-center bg-black">
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
                    <div className="text-center p-20 w-full">
                      <Video size={48} className="text-white/10 mx-auto mb-4" />
                      <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">No Live Video Feed Asset Linked</p>
                    </div>
                  )}
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] text-left">
                  <h3 className="text-xl font-black text-gold mb-3 uppercase tracking-tight">{currentLesson.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{currentLesson.description || "No supplemental written intel provided for this operational module."}</p>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem] flex items-center justify-center">
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Awaiting Module Selection...</p>
              </div>
            )}
          </div>

          {/* Right Side: Curriculum Interactive List */}
          <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] h-[600px] overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-2 mb-6 px-2">
              <BookOpen size={16} className="text-gold" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Mission Syllabus</h3>
            </div>

            <div className="space-y-3">
              {lessons.map((lesson: any, index: number) => {
                const isCurrent = currentLesson?.title === lesson.title;
                const isCompleted = completedLessons.includes(lesson.title);

                return (
                  <div 
                    key={`lesson-vector-${index}`}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group/item cursor-pointer
                      ${isCurrent ? 'bg-white/10 border-gold/40 shadow-lg' : 'bg-white/[0.01] border-white/5 hover:bg-white/5'}`}
                    onClick={() => setCurrentLesson(lesson)}
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
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
                        toggleLessonComplete(lesson.title);
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

    </div>
  );
}