import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. استخراج التوكن من الكوكيز
  const token = request.cookies.get('auth_token')?.value;

  // 2. تحديد المسارات المحمية (التي تتطلب تسجيل دخول)
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  const isCoursesPage = request.nextUrl.pathname.startsWith('/courses');

  // 3. لو اليوزر بيحاول يدخل صفحة محمية وهو مش مسجل
  if ((isDashboardPage || isCoursesPage) && !token) {
    // توجيهه لصفحة الـ login مع حفظ الصفحة اللي كان عايز يروحها (اختياري)
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. لو اليوزر مسجل وبيحاول يروح لصفحة الـ login، وديه الـ dashboard
 if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && token) {
  return NextResponse.redirect(new URL('/dashboard', request.url));
}

  return NextResponse.next();
}

// وتحديث الـ config matcher ليشمل التسجيل
export const config = {
  matcher: ['/dashboard/:path*', '/courses/:path*', '/login', '/register'],
};