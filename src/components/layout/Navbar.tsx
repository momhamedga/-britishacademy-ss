"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Bell, User, ChevronRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { StudentRank } from '@/types/portal'
import ProfileDropdown from '@/components/portal/ProfileDropdown' // استدعاء المكون الجديد

interface NavbarProps {
  user?: {
    name: string;
    rank: StudentRank;
  } | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-2 md:py-4' : 'py-6 md:py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <motion.div 
          layout
          className={`relative glass rounded-[2.5rem] border border-white/10 flex items-center justify-between transition-all duration-500 shadow-2xl
            ${scrolled ? 'px-4 md:px-8 py-2 backdrop-blur-2xl bg-black/60' : 'px-6 md:px-10 py-4 backdrop-blur-md bg-white/[0.02]'}`}
        >
          <Logo />

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-x-1">
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.name} link={link} isActive={pathname === link.href} />
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {user && (
              <div className="relative group">
                <IconButton icon={<Bell size={18} strokeWidth={1.5} />} label="Alerts" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold rounded-full shadow-[0_0_12px_#D4AF37] animate-pulse pointer-events-none" />
              </div>
            )}

            {/* Profile Section */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`relative p-2.5 rounded-xl transition-all duration-300 border overflow-hidden
                  ${isProfileOpen 
                    ? 'bg-white/10 border-white/20 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                    : 'text-white/40 border-transparent hover:text-white hover:bg-white/5'
                  }`}
              >
                {user ? (
                  // شكل الأفاتار الصغير عند تسجيل الدخول
                  <div className="relative z-10 flex items-center justify-center font-black text-[10px] tracking-tighter">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                ) : (
                  <User size={18} strokeWidth={1.5} className="relative z-10" />
                )}
                
                {/* تأثير توهج خلفي للطالب المسجل */}
                {user && <div className="absolute inset-0 bg-gold/5 animate-pulse" />}
              </button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <ProfileDropdown 
                    user={user} 
                    close={() => setIsProfileOpen(false)} 
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-gold/40 to-transparent mx-2 hidden sm:block opacity-30 shadow-[0_0_8px_rgba(212,175,55,0.3)]" />

            <Link 
              href={user ? "/dashboard" : "/login"} 
              className={`group relative overflow-hidden px-6 py-2.5 rounded-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] active:scale-95 hidden sm:flex items-center gap-3 
                ${user ? 'bg-white text-navy' : 'bg-gold/10 border border-gold/20 text-gold'}`}
            >
              <div className={`absolute inset-0 transition-transform duration-500 ${user ? 'bg-gold translate-y-full group-hover:translate-y-0' : 'bg-gold/20 translate-x-full group-hover:translate-x-0'}`} />
              <span className="relative z-10 font-black text-[10px] md:text-[11px] uppercase tracking-widest flex items-center gap-2 transition-colors duration-500 group-hover:text-navy">
                {user ? 'Student Portal' : 'Access Terminal'}
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-2 text-gold">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} links={NAV_LINKS} user={user} />
    </nav>
  )
}

// --- Sub Components ---

const Logo = () => (
  <Link href="/" className="flex items-center gap-3 group flex-shrink-0 relative z-10">
    <div className="relative w-10 h-10 transition-all duration-700 group-hover:scale-110">
      <Image src="/logo.webp" alt="British Academy" fill sizes="40px" className="object-contain" priority />
    </div>
    <div className="flex flex-col">
      <span className="text-white font-black text-sm md:text-lg leading-none tracking-tighter uppercase italic">
        British <span className="text-gold">Academy</span>
      </span>
      <span className="text-[7px] md:text-[9px] tracking-[0.3em] font-black uppercase text-white/40">Strategic Security</span>
    </div>
  </Link>
)

const NavLinkItem = ({ link, isActive }: { link: any, isActive: boolean }) => (
  <Link 
    href={link.href}
    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 relative group
      ${isActive ? 'text-gold' : 'text-white/40 hover:text-white'}`}
  >
    <span className="relative z-10">{link.name}</span>
    {isActive && (
      <motion.span layoutId="nav-active" className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-full -z-0" />
    )}
  </Link>
)

const IconButton = ({ icon, label }: { icon: React.ReactNode, label?: string }) => (
  <button className="relative group p-2.5 text-white/40 hover:text-gold transition-all hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10">
    {icon}
    {label && (
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-navy border border-white/10 text-white text-[7px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
        {label}
      </span>
    )}
  </button>
)

const MobileMenu = ({ isOpen, setIsOpen, links, user }: any) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-3xl xl:hidden flex flex-col justify-center p-8">
        <div className="space-y-6 text-center">
          {links.map((link: any, i: number) => (
            <motion.div key={link.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <Link href={link.href} onClick={() => setIsOpen(false)} className="text-4xl sm:text-5xl font-black italic uppercase text-white/20 hover:text-gold transition-all">
                {link.name}
              </Link>
            </motion.div>
          ))}
          {!user && (
             <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-4xl sm:text-5xl font-black italic uppercase text-gold">
                Login
              </Link>
           </motion.div>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default Navbar