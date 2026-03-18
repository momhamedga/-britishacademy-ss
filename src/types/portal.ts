/**
 * تم استنباط الرتب من بيانات الطالب الحالية: Mohamed Gamal
 * PRODIGY: رتبة الطالب الحالية (PRODIGY MEMBER)
 */
export type StudentRank = 'PRODIGY' | 'ELITE' | 'AGENT';

export interface Student {
  id: string;          // uuid في قاعدة البيانات
  student_id: string;  // المعرف الظاهر بالصورة: BA-2026-001
  access_code: string; // كود الدخول الأولي: 123456
  password?: string;   // الحقل الجديد الذي أضفناه لتغيير الباسورد
  name: string;        // الاسم المحدث: Mohamed Gamal
  email: string;       // البريد الرسمي للأكاديمية
  rank: StudentRank;   // الرتبة المسجلة: PRODIGY
  progress: number;    // النسبة الكلية الظاهرة في الجدول: 25
  last_access?: Date;  // يتم تحديثه تلقائياً بـ timestamp
}

/**
 * Interface لجدول الكورسات (Courses Table)
 */
export interface Course {
  id: number;          // serial primary key
  title: string;       // مثل: Advanced Security Management
  category: string;    // مثل: Security Operations
  duration: string;    // مثل: 4 Weeks
  level: 'Beginner' | 'Intermediate' | 'Advanced'; // مستويات الصعوبة
  created_at: Date;    // تاريخ إنشاء الكورس
}

/**
 * Interface لجدول الربط (student_courses)
 * هذا الجدول يربط الطالب بالكورسات ويحدد تقدمه في كل كورس بشكل منفصل.
 */
export interface StudentCourse {
  id: number;
  student_id: string;  // uuid للطالب
  course_id: number;   // id الكورس
  progress: number;    // التقدم في هذا الكورس تحديداً (0-100)
  status: 'IN_PROGRESS' | 'COMPLETED' | 'LOCKED';
  joined_at: Date;
}