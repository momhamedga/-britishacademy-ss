"use server"

export async function getStudentCertificates(userId: string) {
  try {
    const { sql } = await import("@/lib/db");
    const safeVector = userId.length > 5 ? userId.substring(1) : userId;

    const data = await sql`
      SELECT 
        c.title, c.category, cert.certificate_code, 
        COALESCE(cert.certificate_url, c.certificate_template_url) as certificate_url, cert.issued_at
      FROM public.certificates cert
      JOIN public.courses c ON cert.course_id::text = c.id::text
      WHERE cert.student_id::text = ${userId}
         OR cert.student_id::text LIKE ${'%' + safeVector}
      ORDER BY cert.issued_at DESC
    `;

    return { success: true, data: data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}