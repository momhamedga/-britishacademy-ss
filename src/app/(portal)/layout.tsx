import Sidebar from "@/components/portal/Sidebar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Sidebar - يظهر فقط في الديسكتوب حالياً */}
      <aside className="hidden lg:block w-80 border-r border-white/5 backdrop-blur-3xl relative z-30">
        <Sidebar />
      </aside>

      {/* Content Area */}
      <main className="flex-1 relative h-screen overflow-y-auto custom-scrollbar">
        {/* Cinematic Backgrounds */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="p-6 md:p-10 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}