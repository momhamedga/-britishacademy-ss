"use client";
import { useTransition } from 'react'; 
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, LogOut, LayoutDashboard, ChevronRight, Activity, Loader2, Home } from 'lucide-react';
import { logoutAdmin } from '@/actions/portal-auth'; 
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      const res = await logoutAdmin();
      if (res.success) {
        window.location.href = "/admin/login";
      }
    });
  };

  return (
    <div className="min-h-screen text-navy relative bg-transparent">
      
      {/* 🎯 NAVIGATION & CONTROLS HEADER BAR */}
      <div className="fixed top-6 right-6 z-1000 flex items-center gap-3">
        
        {/* 🏠 زر العودة للرئيسية التكتيكي المضاف */}
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          className="flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-3.5 bg-navy border border-white/5 text-slate-400 hover:text-gold hover:border-gold/20 rounded-2xl shadow-xl backdrop-blur-xl transition-all text-[9px] font-black uppercase tracking-widest"
        >
          <Home size={14} />
          <span className="hidden md:block">Return_Home</span>
        </motion.button>

        {/* FLOATING LOGOUT BUTTON */}
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-3.5 bg-white border border-red-100/10 text-gold rounded-2xl shadow-xl transition-all disabled:opacity-50 group"
        >
          <span className="text-[9px] font-black uppercase tracking-widest hidden md:block text-navy">
            {isPending ? "leaving..." : "logout"}
          </span>
          <div className="text-gold group-hover:rotate-90 transition-transform duration-500 flex items-center justify-center shrink-0">
            {isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <LogOut size={14} strokeWidth={2.5} />
            )}
          </div>
        </motion.button>

      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto p-6 pt-28 md:p-16 md:pt-36 space-y-12">
        
        {/* Header Logo & Status */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-navy rounded-2xl flex items-center justify-center text-white shadow-2xl">
              <LayoutDashboard size={24} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gold">
                <Activity size={12} className="animate-pulse" />
                <h1 className="text-sm font-black uppercase tracking-widest italic leading-none">Admin Control Center</h1>
              </div>
            </div>
          </div>
        </div>

        {/* The Main Access Card */}
        <Link href="/admin/courses" className="block mt-10">
          <motion.div 
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.99 }}
            className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-navy p-8 md:p-16 text-white shadow-[0_40px_100px_-20px_rgba(15,23,42,0.3)] border border-white/5"
          >
            <div className="absolute top-0 right-0 w-2/3 h-full bg-linear-to-l from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10">
                <div className="size-20 md:size-24 bg-white/5 backdrop-blur-3xl rounded-2xl flex items-center justify-center text-gold border border-white/10 shadow-inner shrink-0">
                  <BookOpen size={36} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-6xl font-black uppercase italic leading-none tracking-tighter">
                    Courses_<span className="text-gold">Center</span>
                  </h3>
                  <p className="text-[9px] md:text-xs font-bold opacity-35 uppercase tracking-[0.4em]">
                    Access, Create, and Modify Syllabus Vectors
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end sm:justify-center">
                <div className="size-16 md:size-20 bg-gold rounded-full flex items-center justify-center text-navy shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-all duration-500 shrink-0">
                  <ChevronRight size={28} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

      </main>
    </div>
  );
}