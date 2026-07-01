import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import MembershipCardClient from "./MembershipCardClient";

/**
 * 🛰️ Server-side identity fetch for maximum performance
 */
async function getMembershipProfileData() {
  try {
    const cookieStore = await cookies();
    const studentIdText = cookieStore.get("user_id")?.value;

    if (!studentIdText) return null;

    const safeVector = studentIdText.length > 5 ? studentIdText.substring(1) : studentIdText;

    const rows = await sql`
      SELECT id, student_id, name, email, rank, access_code, created_at 
      FROM public.students 
      WHERE student_id = ${studentIdText} 
         OR student_id LIKE ${'%' + safeVector}
         OR id::text = ${studentIdText}
      LIMIT 1
    `;

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("🔴 Server Membership Fetch Failed:", error);
    return null;
  }
}

export default async function MembershipCardPage() {
  // جلب البيانات على السيرفر قبل رندرة الصفحة
  const profileData = await getMembershipProfileData();
  
  if (!profileData) notFound();

  return (
    <main className="min-h-screen  text-white py-12 px-4 md:px-8">
      {/* تمرير الداتا الجاهزة فورا للـ Client Component */}
      <MembershipCardClient profile={profileData} />
    </main>
  );
}