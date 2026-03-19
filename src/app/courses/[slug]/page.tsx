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
    // أضفنا خلفية سوداء عميقة لتناسب صور "Access Denied" التي أرفقتها
    <main className="min-h-screen pt-32 md:pt-44 pb-20 px-4 md:px-6  text-white relative overflow-hidden">
      
      {/* 🌌 تحسين الإضاءة التكتيكية */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <CourseHero course={course} />

        <div className="grid lg:grid-cols-12 gap-12 mt-16">
          <div className="lg:col-span-8">
            <CourseTabs course={course} fullContent={fullContent} />
          </div>

          <div className="lg:col-span-4">
            <CourseSidebar 
              course={course} 
              fullContent={fullContent} 
              stats={liveStats}
              userId={userId} // ⬅️ تمرير المعرف هنا ضروري جداً
            />
          </div>
        </div>
      </div>
    </main>
  );
}