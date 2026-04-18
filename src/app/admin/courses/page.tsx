import { sql } from "@/lib/db";
import { Course } from "@/types";
import CoursesControlPage from "./CoursesControlPage";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let courses: Course[] = [];
  let errorState = false;

  try {
    const data = await sql`SELECT * FROM courses ORDER BY created_at DESC`;
    courses = data as Course[];
  } catch (err) {
    console.error("DATABASE_ERROR:", err);
    errorState = true;
  }

  // التعامل مع الخطأ خارج الـ try/catch
  if (errorState) {
    return (
      <div className="h-screen flex items-center justify-center bg-var(--background)">
        <h1 className="text-red-500 font-black italic uppercase">System_Failure: Uplink Lost</h1>
      </div>
    );
  }

  return <CoursesControlPage initialCourses={courses} />;
}