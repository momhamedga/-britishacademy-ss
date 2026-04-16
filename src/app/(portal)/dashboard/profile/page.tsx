import { sql } from "@/lib/db";
import { cookies } from 'next/headers';
import { ShieldCheck, User, Mail, Zap, Target, Award, Fingerprint } from 'lucide-react';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('auth_token')?.value || cookieStore.get('user_id')?.value;

  const students = await sql`SELECT * FROM students WHERE id = ${userId} LIMIT 1`;
  const user = students[0];

  // إحصائيات وهمية أو يمكن جلبها من الـ DB (عدد الشهادات مثلاً)
  const stats = [
    { label: "Active Vectors", value: "04", icon: <Zap size={14} /> },
    { label: "Credentials", value: "02", icon: <Award size={14} /> },
    { label: "Rank", value: "Elite", icon: <Target size={14} /> },
  ];

  return (
    <div className="min-h-[80vh] p-4 md:p-8 flex items-center justify-center bg-transparent">
      <div className="relative max-w-2xl w-full group">
        
        {/* 🌌 تأثير الإضاءة الخلفية (Ambient Glow) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-blue-500/20 rounded-[3.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

        <div className="relative glass p-8 md:p-12 rounded-[3rem] border border-white/10 bg-navy overflow-hidden">
          
          {/* 🛡️ الشعار المائي (Watermark) */}
          <div className="absolute top-[-20px] right-[-20px] p-8 opacity-[0.03] text-white rotate-12 group-hover:rotate-0 transition-transform duration-1000">
            <ShieldCheck size={250} />
          </div>

          {/* Header Section */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <span className="h-[2px] w-8 bg-gold inline-block"></span>
                 <h1 className="text-gold font-black uppercase tracking-[0.5em] text-[10px]">Verified Student Identity</h1>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                {user?.name?.split(' ')[0]} <br />
                <span className="text-transparent stroke-text">{user?.name?.split(' ').slice(1).join(' ')}</span>
              </h2>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-md">
                <div className="bg-gold text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                   Status: Active
                </div>
            </div>
          </div>

          {/* Identity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            
            {/* Identity Vector (ID) */}
            <div className="flex items-center gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-colors group/item">
              <div className="p-3 bg-gold/10 rounded-2xl text-gold group-hover/item:scale-110 transition-transform">
                <Fingerprint size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-[0.2em]">Identity Vector</p>
                <p className="text-white font-mono font-bold tracking-wider">{user?.student_id || 'ID_NOT_SYNCED'}</p>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-colors group/item">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover/item:scale-110 transition-transform">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-[0.2em]">Contact Node</p>
                <p className="text-white/80 font-bold text-sm truncate max-w-[150px]">{user?.email}</p>
              </div>
            </div>

          </div>

          {/* Quick Stats Node */}
          <div className="mt-8 flex flex-wrap gap-4 relative z-10">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-full border border-white/10">
                <span className="text-gold">{stat.icon}</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}:</span>
                <span className="text-xs font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>

    

        </div>
      </div>

  
    </div>
  );
}