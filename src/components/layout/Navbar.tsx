"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Bell, User, ChevronRight, BookOpen, Award, Settings, LogOut } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { StudentRank } from '@/types/portal'
import { logout } from '@/actions/portal-auth'

interface NavbarProps {
  user?: {
    name: string;
    rank: StudentRank;
  }
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
            <div className="relative group">
              <IconButton icon={<Bell size={18} strokeWidth={1.5} />} label="Alerts" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold rounded-full shadow-[0_0_12px_#D4AF37] animate-pulse pointer-events-none" />
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 border ${isProfileOpen ? 'bg-white/10 border-white/20 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'text-white/40 border-transparent hover:text-white'}`}
              >
                <User size={18} strokeWidth={1.5} />
              </button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <ProfileDropdown 
                    name={user?.name || "Access Guest"} 
                    rank={user?.rank || "AGENT"} 
                    close={() => setIsProfileOpen(false)} 
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-gold/40 to-transparent mx-2 hidden sm:block shadow-[0_0_8px_rgba(212,175,55,0.3)]" />

            <Link href="/dashboard" className="group relative overflow-hidden bg-white px-6 py-2.5 rounded-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] active:scale-95 hidden sm:flex items-center gap-3">
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-navy font-black text-[10px] md:text-[11px] uppercase tracking-widest flex items-center gap-2">
                Student Portal 
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-2 text-gold">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} links={NAV_LINKS} />
    </nav>
  )
}

// --- المكونات الفرعية ---

const ProfileDropdown = ({ name, rank, close }: { name: string, rank: string, close: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    className="absolute top-14 right-0 w-64 glass border border-white/10 rounded-2xl p-4 shadow-2xl z-50 backdrop-blur-3xl bg-black/80"
  >
    <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/5">
      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold uppercase text-xs">
        {name.substring(0, 2)}
      </div>
      <div className="flex flex-col">
        <span className="text-white text-[10px] font-black uppercase tracking-tight truncate w-32">{name}</span>
        <span className="text-gold text-[8px] uppercase tracking-[0.2em] font-bold">{rank} MEMBER</span>
      </div>
    </div>
    
    <div className="space-y-1">
      {/* Links Section */}
      {[
        { icon: BookOpen, label: 'My Courses', href: '/dashboard/courses' },
        { icon: Award, label: 'Certificates', href: '/dashboard/certificates' },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
      ].map((item) => (
        <Link key={item.label} href={item.href} onClick={close}>
          <div className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group text-white/60 hover:text-white">
            <item.icon size={14} className="group-hover:text-gold transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          </div>
        </Link>
      ))}

      {/* 🚀 Sign Out Action Section */}
      <button 
        onClick={async () => {
          close();
          await logout();
        }}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 transition-all duration-300 group text-red-400/80 hover:text-red-400"
      >
        <LogOut size={14} className="group-hover:translate-x-1 transition-transform" />
        <span className="text-[9px] font-black uppercase tracking-widest">Sign Out</span>
      </button>
    </div>
  </motion.div>
)

const Logo = () => (
  <Link href="/" className="flex items-center gap-3 group flex-shrink-0 relative z-10">
    <div className="relative w-10 h-10 transition-all duration-700 group-hover:scale-110">
      <Image 
        src="/logo.webp" 
        alt="British Academy Logo"
        fill
        sizes="40px"
        className="object-contain"
        priority
      />
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

const MobileMenu = ({ isOpen, setIsOpen, links }: any) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-3xl xl:hidden flex flex-col justify-center p-8">
        <div className="space-y-6">
          {links.map((link: any, i: number) => (
            <motion.div key={link.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <Link href={link.href} onClick={() => setIsOpen(false)} className="text-5xl font-black italic uppercase text-white/20 hover:text-gold transition-all">
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default Navbar