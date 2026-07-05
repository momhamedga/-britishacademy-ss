import Sidebar from "@/components/portal/Sidebar";
import MobileNav from "@/components/portal/MobileNav";
import { sql } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentStudentId } from "@/lib/session";
import type { NavUser } from "@/types";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();

  const pathname = headerList.get("x-pathname") || "";
  const isAuthPage = pathname.includes('/login') || pathname.includes('/register');

  // Checking User Authentication
  const userId = await getCurrentStudentId();

  // Route Protection
  if (!userId && !isAuthPage) {
    redirect('/dashboard/login');
  }

  // Invisible Personalization Feed
  let student: (NavUser & { id?: string }) | null = null;
  if (userId) {
    const data = await sql`SELECT id, name, rank FROM students WHERE id = ${userId}::uuid LIMIT 1`;
    if (data[0]) {
      student = { ...data[0], student_id: data[0].id } as unknown as NavUser & { id?: string };
    }
  }

  const showUI = !isAuthPage && !!userId && !!student;

  return (
    <div 
      className=" text-white relative antialiased overflow-x-hidden" 
      style={{ backgroundColor: 'oklch(20% 0.05 260)' }} // توحيد الأرضية بالكامل بلون الأكاديمية السينمائي الغامق لمنع الفجوات الفاتحة
    > 
      {/* 🌌 خيوط هندسية خافتة جداً في الخلفية لإعطاء عمق للمنصة */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className={`w-full min-h-screen ${showUI ? 'flex flex-col lg:grid lg:grid-cols-[20rem_1fr]' : 'block'}`}>
        
        {/* 🖥️ Desktop Sidebar - Secured Layout Panel */}
        {showUI && (
          <aside 
            className="hidden lg:flex flex-col border-r border-white/3 sticky top-0 h-screen z-40 overflow-y-auto no-scrollbar shrink-0 shadow-[10px_0_40px_rgba(0,0,0,0.3)]"
            style={{ backgroundColor: 'oklch(22% 0.06 260)' }}
          >
            <Sidebar studentData={student} />
          </aside>
        )}

        {/* 📱 Mobile Navigation Trigger & Content Space */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10"> 
          
          {/* الـ Mobile Nav بيظهر فقط على الشاشات الصغيرة ويختفي تلقائياً في الديسكتوب بدون تداخل */}
          {showUI && (
            <div className="lg:hidden fixed top-0 inset-x-0 z-50">
              <MobileNav />
            </div>
          )}

          {/* محاذاة مسافات الأمان للهيدر على الموبيل والديسكتوب بدقة */}
          <main className={`flex-1 flex flex-col w-full ${showUI ? 'pt-27.5 lg:pt-12 pb-32 lg:pb-16' : ''}`}>
            <div className="w-full max-w-350 mx-auto px-4 md:px-12 flex-1 animate-in fade-in duration-500">
              {children}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}