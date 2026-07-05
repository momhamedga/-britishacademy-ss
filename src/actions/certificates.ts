"use server"

import { getCurrentStudentId } from "@/lib/session";
import type { StudentCertificate } from "@/types";

export async function getStudentCertificates() {
  try {
    const studentId = await getCurrentStudentId();
    if (!studentId) return { success: false, data: [] };

    const { sql } = await import("@/lib/db");

    const data = await sql`
      SELECT
        c.title, c.category, cert.certificate_code,
        COALESCE(cert.certificate_url, c.certificate_template_url) as certificate_url, cert.issued_at
      FROM public.certificates cert
      JOIN public.courses c ON cert.course_id::text = c.id::text
      WHERE cert.student_id = ${studentId}::uuid
      ORDER BY cert.issued_at DESC
    `;

    return { success: true, data: (data || []) as unknown as StudentCertificate[] };
  } catch {
    return { success: false, data: [] };
  }
}
