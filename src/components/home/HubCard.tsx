"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HubCard({ item, index }: { item: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer border border-white/5"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/40 transition-colors z-10" />
      
      {/* Placeholder for images - تأكد من إضافة صور حقيقية لاحقاً */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy to-gold/20 group-hover:scale-110 transition-transform duration-500" />

      <div className="relative z-20 h-full p-8 flex flex-col justify-end">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-2xl font-black uppercase tracking-tighter group-hover:text-gold transition-colors">
            {item.title}
          </h3>
          <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
            <ArrowUpRight size={20} />
          </div>
        </div>
        
        <Link href={item.href} className="absolute inset-0" />
      </div>
      
      {/* Bottom Gold Line Accent */}
      <div className="absolute bottom-0 left-0 h-1 bg-gold w-0 group-hover:w-full transition-all duration-500 z-30" />
    </motion.div>
  );
}