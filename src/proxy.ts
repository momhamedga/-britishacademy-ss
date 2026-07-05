// D:\Next-Tailwind\british-academy\src\proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyStudentSessionToken, verifyAdminSessionToken } from '@/lib/session-core';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const rawToken = request.cookies.get('auth_token')?.value;
  const rawAdminToken = request.cookies.get('admin_session')?.value;

  // تحقق فعلي من توقيع الجلسة، مش مجرد وجود الكوكيز
  const [studentId, isAdmin] = await Promise.all([
    verifyStudentSessionToken(rawToken),
    verifyAdminSessionToken(rawAdminToken),
  ]);

  const isDashboardPage = pathname.startsWith('/dashboard');
  const isUserLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminLoginPage = pathname === '/admin/login';

  // --- حماية Dashboard المستخدم ---
  if (isDashboardPage && !studentId) {
    return NextResponse.redirect(new URL('/login', request.url), {
      headers: requestHeaders
    });
  }
  if (isUserLoginPage && studentId) {
    return NextResponse.redirect(new URL('/dashboard', request.url), {
      headers: requestHeaders
    });
  }

  // --- حماية Admin Panel ---
  if (isAdminPage && !isAdmin) {
    return NextResponse.redirect(new URL('/admin/login', request.url), {
      headers: requestHeaders
    });
  }
  if (isAdminLoginPage && isAdmin) {
    return NextResponse.redirect(new URL('/admin/courses', request.url), {
      headers: requestHeaders
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// 🛰️ الماتشر الرسمي والمستقر لـ Next.js اللي مستحيل يكسر الـ Routes الفرعية
export const config = {
  matcher: [
    /*
     * يطابق جميع مسارات الطلبات باستثناء المسارات التي تبدأ بـ:
     * - api (مسارات واجهة برمجة التطبيقات)
     * - _next/static (الملفات الثابتة)
     * - _next/image (خدمات تحسين الصور)
     * - favicon.ico (أيقونة الموقع)
     * - وباقي الملفات الامتدادية مثل .png, .jpg, .svg
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|css|js|woff|woff2|ttf|eot)).*)',
  ],
};