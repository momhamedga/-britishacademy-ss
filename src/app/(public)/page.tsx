import { Suspense } from "react";
import { getLatestCourses } from "@/actions/academy-actions";
import HeroSection from "@/components/home/HeroSection";
import HomeCoursesPreview from "@/components/home/CoursePreview";
import AcademyHub from "@/components/home/AcademyHub";
import ClientReviews from "@/components/home/ClientReviews";

export const metadata = {
  title: "British Academy | Elite Security Training",
  description: "Ultra-modern security training solutions in the UAE.",
};

// ⚡ تحسين: جعل الـ Skeleton مطابق تماماً لأبعاد الكروت الحقيقية
function CoursesSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-40">
      <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-full mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-[4/5] bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100" />
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  // 1. بدء جلب البيانات فوراً (Parallel Data Fetching)
  const coursesPromise = getLatestCourses();

  return (
    <main className="relative min-h-screen bg-white">
      {/* الـ Hero يظهر فوراً بدون Suspense لأنه Critical Content */}
      <HeroSection />

      {/* AcademyHub سكشن خفيف، يفضل أن يظهر بسرعة */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-50/50" />}>
        <AcademyHub />
      </Suspense>

      {/* 2. سكشن الكورسات: هو اللي بياخد وقت Neon DB */}
      <Suspense fallback={<CoursesSkeleton />}>
        <CoursesWrapper coursesPromise={coursesPromise} />
      </Suspense>

      {/* 3. المراجعات: لا نريدها أن تعطل ظهور الكورسات، لذا نفصلها في Suspense مستقل */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-50/50" />}>
        <ClientReviews />
      </Suspense>

      <div className="h-24" />
    </main>
  );
}

// الـ Wrapper لمعالجة البيانات على السيرفر قبل إرسالها للـ Client
async function CoursesWrapper({ coursesPromise }: { coursesPromise: Promise<any[]> }) {
  const allCourses = await coursesPromise;
  
  // ✅ قص البيانات لـ 3 فقط لضمان عدم ظهور كورسات زيادة عند الـ Hydration
  const previewCourses = allCourses?.slice(0, 3) || [];
  
  return <HomeCoursesPreview initialCourses={previewCourses} />;
}