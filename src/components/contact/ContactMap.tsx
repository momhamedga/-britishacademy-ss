"use client"
import { motion } from 'framer-motion';
import { CONTACT_CONFIG } from '@/lib/constants'; 
import { MapPin, Navigation, Crosshair } from 'lucide-react';

export default function ContactMap() {
  // رابط خريطة لندن - استخدم Embed URL الرسمي لضمان الاستقرار
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5404230554!2d-0.0215!3d51.505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487602b9f0d7e6c9%3A0x6e268955f0110!2sCanary%20Wharf%2C%20London!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk`;

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden bg-navy-dark">
      
      {/* 📡 Radar Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 border-[1px] border-gold rounded-full scale-[1.5] animate-pulse" />
        <div className="absolute inset-0 border-[1px] border-gold rounded-full scale-[2.5] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header: Tactical Coordinates --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-20 flex flex-col items-center text-center space-y-4"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-8 md:w-20 bg-gold/30" />
            <span className="text-gold font-black text-[10px] md:text-xs uppercase tracking-[0.8em]">Deployment_Zone</span>
            <div className="h-px w-8 md:w-20 bg-gold/30" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">Location</span>
          </h2>
        </motion.div>

        {/* --- Map Container --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[450px] md:h-[700px] w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group"
        >
          
          {/* 🌑 High-Tech Overlay (Filters) */}
          <div className="absolute inset-0 z-10 pointer-events-none border-[1px] border-white/5 rounded-[4rem]" />
          <div className="absolute inset-0 bg-[#050a18]/40 mix-blend-color pointer-events-none z-10 group-hover:bg-transparent transition-all duration-[2s]" />

          {/* Google Map Iframe with Advanced Filters */}
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            className="relative z-0 grayscale-[0.8] invert-[0.9] contrast-[1.2] brightness-[0.7] transition-all duration-[3s] group-hover:grayscale-0 group-hover:invert-0 group-hover:brightness-100 ease-out"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>

          {/* 📍 Floating HUD: Target Data (Visible on Desktop) */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 space-y-2 hidden sm:block">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-navy/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-4 shadow-2xl"
            >
              <div className="flex flex-col">
                <span className="text-[8px] text-gold/50 font-black uppercase tracking-widest">Target_Status</span>
                <span className="text-white font-mono text-xs tracking-tighter italic">ACTIVE_CONNECTION</span>
              </div>
              <Crosshair size={20} className="text-gold animate-spin-slow" />
            </motion.div>
          </div>

          {/* 🏛️ Strategic Info Card (Mobile & Desktop) */}
          <div className="absolute bottom-6 left-4 right-4 md:bottom-12 md:left-12 md:right-auto z-20">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 md:p-10 backdrop-blur-3xl bg-[#050a18]/80 border border-gold/20 rounded-[2rem] md:rounded-[3rem] shadow-3xl max-w-full md:max-w-[400px] group-hover:border-gold/60 transition-colors duration-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
                  <MapPin size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl uppercase italic tracking-tight">London HQ</h4>
                  <p className="text-gold/60 text-[9px] font-mono uppercase tracking-[0.2em]">Coordinates: 51.505° N, 0.021° W</p>
                </div>
              </div>
              
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8 font-medium">
                {CONTACT_CONFIG.address || "Canary Wharf, London, United Kingdom - Strategic Command Center"}
              </p>
              
              <motion.a 
                whileTap={{ scale: 0.95 }}
                href={`https://www.google.com/maps/dir/?api=1&destination=Canary+Wharf+London`}
                target="_blank"
                className="w-full py-4 bg-gold text-navy font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-navy transition-all shadow-xl"
              >
                <Navigation size={14} />
                Engage Navigation
              </motion.a>
            </motion.div>
          </div>

          {/* 📡 Scanning Effect (Desktop Only) */}
          <div className="absolute inset-0 pointer-events-none z-10 hidden md:block opacity-10">
             <div className="w-full h-1/2 bg-gradient-to-b from-gold/20 to-transparent absolute top-0 animate-scanline" />
          </div>

        </motion.div>
      </div>
    </section>
  );
}