"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, Settings, 
  LogOut, Shield, Award, UserCircle, 
  ChevronRight, Activity, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from "react";
import { logout } from '@/actions/portal-auth';

interface SidebarProps {
  studentData?: {
    name: string;
    rank: string;
    student_id: string; // تأكد إن ده المسمى اللي جاي من الـ Layout
    id?: string;        // لو بتبعت الـ UUID كـ id
  };
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'My Courses', href: '/dashboard/courses' },
  { icon: Award, label: 'Certificates', href: '/dashboard/certificates' },
  { icon: UserCircle, label: 'Profile', href: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar({ studentData }: SidebarProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // 🛡️ التحقق الحقيقي: لو فيه ID فعلي للطالب
  const hasIdentity = !!(studentData?.student_id || studentData?.id);

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <div className="flex flex-col h-full p-6 backdrop-blur-3xl border-r border-white/5 relative overflow-hidden">
      
      {/* 🌌 Decorative Ambient Glow */}
      <div className="absolute -top-20 -left-20 size-40 bg-gold/5 blur-[100px] rounded-full" />

      {/* 🛡️ Logo Section */}
      <div className="flex items-center gap-4 mb-12 px-2 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gold/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-11 h-11 bg-gold rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)] border border-white/10">
            <Shield className="text-[#020617]" size={22} fill="currentColor" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-black tracking-tighter text-xl italic leading-none">BRITISH</span>
          <span className="text-gold text-[9px] tracking-[0.4em] font-black uppercase">Academy</span>
        </div>
      </div>

      {/* 🧭 Navigation Protocol */}
      <nav className="flex-1 space-y-2 relative z-10">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href} className="block group">
              <div className={`
                relative flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-500 overflow-hidden
                ${isActive ? 'text-gold' : 'text-slate-500 hover:text-white'}
              `}>
                <div className="flex items-center gap-4">
                  <item.icon 
                    size={18} 
                    strokeWidth={isActive ? 2.5 : 1.5} 
                    className={`transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'group-hover:scale-110'}`} 
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none italic">
                    {item.label}
                  </span>
                </div>
                {isActive && <ChevronRight size={12} className="text-gold/50" />}
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gold/[0.04] border border-gold/10 rounded-2xl -z-10 shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* 🔒 Secured Section (Identity & Logout) */}
      <AnimatePresence mode="wait">
        {hasIdentity ? (
          <motion.div 
            key="authenticated-view"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="relative mt-auto pt-6 group"
          >
            {/* 👤 User Identity Card */}
            <div className="absolute -inset-4 bg-white/[0.01] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center gap-4 p-3 mb-6 border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-md">
              <div className="size-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center relative">
                <Activity size={16} className="text-gold/50" />
                <div className="absolute -top-1 -right-1 size-2.5 bg-emerald-500 border-2 border-[#020617] rounded-full shadow-[0_0_8px_#10b981]" />
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-white font-black text-[10px] uppercase truncate italic">
                  {studentData?.name?.split(' ')[0] || 'AGENT'}
                </p>
                <p className="text-gold/60 text-[8px] font-bold tracking-tighter uppercase">
                  {studentData?.rank || 'VERIFIED'}
                </p>
              </div>
            </div>

            {/* 🚪 Terminate Session Button */}
            <div className="relative">
              <div className="absolute -inset-1 bg-red-500/0 group-hover/btn:bg-red-500/5 blur-lg transition-all duration-500 -z-10" />
              <button 
                onClick={handleLogout}
                disabled={isPending}
                className="group/btn w-full flex items-center gap-4 px-4 py-4 text-slate-500 hover:text-red-500 transition-all duration-500 group rounded-2xl hover:bg-red-500/[0.07] border border-transparent hover:border-red-500/20 shadow-none hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 size={18} className="animate-spin text-red-500" />
                ) : (
                  <div className="relative flex items-center justify-center">
                     <LogOut size={18} className="group-hover/btn:-translate-x-1 transition-transform duration-500" />
                     {!isPending && <span className="absolute -top-1 -right-1 size-1.5 bg-red-500 rounded-full animate-pulse opacity-0 group-hover/btn:opacity-100" />}
                  </div>
                )}
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {isPending ? "Terminating..." : "Terminate Session"}
                </span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* 📟 Metadata for Unverified Access */
          <motion.div 
            key="unverified-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-auto pt-6 text-center opacity-20 pointer-events-none"
          >
            <p className="text-[7px] font-mono text-gold tracking-[0.3em] uppercase">
              Awaiting Identity Verification...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}