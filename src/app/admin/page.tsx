"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, LogOut, LayoutDashboard, ChevronRight, Activity } from 'lucide-react';

export default function AdminDashboard() {
  
  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=strict";
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative">
      
      {/* FLOATING LOGOUT BUTTON - Top Right */}
      <div className="fixed top-6 right-6 z-[1000]">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="flex mt-20 items-center gap-3 px-4 py-3 md:px-6 md:py-4 bg-white/80 backdrop-blur-xl border border-red-100 text-gold rounded-3xl shadow-2xl shadow-red-100/50 group transition-all"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">logout</span>
          <div className="bg-gold text-white p-2 rounded-xl group-hover:rotate-90 transition-transform duration-500">
            <LogOut size={18} strokeWidth={3} />
          </div>
        </motion.button>
      </div>

      {/* MAIN CONTENT - No Header needed anymore */}
      <main className="max-w-7xl mx-auto p-6 pt-24 md:p-16 md:pt-32 space-y-12">
        
        {/* Header Logo & Status */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-navy rounded-2xl flex items-center justify-center text-white shadow-2xl">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[var(--academy-gold)] mt-1">
          
                              <Activity size={10} className="animate-pulse" />
                                            <h1 className="text-[14px] font-black uppercase tracking-tighter italic leading-none">Admin_Dashboard</h1>

              </div>
            </div>
          </div>
          
      
        </div>

        {/* The Main Access Card */}
        <Link href="/admin/courses">
          <motion.div 
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-navy p-10 md:p-20 text-white shadow-[0_40px_100px_-20px_rgba(15,23,42,0.3)] mt-10"
          >
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[var(--academy-gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
              <div className="space-y-10">
                <div className="size-20 md:size-28 bg-white/5 backdrop-blur-3xl rounded-[2rem] flex items-center justify-center text-[var(--academy-gold)] border border-white/10 shadow-inner">
                  <BookOpen size={40} className="md:size-48" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-7xl font-black uppercase italic leading-none tracking-tighter">
                    Courses_Center
                  </h3>
                  <p className="text-[10px] md:text-xs font-bold opacity-30 uppercase tracking-[0.4em] max-w-xs">
                    Access and Modify
                  </p>
                </div>
              </div>

              {/* Action Circle */}
              <div className="flex items-center self-end md:self-center">
                <div className="size-20 md:size-28 bg-[var(--academy-gold)] rounded-full flex items-center justify-center text-[#0F172A] shadow-[0_0_50px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-all duration-500">
                  <ChevronRight size={40} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

      </main>
    </div>
  );
}