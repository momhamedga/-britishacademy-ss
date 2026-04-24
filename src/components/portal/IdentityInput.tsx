"use client";

import { useState, useCallback, useSyncExternalStore } from 'react';
import { RefreshCw } from 'lucide-react';

const subscribe = () => () => {};
const getSnapshot = () => true; // في المتصفح دائماً true
const getServerSnapshot = () => false; // على السيرفر دائماً false

export default function IdentityInput({ isPending }: { isPending: boolean }) {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const generateSystemId = useCallback(() => {
    const year = new Date().getFullYear();
    const randomCaps = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BA-${year}-${randomCaps}`;
  }, []);

  const [generatedId, setGeneratedId] = useState(() => isMounted ? generateSystemId() : "");

  if (isMounted && generatedId === "") {
    setGeneratedId(generateSystemId());
  }

  if (!isMounted) {
    return <div className="h-16 w-full bg-gold/5 border border-gold/10 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="space-y-2">
      <label className="text-[8px] font-black text-gold/60 uppercase tracking-widest ml-2">
        System Identity ID
      </label>
      
      <div className="relative group">
        <input 
          name="student_id" 
          required 
          value={generatedId}
          onChange={(e) => setGeneratedId(e.target.value.toUpperCase())}
          className="w-full bg-gold/5 border border-gold/20 rounded-2xl pl-6 pr-12 py-4 text-gold font-black text-xs tracking-widest outline-none focus:border-gold/50 transition-all placeholder:text-gold/20" 
          placeholder="GENERATING..."
        />
        
        <button 
          type="button"
          disabled={isPending}
          onClick={() => setGeneratedId(generateSystemId())}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/40 hover:text-gold transition-colors disabled:opacity-30"
        >
          <RefreshCw 
            size={14} 
            className={`${isPending ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} 
          />
        </button>
      </div>

      <div className="flex justify-between px-2">
        <span className="text-[6px] font-mono text-gold/30 uppercase tracking-tighter">Algorithm: Secure_ID_Node</span>
        <span className="text-[6px] font-mono text-gold/30 uppercase italic">Verified</span>
      </div>
    </div>
  );
}