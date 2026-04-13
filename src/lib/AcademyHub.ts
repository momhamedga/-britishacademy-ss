import { 
 Building2, Smartphone, Lock,
  GraduationCap, 

  LucideIcon, 


} from "lucide-react";


// تعريف الـ Interface لضمان الـ Type Safety (TypeScript Standards)
export interface HubItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
  accentColor: string;
}


export const ACADEMY_HUB_ITEMS: HubItem[] = [
  { 
    id: 'accredited-programs',
    title: 'Accredited Programs', 
    href: '/programs', 
    icon: GraduationCap, // أيقونة قبعة التخرج كما في الصورة
    description: 'Internationally recognized certificates',
    accentColor: 'from-gold/20 to-transparent'
  },
  { 
    id: 'corporate-training',
    title: 'Corporate Training', 
    href: '/corporate', 
    icon: Building2, // أيقونة المباني للشركات
    description: 'Integrated enterprise solutions',
    accentColor: 'from-gold/10 to-transparent'
  },
  { 
    id: 'learn-anywhere',
    title: 'Learn Anywhere', 
    href: '/platform', 
    icon: Smartphone, // أيقونة الموبايل
    description: 'Responsive platform compatible with all devices',
    accentColor: 'from-gold/30 to-transparent'
  },
  { 
    id: 'security-experts',
    title: 'Security Experts', 
    href: '/experts', 
    icon: Lock, // أيقونة القفل للخبراء الأمنيين
    description: 'Certified trainers with extensive experience',
    accentColor: 'from-gold/25 to-transparent'
  },
];