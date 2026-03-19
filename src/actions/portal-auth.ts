"use server"

import { z } from 'zod';
import { sql } from "@/lib/db";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { Resend } from 'resend';

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

    await sql`UPDATE students SET last_access = NOW() WHERE id = ${student.id}`;

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
    return { error: "TERMINAL OFFLINE: DATABASE CONNECTION FAILED" };
  }

  if (loginSuccessful) redirect('/dashboard');
}

/**
 * تحديث إعدادات الملف الشخصي
 */
export async function updateSettings(prevState: any, formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;

  try {
    if (!studentId) return { error: "CRITICAL: IDENTITY VECTOR MISSING" };

    await sql`UPDATE students SET name = ${name} WHERE id = ${studentId}`;

    if (password && password.trim() !== "") {
      await sql`UPDATE students SET access_code = ${password} WHERE id = ${studentId}`;
    }

    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard');

    return { success: true, message: "IDENTITY SYNCED SUCCESSFULLY" };
  } catch (error) {
    console.error("🔴 Settings Update Error:", error);
    return { error: "TERMINAL ERROR: PROTOCOL SYNC FAILED" };
  }
}

/**
 * استعادة بيانات الدخول
 */
export async function requestPasswordReset(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    // 🔍 1. استرجاع البيانات (تأكد من دعم الهيكلتين rows أو مصفوفة مباشرة)
    const result = await sql`
      SELECT name, student_id, access_code 
      FROM students 
      WHERE email = ${email} 
      LIMIT 1
    `;
    
    const user = result[0] || (result as any).rows?.[0];

    if (!user) {
      return { error: "ACCESS DENIED: Identity not found in archives." };
    }

    // 📧 2. إرسال الإيميل (مع معالجة أخطاء Resend بهدوء)
    const { data, error } = await resend.emails.send({
      from: 'Academy Terminal <info@britishacademy-ss.com>',
      to: [email], // ⚠️ ملاحظة: Resend المجاني يرسل فقط لإيميلك المسجل لديهم
      subject: '🔒 Identity Recovery Protocol',
      html: `
        <div style="background-color: #020617; color: white; padding: 40px; border: 2px solid #d4af37; border-radius: 15px; font-family: monospace;">
          <h2 style="color: #d4af37;">IDENTITY RETRIEVED</h2>
          <p>Agent: <strong>${user.name}</strong></p>
          <p>SYSTEM ID: <strong>${user.student_id}</strong></p>
          <p>ACCESS CIPHER: <strong>${user.access_code}</strong></p>
        </div>
      `,
    });

    // 🛡️ إذا فشل الإرسال (بسبب Sandbox أو غيره) لا نريد تعطيل النظام بالكامل
    if (error) {
      console.error("Resend Technical Error:", error.message);
      return { 
        error: `UPLINK BLOCKED: ${error.message}. (Note: Resend Free only allows sending to your own registered email).` 
      };
    }

    return { success: true, email: email };

  } catch (e) {
    console.error("Critical System Crash:", e);
    return { error: "TERMINAL OFFLINE: Internal Database Sync Failed." };
  }
}
/**
 * تسجيل طالب جديد - (تم إصلاح خطأ الـ rows[0])
 */
export async function registerStudent(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const student_id = formData.get('student_id') as string;
  const callbackUrl = (formData.get('callbackUrl') as string) || '/dashboard';

  try {
    if (!name || !email || !student_id || !password) {
       return { error: "CRITICAL: INCOMPLETE DATA VECTOR" };
    }

    // 🛡️ فحص إذا كان الإيميل أو الـ ID موجود مسبقاً لمنع خطأ الـ Unique
    const existing = await sql`SELECT id FROM students WHERE email = ${email} OR student_id = ${student_id} LIMIT 1`;
    if (existing && existing.length > 0) {
      return { error: "IDENTITY VECTOR OR EMAIL ALREADY ASSIGNED" };
    }

    // التنفيذ مع جلب الـ ID المولد (UUID)
    const result = await sql`
      INSERT INTO students (name, email, student_id, access_code, rank, progress) 
      VALUES (${name}, ${email}, ${student_id}, ${password}, 'AGENT', 0)
      RETURNING id
    `;

    // 🛰️ إصلاح الخطأ: في بعض إصدارات المكتبة النتيجة تكون المصفوفة مباشرة
    const newId = result[0]?.id || result.rows?.[0]?.id;

    if (!newId) throw new Error("ID_GENERATION_FAILED");

    const cookieStore = await cookies();
    cookieStore.set('user_id', newId.toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    cookieStore.set('auth_token', newId.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
    });

  } catch (error: any) {
    if (error.message?.includes('NEXT_REDIRECT')) throw error;
    console.error("🔴 Registration Error Detail:", error);
    return { error: "TERMINAL ERROR: DATABASE SYNC FAILED" };
  }

  revalidatePath('/');
  redirect(callbackUrl);
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