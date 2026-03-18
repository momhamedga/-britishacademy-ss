import { sql } from "@/lib/db";
import { cookies } from 'next/headers';
import { ShieldCheck, User, Mail, Zap } from 'lucide-react';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('auth_token')?.value;

  const students = await sql`SELECT * FROM students WHERE id = ${userId} LIMIT 1`;
  const user = students[0];

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="glass p-10 rounded-[3rem] border border-gold/10 bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20"><ShieldCheck size={80} /></div>
        
        <h1 className="text-gold font-black uppercase tracking-[0.4em] text-xs mb-2">Student Identity Card</h1>
        <h2 className="text-4xl font-bold text-white mb-8 italic">{user?.name}</h2>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
            <Zap className="text-gold" size={20} />
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black">Identity Vector</p>
              <p className="text-white font-mono">{user?.student_id}</p>
            </div>
          </div>
          {/* كرر للإيميل والـ Rank */}
        </div>
      </div>
    </div>
  );
}