import { Suspense } from "react";
import { getLatestCourses } from "@/actions/academy-actions";
import HeroSection from "@/components/home/HeroSection";
import HomeCoursesPreview from "@/components/home/CoursePreview";
import AcademyHub from "@/components/home/AcademyHub";

import ClientReviews from "@/components/home/ClientReviews";
import StrategicAdvantages from "@/components/home/StrategicAdvantages";


export const metadata = {
  title: "British Academy | Elite Security Training",
  description: "Ultra-modern security training solutions in the UAE.",
};

export default async function HomePage() {
  // 1. تشغيل جلب البيانات كـ Promise (بدون await هنا) لتبدأ العملية فوراً
  const coursesPromise = getLatestCourses();

  return (
    <main className="relative min-h-screen ">
      {/* سكشن الـ Hero يظهر فوراً لأنه ثابت */}
      <HeroSection />

      {/* تصحيح: إضافة الفتحة والقفلة لـ Suspense بشكل سليم */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-white/5 " />}>
        <AcademyHub />

      </Suspense>

      {/* سكشن الكورسات يعتمد على البيانات القادمة من Neon DB */}
      <Suspense fallback={<CoursesSkeleton />}>
        <CoursesWrapper coursesPromise={coursesPromise} />
      </Suspense>

      {/* تجميع السكاشن المتبقية في Suspense واحد لتقليل الـ Layout Shift */}
      <Suspense fallback={<div className="h-screen animate-pulse bg-white/5" />}>
   
         
    

           <ClientReviews />
      </Suspense>

      <div className="h-24" />
    </main>
  );
}

// 2. استخدام الـ Wrapper مع await لضمان الـ Streaming
async function CoursesWrapper({ coursesPromise }: { coursesPromise: Promise<any> }) {
  const initialCourses = await coursesPromise;
  return <HomeCoursesPreview initialCourses={initialCourses} />;
}

function CoursesSkeleton() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="h-12 w-48 bg-white/5 animate-pulse rounded-lg mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[400px] bg-white/10 animate-pulse rounded-[2.5rem]" />
        ))}
      </div>
    </div>
  );
}