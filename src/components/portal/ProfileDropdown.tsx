"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Award, Settings, LogOut, ShieldAlert, Zap } from 'lucide-react'
import { logout } from '@/actions/portal-auth'

interface ProfileDropdownProps {
  user?: {
    name: string;
    rank: string;
  } | null;
  close: () => void;
}

const ProfileDropdown = ({ user, close }: ProfileDropdownProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
      className="absolute top-16 right-0 w-72 glass border border-white/10 rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 backdrop-blur-3xl bg-navy"
    >
      {!user ? (
        /* 🛑 حالة الـ Guest (Unauthenticated) */
        <div className="py-6 text-center space-y-4">
          <div className="relative mx-auto w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
             <ShieldAlert className="text-gold/40 animate-pulse" size={32} />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Identity Locked</p>
            <p className="text-[9px] text-slate-500 uppercase font-bold">Access Terminal Required</p>
          </div>
          <Link 
            href="/login" 
            onClick={close}
            className="group relative flex items-center justify-center w-full py-3 bg-gold rounded-xl overflow-hidden transition-all active:scale-95"
          >
            <span className="relative z-10 text-navy font-black text-[10px] uppercase tracking-widest">Initialize Login</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>
      ) : (
        /* ✅ حالة الـ Student (Authenticated) */
        <>
          {/* Header Section: The Identity Core */}
          <div className="flex items-center gap-4 pb-5 mb-5 border-b border-white/5">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 flex items-center justify-center text-gold font-black text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-[#000B21] flex items-center justify-center shadow-lg">
                <Zap size={8} className="text-navy fill-navy" />
              </div>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-white text-[11px] font-black uppercase tracking-tight truncate">{user.name}</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-gold text-[8px] uppercase tracking-[0.2em] font-bold">{user.rank} LEVEL</span>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="space-y-1">
            {[
              { icon: BookOpen, label: 'My Learning Vault', href: '/dashboard/courses' },
              { icon: Award, label: 'Certificates', href: '/dashboard/certificates' },
              { icon: Settings, label: 'Security Settings', href: '/dashboard/settings' },
            ].map((item) => (
              <Link key={item.label} href={item.href} onClick={close}>
                <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all group text-white/50 hover:text-white">
                  <item.icon size={16} className="group-hover:text-gold transition-colors duration-300" />
                  <span className="text-[10px] font-black uppercase tracking-[0.1em]">{item.label}</span>
                </div>
              </Link>
            ))}

            {/* Logout Action */}
            <button 
              onClick={async () => {
                close();
                await logout();
              }}
              className="w-full mt-3 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300 group text-red-400/60 hover:text-red-400"
            >
              <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.1em]">Terminate Session</span>
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default ProfileDropdown;