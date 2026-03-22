import { getLatestCourses } from "@/actions/academy-actions";
import HeroSection from "@/components/home/HeroSection";
import AcademyAbout from "@/components/home/AcademyAbout";
import HomeCoursesPreview from "@/components/home/CoursePreview";
import AcademyHub from "@/components/home/AcademyHub";
import { FeatureGrid } from "@/components/features/feature-grid";
import SiaRefresher from "@/components/home/SiaRefresher";
import ClientReviews from "@/components/home/ClientReviews";
import StrategicAdvantages from "@/components/home/StrategicAdvantages";

export default async function HomePage() {
  // جلب البيانات من Neon DB
  const initialCourses = await getLatestCourses();

  return (
    <main className="relative min-h-screen">
      {/* 1. السكشن الرئيسي */}
      <HeroSection  />

      {/* 2. سكشن الأكاديمية (Hub) */}
      <AcademyHub />
         <FeatureGrid/>
      

      <HomeCoursesPreview initialCourses={initialCourses} />

          <SiaRefresher/>
          <ClientReviews/>
          <StrategicAdvantages/>

  

      <div className="h-24" />
    </main>
  );
}