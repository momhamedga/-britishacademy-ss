import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. حقن المسار الحالي في الهيدرز عشان الـ Layout يشوفه (حل مشكلة السايدبار)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // 2. تحديد المسارات
  const isDashboardPage = pathname.startsWith('/dashboard');
  const isLoginPage = pathname === '/dashboard/login' || pathname === '/login';

  // 3. لو مش مسجل وبيحاول يدخل Dashboard
  if (isDashboardPage && !isLoginPage && !token) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  // 4. لو مسجل وبيحاول يروح للـ login
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // نمرر الهيدرز الجديدة للـ Response
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/dashboard/:path*', '/courses/:path*', '/login', '/register'],
};