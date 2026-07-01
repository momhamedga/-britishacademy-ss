"use client";
import { useState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  ChevronLeft, Send, Shield, Sparkles, Image as ImageIcon, Plus, Trash,
  Link as LinkIcon, Upload, User, DollarSign, Clock, Layers, FileText, Video
} from 'lucide-react';
import { upsertCourse, deleteCourse, getCourseLessonsForAdmin } from '@/actions/admin-actions';

const ACADEMY_LOGO_FALLBACK = "/logo.webp";
const CERT_FALLBACK_IMAGE = "/logo.webp"; 

export default function CourseDeploymentHub({ initialData, onBack }: any) {
  const [assetMode, setAssetMode] = useState<'link' | 'upload'>(initialData?.image_url && !initialData.image_url.includes('blob') ? 'link' : 'upload');
  const [preview, setPreview] = useState(initialData?.image_url || ACADEMY_LOGO_FALLBACK);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [certAssetMode, setCertAssetMode] = useState<'link' | 'upload'>(initialData?.certificate_template_url && !initialData.certificate_template_url.includes('blob') ? 'link' : 'upload');
  const [certPreview, setCertPreview] = useState(initialData?.certificate_template_url || CERT_FALLBACK_IMAGE);
  const [selectedCertFile, setSelectedCertFile] = useState<File | null>(null);
  const certFileInputRef = useRef<HTMLInputElement>(null);

  const [isSyncing, setIsSyncing] = useState(false);

  // 🛰️ إدارة مصفوفة الدروس التفاعلية
  const [lessons, setLessons] = useState<any[]>([]);

  // جلب الدروس المسجلة مسبقاً للكورس الحالي عند التعديل
  useEffect(() => {
    async function loadLessons() {
      if (initialData?.id) {
        const existingLessons = await getCourseLessonsForAdmin(initialData.id);
        if (existingLessons) setLessons(existingLessons);
      }
    }
    loadLessons();
  }, [initialData]);

  const addLessonRow = () => {
    setLessons([...lessons, { title: '', description: '', video_url: '', duration: '15 mins' }]);
  };

  const removeLessonRow = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleLessonChange = (index: number, field: string, value: string) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  useEffect(() => {
    if (assetMode === 'link' && preview && preview !== ACADEMY_LOGO_FALLBACK) {
      const img = new window.Image();
      img.src = preview;
      img.onerror = () => setPreview(ACADEMY_LOGO_FALLBACK);
    }
  }, [preview, assetMode]);

  useEffect(() => {
    if (certAssetMode === 'link' && certPreview && certPreview !== CERT_FALLBACK_IMAGE) {
      const img = new window.Image();
      img.src = certPreview;
      img.onerror = () => setCertPreview(CERT_FALLBACK_IMAGE);
    }
  }, [certPreview, certAssetMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCertFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCertFile(file);
      setCertPreview(URL.createObjectURL(file));
    }
  };

  const handleAction = async (formData: FormData) => {
    if(initialData?.id) formData.append('id', initialData.id);
    
    if (assetMode === 'upload' && selectedFile) {
      formData.append('image_file', selectedFile);
    } else if (assetMode === 'link' && (!formData.get('image_url') || formData.get('image_url') === "")) {
      formData.set('image_url', ACADEMY_LOGO_FALLBACK);
    }

    if (certAssetMode === 'upload' && selectedCertFile) {
      formData.append('certificate_file', selectedCertFile);
    }

    formData.set('is_sia', formData.get('is_sia') === 'on' ? 'true' : 'false');

    // تجميع الدروس كـ JSON بأمان كامل
    formData.append('lessons_json', JSON.stringify(lessons));

    const result = await upsertCourse(formData);
    if (result.success) onBack();
    else alert("DEPLOYMENT_FAILED");
  };

  return (
    <div className="max-w-7xl mx-auto pb-40 md:pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans text-foreground">
      
      {/* Navigation Header */}
      <nav className="flex items-center justify-between mb-8 bg-white/40 backdrop-blur-2xl p-4 md:p-6 rounded-[2.5rem] border border-white shadow-sm">
        <button 
          type="button"
          onClick={onBack} 
          className="flex items-center gap-2 group px-6 py-3 bg-navy rounded-xl text-white hover:bg-gold hover:text-navy transition-all shadow-lg active:scale-95"
        >
          <ChevronLeft size={18}/>
          <span className="text-[11px] font-black uppercase tracking-tighter">Abort_Mission</span>
        </button>
      </nav>

      <form action={handleAction} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black uppercase opacity-40 tracking-widest text-navy">Course_Cover</h3>
                <div className="flex bg-background p-1 rounded-xl">
                   <button type="button" onClick={() => setAssetMode('link')} className={`p-2.5 rounded-lg transition-all ${assetMode === 'link' ? 'bg-white shadow-md text-navy' : 'text-gray-400 opacity-50'}`}><LinkIcon size={14}/></button>
                   <button type="button" onClick={() => setAssetMode('upload')} className={`p-2.5 rounded-lg transition-all ${assetMode === 'upload' ? 'bg-white shadow-md text-navy' : 'text-gray-400 opacity-50'}`}><Upload size={14}/></button>
                </div>
              </div>

              <div className="aspect-square bg-background rounded-[2rem] mb-6 overflow-hidden border-2 border-dashed border-black/5 flex items-center justify-center relative group/preview">
                <Image 
                  src={preview} 
                  alt="Course Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`transition-all duration-700 object-cover ${preview === ACADEMY_LOGO_FALLBACK ? 'scale-50 opacity-20 grayscale' : 'group-hover/preview:scale-105'}`}
                  onError={() => setPreview(ACADEMY_LOGO_FALLBACK)}
                  unoptimized={assetMode === 'upload'}
                />
                {assetMode === 'upload' && (
                  <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 flex flex-col items-center justify-center transition-all cursor-pointer backdrop-blur-md z-10">
                    <Upload className="text-gold mb-2" size={24} />
                    <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Inject_Cover</p>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {assetMode === 'link' ? (
                  <motion.div key="link" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <input name="image_url" defaultValue={initialData?.image_url !== ACADEMY_LOGO_FALLBACK ? initialData?.image_url : ''} onChange={(e) => setPreview(e.target.value || ACADEMY_LOGO_FALLBACK)} placeholder="HTTPS://IMAGE_LINK..." className="w-full p-5 bg-background rounded-2xl outline-none font-bold text-[11px] border-2 border-transparent focus:border-gold/20 transition-all uppercase text-navy" />
                  </motion.div>
                ) : (
                  <motion.div key="upload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    <div className="py-4 px-2 bg-background rounded-2xl border border-black/5 text-center">
                      <span className="text-[9px] font-black text-gold uppercase truncate block px-2">{selectedFile ? `READY: ${selectedFile.name}` : "Awaiting_Cover_Asset"}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-white relative overflow-hidden border-t-4 border-t-gold">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-gold"/>
                  <h3 className="text-[10px] font-black uppercase opacity-60 tracking-widest text-navy">Linked_Certificate</h3>
                </div>
                <div className="flex bg-background p-1 rounded-xl">
                   <button type="button" onClick={() => setCertAssetMode('link')} className={`p-2.5 rounded-lg transition-all ${certAssetMode === 'link' ? 'bg-white shadow-md text-navy' : 'text-gray-400 opacity-50'}`}><LinkIcon size={14}/></button>
                   <button type="button" onClick={() => setCertAssetMode('upload')} className={`p-2.5 rounded-lg transition-all ${certAssetMode === 'upload' ? 'bg-white shadow-md text-navy' : 'text-gray-400 opacity-50'}`}><Upload size={14}/></button>
                </div>
              </div>

              <div className="aspect-[1.414/1] bg-background rounded-[1.5rem] mb-6 overflow-hidden border-2 border-dashed border-gold/20 flex items-center justify-center relative group/certPreview">
                <Image 
                  src={certPreview} 
                  alt="Certificate Template Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`transition-all duration-700 object-cover ${certPreview === CERT_FALLBACK_IMAGE ? 'scale-50 opacity-20 grayscale' : 'group-hover/certPreview:scale-105'}`}
                  onError={() => setCertPreview(CERT_FALLBACK_IMAGE)}
                  unoptimized={certAssetMode === 'upload'}
                />
                {certAssetMode === 'upload' && (
                  <div onClick={() => certFileInputRef.current?.click()} className="absolute inset-0 bg-navy/80 opacity-0 group-hover/certPreview:opacity-100 flex flex-col items-center justify-center transition-all cursor-pointer backdrop-blur-md z-10">
                    <Upload className="text-gold mb-2" size={24} />
                    <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Inject_Cert_Template</p>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {certAssetMode === 'link' ? (
                  <motion.div key="certLink" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <input name="certificate_template_url" defaultValue={initialData?.certificate_template_url || ''} onChange={(e) => setCertPreview(e.target.value || CERT_FALLBACK_IMAGE)} placeholder="HTTPS://CERTIFICATE_TEMPLATE_LINK..." className="w-full p-5 bg-background rounded-2xl outline-none font-bold text-[11px] border-2 border-transparent focus:border-gold/20 transition-all uppercase text-navy" />
                  </motion.div>
                ) : (
                  <motion.div key="certUpload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <input type="file" ref={certFileInputRef} onChange={handleCertFileChange} className="hidden" accept="image/*" />
                    <div className="py-4 px-2 bg-background rounded-2xl border border-black/5 text-center">
                      <span className="text-[9px] font-black text-gold uppercase truncate block px-2">{selectedCertFile ? `READY: ${selectedCertFile.name}` : "Awaiting_Cert_Template"}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
          
          <StatusToggle icon={<Shield size={16}/>} label="SIA_Accreditation" name="is_sia" defChecked={initialData?.is_sia_accredited} color="var(--academy-gold)" />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 bg-white p-6 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-white space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <HubInput label="Operation_Identity" name="title" def={initialData?.title} placeholder="CCTV_SURVEILLANCE" />
            <HubInput label="Unique_Slug" name="slug" def={initialData?.slug} placeholder="cctv-tactical-v1" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <HubInput label="Tactical_Officer" name="instructor_name" icon={<User size={14}/>} def={initialData?.instructor_name} placeholder="Hussein Alharithi" />
             <HubSelect label="Department" name="category" icon={<Layers size={14}/>} options={['Security', 'Safety', 'Medical']} def={initialData?.category} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <HubSelect label="Combat_Tier" name="level" options={['Level 2', 'Level 3', 'Expert']} def={initialData?.level} />
             <HubInput label="Duration" name="duration" icon={<Clock size={14}/>} def={initialData?.duration} placeholder="3 Days" />
             <HubInput label="Value_AED" name="price" icon={<DollarSign size={14}/>} def={initialData?.price} type="number" placeholder="0" />
          </div>

          {/* 🛰️ هب إدارة الدروس للأدمن */}
          <div className="space-y-6 border-t border-black/5 pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 opacity-40">
                <Video size={14} className="text-gold"/>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-navy">Course Syllabus (إدارة الدروس)</label>
              </div>
              <button 
                type="button" 
                onClick={addLessonRow}
                className="flex items-center gap-2 px-4 py-2 bg-navy text-gold rounded-xl text-[9px] font-black uppercase transition-all hover:opacity-90 active:scale-95 shadow-md"
              >
                <Plus size={12}/> Add Lesson Vector
              </button>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
              <AnimatePresence mode="popLayout">
                {lessons.map((lesson, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="p-5 bg-background rounded-3xl border border-black/5 relative space-y-4 group/row"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input 
                        type="text" 
                        value={lesson.title} 
                        onChange={(e) => handleLessonChange(idx, 'title', e.target.value)}
                        placeholder="LESSON_TITLE..." 
                        className="p-4 bg-white border border-black/5 rounded-xl font-bold text-xs uppercase text-navy outline-none"
                      />
                      <input 
                        type="text" 
                        value={lesson.video_url || ''} 
                        onChange={(e) => handleLessonChange(idx, 'video_url', e.target.value)}
                        placeholder="VIDEO_EMBED_URL (YOUTUBE/VIMEO)..." 
                        className="p-4 bg-white border border-black/5 rounded-xl font-bold text-xs text-navy outline-none col-span-1 md:col-span-2"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <input 
                        type="text" 
                        value={lesson.duration} 
                        onChange={(e) => handleLessonChange(idx, 'duration', e.target.value)}
                        placeholder="DURATION (e.g. 15 mins)..." 
                        className="p-4 bg-white border border-black/5 rounded-xl font-bold text-xs uppercase text-navy outline-none col-span-1 md:col-span-1"
                      />
                      <input 
                        type="text" 
                        value={lesson.description || ''} 
                        onChange={(e) => handleLessonChange(idx, 'description', e.target.value)}
                        placeholder="SUPPLEMENTAL LESSON INTEL / DESCRIPTION..." 
                        className="p-4 bg-white border border-black/5 rounded-xl font-bold text-xs text-navy outline-none col-span-1 md:col-span-2"
                      />
                      <button 
                        type="button"
                        onClick={() => removeLessonRow(idx)}
                        className="p-4 bg-error/10 text-error rounded-xl flex items-center justify-center hover:bg-error hover:text-white transition-all md:col-span-1"
                      >
                        <Trash size={14}/>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {lessons.length === 0 && (
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-6 border border-dashed border-black/5 rounded-3xl">No lessons linked. Awaiting vector input assignment.</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 ml-4 opacity-30">
              <Sparkles size={14} className="text-gold"/>
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-navy">Module_Briefing</label>
            </div>
            <textarea name="full_content" defaultValue={initialData?.full_content} placeholder="Inject technical module details..." className="w-full h-80 bg-background rounded-[3rem] p-10 text-[15px] font-medium outline-none focus:bg-white border-2 border-transparent focus:border-gold/20 transition-all resize-none shadow-inner text-navy" />
          </div>

          <div className="flex gap-6 pt-6">
            {initialData?.id && (
              <div className="flex-1">
                <DeleteActionGate onConfirm={async () => {
                  setIsSyncing(true);
                  await deleteCourse(initialData.id);
                  onBack();
                }} isSyncing={isSyncing} />
              </div>
            )}
            <div className="flex-[2]">
              <SubmitAction isFallback={preview === ACADEMY_LOGO_FALLBACK} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function DeleteActionGate({ onConfirm, isSyncing }: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isDeleting ? (
          <motion.button key="init" type="button" onClick={() => setIsDeleting(true)} className="w-full py-7 bg-error/10 text-error rounded-[2rem] font-black uppercase text-[10px] border border-error/20 hover:bg-error hover:text-white transition-all">Purge_Asset</motion.button>
        ) : (
          <motion.div key="confirm" className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setIsDeleting(false)} className="py-7 bg-background rounded-[2rem] font-black uppercase text-[10px]">Abort</button>
            <button type="button" onClick={onConfirm} disabled={isSyncing} className="py-7 bg-error text-white rounded-[2rem] font-black uppercase text-[10px] shadow-lg shadow-error/20">{isSyncing ? "..." : "Confirm"}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubmitAction({ isFallback }: { isFallback: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className={`w-full py-7 md:py-8 rounded-[2rem] md:rounded-[3rem] font-black uppercase tracking-[0.4em] text-[12px] flex items-center justify-center gap-4 transition-all shadow-xl ${isFallback ? 'bg-navy/90 text-gold border border-gold/30' : 'bg-navy text-gold hover:shadow-navy/20'}`}>
      {pending ? "Syncing_Protocol..." : (isFallback ? "Deploy_With_Identity" : "Execute_Deployment")}
      {!pending && <Send size={18} />}
    </button>
  );
}

function StatusToggle({ icon, label, name, defChecked, color }: any) {
  return (
    <label className="flex items-center justify-between p-8 bg-white rounded-[2.5rem] border border-black/5 cursor-pointer hover:border-gold transition-all group">
      <div className="flex items-center gap-4">
        <div style={{ color }} className="p-3 bg-background rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
        <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">{label}</span>
      </div>
      <input type="checkbox" name={name} defaultChecked={defChecked} className="w-12 h-6 accent-navy cursor-pointer" />
    </label>
  );
}

function HubInput({ label, name, def, type = "text", placeholder, icon }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black opacity-30 uppercase tracking-widest ml-5 text-navy">{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-7 opacity-20 transition-all text-gold">{icon}</div>}
        <input name={name} defaultValue={def} type={type} placeholder={placeholder} className={`w-full p-7 bg-background rounded-[2.5rem] font-black text-[14px] outline-none border-2 border-transparent focus:border-gold/30 transition-all text-navy ${icon ? 'pl-16' : ''}`} />
      </div>
    </div>
  );
}

function HubSelect({ label, name, options, def, icon }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black opacity-30 uppercase tracking-widest ml-5 text-navy">{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-7 opacity-20 text-gold">{icon}</div>}
        <select name={name} defaultValue={def} className="w-full p-7 bg-background rounded-[2.5rem] font-black text-[12px] outline-none appearance-none cursor-pointer pl-16 uppercase text-navy border-2 border-transparent focus:border-gold/30 transition-all">
          {options.map((o: any) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}