"use client";

import { logout } from '@/actions/portal-auth';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  User, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ studentData }: { studentData: any }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // 🛰️ مصفوفة الـ Navigation المصفحة بالمسار الصافي بالملي
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'My Courses', icon: BookOpen, href: '/dashboard/courses' },
    { name: 'Membership Card', icon: ShieldCheck, href: '/dashboard/MembershipCard' }, 
    { name: 'Certificates', icon: GraduationCap, href: '/dashboard/certificates' },
    { name: 'Profile', icon: User, href: '/dashboard/profile' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  // لقط الحرف الأول بشكل نظيف ومؤمن
  const firstLetter = studentData?.name ? studentData.name.trim().charAt(0).toUpperCase() : 'A';

  return (
    /* 🎯 هنا السحر التكتيكي: مجبر يأخذ h-screen بالكامل و flex-col مع min-h-screen لضمان عدم الانقطاع رأسيًا */
    <div className="flex flex-col h-screen min-h-screen py-10 px-6 text-white select-none justify-between overflow-y-auto no-scrollbar">
      
      <div className="space-y-12">
        {/* 🛡️ Branding - Tactical Gold Glow UI */}
        <div className="px-2 relative group cursor-default">
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="relative size-10 flex items-center justify-center shrink-0">
              <motion.div 
                animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gold blur-[14px] rounded-full" 
              />
              <ShieldCheck className="text-gold relative z-10 w-7 h-7 drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
            </div>
            
            <div className="flex flex-col gap-0.5">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none text-white">
                British <span className="text-gold">Academy</span>
              </h1>
            </div>
          </div>
        </div>

        {/* 🧭 Navigation */}
        <nav className="space-y-1.5 relative">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className="relative block group"
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-[4px] h-9 bg-gold shadow-[0_0_20px_#D4AF37] rounded-r-full" 
                  />
                )}

                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    isActive 
                    ? 'bg-gradient-to-r from-white/[0.06] to-transparent text-white border border-white/[0.03]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <item.icon 
                      size={18} 
                      className={`${isActive ? 'text-gold' : 'group-hover:text-gold'} transition-colors duration-300`} 
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em]">{item.name}</span>
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="relative z-10"
                      >
                        <ChevronRight size={14} className="text-gold" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 👤 Footer Controls - Locked tightly at the base */}
      <div className="pt-8 space-y-4 border-t border-white/[0.03] mt-8 shrink-0">
        
        {/* Profile Identity Card */}
        <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 flex items-center gap-3.5 group hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-md">
          <div className="relative size-11 shrink-0">
            <div className="absolute inset-0 bg-gold blur-md rounded-xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative h-full w-full bg-navy border border-white/10 rounded-xl flex items-center justify-center text-gold font-mono font-black text-lg shadow-2xl">
              {firstLetter}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 border-2 border-[#0A1121] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[11px] font-black uppercase tracking-tight truncate text-white">
              {studentData?.name || 'Operational Agent'}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <Zap size={9} className="text-gold fill-gold shrink-0" />
              <span className="text-[8px] font-mono font-black text-gold/60 uppercase tracking-widest italic truncate">
                {studentData?.rank || 'AGENT'}
              </span>
            </div>
          </div>
        </div>

        {/* 🚨 Terminate Session Button */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleLogout}
          disabled={isPending}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl transition-all duration-300 font-bold group border ${
            isPending 
            ? 'bg-slate-500/10 border-white/5 text-slate-500 cursor-wait' 
            : 'bg-red-950/10 border-red-800/40 hover:border-red-600 text-red-500 hover:bg-red-600 hover:text-white shadow-lg'
          }`}
        >
          <div className="flex items-center gap-2 group">
            <LogOut size={14} className={isPending ? 'animate-spin' : 'group-hover:-translate-x-1 transition-transform duration-300'} />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">
              {isPending ? 'Processing...' : 'Terminate Session'}
            </span>
          </div>
        </motion.button>

        {/* Global Redirect Anchor */}
        <Link href="/" className="block">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300 border border-white/[0.03] text-slate-500 hover:border-gold/20 hover:text-gold bg-white/[0.005] hover:bg-white/[0.02]"
          >
            <Globe size={13} />
            <span className="text-[8px] font-black uppercase tracking-widest">Return to Base</span>
          </motion.div>
        </Link>
      </div>

    </div>
  );
}