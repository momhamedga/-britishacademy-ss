"use server"

import { z } from 'zod';
import { sql } from "@/lib/db";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { Resend } from 'resend';

// تهيئة Resend باستخدام الـ API Key من البيئة
const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Schema التحقق من البيانات
const LoginSchema = z.object({
  studentId: z.string().min(5, "IDENTITY VECTOR REQUIRED"),
  accessCode: z.string().min(4, "ACCESS CIPHER INVALID"),
});

/**
 * تسجيل الدخول للنظام
 */
export async function loginToPortal(prevState: any, formData: FormData) {
  const studentId = formData.get('studentId');
  const accessCode = formData.get('accessCode'); 

  const validated = LoginSchema.safeParse({ studentId, accessCode });

  if (!validated.success) {
    return { error: validated.error.errors?.[0]?.message || "Validation failed" };
  }

  let loginSuccessful = false;

  try {
    // جلب بيانات الطالب (التحقق من access_code)
    const students = await sql`
      SELECT id, student_id, access_code, name, rank 
      FROM students 
      WHERE student_id = ${validated.data.studentId}
      LIMIT 1
    `;

    const student = students[0];

    if (!student || student.access_code !== validated.data.accessCode) {
      return { error: "ACCESS DENIED: IDENTITY NOT RECOGNIZED" };
    }

    // تحديث الطابع الزمني لآخر وصول
    await sql`UPDATE students SET last_access = NOW() WHERE id = ${student.id}`;

    // إدارة الجلسة (Cookies)
    const cookieStore = await cookies();
    cookieStore.set('auth_token', student.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, 
      path: '/',
    });

    cookieStore.set('user_id', student.id, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    loginSuccessful = true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
    console.error("Auth Error:", error);
    return { error: "TERMINAL OFFLINE: DATABASE CONNECTION FAILED" };
  }

  if (loginSuccessful) redirect('/dashboard');
}

/**
 * تحديث إعدادات الملف الشخصي
 */
export async function updateSettings(prevState: any, formData: FormData) {
  const studentId = formData.get("studentId") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string; // نستخدم التسمية القادمة من الفورم

  try {
    await sql`
      UPDATE students 
      SET name = ${name}
      ${password ? sql`, access_code = ${password}` : sql``} 
      WHERE id = ${studentId}
    `;

    revalidatePath("/dashboard", "layout");
    revalidatePath("/dashboard/settings");

    return { success: true, message: "IDENTITY SYNCED" };
  } catch (e) {
    console.error("DB Error:", e);
    return { error: true, message: "DATABASE UPLINK ERROR" };
  }
}

/**
 * استعادة بيانات الدخول (Identity Recovery)
 */
export async function requestPasswordReset(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    // جلب البيانات من Neon (التعامل مع المصفوفة مباشرة)
    const students = await sql`
      SELECT name, student_id, access_code, rank 
      FROM students 
      WHERE email = ${email} 
      LIMIT 1
    `;

    if (!students || students.length === 0) {
      return { error: "ACCESS DENIED: Identity not found in Academy archives." };
    }

    const user = students[0];

    // إرسال الإيميل Cinematic عبر Resend
    const { error } = await resend.emails.send({
      from: 'Academy Terminal <onboarding@resend.dev>',
      to: [email], 
      subject: '🔒 Identity Recovery Protocol',
      html: `
        <div style="background-color: #020617; color: #ffffff; padding: 40px; font-family: 'Courier New', Courier, monospace; border: 2px solid #d4af37; border-radius: 15px; max-width: 500px; margin: auto;">
          <h2 style="color: #d4af37; text-transform: uppercase; letter-spacing: 3px; text-align: center;">Identity Retrieved</h2>
          <p style="border-bottom: 1px solid #1e293b; padding-bottom: 10px; text-align: center;">Welcome back, Agent <strong>${user.name}</strong>.</p>
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid rgba(212,175,55,0.2);">
            <p style="margin: 10px 0;"><strong>SYSTEM ID:</strong> <span style="color: #d4af37;">${user.student_id}</span></p>
            <p style="margin: 10px 0;"><strong>ACCESS CIPHER:</strong> <span style="color: #d4af37;">${user.access_code}</span></p>
          </div>
          <p style="font-size: 10px; color: #64748b; margin-top: 30px; text-align: center;">TERMINAL: BA-REC-2026 // AD-NODE-01</p>
        </div>
      `,
    });

    if (error) throw new Error(error.message);

    return { success: true, email: email };

  } catch (e) {
    console.error("Recovery Crash:", e);
    return { error: "UPLINK FAILURE: Could not dispatch recovery packet." };
  }
}

/**
 * تسجيل طالب جديد
 */
export async function registerStudent(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const studentId = formData.get('studentId') as string;
  const accessCipher = formData.get('password') as string;

  let success = false;

  try {
    const existing = await sql`
      SELECT id FROM students WHERE student_id = ${studentId} OR email = ${email} LIMIT 1
    `;

    if (existing.length > 0) {
      return { error: "IDENTITY VECTOR OR EMAIL ALREADY ASSIGNED" };
    }

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

  if (success) redirect('/dashboard');
}

/**
 * تسجيل الخروج
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_id");
  redirect("/login");
}

/**
 * الاشتراك في كورس جديد
 */
export async function enrollInCourse(courseId: string, studentId: string) {
  try {
    const existing = await sql`
      SELECT id FROM student_courses 
      WHERE student_id = ${studentId} AND course_id = ${courseId}
    `;

    if (existing.length > 0) {
      return { error: "ALREADY ENROLLED IN THIS VECTOR" };
    }

    await sql`
      INSERT INTO student_courses (student_id, course_id, enrolled_at)
      VALUES (${studentId}, ${courseId}, NOW())
    `;

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error("Enrollment Error:", error);
    return { error: "TERMINAL ERROR: ENROLLMENT FAILED" };
  }
}