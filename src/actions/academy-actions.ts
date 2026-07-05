
"use server"
import { sql } from "@/lib/db";
import { Course } from "@/types";
import { revalidatePath } from "next/cache";
import { getCurrentStudentId } from "@/lib/session";
import { unstable_noStore as noStore } from 'next/cache';

const FALLBACK_IMAGE = "/logo.webp";

/**
 * 🛰️ جلب أحدث الكورسات المتاحة في القائمة العامة
 */
export async function getLatestCourses() {
  noStore();
  try {
    const studentId = await getCurrentStudentId();

    let rows;
    if (studentId) {
      rows = await sql`
        SELECT
          c.id, c.title, c.slug, c.category, c.duration, c.level, c.price, c.instructor_name, c.enrollment_count,
          COALESCE(c.image_url, ${FALLBACK_IMAGE}) as image_url, c.is_sia_accredited, c.short_description, c.full_content,
          sc.progress
        FROM public.courses c
        LEFT JOIN public.student_courses sc ON c.id::text = sc.course_id::text
          AND sc.student_id = ${studentId}::uuid
        ORDER BY c.created_at DESC
      `;
    } else {
      rows = await sql`
        SELECT id, title, slug, category, duration, level, price, instructor_name, enrollment_count, 
          COALESCE(image_url, ${FALLBACK_IMAGE}) as image_url, is_sia_accredited, short_description, full_content, NULL as progress
        FROM public.courses ORDER BY created_at DESC
      `;
    }
    return rows as Course[];
  } catch (error) {
    console.error("🔴 getLatestCourses Error:", error);
    return [];
  }
}

/**
 * 🛰️ جلب بيانات كورس معين باستخدام الـ Slug
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const data = await sql`SELECT *, COALESCE(image_url, ${FALLBACK_IMAGE}) as image_url FROM courses WHERE slug = ${slug} LIMIT 1`;
    return data.length > 0 ? (data[0] as unknown as Course) : null;
  } catch { return null; }
}

/**
 * 🛰️ جلب بيانات كورس معين باستخدام الـ ID
 */
export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const data = await sql`SELECT * FROM courses WHERE id::text = ${id} LIMIT 1`;
    return data.length > 0 ? (data[0] as unknown as Course) : null;
  } catch (error) {
    console.error("🔴 [Database Error] getCourseById:", error);
    return null;
  }
}

/**
 * 🛰️ التحقق من حالة اشتراك الطالب ونسبة التقدم (يحمي المسميين لعدم كسر أي صفحة)
 */
export async function checkTransientProgress(courseId: string) {
  try {
    const studentId = await getCurrentStudentId();

    if (!studentId) return { isEnrolled: false, progress: 0, lessons: [], completedLessons: [] };

    // جلب التقدم والـ status التكتيكي المخزن فيه الـ IDs للدروس
    const data = await sql`
      SELECT progress, status FROM public.student_courses
      WHERE student_id = ${studentId}::uuid
        AND course_id::text = ${courseId} LIMIT 1
    `;

    if (data.length === 0) return { isEnrolled: false, progress: 0, lessons: [], completedLessons: [] };

    const lessons = await sql`
      SELECT id, title, description, video_url, duration FROM public.lessons 
      WHERE course_id::text = ${courseId} ORDER BY created_at ASC
    `;

    // تحويل الـ status النصي المفصول بفاصلة إلى مصفوفة IDs مجدداً
    const statusText = data[0].status || "";
    const completedLessons = statusText ? statusText.split(",") : [];

    return { 
      isEnrolled: true, 
      progress: parseInt(data[0].progress as string) || 0,
      lessons: lessons || [],
      completedLessons: completedLessons // حقن المصفوفة هنا لتصل للـ UI ثابتة
    };
  } catch (error) {
    console.error("🔴 checkTransientProgress Error:", error);
    return { isEnrolled: false, progress: 0, lessons: [], completedLessons: [] };
  }
}

// 🛰️ تفويض الدوال الأخرى بنفس المسمى لضمان عدم كسر أي صفحة فرعية
export async function checkComponentProgress(courseId: string) {
  return checkTransientProgress(courseId);
}

export async function checkStructuredProgress(courseId: string) {
  return checkTransientProgress(courseId);
}

export async function checkTransientProgressForPage(courseId: string) {
  return checkTransientProgress(courseId);
}

