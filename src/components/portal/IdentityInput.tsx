"use client";
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function IdentityInput({ isPending }: { isPending: boolean }) {
  const [generatedId, setGeneratedId] = useState("");

  const generateSystemId = () => {
    const year = new Date().getFullYear();
    const randomCaps = Math.random().toString(36).substring(2, 6).toUpperCase();
    setGeneratedId(`BA-${year}-${randomCaps}`);
  };

  useEffect(() => { generateSystemId(); }, []);

  return (
    <div className="space-y-2">
      <label className="text-[8px] font-black text-gold/60 uppercase tracking-widest ml-2">System Identity ID</label>
      <div className="relative">
        <input 
          name="studentId" 
          required 
          value={generatedId}
          onChange={(e) => setGeneratedId(e.target.value.toUpperCase())}
          className="w-full bg-gold/5 border border-gold/20 rounded-2xl pl-6 pr-12 py-4 text-gold font-black text-xs tracking-widest outline-none focus:border-gold/50" 
        />
        <button 
          type="button"
          onClick={generateSystemId}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/40 hover:text-gold transition-colors"
        >
          <RefreshCw size={14} className={isPending ? "animate-spin" : ""} />
        </button>
      </div>
    </div>
  );
}