import Sidebar from "@/components/portal/Sidebar";
import MobileNav from "@/components/portal/MobileNav"; // استيراد المكون الجديد
import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const headerList = await headers();
  
  const pathname = headerList.get("x-pathname") || ""; 
  const isAuthPage = pathname.includes('/login') || pathname.includes('/register');
  const userId = cookieStore.get("user_id")?.value || cookieStore.get("auth_token")?.value;

  if (!userId && !isAuthPage) {
    redirect('/dashboard/login');
  }

  let student = null;
  if (userId) {
    const data = await sql`SELECT id, name, rank FROM students WHERE id = ${userId} LIMIT 1`;
    if (data[0]) {
      student = { ...data[0], student_id: data[0].id };
    }
  }

  const showUI = !isAuthPage && !!userId && !!student;

return (
  /* تأكد من وجود items-stretch هنا */
  <div className="min-h-screen flex items-stretch overflow-x-hidden selection:bg-gold/30" style={{ backgroundColor: '#f8fafc' }}>
    
    {showUI && (
      <aside 
        className="hidden lg:flex w-80 h-screen sticky top-0 z-30 flex-col border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.2)]"
        style={{ backgroundColor: 'oklch(25% 0.08 260)' }} /* استخدمنا اللون بتاعك هنا مباشرة */
      >
        <Sidebar studentData={student} />
      </aside>
    )}

    <div className="flex-1 flex flex-col min-h-screen relative">
      {showUI && <MobileNav pathname={pathname} />}

      <main className={`flex-1 relative z-10 flex flex-col ${showUI ? 'pt-[160px] lg:pt-24 pb-28' : ''}`}>
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-10 flex-1 flex items-start justify-center">
          {children}
        </div>
      </main>
    </div>
  </div>
);
}