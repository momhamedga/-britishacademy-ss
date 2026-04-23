"use client";
import { useReducer, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // ✅ استخدام Image الخاص بـ Next
import { 
  Search, Trash2, Zap, Users, Clock, UserCheck, 
  AlertTriangle, X, ShieldCheck 
} from 'lucide-react';
import { deleteCourse } from '@/actions/admin-actions';

// 🛡️ تعريف اللوجو كـ Fallback
const ACADEMY_LOGO_FALLBACK = "/logo.webp";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH': return { ...state, query: action.payload };
    case 'DELETE': return { ...state, data: state.data.filter((i: any) => i.id !== action.payload) };
    default: return state;
  }
};

export default function CourseTable({ initialCourses, onEdit }: any) {
  const [state, dispatch] = useReducer(reducer, { data: initialCourses, query: '' });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = state.data.filter((c: any) => 
    c.title.toLowerCase().includes(state.query.toLowerCase()) ||
    c.instructor_name?.toLowerCase().includes(state.query.toLowerCase())
  );

  const confirmDelete = async (id: string) => {
    const { success } = await deleteCourse(id);
    if (success) {
      dispatch({ type: 'DELETE', payload: id });
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 font-sans text-foreground">
      {/* Search Header - Tactical Interface */}
      <div className="relative max-w-xl group">
        <div className="absolute inset-0 bg-gold/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
        <div className="relative flex items-center bg-white/40 backdrop-blur-xl border border-white p-2 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="size-12 bg-navy rounded-2xl flex items-center justify-center text-gold shadow-lg shadow-navy/20">
            <Search size={20} />
          </div>
          <input 
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            placeholder="SCAN_DATABASE_ASSETS..."
            className="flex-1 bg-transparent p-4 outline-none text-[11px] font-black uppercase tracking-[0.2em] text-navy placeholder:opacity-30"
          />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-visible">
        <table className="w-full border-separate border-spacing-y-4">
          <tbody className="w-full">
            <AnimatePresence mode="popLayout">
              {filtered.map((course: any) => (
                <motion.tr 
                  layout key={course.id} 
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20 }}
                  className="group relative"
                >
                  <td className="p-6 bg-white/60 backdrop-blur-md rounded-l-[2.5rem] border-y border-l border-white shadow-sm">
                    <div className="flex items-center gap-6">
                      {/* ✅ تعديل المعاينة الذكية */}
                      <div className="relative shrink-0 size-20 rounded-3xl overflow-hidden shadow-2xl border-2 border-white group-hover:scale-105 transition-transform duration-500 bg-background">
                        <Image 
                           src={course.image_url || ACADEMY_LOGO_FALLBACK} 
                           alt={course.title}
                           fill
                           sizes="80px"
                           className={`object-cover ${(!course.image_url || course.image_url === ACADEMY_LOGO_FALLBACK) ? 'p-4 grayscale opacity-20' : ''}`}
                        />
                        {course.is_sia_accredited && (
                          <div className="absolute top-1 right-1 z-10 size-6 bg-gold text-navy rounded-lg flex items-center justify-center shadow-xl border border-white">
                            <ShieldCheck size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-[16px] font-black uppercase italic text-navy tracking-tighter leading-none">{course.title}</h4>
                        <div className="flex items-center gap-3">
                           <span className="text-[8px] font-black bg-navy text-white px-3 py-1 rounded-full uppercase tracking-widest italic">
                             {course.category}
                           </span>
                           <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest flex items-center gap-1 text-navy">
                             <UserCheck size={12} className="text-gold"/> {course.instructor_name || 'Ghost_Instructor'}
                           </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-6 bg-white/60 border-y border-white">
                    <div className="flex gap-10 items-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black opacity-20 uppercase tracking-[0.2em] text-navy">Cadets</span>
                        <span className="flex items-center gap-2 text-[13px] font-black text-navy"><Users size={16} className="opacity-20"/> {course.enrollment_count || 0}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black opacity-20 uppercase tracking-[0.2em] text-navy">Duration</span>
                        <span className="flex items-center gap-2 text-[13px] font-black text-navy"><Clock size={16} className="opacity-20"/> {course.duration}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 bg-white/60 rounded-r-[2.5rem] border-y border-r border-white text-right shadow-sm overflow-hidden">
                    <div className="flex justify-end gap-3 relative h-14 items-center">
                      <AnimatePresence mode="wait">
                        {deletingId === course.id ? (
                          <motion.div 
                            key="confirm" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }}
                            className="flex items-center gap-2 bg-error/10 p-1 rounded-2xl border border-error/20"
                          >
                            <button onClick={() => setDeletingId(null)} className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase">Abort</button>
                            <button onClick={() => confirmDelete(course.id)} className="px-6 py-2 bg-error text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-error/20">Wipe_Data</button>
                          </motion.div>
                        ) : (
                          <motion.div key="actions" className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <button 
                              onClick={() => onEdit(course)} 
                              className="size-14 bg-navy text-gold rounded-2xl flex items-center justify-center hover:shadow-[0_10px_30px_rgba(var(--academy-navy),0.3)] hover:-translate-y-1 transition-all"
                            >
                              <Zap size={20} fill="currentColor" />
                            </button>
                            <button 
                              onClick={() => setDeletingId(course.id)} 
                              className="size-14 bg-error/5 text-error rounded-2xl flex items-center justify-center hover:bg-error hover:text-white transition-all"
                            >
                              <Trash2 size={20} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 md:hidden pb-20">
        <AnimatePresence mode="popLayout">
          {filtered.map((course: any) => (
            <motion.div 
              layout key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white shadow-xl space-y-6"
            >
              <div className="flex items-center gap-5">
                <div className="relative size-20 rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-background">
                    <Image 
                       src={course.image_url || ACADEMY_LOGO_FALLBACK} 
                       alt={course.title} 
                       fill
                       className="object-cover"
                    />
                </div>
                <div className="flex-1">
                  <h4 className="text-[14px] font-black uppercase italic leading-tight text-navy">{course.title}</h4>
                  <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mt-1">{course.instructor_name}</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-background rounded-3xl border border-black/5">
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black opacity-20 uppercase tracking-widest text-navy">Units</span>
                    <span className="text-[12px] font-black text-navy">{course.enrollment_count || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black opacity-20 uppercase tracking-widest text-navy">Period</span>
                    <span className="text-[12px] font-black text-navy">{course.duration}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={() => onEdit(course)} className="size-12 bg-navy text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"><Zap size={18} fill="currentColor"/></button>
                  <button onClick={() => setDeletingId(course.id === deletingId ? null : course.id)} className={`size-12 rounded-xl flex items-center justify-center transition-all ${deletingId === course.id ? 'bg-error text-white' : 'bg-error/10 text-error'}`}>
                    <Trash2 size={18} onClick={() => deletingId === course.id && confirmDelete(course.id)}/>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}