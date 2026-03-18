"use server"
import { z } from 'zod';
import { sql } from "@/lib/db";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// 1. Schema تسجيل الدخول (التوافق مع أسماء الأعمدة)
const LoginSchema = z.object({
  studentId: z.string().min(5, "IDENTITY VECTOR REQUIRED"),
  accessCode: z.string().min(4, "ACCESS CIPHER INVALID"), // تغيير التسمية لتطابق الـ UI
});

export async function loginToPortal(prevState: any, formData: FormData) {
  // استخراج البيانات من الـ FormData
  const studentId = formData.get('studentId');
  const accessCode = formData.get('accessCode'); 

  const validated = LoginSchema.safeParse({
    studentId,
    accessCode, 
  });

  if (!validated.success) {
    return { error: validated.error.errors?.[0]?.message || "Validation failed" };
  }

  let loginSuccessful = false;

  try {
    // 🔍 التصحيح: استدعاء access_code بدلاً من password بناءً على الـ DB Schema
    const students = await sql`
      SELECT id, student_id, access_code, name, rank 
      FROM students 
      WHERE student_id = ${validated.data.studentId}
      LIMIT 1
    `;

    const student = students[0];

    // التحقق من الهوية وكلمة المرور (access_code)
    if (!student || student.access_code !== validated.data.accessCode) {
      return { error: "ACCESS DENIED: IDENTITY NOT RECOGNIZED" };
    }

    // تحديث آخر ظهور
    await sql`
      UPDATE students SET last_access = NOW() WHERE id = ${student.id}
    `;

    // إنشاء الجلسة
    const cookieStore = await cookies();
    cookieStore.set('auth_token', student.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // يوم واحد
      path: '/',
    });

    loginSuccessful = true;

  } catch (error) {
    console.error("Auth Error:", error);
    // إذا كان الخطأ بسبب الـ Redirect (وهو سلوك طبيعي في Next.js) لا تظهر خطأ
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        throw error;
    }
    return { error: "TERMINAL OFFLINE: DATABASE CONNECTION FAILED" };
  }

  // الـ Redirect خارج الـ try/catch
  if (loginSuccessful) {
    redirect('/dashboard');
  }
}
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

export async function registerStudent(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const studentId = formData.get('studentId') as string;
  const accessCipher = formData.get('password') as string; // القيمة من الفورم

  let success = false;

  try {
    // 1. التأكد من عدم التكرار
    const existing = await sql`
      SELECT id FROM students WHERE student_id = ${studentId} OR email = ${email} LIMIT 1
    `;

    if (existing.length > 0) {
      return { error: "IDENTITY VECTOR OR EMAIL ALREADY ASSIGNED" };
    }

    // 2. التصحيح هنا: اسم العمود في Neon هو access_code وليس password
    const result = await sql`
      INSERT INTO students (name, email, student_id, access_code) 
      VALUES (${name}, ${email}, ${studentId}, ${accessCipher})
      RETURNING id
    `;

    const newStudent = result[0];

    const cookieStore = await cookies();
    cookieStore.set('auth_token', newStudent.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    success = true;

  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "TERMINAL ERROR: DATABASE SYNC FAILED" };
  }

  if (success) {
    redirect('/dashboard');
  }
}