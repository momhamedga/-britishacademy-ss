"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, User } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import ProfileDropdown from '@/components/portal/ProfileDropdown'

interface NavbarProps {
  user?: {
    name: string;
    rank: string;
  } | null;
  isGuest?: boolean;
}

const DesktopNavbar = ({ user, isGuest }: NavbarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-500">
      
      {/* 1. الخلفية الممتدة بعرض الشاشة بالكامل */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out -z-10
          ${scrolled 
            ? 'bg-[#1B3156]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
            : 'bg-[#1B3156] border-b border-white/5'}`} // خلفية ثابتة في البداية بناءً على طلبك
      />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div 
          className={`w-full flex items-center justify-between transition-all duration-500
            ${scrolled ? 'py-3' : 'py-6'}`} 
        >
          
          {/* 2. Logo Section */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-110">
              <Image 
                src="/logo.webp" 
                priority 
                alt="British Academy" 
                fill 
                className="object-contain brightness-125" 
                sizes="48px" 
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-white font-black text-xl md:text-2xl leading-none uppercase tracking-tighter">
                British<span className="text-[#D4A843]">Academy</span>
              </span>
              <span className="text-[6px] md:text-[8px] text-[#D4A843]/80 tracking-[0.5em] font-black uppercase mt-1"> 
                Strategic Intelligence 
              </span>
            </div>
          </Link>

          {/* 3. Desktop Navigation Pill (التصميم التكتيكي) */}
          <div className="hidden lg:flex items-center gap-2 px-2 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href}
                  className={`relative px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-full whitespace-nowrap
                    ${isActive ? 'text-[#1B3156]' : 'text-white/70 hover:text-white'}`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill-active"
                      className="absolute inset-0 bg-[#D4A843] shadow-[0_0_20px_rgba(212,168,67,0.4)]"
                      style={{ borderRadius: 9999 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}

    
          </div>

          {/* 4. User Actions */}
        <div className="flex items-center gap-6">



  {(user && !isGuest) ? (
    <div className="relative group">
      {/* 2. Enhanced Profile Button with Glow */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 overflow-hidden
          ${isProfileOpen 
            ? 'bg-[#D4A843] border-[#D4A843] shadow-[0_0_30px_rgba(212,168,67,0.4)]' 
            : 'bg-[#1B3156]/40 border-white/10 hover:border-[#D4A843]/50 backdrop-blur-xl'}`}
      >
        <User size={22} className={isProfileOpen ? 'text-[#1B3156]' : 'text-[#D4A843]'} />
        
        {/* Shine Animation Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </motion.button>

      {/* Profile Ring Glow */}
      {!isProfileOpen && (
        <div className="absolute inset-0 bg-[#D4A843]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-4"
          >
            <ProfileDropdown user={user} close={() => setIsProfileOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      {/* 3. Modern CTA Login - زرار دخول فخم */}
      <Link 
        href="/login"
        className="hidden md:flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all group"
      >
        <span className="opacity-60 group-hover:opacity-100 transition-opacity">Agent Access</span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843] shadow-[0_0_8px_#D4A843]" />
      </Link>

      {/* Mobile Toggle with Pulse */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden p-3.5 bg-[#D4A843]/10 border border-[#D4A843]/30 rounded-full text-[#D4A843] hover:bg-[#D4A843] hover:text-[#1B3156] transition-all"
      >
        <Menu size={22} />
      </button>
    </div>
  )}
</div>
        </div>
      </div>
    </nav>
  )
}

export default DesktopNavbar;