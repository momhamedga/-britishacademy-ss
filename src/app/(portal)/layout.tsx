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
    <div className="min-h-screen flex overflow-hidden selection:bg-gold/30 selection:text-white ">
      {/* Cinematic Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] size-[600px] bg-gold/[0.03] blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[500px] bg-blue-600/[0.02] blur-[150px] rounded-full" />
      </div>

      {showUI && (
        <aside className="hidden lg:flex w-80 border-r border-white/5 backdrop-blur-4xl relative z-30 flex-col">
          <Sidebar studentData={student} />
        </aside>
      )}

      {/* 📱 نداء الـ Mobile Nav الجديد */}
      {showUI && <MobileNav pathname={pathname} />}

      <main className={`flex-1 relative h-screen overflow-y-auto custom-scrollbar z-10 ${showUI ? 'pb-28 lg:pb-0' : ''}`}>
        <div className={`${!showUI ? 'w-full h-full flex items-center justify-center' : 'max-w-[1600px] mx-auto p-4 md:p-10 lg:p-16'}`}>
          {children}
        </div>
        
        {/* Terminal Footer */}
        {showUI && student && (
          <div className="hidden md:block absolute bottom-4 right-8 pointer-events-none opacity-20">
            <p className="text-[7px] font-mono text-gold tracking-[0.5em] uppercase">
              Uplink Active // Verified Identity: {student.student_id}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}