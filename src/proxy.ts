// D:\Next-Tailwind\british-academy\src\proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. حقن المسار في الهيدرز (للسكايدبار)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // 2. التوكنات
  const token = request.cookies.get('auth_token')?.value;
  const adminToken = request.cookies.get('admin_session')?.value;

  // 3. المسارات
  const isDashboardPage = pathname.startsWith('/dashboard');
  const isUserLoginPage = pathname === '/login';
  
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminLoginPage = pathname === '/admin/login';

  // --- حماية Dashboard المستخدم ---
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isUserLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // --- حماية Admin Panel (الشغل الجديد) ---
  if (isAdminPage && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (isAdminLoginPage && adminToken) {
    return NextResponse.redirect(new URL('/admin/courses', request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// الماتشر هو اللي بيعرف الـ Proxy يشتغل فين بالضبط
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/login', 
    '/register', 
    '/admin/:path*'
  ],
};