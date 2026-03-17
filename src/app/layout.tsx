import type { Metadata, Viewport } from "next"; // أضفنا Viewport
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NeuralBackground from "@/components/ui/NeuralBackground";
import Footer from "@/components/layout/Footer";
import NextTopLoader from 'nextjs-toploader';

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap", // تضمن ظهور الخط فور تحميله
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// إعدادات الـ Viewport لضمان تجاوب الموبايل 100%
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000B21", // لون خلفية الأكاديمية
};

export const metadata: Metadata = {
  title: {
    default: "British Academy | Elite Security Training",
    template: "%s | British Academy"
  },
  description: "Pioneering international excellence in security training and strategic safety methodologies.",
  icons: {
    icon: "/favicon.ico", // تأكد من وجود الفايف أيكون في public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth select-none">
      <body 
        suppressHydrationWarning={true}
        className={`${syne.variable} ${inter.variable} antialiased bg-background text-foreground relative font-sans`}
      >
        {/* الـ Loader الذهبي - لمسة الـ Premium */}
        <NextTopLoader 
          color="#D4AF37" 
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 15px #D4AF37, 0 0 5px #D4AF37"
        />

        {/* الخلفية العصبية - البطل الخفي */}
        <div className="fixed inset-0 z-0">
          <NeuralBackground />
        </div>
        
        <Navbar />
        
        {/* المحتوى الرئيسي مع Padding علوي متوازن */}
        <main className="relative z-10 pt-20 md:pt-32 min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}