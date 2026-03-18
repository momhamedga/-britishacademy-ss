"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Beaker, Settings, LogOut, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'My Courses', href: '/dashboard/courses' },
  { icon: Award, label: 'Certificates', href: '/dashboard/certificates' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-6 bg-navy/20 backdrop-blur-xl border-r border-white/5">
      
      {/* 🛡️ Logo Section: British Academy Identity */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)] border border-white/10">
          <Shield className="text-navy" size={22} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-black tracking-tighter text-xl italic leading-none">BRITISH</span>
          <span className="text-gold text-[9px] tracking-[0.4em] font-black uppercase">Academy</span>
        </div>
      </div>

      {/* 🧭 Navigation Protocol */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href} className="block">
              <div className={`
                relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 group overflow-hidden
                ${isActive ? 'text-gold' : 'text-slate-500 hover:text-white'}
              `}>
                
                {/* 💡 Active Neon Background */}
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gold/[0.03] border border-gold/10 rounded-2xl -z-10 shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* ✨ Icon System */}
                <item.icon 
                  size={18} 
                  strokeWidth={isActive ? 2.5 : 1.5} 
                  className={`
                    transition-all duration-500
                    ${isActive ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'group-hover:scale-110 group-hover:text-white'}
                  `} 
                />
                
                <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none italic">
                  {item.label}
                </span>
                
                {/* 🎖️ Active Indicator (Right Side) */}
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-0 w-1 h-4 bg-gold rounded-l-full shadow-[0_0_15px_#D4AF37]"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* 🚪 Session Termination */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <button className="w-full flex items-center gap-4 px-4 py-4 text-slate-600 hover:text-red-400 transition-all duration-300 group rounded-2xl hover:bg-red-500/[0.02] border border-transparent hover:border-red-500/10">
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Terminate Session</span>
        </button>
      </div>
    </div>
  );
}