// app/courses/page.tsx
import { getLatestCourses } from "@/actions/academy-actions";
import CoursesPage from "./CoursesPageClient";

export default async function Page() {
  const initialCourses = await getLatestCourses();
  return <CoursesPage initialCourses={initialCourses} />;
}