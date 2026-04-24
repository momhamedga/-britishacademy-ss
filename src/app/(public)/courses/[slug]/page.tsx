import { getCourseBySlug } from "@/actions/academy-actions";
import CourseHero from "@/components/course/CourseHero";
import CourseSidebar from "@/components/course/CourseSidebar";
import CourseTabs from "@/components/course/CourseTabs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailsPage({ params }: CoursePageProps) {
  const [{ slug }, cookieStore] = await Promise.all([
    params,
    cookies()
  ]);

  // البدء في جلب البيانات فوراً
  const course = await getCourseBySlug(slug);

  if (!course) notFound();

  const userId = cookieStore.get("user_id")?.value;

const fullContent = (() => {
    const raw = course.full_content;

    if (typeof raw !== 'string') return raw;
    
    const trimmedRaw = raw.trim();
    
    if (trimmedRaw.startsWith('{') || trimmedRaw.startsWith('[')) {
      try {
        return JSON.parse(trimmedRaw);
      } catch {
        return raw;
      }
    }
    
    return raw;
  })();

  const liveStats = {
    enrolledCount: course.enrollment_count || 0, 
    modulesCount: fullContent?.curriculum?.length || 0,
    liveClasses: 0,
    hasResources: true,
    hasClassRecord: true
  };

  return (
    <main className="min-h-screen ">
      {/* 1. الـ Hero - SSR Optimized */}
      <CourseHero course={course} />

      {/* 2. Container المحتوى */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10 relative">          
          
          {/* المحتوى الرئيسي - تم إضافة min-h لثبات الـ Layout */}
          <div className="flex-1 min-w-0 min-h-[600px]">
            <CourseTabs course={course} fullContent={fullContent} />
          </div>

          {/* Sidebar - Sticky Optimized */}
          <aside className="w-full lg:w-[400px]">
            <div className="lg:sticky lg:top-28 transition-all duration-500">
              <CourseSidebar 
                course={course} 
                stats={liveStats}
                userId={userId}
              />
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}