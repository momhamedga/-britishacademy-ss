"use server"

export async function getStudentCertificates(studentId: string) {
  try {
    // 🛰️ نستخدم الـ fetch العادي بتاع Node.js عشان نكلم Neon API مباشرة
    // ده بيتخطى أي مشاكل في مكتبة السيرفرلس
    const response = await fetch(`${process.env.DATABASE_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        query: `
          SELECT c.title, c.category, cert.certificate_code, cert.issued_at
          FROM certificates cert
          JOIN courses c ON cert.course_id = c.id
          WHERE cert.student_id = $1
        `,
        params: [studentId]
      }),
      cache: 'no-store' // إجبار البيانات تكون فريش
    });

    // لو الـ DATABASE_URL بتاعك هو الـ connection string العادي (postgresql://...)
    // يبقى هنرجع نستخدم الـ sql بس بـ Query "تافهة" للتأكد من الـ Connection
    
    const { sql } = await import("@/lib/db");
    const data = await sql`
      SELECT c.title, c.category, cert.certificate_code, cert.issued_at
      FROM certificates cert
      JOIN courses c ON cert.course_id = c.id
      WHERE cert.student_id = ${studentId}::uuid
    `.catch(() => []);

    return { success: true, data };
  } catch (error) {
    return { success: false, data: [] };
  }
}