// @/lib/membership/about.ts
import { Target, Eye } from 'lucide-react'; // استيراد الأيقونات المناسبة للصورة

interface CardType {
  title: string;
  desc: string;
  icon: React.ElementType;
}

export const ABOUT_CONTENT = {
  badge: "About Us",
  headline: "WE ARE  GLOBAL SECURITY ",
  description: "A specialized security training platform serving private security companies and individuals since 2018.",
  
  cards: [
    {
      title: "Our Mission",
      desc: "Providing internationally accredited professional security training that enables individuals and companies to elevate security and safety standards.",
      icon: Target // أيقونة الهدف للمهمة
    },
    {
      title: "Our Vision",
      desc: "To be the leading security training platform in the Middle East and Africa by 2030.",
      icon: Eye // أيقونة العين للرؤية
    }
  ]
};