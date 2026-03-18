"use server"
import { z } from 'zod';
import { sql } from "@/lib/db";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// 1. Schema تسجيل الدخول
const LoginSchema = z.object({
  studentId: z.string().min(5, "IDENTITY VECTOR REQUIRED"),
  password: z.string().min(4, "ACCESS CIPHER INVALID"),
});

/**
 * دالة تسجيل الدخول
 */
export async function loginToPortal(prevState: any, formData: FormData) {
  const studentId = formData.get('studentId');
  const accessCode = formData.get('accessCode'); 

  const validated = LoginSchema.safeParse({
    studentId: studentId,
    password: accessCode, 
  });

  if (!validated.success) {
    return { error: validated.error.errors?.[0]?.message || "Validation failed" };
  }

  // 1. عزل المتغير خارج الـ try لتجنب الـ scope issues
  let loginSuccessful = false;

  try {
    const students = await sql`
      SELECT id, student_id, password, name, rank 
      FROM students 
      WHERE student_id = ${validated.data.studentId}
      LIMIT 1
    `;

    const student = students[0];

    if (!student || student.password !== validated.data.password) {
      return { error: "ACCESS DENIED: IDENTITY NOT RECOGNIZED" };
    }

    await sql`
      UPDATE students SET last_access = NOW() WHERE id = ${student.id}
    `;

    const cookieStore = await cookies();
    cookieStore.set('auth_token', student.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    loginSuccessful = true; // علامة النجاح

  } catch (error) {
    console.error("Auth Error:", error);
    return { error: "TERMINAL OFFLINE: DATABASE CONNECTION FAILED" };
  }

  // 2. الـ Redirect لازم يكون بره الـ try/catch تماماً في Next.js 15
  if (loginSuccessful) {
    redirect('/dashboard');
  }
}
/**
 * 2. دالة تحديث الإعدادات (اللي كنت بتسأل عليها)
 * دي المسؤولة عن تغيير اسم "Mohamed Gamal" والباسورد في Neon DB
 */
export async function updateSettings(formData: FormData) {
  // UUID الثابت بتاعك من قاعدة البيانات
  const STUDENT_UUID = '4af3f081-0b21-44a5-a358-81904ce5854e';
  
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;

  try {
    // التحديث في Neon DB
    // لو الباسورد فاضي مش هنحدثه، لو فيه قيمة هنحدثها
    if (password && password.length > 0) {
      await sql`
        UPDATE students 
        SET name = ${name}, password = ${password} 
        WHERE id = ${STUDENT_UUID}
      `;
    } else {
      await sql`
        UPDATE students 
        SET name = ${name} 
        WHERE id = ${STUDENT_UUID}
      `;
    }

    // تحديث الكاش عشان البيانات الجديدة تظهر فوراً في الـ UI
    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard');
    
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false };
  }
}
export async function enrollInCourse(courseId: string, studentId: string) {
  try {
    // التأكد أولاً إذا كان الكورس مضاف مسبقاً لمنع التكرار
    const existing = await sql`
      SELECT id FROM student_courses 
      WHERE student_id = ${studentId} AND course_id = ${courseId}
    `;

    if (existing.length > 0) {
      return { error: "ALREADY ENROLLED IN THIS VECTOR" };
    }

    // إضافة الكورس في جدول الربط (Junction Table)
    await sql`
      INSERT INTO student_courses (student_id, course_id, enrolled_at)
      VALUES (${studentId}, ${courseId}, NOW())
    `;

    // تحديث الكاش عشان الكورس يظهر في الـ Dashboard فوراً
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/my-courses');

    return { success: true };
  } catch (error) {
    console.error("Enrollment Error:", error);
    return { error: "TERMINAL ERROR: ENROLLMENT FAILED" };
  }
}
export async function logout() {
  // 1. مسح التوكن أو الكوكيز الخاصة بالجلسة
  const cookieStore = await cookies();
  cookieStore.delete("auth_token"); // استبدل الاسم بما تستخدمه في مشروعك
  
  // 2. توجيه المستخدم لصفحة الـ Login
  redirect("/login");
}

