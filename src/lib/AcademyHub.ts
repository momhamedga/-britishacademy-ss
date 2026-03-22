import { 
  Users, 
  GraduationCap, 
  Shield, 
  Landmark, 
  Award, 
  LayoutDashboard,
  LucideIcon, 
  Trophy,
  Star
} from "lucide-react";
import React from "react";

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
    id: 'best-price',
    title: 'Best Price', 
    href: '/pricing', 
    icon: Shield, 
    description: 'Premier accredited training with our exclusive price-match guarantee.',
    accentColor: 'from-gold/20 to-transparent'
  },
  { 
    id: 'industry-experience',
    title: '15 Years Experience', 
    href: '/about', 
    icon: Trophy, 
    description: 'Over 15 years of world-class security training and strategic leadership.',
    accentColor: 'from-gold/10 to-transparent'
  },
  { 
    id: 'reputation',
    title: 'Enviable Reputation', 
    href: '/reviews', 
    icon: Star, 
    description: 'A prestigious track record of excellence recognized across the UK.',
    accentColor: 'from-gold/30 to-transparent'
  },
];