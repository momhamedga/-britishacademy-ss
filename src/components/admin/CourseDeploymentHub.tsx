"use client";
import { useState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Send, Shield, Sparkles, Image as ImageIcon, 
  Link as LinkIcon, Upload, User, DollarSign, Clock, Layers, Trash2, X, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { upsertCourse, deleteCourse } from '@/actions/admin-actions';

export default function CourseDeploymentHub({ initialData, onBack }: any) {
  const [assetMode, setAssetMode] = useState<'link' | 'upload'>(initialData?.image_url ? 'link' : 'upload');
  const [preview, setPreview] = useState(initialData?.image_url || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleAction = async (formData: FormData) => {
    if(initialData?.id) formData.append('id', initialData.id);
    
    // حقن ملف الصورة في الـ FormData لو الأدمن اختار رفع ملف
    if (assetMode === 'upload' && selectedFile) {
      formData.append('image_file', selectedFile);
    }

    const result = await upsertCourse(formData);
    if (result.success) {
      onBack();
    } else {
      alert("DEPLOYMENT_FAILED: Check Server Logs");
    }
  };

  const handleFinalDelete = async () => {
    if (!initialData?.id) return;
    setIsSyncing(true);
    try {
      await deleteCourse(initialData.id);
      onBack();
    } catch (err) {
      console.error("Delete Failed", err);
      setIsSyncing(false);
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-40 md:pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between mb-8 bg-white/40 backdrop-blur-2xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-white shadow-sm">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 group px-6 py-3 bg-[var(--academy-navy)] rounded-xl text-white hover:bg-[var(--academy-gold)] hover:text-[var(--academy-navy)] transition-all shadow-lg active:scale-95"
        >
          <ChevronLeft size={18}/>
          <span className="text-[11px] font-black uppercase tracking-tighter text-inherit">Abort_Mission</span>
        </button>
        
        <div className="flex items-center gap-3 bg-white/50 px-5 py-2 rounded-full border border-black/5">
          <div className="size-2 bg-[var(--academy-gold)] rounded-full animate-pulse" />
          <span className="text-[9px] font-black uppercase opacity-60 tracking-[0.2em]">Deployment_Ready_v2.0</span>
        </div>
      </nav>

      <form action={handleAction} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        
        {/* Left Column: Media & Security Policy */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-white relative overflow-hidden group">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black uppercase opacity-20 tracking-widest text-[var(--academy-navy)]">Asset_Source</h3>
                <div className="flex bg-[var(--background)] p-1 rounded-xl border border-black/5">
                   <button type="button" onClick={() => setAssetMode('link')} className={`p-2.5 rounded-lg transition-all ${assetMode === 'link' ? 'bg-white shadow-md text-[var(--academy-navy)]' : 'text-gray-400 opacity-50 hover:opacity-100'}`}><LinkIcon size={14}/></button>
                   <button type="button" onClick={() => setAssetMode('upload')} className={`p-2.5 rounded-lg transition-all ${assetMode === 'upload' ? 'bg-white shadow-md text-[var(--academy-navy)]' : 'text-gray-400 opacity-50 hover:opacity-100'}`}><Upload size={14}/></button>
                </div>
             </div>

             <div className="aspect-square bg-[var(--background)] rounded-[2rem] mb-6 overflow-hidden border-2 border-dashed border-black/5 flex items-center justify-center relative group/preview transition-all hover:border-[var(--academy-gold)]/30">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-700" alt="Preview" />
                ) : (
                  <div className="text-center opacity-10 flex flex-col items-center gap-2">
                    <ImageIcon size={48} strokeWidth={1}/>
                    <span className="text-[8px] font-black uppercase tracking-widest italic">No_Signal</span>
                  </div>
                )}
                
                {assetMode === 'upload' && (
                  <div 
                    onClick={() => fileInputRef.current?.click()} 
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 flex flex-col items-center justify-center transition-all cursor-pointer backdrop-blur-md"
                  >
                    <Upload className="text-[var(--academy-gold)] mb-2" size={24} />
                    <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Inject_Local_File</p>
                  </div>
                )}
             </div>

             <AnimatePresence mode="wait">
               {assetMode === 'link' ? (
                 <motion.div key="link" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                   <input 
                    name="image_url" 
                    defaultValue={initialData?.image_url} 
                    onChange={(e) => setPreview(e.target.value)} 
                    placeholder="HTTPS://EXTERNAL_STORAGE_LINK..." 
                    className="w-full p-5 bg-[var(--background)] rounded-2xl outline-none font-bold text-[11px] border-2 border-transparent focus:border-[var(--academy-gold)]/20 transition-all uppercase tracking-wider text-[var(--academy-navy)]" 
                   />
                 </motion.div>
               ) : (
                 <motion.div key="upload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center">
                   <input type="file" name="image_file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                   <div className="py-4 px-2 bg-[var(--background)] rounded-2xl border border-black/5 flex items-center justify-center gap-2">
                     {selectedFile ? (
                        <span className="text-[9px] font-black text-[var(--academy-gold)] uppercase truncate max-w-[200px]">
                          READY: {selectedFile.name}
                        </span>
                     ) : (
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Awaiting_Input...</span>
                     )}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
          
          <StatusToggle icon={<Shield size={16}/>} label="SIA_Accreditation" name="is_sia" defChecked={initialData?.is_sia_accredited} color="var(--academy-gold)" />
        </div>

        {/* Right Column: Mission Parameters */}
        <div className="lg:col-span-8 bg-white p-6 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-white space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <HubInput label="Operation_Identity" name="title" def={initialData?.title} placeholder="CCTV_SURVEILLANCE_OP" />
            <HubInput label="Unique_Locator_Slug" name="slug" def={initialData?.slug} placeholder="cctv-tactical-v1" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <HubInput label="Lead_Tactical_Officer" name="instructor_name" icon={<User size={14}/>} def={initialData?.instructor_name} placeholder="Hussein Alharithi" />
             <HubSelect label="Department_Silo" name="category" icon={<Layers size={14}/>} options={['Security', 'Safety', 'Medical']} def={initialData?.category} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <HubSelect label="Combat_Tier" name="level" options={['Level 2', 'Level 3', 'Expert']} def={initialData?.level} />
             <HubInput label="Mission_Timeframe" name="duration" icon={<Clock size={14}/>} def={initialData?.duration} placeholder="3 Days" />
             <HubInput label="Contract_Value_AED" name="price" icon={<DollarSign size={14}/>} def={initialData?.price} type="number" placeholder="0.00" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 ml-4 opacity-30">
              <Sparkles size={14} className="text-[var(--academy-gold)]"/>
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--academy-navy)]">Module_Briefing_Log</label>
            </div>
            <textarea 
              name="full_content" 
              defaultValue={initialData?.full_content}
              placeholder="Inject technical module details and mission requirements..." 
              className="w-full h-80 bg-[var(--background)] rounded-[3rem] p-10 text-[15px] font-medium outline-none focus:bg-white border-2 border-transparent focus:border-[var(--academy-gold)]/20 transition-all resize-none leading-relaxed shadow-inner"
            />
          </div>

          {/* Action Interface - Desktop */}
          <div className="hidden md:flex gap-6 pt-6">
            {initialData?.id && (
              <div className="flex-1">
                <DeleteActionGate isDeleting={isDeleting} setIsDeleting={setIsDeleting} onConfirm={handleFinalDelete} isSyncing={isSyncing} />
              </div>
            )}
            <div className="flex-[2]">
              <SubmitAction />
            </div>
          </div>
        </div>
      </form>

      {/* Mobile Tactical Interface */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-3xl border-t border-black/5 md:hidden z-50 flex flex-col gap-3 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          {initialData?.id && (
            <DeleteActionGate isDeleting={isDeleting} setIsDeleting={setIsDeleting} onConfirm={handleFinalDelete} isSyncing={isSyncing} />
          )}
          <SubmitAction />
      </div>
    </div>
  );
}

// --- Specialized Internal Components ---

function DeleteActionGate({ isDeleting, setIsDeleting, onConfirm, isSyncing }: any) {
  return (
    <div className="w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {!isDeleting ? (
          <motion.button
            key="init" type="button" onClick={() => setIsDeleting(true)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full py-7 bg-red-50 text-red-600 rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 border border-red-100 hover:bg-red-600 hover:text-white transition-all group"
          >
            <Trash2 size={16} className="group-hover:rotate-12 transition-transform" /> Purge_Asset
          </motion.button>
        ) : (
          <motion.div key="confirm" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setIsDeleting(false)} className="py-7 bg-gray-100 text-gray-500 rounded-[2rem] font-black uppercase text-[10px]">Abort</button>
            <button type="button" onClick={onConfirm} disabled={isSyncing} className="py-7 bg-red-600 text-white rounded-[2rem] font-black uppercase text-[10px] shadow-xl shadow-red-200 flex items-center justify-center gap-2">
              {isSyncing ? <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><AlertTriangle size={14} /> Confirm</>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusToggle({ icon, label, name, defChecked, color }: any) {
  return (
    <label className="flex items-center justify-between p-8 bg-white rounded-[2.5rem] border border-black/5 shadow-sm cursor-pointer hover:border-[var(--academy-gold)] transition-all group">
      <div className="flex items-center gap-4">
        <div style={{ color }} className="opacity-80 p-3 bg-[var(--background)] rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</span>
      </div>
      <div className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" name={name} defaultChecked={defChecked} className="sr-only peer" />
        <div className="w-14 h-7 bg-gray-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--academy-navy)] shadow-inner"></div>
      </div>
    </label>
  );
}

function HubInput({ label, name, def, type = "text", placeholder, icon }: any) {
  return (
    <div className="space-y-3 group">
      <label className="text-[10px] font-black opacity-30 uppercase tracking-widest ml-5 text-[var(--academy-navy)]">{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-7 opacity-20 group-focus-within:text-[var(--academy-gold)] group-focus-within:opacity-100 transition-all">{icon}</div>}
        <input 
          name={name} defaultValue={def} type={type} placeholder={placeholder} 
          className={`w-full p-7 bg-[var(--background)] rounded-[2.5rem] font-black text-[14px] outline-none focus:bg-white border-2 border-transparent focus:border-[var(--academy-gold)]/30 shadow-sm transition-all text-[var(--academy-navy)] ${icon ? 'pl-16' : ''}`} 
        />
      </div>
    </div>
  );
}

function HubSelect({ label, name, options, def, icon }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black opacity-30 uppercase tracking-widest ml-5 text-[var(--academy-navy)]">{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-7 opacity-20">{icon}</div>}
        <select name={name} defaultValue={def} className={`w-full p-7 bg-[var(--background)] rounded-[2.5rem] font-black text-[12px] outline-none appearance-none cursor-pointer hover:bg-white border-2 border-transparent focus:border-[var(--academy-gold)]/30 shadow-sm transition-all text-[var(--academy-navy)] uppercase ${icon ? 'pl-16' : ''}`}>
          {options.map((o: any) => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="absolute right-6 pointer-events-none opacity-20"><ChevronLeft size={16} className="-rotate-90"/></div>
      </div>
    </div>
  );
}

function SubmitAction() {
  const { pending } = useFormStatus();
  return (
    <button 
      disabled={pending} 
      className="w-full py-7 md:py-8 bg-[var(--academy-navy)] text-[var(--academy-gold)] rounded-[2rem] md:rounded-[3rem] font-black uppercase tracking-[0.4em] text-[12px] flex items-center justify-center gap-4 hover:shadow-[0_20px_50px_rgba(32,45,72,0.3)] transition-all active:scale-[0.97] disabled:opacity-50 group shadow-lg"
    >
      {pending ? (
        <div className="flex items-center gap-3 italic tracking-widest animate-pulse">
           <div className="size-5 border-2 border-[var(--academy-gold)] border-t-transparent rounded-full animate-spin" />
           <span>Syncing_to_Blob_Storage...</span>
        </div>
      ) : (
        <>Execute_Deployment <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/></>
      )}
    </button>
  );
}