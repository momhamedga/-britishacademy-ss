"use client" // لو هتضيف فيه تفاعل مستقبلاً
import { TrendingUp } from "lucide-react";
import { StudentRank } from "@/types/portal";

// تحديد الـ Props عشان الـ TypeScript ميزعلش
interface PortalHeaderProps {
  studentName: string;
  studentRank: StudentRank;
}

export default function PortalHeader({ studentName, studentRank }: PortalHeaderProps) {
    return (
      <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            <p className="text-gold font-black tracking-[0.5em] text-[10px] uppercase">
              System Online: Access Granted
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter italic">
            Welcome, {studentName.split(' ')[0]}
          </h1>
        </div>

        {/* كارت الرتبة (Rank Card) بستايل Glassmorphism */}
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-3xl p-4 rounded-2xl flex items-center gap-4 hover:border-gold/30 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:scale-110 transition-transform">
            <TrendingUp className="text-gold" size={20} />
          </div>
          <div>
            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Global Rank</p>
            <p className="text-white font-black tracking-tighter uppercase leading-none">
                {studentRank}
            </p>
          </div>
        </div>
      </header>
    );
}