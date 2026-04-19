// D:\Next-Tailwind\british-academy\src\proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. تجهيز الهيدرز (يجب حقنها في الـ next() والـ redirect() لضمان الثبات)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const token = request.cookies.get('auth_token')?.value;
  const adminToken = request.cookies.get('admin_session')?.value;

  const isDashboardPage = pathname.startsWith('/dashboard');
  const isUserLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminLoginPage = pathname === '/admin/login';

  // --- حماية Dashboard المستخدم ---
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url), {
      headers: requestHeaders // 🚨 حقن الهيدر حتى في الريدايركت
    });
  }
  if (isUserLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url), {
      headers: requestHeaders
    });
  }

  // --- حماية Admin Panel ---
  if (isAdminPage && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url), {
      headers: requestHeaders
    });
  }
  if (isAdminLoginPage && adminToken) {
    return NextResponse.redirect(new URL('/admin/courses', request.url), {
      headers: requestHeaders
    });
  }

  // 2. تمرير الطلب العادي بالهيدرز المحقونة
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /* نركز الماتشر فقط على الصفحات الفعلية ونبعد عن أي ملفات ميديا أو api */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};