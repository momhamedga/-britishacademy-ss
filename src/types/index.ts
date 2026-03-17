export interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  level: string;
  created_at?: string;
}

// src/types/index.ts (أو ملف التايبس الخاص بك)

export interface HeroSlide {
  id: string;          // لمعالجة الـ Keys في الـ Map والـ Navigation
  title: string;       // العنوان الرئيسي (مثل: ELEVATING)
  subtitle: string;    // العنوان الفرعي (مثل: SECURITY EXCELLENCE)
  description: string; // الوصف النصي أسفل العناوين
  accent: string;      // النص الصغير اللي في الـ Badge (مثل: Global Standards)
  image: string;       // مسار الصورة الخلفية (مثل: /slider-1.webp)
}

export interface NavLink {
  name: string;
  href: string;
}

// إضافة تيب لـ Hub Cards لو حبيت تستخدمه لاحقاً
export interface HubCard {
  title: string;
  href: string;
  image: string;
}