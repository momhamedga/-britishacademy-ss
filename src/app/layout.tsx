import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NextTopLoader from 'nextjs-toploader';
import { sql } from "@/lib/db";
import { cookies, headers } from 'next/headers'; // ✅ ضفنا headers
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
  
  // 🛰️ كشف المسار الحالي: هل إحنا جوه الـ Portal؟
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || ""; 
  const isPortal = pathname.includes('/dashboard') || pathname.includes('/portal');

  return (
    <html lang="en" dir="ltr" className="scroll-smooth select-none">
      <body 
        className={`${syne.variable} ${inter.variable} antialiased text-foreground relative overflow-x-hidden min-h-screen`}
        // 🚨 تصحيح الخلفية: لو في الـ Portal نثبت الـ Navy، لو بره نستخدم الـ Default
        style={{ backgroundColor: isPortal ? 'oklch(15% 0.04 260)' : 'var(--background)' }}
      >
        <NextTopLoader color="#D4AF37" showSpinner={false} />

        {/* 🛡️ إخفاء الـ Navbar تماماً لو إحنا جوه الـ Portal عشان ميعملش فراغ أبيض */}
        {!isPortal && (
          <Suspense fallback={<Navbar isGuest={true} />}>
            <NavbarWrapper userId={userId} />
          </Suspense>
        )}
        
        <main className={`relative z-10 min-h-screen ${isPortal ? 'w-full' : ''}`}>
          <AnimatedFavicon />
          {children}
        </main>

        {/* 🛡️ إخفاء الفوتر لو إحنا في الـ Portal */}
        {!isPortal && <Footer />}
      </body>
    </html>
  );
}

// ... NavbarWrapper تظل كما هي ...
async function NavbarWrapper({ userId }: { userId?: string }) {
  if (!userId) return <Navbar isGuest={true} />;
  try {
    const [student] = await sql`SELECT name, rank FROM students WHERE id = ${userId} LIMIT 1`;
    if (!student) return <Navbar isGuest={true} />;
    return <Navbar user={{ name: student.name, rank: student.rank }} isGuest={false} />;
  } catch (error) {
    return <Navbar isGuest={true} />;
  }
}