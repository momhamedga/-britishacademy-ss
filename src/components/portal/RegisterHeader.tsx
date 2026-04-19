"use client";
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

export default function RegisterHeader() {
  return (
    <div className="text-center mb-10">
      <motion.div 
        whileHover={{ rotate: 180 }}
        className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
      >
        <UserPlus className="text-gold" size={28} />
      </motion.div>
      <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic">new student</h1>
    </div>
  );
}