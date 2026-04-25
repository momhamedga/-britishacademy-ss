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
import { useTransition } from 'react'; // شيلنا useMemo
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ studentData }: { studentData: any }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // ✅ في React 19، الـ Compiler بيعمل Memoization تلقائي للـ Arrays الـ Static دي
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'My Courses', icon: BookOpen, href: '/dashboard/courses' },
    { name: 'Certificates', icon: GraduationCap, href: '/dashboard/certificates' },
    { name: 'Profile', icon: User, href: '/dashboard/profile' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <div className="flex flex-col h-full py-10 px-6 text-white select-none">
      
      {/* 🛡️ Branding - Tactical Gold Glow UI */}
      <div className="mb-14 px-2 relative group cursor-default">
        <div className="flex items-center gap-3.5 mb-5 relative z-10">
          <div className="relative size-10 flex items-center justify-center">
            <motion.div 
              animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gold blur-[14px] rounded-full" 
            />
            <ShieldCheck className="text-gold relative z-10 w-7 h-7 drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
          </div>
          
          <div className="flex flex-col gap-0.5">
             <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-[0.8] text-white">
                British <span className="text-gold">Academy</span>
             </h1>
          </div>
        </div>
      </div>

      {/* 🧭 Navigation */}
      <nav className="flex-1 space-y-2 relative">
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
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-[3px] h-9 bg-gold shadow-[0_0_20px_#D4AF37] rounded-r-full" 
                />
              )}

              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                  isActive 
                  ? 'bg-gradient-to-r from-white/[0.08] to-transparent text-white' 
                  : 'text-slate-500 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <item.icon 
                    size={20} 
                    className={`${isActive ? 'text-gold' : 'group-hover:text-gold'} transition-colors duration-300`} 
                  />
                  <span className="text-[11px] font-black uppercase tracking-[0.25em]">{item.name}</span>
                </div>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="relative z-10"
                    >
                      <ChevronRight size={16} className="text-gold" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* 👤 Footer */}
      <div className="mt-auto pt-8 space-y-5">
        
        {/* Profile Card */}
        <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-4 flex items-center gap-4 group hover:bg-white/[0.06] transition-all duration-500 backdrop-blur-md">
          <div className="relative size-12 shrink-0">
              <div className="absolute inset-0 bg-gold blur-md rounded-2xl opacity-10 group-hover:opacity-30 transition-opacity" />
              <div className="relative h-full w-full bg-[#050B18] border border-white/10 rounded-2xl flex items-center justify-center text-gold font-black text-xl shadow-2xl">
                {studentData?.name?.[0] || 'A'}
              </div>
              <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 border-[3px] border-[#0A1121] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.7)] animate-pulse" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[11px] font-black uppercase tracking-tight truncate text-white">
                {studentData?.name || 'Momo Student'}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
                <Zap size={10} className="text-gold fill-gold" />
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest italic">
                    {studentData?.rank || 'Elite Member'}
                </span>
            </div>
          </div>
        </div>

        {/* 🚨 Terminate Session */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          disabled={isPending}
          className={`w-full flex items-center justify-center gap-3.5 py-5 rounded-[1.8rem] transition-all duration-500 font-bold group border-[1.5px] ${
            isPending 
            ? 'bg-slate-500/10 border-white/5 text-slate-500 cursor-wait' 
            : 'bg-[#121A2D] border-red-600 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3 group">
            <LogOut size={18} className={isPending ? 'animate-spin' : 'group-hover:-translate-x-1.5 transition-transform duration-500'} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              {isPending ? 'Processing...' : 'Terminate Session'}
            </span>
          </div>
        </motion.button>

        {/* Back to Home Site */}
        <Link href="/" className="block">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl transition-all duration-300 border border-white/5 text-slate-400 hover:border-gold/30 hover:text-gold bg-white/[0.01] hover:bg-white/[0.04]"
          >
            <Globe size={16} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Return to Academy Main Site</span>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}