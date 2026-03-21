import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NeuralBackground from "@/components/ui/NeuralBackground";
import Footer from "@/components/layout/Footer";
import NextTopLoader from 'nextjs-toploader';
import { sql } from "@/lib/db";
import { cookies } from 'next/headers'; // استيراد الكوكيز لقراءة الجلسة
import AnimatedFavicon from "@/components/ui/AnimatedFavicon";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000B21",
};

export const metadata: Metadata = {
  title: {
    default: "British Academy | Elite Security Training",
    template: "%s | British Academy"
  },
  description: "Pioneering international excellence in security training and strategic safety methodologies.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 1. استخراج الـ ID من الكوكيز (النظام الديناميكي)
  const cookieStore = await cookies();
  const userId = cookieStore.get('auth_token')?.value;

  let student = null;

  // 2. جلب البيانات فقط إذا كان هناك مستخدم مسجل
  if (userId) {
    try {
      const data = await sql`
        SELECT name, rank 
        FROM students 
        WHERE id = ${userId} 
        LIMIT 1
      `;
      student = data[0];
    } catch (error) {
      console.error("Database Connection Error:", error);
    }
  }

  return (
    <html lang="en" dir="ltr" className="scroll-smooth select-none">
      <body 
        suppressHydrationWarning={true}
        className={`${syne.variable} ${inter.variable} antialiased bg-background text-foreground relative font-sans`}
      >
        <NextTopLoader 
          color="#D4AF37" 
          initialPosition={0.08}
          height={3}
          showSpinner={false}
          shadow="0 0 15px #D4AF37"
        />

        {/* الخلفية النيورونية - تظهر في كل الموقع */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <NeuralBackground />
        </div>
        
        {/* Navbar الديناميكي: لو مسجل يظهر اسمه، لو مش مسجل يظهر كـ Guest */}
        <Navbar user={student ? { name: student.name, rank: student.rank } : undefined} />
        
        <main className="relative z-10 pt-20 md:pt-32 min-h-screen">
          <AnimatedFavicon />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}