import { Satellite } from 'lucide-react';

export const RecoveryHeader = () => (
  <div className="text-center">
    <div className="w-16 h-16 bg-gold/5 border border-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[inset_0_0_15px_rgba(212,175,55,0.05)]">
      <Satellite className="text-gold animate-bounce" size={28} strokeWidth={1.5} />
    </div>
    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic mb-3">Identity Recovery</h1>
    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.25em] leading-relaxed max-w-[300px] mx-auto">
      Initiate deep-scan to retrieve <span className="text-gold">System ID</span> & <span className="text-gold">Access Cipher</span>
    </p>
  </div>
);