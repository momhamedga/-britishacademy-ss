"use client";

import { LayoutDashboard, BookOpen, User, Settings, LogOut, Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "@/actions/portal-auth";
import { useState } from "react";
import { usePathname } from "next/navigation"; // 🛡️ الحل لضمان تحديث الحالة لحظيًا

export default function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // 🛰️ مراقبة المسار الحالي مباشرة

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Stats" },
    { href: "/dashboard/courses", icon: BookOpen, label: "Missions" },
    { isTrigger: true }, // المركز التكتيكي (Menu)
    { href: "/dashboard/profile", icon: User, label: "Identity" },
    { href: "/dashboard/settings", icon: Settings, label: "Config" },
  ];

  return (
    <>
      {/* 🌌 Tactical Overlay Menu (المسؤول عن الـ Main Site والـ Logout) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[oklch(15%_0.04_260)]/90 backdrop-blur-3xl flex flex-col items-center justify-center p-6 lg:hidden"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="grid grid-cols-2 gap-4 w-full max-w-sm relative z-10"
            >
              <QuickAction 
                icon={Globe} 
                label="Main Site" 
                color="text-gold" 
                href="/" 
              />
              <QuickAction 
                icon={LogOut} 
                label="Log Out" 
                color="text-red-500" 
                onClick={() => logout()} 
              />
            </motion.div>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(false)}
              className="mt-16 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-2xl"
            >
              <X size={28} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 The Bio-Dock (Navigation Bar) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-[440px] z-50">
        <nav className="relative h-20 bg-[oklch(25%_0.08_260)]/80 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-between px-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
          
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] pointer-events-none" />

          {navItems.map((item, idx) => {
            // الحالة المركزية (Menu Button)
            if (item.isTrigger) {
              return (
                <motion.button
                  key="trigger"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(true)}
                  className="relative w-16 h-16 -mt-3 flex items-center justify-center rounded-full bg-gold shadow-[0_10px_30px_rgba(212,175,55,0.3)] z-20 group"
                >
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse opacity-50" />
                  <Menu size={26} className="text-[oklch(25%_0.08_260)] relative z-10" />
                </motion.button>
              );
            }

            // تحقق من الحالة النشطة بناءً على المسار الحالي
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.href} 
                href={item.href || "#"} 
                className="relative flex-1 flex flex-col items-center justify-center h-full group"
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      layoutId="dock-active-pill"
                      className="absolute inset-x-1.5 inset-y-3 bg-gold/10 rounded-2xl border-t border-white/10"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>
                
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <item.icon 
                    size={20} 
                    className={`transition-all duration-500 ${isActive ? 'text-gold -translate-y-1' : 'text-slate-400 opacity-60'}`} 
                  />
                  <AnimatePresence>
                    {isActive && (
                      <motion.span 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-[6px] font-black text-gold uppercase tracking-[0.3em]"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Liquid Dot Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="liquid-dot"
                    className="absolute bottom-2 w-4 h-[2px] bg-gold rounded-full shadow-[0_0_15px_#D4AF37]"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

// مكون الأكشن السريع (داخل المنيو)
function QuickAction({ icon: Icon, label, color, onClick, href }: any) {
  const content = (
    <div className="p-6 rounded-[2.5rem] bg-[oklch(25%_0.08_260)]/50 border border-white/5 backdrop-blur-md flex flex-col items-center gap-3 active:scale-95 transition-all hover:bg-[oklch(25%_0.08_260)] hover:border-white/10 group">
      <div className={`p-4 rounded-2xl bg-white/5 transition-colors group-hover:bg-white/10`}>
        <Icon size={24} className={color} />
      </div>
      <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.4em] group-hover:text-white transition-colors">{label}</span>
    </div>
  );

  // استخدام <a> للموقع الرئيسي لضمان ريفريش الهيدر والفوتر، و Link للباقي
  if (href === "/") return <a href={href} className="w-full">{content}</a>;
  if (href) return <Link href={href} className="w-full">{content}</Link>;
  
  return <button onClick={onClick} className="w-full">{content}</button>;
}