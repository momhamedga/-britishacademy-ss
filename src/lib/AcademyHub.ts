import { 
  Users, 
  GraduationCap, 
  Shield, 
  Landmark, 
  Award, 
  LayoutDashboard,
  LucideIcon 
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
    id: 'membership',
    title: 'Elite Membership', 
    href: '/membership', 
    icon: Shield, 
    description: 'Access exclusive security protocols and community benefits.',
    accentColor: 'from-gold/20 to-transparent'
  },
  { 
    id: 'instructors',
    title: 'Expert Faculty', 
    href: '/instructors', 
    icon: Users, 
    description: 'Learn from world-class British security specialists.',
    accentColor: 'from-blue-500/10 to-transparent'
  },
  { 
    id: 'programs',
    title: 'Strategic Programs', 
    href: '/programs', 
    icon: GraduationCap, 
    description: 'Advanced curriculum engineered for 2026 security challenges.',
    accentColor: 'from-gold/20 to-transparent'
  },
  { 
    id: 'center',
    title: 'Command Center', 
    href: '/training-center', 
    icon: Landmark, 
    description: 'Virtual and physical tactical training environments.',
    accentColor: 'from-white/10 to-transparent'
  },
  { 
    id: 'certificates',
    title: 'Verify Credentials', 
    href: '/verify-certificate', 
    icon: Award, 
    description: 'Instant blockchain-backed certificate authentication.',
    accentColor: 'from-gold/30 to-transparent'
  },
];