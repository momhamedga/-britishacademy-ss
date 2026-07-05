import { Suspense } from "react";
import { sql } from "@/lib/db";
import { getCurrentStudentId } from "@/lib/session";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const userId = await getCurrentStudentId();

  return (
    <div className="flex flex-col min-h-screen ">
      {/* الـ NavbarWrapper هيتحكم في شكل الهيدر بناءً على حالة تسجيل الدخول */}
      <Suspense fallback={<Navbar isGuest={true} />}>
        <NavbarWrapper userId={userId} />
      </Suspense>

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

// الـ Server Component المسؤول عن فحص بيانات الطالب
async function NavbarWrapper({ userId }: { userId?: string | null }) {
  const student = userId ? await fetchNavStudent(userId) : null;

  if (!student) return <Navbar isGuest={true} />;

  return <Navbar user={{ name: student.name, rank: student.rank }} isGuest={false} />;
}

async function fetchNavStudent(userId: string) {
  try {
    // جلب بيانات الطالب من قاعدة البيانات مباشرة (Server-Side)
    const [student] = await sql`
      SELECT name, rank
      FROM students
      WHERE id = ${userId}
      LIMIT 1
    `;
    return student ?? null;
  } catch (error) {
    console.error("Auth Wrapper Error:", error);
    return null;
  }
}