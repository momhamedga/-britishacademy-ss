"use server"
import { sql } from "@/lib/db";
import { Course } from "@/types";

/**
 * جلب جميع الكورسات المتاحة من قاعدة البيانات
 * تم إزالة الـ LIMIT للسماح لصفحة الكورسات بعرض كامل المحتوى
 */
export async function getLatestCourses(): Promise<Course[]> {
  try {
    // جلب كل البيانات مع ترتيبها من الأحدث للأقدم
    const data = await sql`
      SELECT id, title, category, duration, level, created_at 
      FROM courses 
      ORDER BY created_at DESC
    `;
    
    return data as Course[];
  } catch (error) {
    // تسجيل الخطأ في السيرفر لسهولة التتبع
    console.error("Critical Database Error [getLatestCourses]:", error);
    return [];
  }
}
// الدالة الجديدة والاحترافية لجلب كورس واحد
export async function getCourseById(id: string | number): Promise<Course | null> {
  try {
    const data = await sql`
      SELECT * FROM courses 
      WHERE id = ${id}
      LIMIT 1
    `;
    
    // إرجاع أول نتيجة أو null لو مش موجود
    return data.length > 0 ? (data[0] as Course) : null;
  } catch (error) {
    console.error("Database Error [getCourseById]:", error);
    return null;
  }
}