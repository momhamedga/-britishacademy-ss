import { Award, Calendar, ShieldCheck, Download } from 'lucide-react';

interface CertificateCardProps {
  data: {
    title: string;
    category: string;
    certificate_code: string;
    issued_at: string | Date;
  };
}

export default function CertificateCard({ data }: CertificateCardProps) {
  const date = new Date(data.issued_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group relative glass border border-white/10 rounded-[2.5rem] p-8 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
      {/* تأثير الإضاءة الخلفية (Neon Glow) */}
      <div className="absolute -top-24 -right-24 size-48 bg-gold/5 blur-[80px] group-hover:bg-gold/10 transition-colors" />
      
      <div className="flex flex-col h-full justify-between gap-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold/60">
              <ShieldCheck size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[.3em]">{data.category}</span>
            </div>
            <h3 className="text-2xl font-black text-white italic leading-tight tracking-tighter uppercase">
              {data.title}
            </h3>
          </div>
          <div className="p-3 bg-gold/10 border border-gold/20 rounded-2xl text-gold shadow-lg shadow-gold/5">
            <Award size={24} />
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-white/5 pt-6">
          <div className="space-y-1">
            <p className="text-white/20 text-[8px] font-bold uppercase tracking-widest leading-none">Access Token</p>
            <p className="text-white/60 font-mono text-[11px] font-bold tracking-wider">{data.certificate_code}</p>
          </div>
          
          <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-1.5 text-white/40">
                <Calendar size={12} />
                <span className="text-[10px] font-bold uppercase tracking-tighter italic">{date}</span>
             </div>
             <button className="flex items-center gap-2 mt-2 px-4 py-1.5 bg-white/5 hover:bg-gold hover:text-black border border-white/10 hover:border-gold rounded-full transition-all duration-300">
                <span className="text-[9px] font-black uppercase tracking-widest">Verify</span>
                <Download size={10} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}