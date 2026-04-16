"use client"
import { logout } from '@/actions/portal-auth';
import { LayoutDashboard, BookOpen, GraduationCap, User, Settings, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
export default function Sidebar({ studentData }: any) {
  const pathname = usePathname();
const [isPending, startTransition] = useTransition()
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'My Courses', icon: BookOpen, href: '/dashboard/courses' },
    { name: 'Certificates', icon: GraduationCap, href: '/dashboard/certificates' },
    { name: 'Profile', icon: User, href: '/dashboard/profile' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  return (
    <div className="flex flex-col h-full py-12 px-6 text-white">
      {/* Branding Section */}
      <div className="mb-14 px-4">
        <div className="flex items-center gap-2 mb-2">
            <div className="size-2 bg-gold rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/80">Secu-Train</span>
        </div>
        <h1 className="text-2xl font-black tracking-tighter uppercase italic">
          British <span className="text-gold">Academy</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                isActive 
                ? 'bg-white/5 text-white border border-white/10' 
                : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <item.icon size={18} className={isActive ? 'text-gold' : 'group-hover:text-gold transition-colors'} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.name}</span>
              </div>
              
              {isActive && (
                <div className="relative z-10">
                    <ChevronRight size={14} className="text-gold" />
                </div>
              )}

              {/* Active Indicator Glow */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Area inside Sidebar */}
      <div className="mt-auto pt-10 border-t border-white/5">
        {/* User Card */}
        <div className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-4 flex items-center gap-4 mb-6 group hover:bg-white/[0.05] transition-all">
          <div className="relative size-12 shrink-0">
             <div className="absolute inset-0 bg-gold blur-sm rounded-xl opacity-20 group-hover:opacity-40 transition-opacity" />
             <div className="relative h-full w-full bg-navy border border-white/10 rounded-xl flex items-center justify-center text-gold font-black text-lg">
                {studentData?.name?.[0] || 'M'}
             </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[11px] font-black uppercase tracking-tight truncate">{studentData?.name || 'Momo'}</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">{studentData?.rank || 'Agent'}</span>
          </div>
        </div>

        {/* Terminate Session Button */}
   <button 
          onClick={() => startTransition(() => logout())}
          disabled={isPending}
          className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl transition-all duration-300 group ${
            isPending 
            ? 'bg-slate-500/10 text-slate-500 cursor-not-allowed' 
            : 'bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white'
          }`}
        >
          <LogOut size={16} className={isPending ? 'animate-pulse' : 'group-hover:-translate-x-1 transition-transform'} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            {isPending ? 'Terminating...' : 'Terminate Session'}
          </span>
        </button>
      </div>
    </div>
  );
}