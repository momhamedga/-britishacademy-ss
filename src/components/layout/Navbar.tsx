"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, User, ShieldCheck } from 'lucide-react'
import ProfileDropdown from '../portal/ProfileDropdown'

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Training Programs', href: '/programs' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Memberships', href: '/memberships' },
  { name: 'About Us', href: '/about' },
]

interface NavbarProps {
  user?: {
    name: string;
    rank: string;
  } | null;
  isGuest?: boolean;
}

const Navbar = ({ user, isGuest }: NavbarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30)
  })

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-0' : 'py-0'}`}>
        <div className="w-full"> 
          <div className={`w-full flex items-center justify-between transition-all duration-500
              ${scrolled 
                ? 'px-6 py-3 bg-[#1B3156]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
                : 'px-8 py-5 bg-[#1B3156] border-b border-white/5 shadow-lg'}`}>
            
            {/* 1. Logo Section */}
            <Link href="/" className="flex items-center gap-3 shrink-0 ml-2 md:ml-4">
              <div className="relative w-9 h-9 md:w-10 md:h-10">
                <Image src="/logo.webp" alt="SecuTrain" fill className="object-contain" priority />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-lg md:text-xl leading-none uppercase tracking-tighter">
                  British<span className="text-[#D4A843]">Academy</span>
                </span>
                <span className="text-[7px] text-white/40 tracking-[0.3em] font-bold uppercase mt-1"> Secu Train </span>
              </div>
            </Link>

           {/* 2. Desktop Navigation (Pill Design) */}
<div className="hidden lg:flex items-center gap-2  backdrop-blur-md rounded-full p-1.5  ">
  {NAV_LINKS.map((link) => (
    <Link 
      key={link.name}
      href={link.href}
      className={`px-5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 rounded-full whitespace-nowrap
        ${pathname === link.href 
          ? 'bg-[#D4A843] text-[#1B3156] shadow-lg shadow-[#D4A843]/20' 
          : 'text-white/70 hover:text-white hover:bg-white/5'}`}
    >
      {link.name}
    </Link>
  ))}
</div>

            {/* 3. Actions Section */}
            <div className="flex items-center gap-3 mr-2 md:mr-4">
              {(user && !isGuest) ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all
                      ${isProfileOpen ? 'bg-[#D4A843] border-[#D4A843] shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-white/5 border-white/10 hover:border-[#D4A843]/50'}`}
                  >
                    <User size={18} className={isProfileOpen ? 'text-[#1B3156]' : 'text-[#D4A843]'} />
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && <ProfileDropdown user={user} close={() => setIsProfileOpen(false)} />}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login" className="px-5 py-2.5 border border-[#D4A843]/30 rounded-xl text-white font-bold text-[11px] uppercase tracking-wider hover:bg-white/5 transition-all">
                    Login
                  </Link>
                  <Link href="/register" className="px-6 py-2.5 bg-[#D4A843] rounded-xl text-[#1B3156] font-black text-[11px] uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-[#D4A843]/10">
                    Sign Up
                  </Link>
                </div>
              )}

              <button 
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2.5 bg-white/5 rounded-xl text-[#D4A843] hover:bg-white/10 transition-all"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Sidebar --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[120] bg-[#0A192F] flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#D4A843]" size={32} />
                <span className="text-white font-black text-2xl uppercase">Secu<span className="text-[#D4A843]">Train</span></span>
              </div>
              <button 
                onClick={() => setIsMobileOpen(false)} 
                className="p-3 bg-white/5 rounded-full text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-2 p-8 overflow-y-auto">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileOpen(false)}
                    className={`block py-4 text-4xl font-black uppercase tracking-tighter transition-all
                      ${pathname === link.href ? 'text-[#D4A843] italic' : 'text-white/20 hover:text-white'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto p-8 bg-black/20 border-t border-white/5 space-y-4">
              {(!user || isGuest) ? (
                <>
                  <Link href="/login" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-[0.2em]">
                    Access Terminal
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center w-full py-5 bg-[#D4A843] text-[#1B3156] rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-[#D4A843]/10">
                    Create Account
                  </Link>
                </>
              ) : (
                <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center w-full py-5 bg-[#D4A843] text-[#1B3156] rounded-2xl font-black uppercase tracking-[0.2em]">
                  Go to Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar