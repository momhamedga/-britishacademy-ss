"use server"
import { sql } from "@/lib/db";
import { Course } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"; // ✅ هذا هو السطر الناقص الذي يسبب الخطأ
import { unstable_noStore as noStore } from 'next/cache';

// src/actions/academy-actions.ts
export async function getLatestCourses() {
  try {
    const rows = await sql`
      SELECT 
        id, 
        title, 
        slug, 
        category, 
        duration, 
        level, 
        price, 
        enrollment_count, 
        image_url, 
        is_sia_accredited, 
        short_description,
        full_content -- 👈 هذا هو الحقل الذي ينقصك ليظهر المحتوى!
      FROM public.courses 
      ORDER BY created_at DESC
    `;
    return rows as Course[];
  } catch (error) {
    console.error("🔴 [Database Error] getLatestCourses:", error);
    return [];
  }
}
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const data = await sql`SELECT * FROM courses WHERE slug = ${slug} LIMIT 1`;
    console.log("Fetched Course Data:", data[0]); // 👈 انظر للـ Terminal الخاص بـ VS Code
    return data.length > 0 ? (data[0] as unknown as Course) : null;
  } catch (error) {
    return null;
  }
}

/**
 * 🔍 جلب كورس واحد بالتفصيل الممل (لصفحة الـ Single Course)
 * نستخدم الـ ID أو الـ Slug لجلب البيانات كاملة بما فيها الـ full_content
 */


/**
 * 🆔 جلب كورس بالـ ID (مفيد لعمليات الـ Enrollment)
 */
export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const data = await sql`
      SELECT * FROM courses 
      WHERE id = ${id} 
      LIMIT 1
    `;
    
    return data.length > 0 ? (data[0] as unknown as Course) : null;
  } catch (error) {
    console.error("🔴 [Database Error] getCourseById:", error);
    return null;
  }
}

export async function enrollInCourse(courseId: string) {
  try {
    const cookieStore = await cookies();
    // 🛰️ سحب المعرف الموحد من الكوكيز
    const studentId = cookieStore.get("user_id")?.value;

    if (!studentId) {
      return { error: "UNAUTHORIZED: ACCESS DENIED" };
    }

    const existing = await sql`
      SELECT id FROM student_courses 
      WHERE student_id = ${studentId} AND course_id = ${courseId}
    `;

    if (existing.length > 0) {
      return { error: "ALREADY ENROLLED IN THIS VECTOR" };
    }

    await sql`
      INSERT INTO student_courses (student_id, course_id, enrolled_at, progress)
      VALUES (${studentId}, ${courseId}, NOW(), 0)
    `;

    await sql`
      UPDATE courses 
      SET enrollment_count = COALESCE(enrollment_count, 0) + 1 
      WHERE id = ${courseId}
    `;

    // تطهير كاش المسارات لضمان التحديث الفوري
    revalidatePath('/dashboard/courses');
    revalidatePath('/dashboard');
    revalidatePath(`/courses/${courseId}`); // تحديث صفحة الكورس نفسها

    return { success: true };
  } catch (error) {
    console.error("🔴 Enrollment Terminal Error:", error);
    return { error: "TERMINAL ERROR: ENROLLMENT SEQUENCE FAILED" };
  }
}