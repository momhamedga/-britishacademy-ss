"use client"
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
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTransition, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ studentData }: any) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // تحسين الأداء عبر Memoization للقائمة
  const menuItems = useMemo(() => [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'My Courses', icon: BookOpen, href: '/dashboard/courses' },
    { name: 'Certificates', icon: GraduationCap, href: '/dashboard/certificates' },
    { name: 'Profile', icon: User, href: '/dashboard/profile' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ], []);

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <div className="flex flex-col h-full py-10 px-6 text-white select-none">
      
      {/* 🛡️ Branding - High Contrast Tactical UI */}
      <div className="mb-12 px-2 relative group cursor-default">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative size-10 flex items-center justify-center">
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gold blur-xl rounded-full" 
            />
            <ShieldCheck className="text-gold relative z-10 w-7 h-7 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
          </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-[0.8]">
          British <span className="text-gold">Academy</span>
        </h1>
        </div>
  
      </div>

      {/* 🧭 Navigation - Framer Motion Optimized */}
      <nav className="flex-1 space-y-2 relative">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="relative block"
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden border ${
                  isActive 
                  ? 'bg-white/[0.07] border-white/10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.3)]' 
                  : 'border-transparent text-slate-500 hover:text-white hover:bg-white/[0.03]'
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

                {/* ✨ Active Indicator Glow Line */}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-gold shadow-[0_0_20px_#D4AF37] rounded-r-full" 
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* 👤 Footer - Identity & Session Control */}
      <div className="mt-auto pt-8 space-y-4">
        
        {/* Profile Card - Glassmorphism Level 2 */}
        <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-4 flex items-center gap-4 group hover:bg-white/[0.06] transition-all duration-500 backdrop-blur-md">
          <div className="relative size-12 shrink-0">
             <div className="absolute inset-0 bg-gold blur-md rounded-2xl opacity-10 group-hover:opacity-30 transition-opacity" />
             <div className="relative h-full w-full bg-[#050B18] border border-white/10 rounded-2xl flex items-center justify-center text-gold font-black text-xl shadow-2xl">
                {studentData?.name?.[0] || 'A'}
             </div>
             <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 border-[3px] border-[#151b28] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[11px] font-black uppercase tracking-tight truncate text-white/90">
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

        {/* 🚨 Terminate Session - Tactical Red Force */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          disabled={isPending}
          className={`w-full flex items-center justify-center gap-3 py-5 rounded-[1.8rem] transition-all duration-500 font-bold group border ${
            isPending 
            ? 'bg-slate-500/10 border-white/5 text-slate-500 cursor-wait' 
            : 'bg-red-500/5 border-red-500/20 hover:bg-red-600 hover:border-red-600 text-red-500 hover:text-white shadow-[0_10px_30px_rgba(239,68,68,0.1)] hover:shadow-red-600/30'
          }`}
        >
          <LogOut size={18} className={isPending ? 'animate-spin' : 'group-hover:-translate-x-1 transition-transform duration-500'} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            {isPending ? 'Processing...' : 'Terminate Session'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}