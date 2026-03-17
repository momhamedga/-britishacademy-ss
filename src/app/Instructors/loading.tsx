"use client"
import { motion } from 'framer-motion';

export default function InstructorsLoading() {
  return (
    <main className="min-h-screen bg-[#000B21] pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Header Skeleton - يحاكي العنوان الكبير */}
        <div className="mb-16 space-y-4">
          <div className="h-12 md:h-20 w-64 md:w-96 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-12 md:h-20 w-48 md:w-80 bg-gold/10 rounded-2xl animate-pulse" />
        </div>

        {/* 2. Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className="relative h-[480px] md:h-[520px] rounded-[3rem] md:rounded-[4rem] border border-white/5 bg-white/[0.02] overflow-hidden p-8 md:p-10"
            >
              {/* Central Circle Skeleton */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/5 animate-pulse" />
              </div>

              {/* Bottom Glass Card Skeleton */}
              <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6">
                <div className="h-40 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] border border-white/5 p-8 space-y-4">
                  <div className="h-2 w-20 bg-gold/20 rounded-full" />
                  <div className="h-6 w-3/4 bg-white/10 rounded-xl" />
                  <div className="h-4 w-1/2 bg-white/5 rounded-lg" />
                  <div className="pt-4 flex gap-2">
                    <div className="h-4 w-4 rounded-full bg-white/5" />
                    <div className="h-4 w-full bg-white/5 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* تأثير اللمعان (Shine Effect) العابر */}
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent z-10"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}