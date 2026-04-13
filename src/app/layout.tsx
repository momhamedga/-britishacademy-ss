import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NextTopLoader from 'nextjs-toploader';
import { sql } from "@/lib/db";
import { cookies } from 'next/headers';
import AnimatedFavicon from "@/components/ui/AnimatedFavicon";
import { Suspense } from "react";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "700", "800"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, themeColor: "#000B21" };

export const metadata: Metadata = {
  title: { default: "British Academy | Elite Security Training", template: "%s | British Academy" },
  description: "Pioneering international excellence in security training.",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('auth_token')?.value;

  return (
    <html lang="en" dir="ltr" className="scroll-smooth select-none">
      <body className={`${syne.variable} ${inter.variable} antialiased bg-background text-foreground relative font-sans overflow-x-hidden`}>
        <NextTopLoader color="#D4AF37" showSpinner={false} />

        {/* تم إصلاح الـ Fallback لتمرير isGuest={true} */}
        <Suspense fallback={<Navbar isGuest={true} />}>
          <NavbarWrapper userId={userId} />
        </Suspense>
        
        {/* المحتوى يبدأ بدون Padding إضافي للسماح للـ Navbar بالالتصاق */}
        <main className="relative z-10 min-h-screen">
          <AnimatedFavicon />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

async function NavbarWrapper({ userId }: { userId?: string }) {
  // حالة الضيف: لا يوجد Token
  if (!userId) return <Navbar isGuest={true} />;

  try {
    const [student] = await sql`SELECT name, rank FROM students WHERE id = ${userId} LIMIT 1`;
    
    // لو الـ Token موجود بس الطالب مش في الـ DB
    if (!student) return <Navbar isGuest={true} />;

    // حالة المستخدم المسجل
    return <Navbar user={{ name: student.name, rank: student.rank }} isGuest={false} />;
  } catch (error) {
    // في حالة خطأ الـ Database ارجع لحالة الضيف
    return <Navbar isGuest={true} />;
  }
}