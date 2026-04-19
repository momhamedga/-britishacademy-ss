"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BookOpen, Award, User, Menu, X, Shield, Contact, Users, Briefcase, Link2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ProfileDropdown from '@/components/portal/ProfileDropdown';

// لنفترض أن هذه هي الروابط الرسمية بناءً على طلبك
const NAV_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Programs', href: '/courses', icon: BookOpen },
  { name: 'Certifications', href: '/certifications', icon: Award },
  { name: 'Memberships', href: '/Membership', icon: Users },
  { name: 'About Us', href: '/about', icon: Briefcase },
  { name: 'Contact Us', href: '/contact', icon: Contact },
];

const MobileNavbar = ({ user }: any) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // روابط الـ Tab Bar السفلي (الأهم للوصول السريع)
  const quickTabs = NAV_LINKS.slice(0, 4); 

  return (
    <>
      {/* 1. Top Header (Minimalist & Glassy) */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center bg-navy backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative size-8">
            <Image src="/logo.webp" alt="logo" fill className="object-contain" />
          </div>
          <span className="text-white font-black text-[12px] uppercase tracking-tighter">
            British<span className="text-gold">Academy</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          {/* Profile Quick Access */}
          {user && (
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="size-9 bg-gold rounded-xl flex items-center justify-center text-navy shadow-lg shadow-gold/20"
            >
              <User size={18} />
            </button>
          )}
          
          <button 
            onClick={() => setIsOpen(true)}
            className="size-10 bg-white/5 rounded-xl flex items-center justify-center text-gold border border-white/10 active:scale-90 transition-transform"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Profile Dropdown Integration */}
        <AnimatePresence>
          {isProfileOpen && user && (
            <div className="absolute top-20 right-6 w-64 z-[110]">
               <ProfileDropdown user={user} close={() => setIsProfileOpen(false)} />
            </div>
          )}
        </AnimatePresence>
      </nav>

     

      {/* 3. Full Screen Strategic Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[120] bg-navy flex flex-col"
          >
            {/* Overlay Header */}
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <Link2 className="text-gold" size={28} />
                <span className="text-white font-black text-xl uppercase tracking-tighter">menu </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="size-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-navy transition-all"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Navigation Links List */}
            <div className="flex flex-col gap-4 p-8 overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between py-4 border-b border-white/5 transition-all
                      ${pathname === link.href ? 'text-gold' : 'text-white/30 hover:text-white'}`}
                  >
                    <span className="text-3xl font-black uppercase tracking-tighter italic group-hover:pl-4 transition-all duration-300">
                      {link.name}
                    </span>
                    <link.icon size={20} className={pathname === link.href ? 'opacity-100' : 'opacity-20'} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Tactical Footer Overlay */}
            <div className="mt-auto p-8 bg-black/20 border-t border-white/5">
               <div className="flex items-center justify-between mb-6">
            
                  <div className="text-right">
                    <p className="text-white/20 text-[8px] font-bold uppercase italic">British Academy </p>
                  </div>
               </div>
               
               {!user && (
                 <Link href="/login" onClick={() => setIsOpen(false)}>
                   <button className="w-full py-5 bg-gold text-navy font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-gold/10 active:scale-95 transition-all">
                     Login now  
                   </button>
                 </Link>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;