export async function checkStudentVectorProgress(courseId: string) {
  return checkTransientProgress(courseId);
}
/**
 * 🛰️ تسجيل الاشتراك في الكورس وتوليد سطر التقدم الابتدائي
 */
export async function enrollInCourse(courseId: string) {
  try {
    const studentId = await getCurrentStudentId();

    if (!studentId) return { error: "UNAUTHORIZED: ACCESS DENIED" };

    const existing = await sql`SELECT id FROM student_courses WHERE student_id = ${studentId}::uuid AND course_id::text = ${courseId}`;
    if (existing.length > 0) return { error: "ALREADY ENROLLED IN THIS VECTOR" };

    await sql`
      INSERT INTO student_courses (student_id, course_id, enrolled_at, progress)
      VALUES (${studentId}::uuid, ${courseId}, NOW(), 0)
    `;

    await sql`UPDATE courses SET enrollment_count = COALESCE(enrollment_count, 0) + 1 WHERE id::text = ${courseId}`;

    revalidatePath('/dashboard/courses');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error("🔴 Enrollment Terminal Error:", error);
    return { error: "TERMINAL ERROR" };
  }
}

/**
 * 🛰️ التحقق من كود الشهادات وصلاحيتها
 */
export async function verifyCertificateAction(code: string) {
  try {
    const data = await sql`
      SELECT cert.certificate_code, cert.issued_at, cert.certificate_url, c.title as course_title, s.name as student_name
      FROM public.certificates cert
      INNER JOIN public.students s ON cert.student_id::text = s.id::text
      INNER JOIN public.courses c ON cert.course_id::text = c.id::text
      WHERE cert.certificate_code = ${code.trim()} LIMIT 1
    `;
    if (data.length === 0) return { success: false, message: "Invalid Code" };
    return { success: true, certificate: { ...data[0], issued_at: data[0].issued_at instanceof Date ? data[0].issued_at.toISOString() : data[0].issued_at } };
  } catch { return { success: false, message: "System Error" }; }
}

export async function updateLessonProgress(courseId: string, totalLessons: number, completedLessonsCount: number, completedLessonsTitles: string[] = []) {
  try {
    const studentId = await getCurrentStudentId();

    if (!studentId) return { error: "UNAUTHORIZED" };
    if (totalLessons === 0) return { success: true, progress: 0 };

    // حساب النسبة المئوية الموزونة بالشعرة
    const calculatedProgress = Math.min(Math.round((completedLessonsCount / totalLessons) * 100), 100);

    // حقن عناوين الدروس مفصولة بفاصلة في عمود status
    const statusPayload = completedLessonsTitles.join(",");

    await sql`
      UPDATE student_courses
      SET progress = ${calculatedProgress},
          status = ${statusPayload}
      WHERE student_id = ${studentId}::uuid
        AND course_id::text = ${courseId}
    `;

    // بروتوكول توليد الشهادة التلقائي عند اكتمال الـ 100%
    if (calculatedProgress === 100) {
      const existingCert = await sql`SELECT id FROM public.certificates WHERE student_id::text = ${studentId} AND course_id::text = ${courseId} LIMIT 1`;

      if (existingCert.length === 0) {
        const courseData = await sql`SELECT certificate_template_url FROM public.courses WHERE id::text = ${courseId} LIMIT 1`;
        const certUrl = courseData[0]?.certificate_template_url || null;
        const uniqueSerial = `BA-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

        await sql`
          INSERT INTO public.certificates (student_id, course_id, certificate_code, certificate_url, issued_at)
          VALUES (${studentId}::uuid, ${courseId}, ${uniqueSerial}, ${certUrl}, NOW())
        `;
      }
    }

    revalidatePath('/dashboard/courses');
    revalidatePath('/dashboard/certificates');
    
    return { success: true, progress: calculatedProgress };
  } catch (error) {
    console.error("🔴 updateLessonProgress Failed:", error);
    return { error: "FAILED" };
  }
}


export async function getStudentMembershipProfile() {
  try {
    const studentId = await getCurrentStudentId();
    if (!studentId) return { success: false, data: null };

    const rows = await sql`
      SELECT id, student_id, name, email, rank, created_at
      FROM public.students
      WHERE id = ${studentId}::uuid
      LIMIT 1
    `;

    if (rows.length === 0) return { success: false, data: null };

    return { success: true, data: rows[0] };
  } catch (error) {
    console.error("🔴 getStudentMembershipProfile Critical Error:", error);
    return { success: false, data: null };
  }
}