import Sidebar from "@/components/portal/Sidebar";
import MobileNav from "@/components/portal/MobileNav";
import { sql } from "@/lib/db";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const headerList = await headers();
  
  const pathname = headerList.get("x-pathname") || ""; 
  const isAuthPage = pathname.includes('/login') || pathname.includes('/register');
  
  // التحقق من الهوية (User Identification)
  const userId = cookieStore.get("user_id")?.value || cookieStore.get("auth_token")?.value;

  // حماية المسار: لو مش مسجل دخول ومش في صفحة Auth، ارجع للـ Login
  if (!userId && !isAuthPage) {
    redirect('/dashboard/login');
  }

  // جلب بيانات الطالب لضمان تخصيص التجربة (Invisible Personalization)
  let student = null;
  if (userId) {
    const data = await sql`SELECT id, name, rank FROM students WHERE id = ${userId} LIMIT 1`;
    if (data[0]) {
      student = { ...data[0], student_id: data[0].id };
    }
  }

  // تحديد ما إذا كان يجب عرض واجهة الداشبورد (Sidebar & MobileNav)
  const showUI = !isAuthPage && !!userId && !!student;

  return (
    <div 
      className="min-h-screen flex items-start selection:bg-gold/30 relative" 
      style={{ backgroundColor: 'oklch(25% 0.08 260)' }} // لون السايدبار للأرضية كلها لمنع الفجوات البيضاء
    > 
      
      {/* 🖥️ Desktop Sidebar - Tactical Side Panel */}
      {showUI && (
        <aside 
          className="hidden lg:flex w-80 sticky top-0 z-30 flex-col border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.2)] flex-shrink-0"
          style={{ 
            backgroundColor: 'oklch(25% 0.08 260)',
            height: '100vh' 
          }}
        >
          <Sidebar studentData={student} />
        </aside>
      )}

      {/* 📱 Mobile UI & Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 bg-[#f8fafc]"> 
        {/* لون الخلفية الفاتح للمحتوى (Contrast UI) لسهولة القراءة */}
        
        {showUI && <MobileNav pathname={pathname} />}

        <main className={`flex-1 flex flex-col w-full ${showUI ? 'pt-[160px] lg:pt-24 pb-28' : ''}`}>
          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-10 flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}