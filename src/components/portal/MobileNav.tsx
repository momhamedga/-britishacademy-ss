"use client"; // 🛡️ ده السر اللي هيحل المشكلة

import { LayoutDashboard, BookOpen, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { logout } from "@/actions/portal-auth";

export default function MobileNav({ pathname }: { pathname: string }) {
  return (
    <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[440px] h-20 bg-navy border border-white/10 backdrop-blur-3xl rounded-[2.5rem] z-50 flex items-center justify-around px-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
      
      <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
         <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-20 bg-gold/10 blur-3xl rounded-full" />
      </div>

      {[
        { href: "/dashboard", icon: LayoutDashboard },
        { href: "/dashboard/courses", icon: BookOpen },
        { href: "/dashboard/profile", icon: User },
        { href: "/dashboard/settings", icon: Settings },
      ].map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className="relative p-3 group outline-none">
            {isActive && (
              <motion.div 
                layoutId="nav-active"
                className="absolute inset-0 bg-gold/10 rounded-2xl border border-gold/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <item.icon 
              size={22} 
              className={`relative z-10 transition-all duration-300 ${isActive ? 'text-gold scale-110' : 'text-slate-400 active:scale-90'}`} 
            />
          </Link>
        );
      })}

      <button 
        onClick={() => logout()} 
        className="relative p-3 group outline-none active:scale-95 transition-transform"
      >
        <div className="absolute inset-0 bg-red-500/5 rounded-2xl border border-red-500/10 opacity-0 active:opacity-100 transition-opacity" />
        <LogOut size={22} className="text-red-400/70 group-active:text-red-500 transition-colors" />
      </button>
    </nav>
  );
}