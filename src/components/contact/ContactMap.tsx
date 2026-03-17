"use client"
import { motion } from 'framer-motion';
import { CONTACT_CONFIG } from '@/lib/constants'; 

export default function ContactMap() {
  // رابط خريطة لندن (Canary Wharf) - مع فلتر الألوان السينمائي
  const londonMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540424161719!2d-0.0215!3d51.5048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487602ba4477d101%3A0xda31d8717830f0f!2sCanary%20Wharf%2C%20London!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk";

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header بتصميم خطوط الرادار */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-8"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="text-center shrink-0">
            <h2 className="text-white font-black uppercase tracking-[0.5em] text-[10px] md:text-xs italic mb-2">
              Global Deployment <span className="text-gold">Coordinates</span>
            </h2>
            <p className="text-[8px] text-slate-500 font-bold tracking-[0.3em] uppercase">Tactical Operations Center</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </motion.div>

        {/* حاوية الخريطة بتأثيرات بصرية متقدمة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[500px] md:h-[650px] w-full rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
        >
          {/* تأثير الـ Overlay (إطار الشاشة العسكرية) */}
          <div className="absolute inset-0 pointer-events-none z-20 border-[1px] border-white/5 rounded-[4rem]" />
          <div className="absolute inset-0 bg-navy/20 mix-blend-multiply pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-1000" />
          
          {/* Google Maps Iframe - موجه للندن مع الفلتر الليلي */}
          <iframe
            src={londonMapUrl}
            width="100%"
            height="100%"
            style={{ 
              border: 0, 
              filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2) grayscale(0.7)' 
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="relative z-0 scale-110 group-hover:scale-100 transition-transform duration-[2000ms] ease-out"
          ></iframe>

          {/* Floating HUD Card (البيانات الإحداثية للندن) */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12 z-30">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-white/70 font-mono tracking-tighter"
             >
               LAT: {CONTACT_CONFIG.mapCenter.lat}  LNG: {CONTACT_CONFIG.mapCenter.lng}
             </motion.div>
          </div>

          <div className="absolute bottom-10 left-6 md:left-12 z-30">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-8 backdrop-blur-2xl bg-navy/60 border border-gold/20 rounded-[2.5rem] shadow-2xl max-w-[320px] group-hover:border-gold/50 transition-colors duration-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-gold rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-gold rounded-full animate-ping" />
                </div>
                <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px]">Strategic Command</span>
              </div>
              
              <h4 className="text-white font-black italic text-xl mb-2 uppercase tracking-tighter">London Global HQ</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-medium">
                {CONTACT_CONFIG.address}
              </p>
              
              <div className="mt-6 pt-6 border-t border-white/5">
                 <a 
                   href={`https://www.google.com/maps/dir/?api=1&destination=${CONTACT_CONFIG.mapCenter.lat},${CONTACT_CONFIG.mapCenter.lng}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-[10px] text-gold font-black uppercase tracking-widest hover:tracking-[0.2em] transition-all inline-block"
                 >
                   Get Directions →
                 </a>
              </div>
            </motion.div>
          </div>

          {/* تأثير النبض على الخريطة (Radar Pulse) */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gold/30 rounded-full animate-[ping_4s_linear_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}