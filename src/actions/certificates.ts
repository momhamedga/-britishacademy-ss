"use server"

import { StudentCertificate } from "@/types";

export async function getStudentCertificates(studentId: string) {
  try {
    const { sql } = await import("@/lib/db");
    
    // الربط التكتيكي بين الشهادة والكورس
    const data = await sql`
      SELECT 
        c.title, 
        c.category, 
        cert.certificate_code, 
        cert.issued_at
      FROM certificates cert
      JOIN courses c ON cert.course_id = c.id
      WHERE cert.student_id = ${studentId}::uuid
      ORDER BY cert.issued_at DESC
    `;

    return { success: true, data: data as StudentCertificate[] };
  } catch (error) {
    console.error("🔴 Certificate Retrieval Error:", error);
    return { success: false, data: [] };
  }
}