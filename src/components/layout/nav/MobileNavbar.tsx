"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Link2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import ProfileDropdown from '@/components/portal/ProfileDropdown';

export default function MobileNavbar({ user }: any) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-100 px-5 py-4 flex justify-between items-center bg-navy/80 backdrop-blur-xl border-b border-white/5 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative size-7">
            <Image src="/logo.webp" alt="logo" fill className="object-contain" sizes="36px" />
          </div>
          <span className="text-white font-black text-[10px] uppercase tracking-tighter">
            British<span className="text-gold">Academy</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
          {user && (
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="size-9 bg-gold rounded-lg flex items-center justify-center text-navy shadow-lg shadow-gold/20">
              <User size={16} />
            </button>
          )}
          <button onClick={() => setIsOpen(true)} className="size-9 bg-white/5 rounded-lg flex items-center justify-center text-gold border border-white/10 active:scale-90 transition-transform">
            <Menu size={18} />
          </button>
        </div>

        <AnimatePresence>
          {isProfileOpen && user && (
            <div className="absolute top-16 right-5 w-64 z-[110]">
               <ProfileDropdown user={user} close={() => setIsProfileOpen(false)} />
            </div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed inset-0 z-[120] bg-navy flex flex-col">
            <div className="p-6 flex justify-end items-center border-b border-white/5">
          
              <button onClick={() => setIsOpen(false)} className="size-10 bg-white/5 rounded-full flex items-center justify-center text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 px-6 py-10 overflow-y-auto space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={link.href} onClick={() => setIsOpen(false)} className={`flex items-center justify-between py-5 border-b border-white/5 transition-all ${pathname === link.href ? 'text-gold' : 'text-white/40'}`}>
                    <span className="text-2xl font-black uppercase tracking-tighter italic">
                      {link.name}
                    </span>
                    <ChevronRight size={18} className={pathname === link.href ? 'opacity-100' : 'opacity-0'} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-8 bg-black/20 border-t border-white/5">
               {!user ? (
                 <Link href="/login" onClick={() => setIsOpen(false)}>
                   <button className="w-full py-4 bg-gold text-navy font-black uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-xl shadow-gold/10">
                    login
                   </button>
                 </Link>
               ) : (
                 <div className="text-center opacity-20 text-[8px] font-black uppercase tracking-[0.5em] text-white">
                    Personnel Verified // British Academy
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}