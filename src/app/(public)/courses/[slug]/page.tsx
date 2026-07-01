import { getCourseBySlug, checkStudentVectorProgress } from "@/actions/academy-actions";
import CourseHero from "@/components/course/CourseHero";
import CourseSidebar from "@/components/course/CourseSidebar";
import CourseTabs from "@/components/course/CourseTabs";
import StudyDashboardClient from "@/components/StudyDashboardClient";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>; // 🛰️ تكتيك تتبع حالة الضغط
}

export default async function CourseDetailsPage({ params, searchParams }: CoursePageProps) {
  const [{ slug }, { mode }, cookieStore] = await Promise.all([
    params,
    searchParams,
    cookies()
  ]);

  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const userId = cookieStore.get("user_id")?.value;
  
  // 🛰️ فحص حالة اشتراك الطالب والتقدم والدروس من السيرفر فوراً
  const enrollmentStatus = userId ? await checkStudentVectorProgress(course.id) : { isEnrolled: false, progress: 0, lessons: [] };

  // 🛡️ إذا كان الطالب مشترك وضغط على "تابع الدراسة" (سيتغير الرابط لـ ?mode=study)
  if (enrollmentStatus.isEnrolled && mode === "study") {
    return (
      <StudyDashboardClient 
      course={course} 
  lessons={enrollmentStatus.lessons} 
  initialProgress={enrollmentStatus.progress} 
  initialCompletedLessons={enrollmentStatus.completedLessons || []}
      />
    );
  }

  const fullContent = (() => {
    const raw = course.full_content;
    if (typeof raw !== 'string') return raw;
    const trimmedRaw = raw.trim();
    if (trimmedRaw.startsWith('{') || trimmedRaw.startsWith('[')) {
      try { return JSON.parse(trimmedRaw); } catch { return raw; }
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
    <main className="min-h-screen">
      <CourseHero course={course} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10 relative">          
          
          <div className="flex-1 min-w-0 min-h-[600px]">
            <CourseTabs course={course} fullContent={fullContent} />
          </div>

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