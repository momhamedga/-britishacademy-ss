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

  const fullContent = typeof course.full_content === 'string' 
    ? JSON.parse(course.full_content) 
    : course.full_content;

  const liveStats = {
    // استخدمنا التسمية الصحيحة الموجودة في الأكشن الخاص بك
    enrolledCount: course.enrollment_count || 0, 
    modulesCount: fullContent?.curriculum?.length || 0,
    liveClasses: 0,
    hasResources: true,
    hasClassRecord: true
  };

return (
    <main className="min-h-scree">
      {/* 1. الـ Hero هنا هيكون حر، هياخد العرض كامل طبيعي بدون hacks */}
      <CourseHero course={course} />

      {/* 2. باقي المحتوى هو اللي يتحط جوه الـ Container */}
    <div className="max-w-7xl mx-auto px-4 py-12">
<div className="flex flex-col lg:flex-row gap-8 relative">          
        <div className="flex-1 min-w-0">
          <CourseTabs course={course} fullContent={fullContent} />
          </div>

  <aside className="w-full lg:w-[400px]">
        {/* الـ Sidebar هنا لازم يكون relative أو sticky فقط، ممنوع absolute */}
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