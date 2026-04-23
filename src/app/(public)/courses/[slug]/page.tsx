// أضف هذا الاستيراد في الأعلى
import { getCourseBySlug } from "@/actions/academy-actions";
import CourseHero from "@/components/course/CourseHero";
import CourseSidebar from "@/components/course/CourseSidebar";
import CourseTabs from "@/components/course/CourseTabs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function CourseDetailsPage({ params }: { params: any }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) notFound();

  // 🛰️ الحصول على المعرف من الكوكيز
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  // 🛡️ معالجة المحتوى بشكل آمن لتجنب خطأ JSON.parse
let fullContent;
  const rawContent = course.full_content;

  if (typeof rawContent === 'string') {
    // تشيك ذكي: هل النص يبدو كـ JSON؟
    const isJson = rawContent.trim().startsWith('{') || rawContent.trim().startsWith('[');
    
    if (isJson) {
      try {
        fullContent = JSON.parse(rawContent);
      } catch (e) {
        console.error("Failed to parse JSON content, falling back to raw text.");
        fullContent = rawContent;
      }
    } else {
      // لو نص عادي زي "test" هينزل هنا فوراً بدون parse
      fullContent = rawContent;
    }
  } else {
    fullContent = rawContent;
  }
  const liveStats = {
    enrolledCount: course.enrollment_count || 0, 
    modulesCount: fullContent?.curriculum?.length || 0,
    liveClasses: 0,
    hasResources: true,
    hasClassRecord: true
  };

  return (
    <main className="min-h-screen">
      {/* 1. الـ Hero - العرض الكامل */}
      <CourseHero course={course} />

      {/* 2. Container المحتوى */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 relative">          
          {/* المحتوى الرئيسي (Tabs) */}
          <div className="flex-1 min-w-0">
            <CourseTabs course={course} fullContent={fullContent} />
          </div>

          <aside className="w-full lg:w-100">
            <div className="lg:sticky lg:top-24">
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