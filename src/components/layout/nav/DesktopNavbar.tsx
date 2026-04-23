"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {  User } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import ProfileDropdown from '@/components/portal/ProfileDropdown'

export default function DesktopNavbar({ user, isGuest }: any) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 20))

  return (
    <nav className="fixed top-0 left-0 w-full z-100 transition-all duration-500">
      {/* Background Layer */}
      <div className={`absolute inset-0 transition-all duration-700 -z-10 ${
        scrolled ? 'bg-navy/90 backdrop-blur-2xl border-b border-white/10' : 'bg-navy border-b border-white/5'
      }`} />

      <div className="max-w-480 mx-auto px-8 lg:px-12">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative size-10 transition-transform duration-500 group-hover:scale-110">
              <Image src="/logo.webp" priority alt="Logo" fill className="object-contain brightness-125" sizes="48px" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl leading-none uppercase tracking-tighter">
                British<span className="text-gold">Academy</span>
              </span>
              <span className="text-[7px] text-gold/60 tracking-[0.4em] font-black uppercase mt-1">Strategic Intelligence</span>
            </div>
          </Link>

          {/* Navigation Pill */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href} className={`relative px-5 py-2 text-[9px] font-black uppercase tracking-widest transition-all duration-500 rounded-full ${isActive ? 'text-navy' : 'text-white/50 hover:text-white'}`}>
                  {isActive && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-gold shadow-[0_0_15px_rgba(212,168,67,0.3)] rounded-full" />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user && !isGuest ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`size-10 rounded-full border flex items-center justify-center transition-all ${isProfileOpen ? 'bg-gold border-gold text-navy' : 'bg-white/5 border-white/10 text-gold hover:border-gold/50'}`}>
                  <User size={18} />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-4">
                      <ProfileDropdown user={user} close={() => setIsProfileOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-black text-[9px] uppercase tracking-[0.2em] hover:bg-gold hover:text-navy transition-all flex items-center gap-2 group">
                Student Access
                <div className="size-1.5 rounded-full bg-gold group-hover:bg-navy shadow-[0_0_8px_rgba(212,168,67,0.5)]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}