// 🎯 التكتيك النووي لإجبار Next.js على الرندرة الديناميكية ومنع كراش الـ Build بسبب الكوكيز
export const dynamic = "force-dynamic";

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
      SELECT id, student_id, name, email, rank, access_code, membership_card_url, created_at 
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
  const profileData = await getMembershipProfileData();
  
  if (!profileData) notFound();

  return (
    <main className=" max-w-5xl mx-auto text-white py-6 px-4">
      {/* تمرير الداتا الجاهزة والمكتملة فوراً */}
      <MembershipCardClient profile={profileData} />
    </main>
  );
}