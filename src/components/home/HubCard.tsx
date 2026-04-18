"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function HubCard({ item, index }: { item: any, index: number }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      {isDesktop ? (
        /* 🖥️ DESKTOP VIEW: Cinematic Hover Experience */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="relative h-72 rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10 bg-navy/20"
        >
          {/* Background & Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80" />
          
          {/* Animated Background Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3156] to-[#D4AF37]/10 group-hover:scale-110 transition-transform duration-700 ease-out" />
          
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl z-0" />

          <div className="relative z-20 h-full p-8 flex flex-col justify-end">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
                  Strategic Hub
                </span>
                <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter transition-colors group-hover:text-gold">
                  {item.title}
                </h3>
              </div>
              
              <div className="size-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500 shadow-xl">
                <ArrowUpRight size={24} />
              </div>
            </div>
          </div>
          
          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 h-1.5 bg-gold w-0 group-hover:w-full transition-all duration-700 ease-in-out z-30" />
          
          <Link href={item.href} className="absolute inset-0 z-40" />
        </motion.div>
      ) : (
        /* 📱 MOBILE VIEW: Premium App-Style Interaction */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.96 }}
          className="relative h-48 w-full rounded-[2.5rem] overflow-hidden bg-[#1B3156] border border-white/5 shadow-2xl active:border-gold/30 transition-colors"
        >
          {/* App Overlay Pattern */}
          <div className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} 
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent z-10" />

          <div className="relative z-20 h-full p-6 flex items-center justify-between">
            <div className="space-y-1">
               <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-gold/60 font-bold text-[9px] uppercase tracking-[0.2em]">
                Enter Portal <ChevronRight size={12} />
              </div>
            </div>

            {/* Action Icon for Mobile */}
            <div className="size-12 bg-gold rounded-2xl flex items-center justify-center text-navy shadow-lg shadow-gold/20">
               <ArrowUpRight size={20} strokeWidth={3} />
            </div>
          </div>

          <Link href={item.href} className="absolute inset-0 z-30" />
        </motion.div>
      )}
    </>
  );
}