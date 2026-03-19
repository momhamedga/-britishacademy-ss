"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Bell, User, ChevronRight, Shield, Target } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { StudentRank } from '@/types/portal'
import ProfileDropdown from '@/components/portal/ProfileDropdown'

interface NavbarProps {
  user?: {
    name: string;
    rank: StudentRank;
  } | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  // إخفاء النيفبار عند السكرول لأسفل وإظهاره عند السكرول لأعلى (Smart UX)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 50)
  })

  return (
    <motion.nav 
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-3' : 'py-6 md:py-8'}`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <motion.div 
          layout
          className={`relative flex items-center justify-between rounded-[2rem] border transition-all duration-500
            ${scrolled 
              ? 'px-6 py-2.5 bg-navy/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
              : 'px-8 py-4 bg-white/[0.03] backdrop-blur-md border-white/5'}`}
        >
          {/* 1. Logo Section */}
          <Logo scrolled={scrolled} />

          {/* 2. Desktop Navigation (Strategic Links) */}
          <div className="hidden xl:flex items-center bg-white/[0.03] border border-white/5 rounded-full px-2 py-1">
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.name} link={link} isActive={pathname === link.href} />
            ))}
          </div>

          {/* 3. Terminal Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1.5 md:gap-2">
              {user && (
                <div className="relative group">
                  <IconButton icon={<Bell size={18} />} label="Security Briefs" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_#D4AF37] animate-pulse" />
                </div>
              )}

              {/* Profile/Auth Button */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 border
                    ${isProfileOpen 
                      ? 'bg-gold text-navy border-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                      : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:border-white/20'}`}
                >
                  {user ? (
                    <span className="font-black text-[10px] tracking-tighter">{user.name.substring(0, 2).toUpperCase()}</span>
                  ) : (
                    <User size={18} strokeWidth={1.5} />
                  )}
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <ProfileDropdown user={user} close={() => setIsProfileOpen(false)} />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Main Action: Access Terminal */}
            <Link 
              href={user ? "/dashboard" : "/login"} 
              className="group relative hidden sm:flex items-center gap-3 px-6 py-2.5 bg-gold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] active:scale-95"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Shield size={14} className="relative z-10 text-navy group-hover:text-gold transition-colors" />
              <span className="relative z-10 font-black text-[10px] uppercase tracking-[0.15em] text-navy">
                {user ? 'Command Dashboard' : 'Access Terminal'}
              </span>
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="xl:hidden w-10 h-10 flex items-center justify-center bg-white/[0.05] border border-white/10 rounded-xl text-gold"
            >
              <AnimatePresence mode="wait">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} links={NAV_LINKS} user={user} />
    </motion.nav>
  )
}

// --- المكونات الفرعية المطورة ---

const Logo = ({ scrolled }: { scrolled: boolean }) => (
  <Link href="/" className="flex items-center gap-3 group relative z-10">
    <div className={`relative transition-all duration-700 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'} group-hover:rotate-[360deg]`}>
      <Image src="/logo.webp" alt="BA Logo" fill sizes="40px" className="object-contain brightness-110" priority />
    </div>
    <div className="flex flex-col">
      <span className={`text-white font-black uppercase italic tracking-tighter leading-none transition-all ${scrolled ? 'text-sm' : 'text-lg'}`}>
        British <span className="text-gold">Academy</span>
      </span>
      <span className="text-[7px] md:text-[8px] tracking-[0.4em] font-black uppercase text-white/30 group-hover:text-gold/50 transition-colors">
        Strategic Security
      </span>
    </div>
  </Link>
)

const NavLinkItem = ({ link, isActive }: { link: any, isActive: boolean }) => (
  <Link 
    href={link.href}
    className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative group
      ${isActive ? 'text-white' : 'text-white/40 hover:text-white'}`}
  >
    <span className="relative z-10">{link.name}</span>
    {isActive && (
      <motion.span 
        layoutId="nav-pill" 
        className="absolute inset-0 bg-gold border border-gold/50 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)]" 
        style={{ zIndex: 0 }}
      />
    )}
  </Link>
)

const MobileMenu = ({ isOpen, setIsOpen, links, user }: any) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0, x: "100%" }} 
        animate={{ opacity: 1, x: 0 }} 
        exit={{ opacity: 0, x: "100%" }} 
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[110] bg-navy/98 backdrop-blur-3xl xl:hidden flex flex-col p-8 pt-24"
      >
        {/* 1. زر إغلاق القائمة (X) المخصص للموبايل */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-gold/10 border border-gold/20 text-gold shadow-[0_0_20px_rgba(212,175,55,0.1)] active:scale-90 transition-all"
        >
          <X size={26} strokeWidth={2.5} />
        </button>

        {/* Background Scan Lines Decor */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grid.svg')] bg-center shadow-inner" />
        
        <div className="space-y-8 relative z-10">
          {/* Header Indicator */}
          <div className="flex items-center gap-4 mb-10 border-l-2 border-gold pl-6">
            <Target size={20} className="text-gold animate-pulse" />
            <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em]"></span>
          </div>

          {/* Links List */}
          <div className="flex flex-col space-y-4">
            {links.map((link: any, i: number) => (
              <motion.div 
                key={link.name} 
                initial={{ x: 30, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ delay: i * 0.08 }}
              >
                <Link 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="group flex items-center justify-between py-3 border-b border-white/5"
                >
                  <span className="text-3xl font-black italic uppercase text-white/30 group-hover:text-gold transition-all duration-300">
                    {link.name}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-gold/30 transition-all">
                     <ChevronRight size={18} className="text-gold" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action Area */}
          <div className="pt-10 border-t border-white/5">
             <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.4 }}
             >
                <Link 
                  href={user ? "/dashboard" : "/login"} 
                  onClick={() => setIsOpen(false)}
                  className="group relative flex items-center justify-center w-full py-5 bg-gold rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                >
                  {/* تأثير لمعان (Sweep Effect) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <Shield size={18} className="text-navy mr-3" />
                  <span className="text-navy font-black uppercase tracking-widest text-sm">
                    {user ? 'Command Dashboard' : 'Initialize Access'}
                  </span>
                </Link>
             </motion.div>
          </div>
        </div>

        {/* Footer Info inside Menu */}
        <div className="absolute bottom-10 left-8 right-8 flex justify-between items-center text-[8px] font-bold text-white/10 tracking-[0.3em] uppercase">
       
          <span className="text-gold/20">BA-SS-2026</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default Navbar