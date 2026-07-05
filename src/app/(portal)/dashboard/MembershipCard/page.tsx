// 🎯 التكتيك النووي لإجبار Next.js على الرندرة الديناميكية ومنع كراش الـ Build بسبب الكوكيز
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { getCurrentStudentId } from "@/lib/session";
import MembershipCardClient, { type MembershipProfile } from "./MembershipCardClient";

/**
 * 🛰️ Server-side identity fetch for maximum performance
 */
async function getMembershipProfileData() {
  try {
    const studentId = await getCurrentStudentId();
    if (!studentId) return null;

    const rows = await sql`
      SELECT id, student_id, name, email, rank, membership_card_url, created_at
      FROM public.students
      WHERE id = ${studentId}::uuid
      LIMIT 1
    `;

    return rows.length > 0 ? (rows[0] as unknown as MembershipProfile) : null;
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