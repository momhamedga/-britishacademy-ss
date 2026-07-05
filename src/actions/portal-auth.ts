"use server"

import { z } from 'zod';
import { sql } from "@/lib/db";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { randomBytes, timingSafeEqual } from 'crypto';
import {
  AUTH_COOKIE,
  ADMIN_COOKIE,
  STUDENT_SESSION_MAX_AGE,
  ADMIN_SESSION_MAX_AGE,
  createStudentSessionToken,
  createAdminSessionToken,
  getCurrentStudentId,
} from '@/lib/session';
import { hashPassword, verifyPassword, isLegacyPlaintext } from '@/lib/password';

const resend = new Resend(process.env.RESEND_API_KEY);

function isSafeRelativePath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//') && !path.includes('://');
}

function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 1. Schema التحقق من البيانات
const LoginSchema = z.object({
  studentId: z.string().min(5, "IDENTITY VECTOR REQUIRED"),
  accessCode: z.string().min(4, "ACCESS CIPHER INVALID"),
});

/**
 * تسجيل الدخول للنظام
 */
export async function loginToPortal(prevState: unknown, formData: FormData) {
  const studentId = formData.get('studentId');
  const accessCode = formData.get('accessCode'); 
  const validated = LoginSchema.safeParse({ studentId, accessCode });

  if (!validated.success) {
    return { error: validated.error.issues?.[0]?.message || "Validation failed" };
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

    if (!student || !verifyPassword(validated.data.accessCode, student.access_code)) {
      return { error: "ACCESS DENIED: IDENTITY NOT RECOGNIZED" };
    }

    // ترقية كلمات السر القديمة المخزنة نصياً إلى هاش عند أول تسجيل دخول ناجح
    if (isLegacyPlaintext(student.access_code)) {
      await sql`UPDATE students SET access_code = ${hashPassword(validated.data.accessCode)} WHERE id = ${student.id}`;
    }

    await sql`UPDATE students SET last_access = NOW() WHERE id = ${student.id}`;

    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE, await createStudentSessionToken(student.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: STUDENT_SESSION_MAX_AGE,
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
export async function updateSettings(prevState: unknown, formData: FormData) {
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;

  try {
    // 🛡️ الهوية تُشتق من الجلسة الموقّعة فقط، مش من حقل الفورم (كان بيسمح لأي حد يعدل حساب غيره)
    const studentId = await getCurrentStudentId();
    if (!studentId) return { error: "UNAUTHORIZED: SESSION EXPIRED OR INVALID" };

    await sql`UPDATE students SET name = ${name} WHERE id = ${studentId}`;

    if (password && password.trim() !== "") {
      await sql`UPDATE students SET access_code = ${hashPassword(password)} WHERE id = ${studentId}`;
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
export async function requestPasswordReset(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    const result = await sql`
      SELECT id, name, student_id
      FROM students
      WHERE email = ${email}
      LIMIT 1
    `;

    const user = result[0];

    if (!user) {
      return { error: "ACCESS DENIED: Identity not found in archives." };
    }

    // 🛡️ ما بنقدرش نسترجع الكلمة القديمة لأنها متخزنة كـ hash — بنولّد كود مؤقت جديد بدلها
    const temporaryAccessCode = randomBytes(4).toString('hex').toUpperCase();
    await sql`UPDATE students SET access_code = ${hashPassword(temporaryAccessCode)} WHERE id = ${user.id}`;

    const safeName = escapeHtml(user.name);
    const safeStudentId = escapeHtml(user.student_id);

    // 📧 2. إرسال الإيميل (مع معالجة أخطاء Resend بهدوء)
    const { error } = await resend.emails.send({
      from: 'Academy Terminal <info@britishacademy-ss.com>',
      to: [email], // ⚠️ ملاحظة: Resend المجاني يرسل فقط لإيميلك المسجل لديهم
      subject: '🔒 Identity Recovery Protocol',
      html: `
        <div style="background-color: #020617; color: white; padding: 40px; border: 2px solid #d4af37; border-radius: 15px; font-family: monospace;">
          <h2 style="color: #d4af37;">IDENTITY RETRIEVED</h2>
          <p>Agent: <strong>${safeName}</strong></p>
          <p>SYSTEM ID: <strong>${safeStudentId}</strong></p>
          <p>TEMPORARY ACCESS CIPHER: <strong>${temporaryAccessCode}</strong></p>
          <p style="color:#94a3b8;font-size:12px;">Sign in with this temporary code, then set a new one from your dashboard settings.</p>
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
export async function registerStudent(prevState: unknown, formData: FormData) {
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
      VALUES (${name}, ${email}, ${student_id}, ${hashPassword(password)}, 'AGENT', 0)
      RETURNING id
    `;

    const newId = result[0]?.id;

    if (!newId) throw new Error("ID_GENERATION_FAILED");

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, await createStudentSessionToken(newId.toString()), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: STUDENT_SESSION_MAX_AGE,
      path: '/',
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
    console.error("🔴 Registration Error Detail:", error);
    return { error: "TERMINAL ERROR: DATABASE SYNC FAILED" };
  }

  revalidatePath('/');
  // 🛡️ منع Open Redirect: نقبل مسارات داخلية فقط
  redirect(isSafeRelativePath(callbackUrl) ? callbackUrl : '/dashboard');
}

/**
 * تسجيل الخروج
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  cookieStore.delete("user_id"); // تنظيف الكوكي القديمة غير الموقّعة لو لسه موجودة عند مستخدمين قدامى
  redirect("/login");
}

export async function verifyAdminUplink(password: string) {
  // هنا تسحب الباسورد من البيئة بأمان بدون PUBLIC
  const secretKey = process.env.ADMIN_SECRET;

  if (!secretKey) {
    console.error("🔴 CRITICAL: ADMIN_SECRET IS NOT SET IN ENVIRONMENT VARIABLES");
    return { success: false, error: "SYSTEM_MISCONFIGURATION" };
  }

  // مقارنة بزمن ثابت لمنع Timing Attacks على السر
  const provided = Buffer.from(password || "");
  const expected = Buffer.from(secretKey);
  const matches = provided.length === expected.length && timingSafeEqual(provided, expected);

  if (matches) {
    const cookieStore = await cookies();
    // كوكي موقّعة بـ HMAC بدل قيمة ثابتة "authorized" ممكن حد يبعتها يدوياً
    cookieStore.set(ADMIN_COOKIE, await createAdminSessionToken(), {
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
      sameSite: "strict",
      secure: true,
      httpOnly: true,
    });
    return { success: true };
  }

  return { success: false, error: "INVALID_ENCRYPTION_KEY" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  // مسح الكوكي الـ httpOnly تماماً من جذورها
  cookieStore.set(ADMIN_COOKIE, "", {
    path: "/",
    maxAge: 0, // تنتهي فوراً
    sameSite: "strict",
    secure: true,
    httpOnly: true,
  });

  return { success: true };
}