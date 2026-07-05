export interface Course {
  id: string; // UUID من النوع string
  title: string;
  slug: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Professional'; 
  price: number;
  
  // حقول العرض في الـ Grid
  short_description?: string;
  enrollment_count?: number;
  image_url?: string;
  instructor_name?: string;
  certificate_template_url?: string | null;
  progress?: number;
  
  // المحتوى التفصيلي — بييجي من الـ DB كـ string (JSON نصي) أحيانًا وكـ object مُفكك أحيانًا تانية
  full_content?: string | {
    overview: string;
    benefits: string[];
    curriculum: string[];
    location: string;
    requirements: string;
  };
  
  is_sia_accredited: boolean;
  created_at?: string | Date;
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

export interface NavUser {
  name: string;
  rank: string;
}

// إضافة تيب لـ Hub Cards لو حبيت تستخدمه لاحقاً
export interface HubCard {
  title: string;
  href: string;
  image: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: {
    en: string;
    ar: string;
  };
  icon?: React.ReactNode;
}

export interface StatsBarProps {
  locale?: 'ar' | 'en';
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  description: string;
  linkedin: string;
  image?: string;
}

export interface Accreditation {
  id: string;
  name: string;
  logo: string; // Path to SVG or Image
}

// أضف هذا النوع لبيانات الشهادة المدمجة
export interface StudentCertificate {
  title: string;        // من جدول الكورسات
  category: string;     // من جدول الكورسات
  certificate_code: string; // من جدول الشهادات
  certificate_url?: string | null;
  issued_at: string | Date;      // من جدول الشهادات
}