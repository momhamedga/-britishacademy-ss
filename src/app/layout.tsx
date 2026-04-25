import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import AnimatedFavicon from "@/components/ui/AnimatedFavicon";

// 1. تعريف الخطوط بـ Variable لسهولة الاستخدام في Tailwind
const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-syne", 
  weight: ["400", "700", "800"], 
  display: "swap" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter", 
  display: "swap" 
});

// 2. إعدادات الـ Viewport
export const viewport: Viewport = { 
  width: "device-width", 
  initialScale: 1, 
  maximumScale: 1, 
  themeColor: "#000B21" 
};

// 3. الـ Global Metadata
export const metadata: Metadata = {
  title: { 
    default: "British Academy | Elite Security Training", 
    template: "%s | British Academy" 
  },
  description: "Pioneering international excellence in security training.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${inter.variable} antialiased`} suppressHydrationWarning={true}>
        <NextTopLoader color="#D4AF37" showSpinner={false}  />
        
        <AnimatedFavicon />
        
     
        {children}
      </body>
    </html>
  );
}