import { HeroSlide, NavLink } from "@/types";
import { Shield, HardHat, Flame, Award } from "lucide-react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Globe, ShieldAlert, Fingerprint, FlameKindling,ShieldCheck } from "lucide-react";
import { MEMBERSHIP_MISSION } from "./membership/membership-data";
import { CERTIFICATE_OVERVIEW } from "./membership/certificate-data";

/** * 1. Global Navigation 
 * تصميم كلاسيكي بلمسة عصرية
 */
export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/courses' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Memberships', href: '/Membership' },
  { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
]

/** * 2. Hero Section 2026 
 * نصوص قوية ومختصرة لخدمة الـ Typography الضخم
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "01",
    title: "Discover Our",
    subtitle: "Accredited Training",
    description: `Upskilling and career development are at your fingertips with the skills enhancement centre Integra Training Academy. Located conveniently in Wembley, we offer a range of high-quality training courses, from Traffic Marshal training to Door Supervisor training, designed to equip you with the knowledge and skills you need to succeed in today's job market.`,
    accent: "In Wembley",
    // تأكد من وجود الصور في مجلد public
    image: "/hero-double-exposure-methodology.webp" 
  },
{
  id: "02",
  title: "Tactical Future",
  subtitle: "Elite Training AI",
  description: "Experience the next generation of security training. We integrate advanced AI-driven simulations and digital tactical overlays to prepare the security elite for 2026 challenges.",
  accent: "Autonomous Training",
  image: "/hero-digital-overlay-technology.webp"
},
{
  id: "03",
  title: "Global Command",
  subtitle: "Digital Academy Hub",
  description: "Bridge the gap between London's excellence and international standards. Access our secure SS.Online portal for accredited remote learning and mission-ready certifications.",
  accent: "Mission Ready 24/7",
  image: "/hero-global-network.webp" 
}
];
/** * 3. Academy Hub 
 * مسارات الصور مرتبة لخدمة الـ UI Cards
 */
export const ACADEMY_HUB = [
  { title: 'Membership', href: '/membership', image: '/images/hub/membership.jpg' },
  { title: 'Instructors', href: '/instructors', image: '/images/hub/instructors.jpg' },
  { title: 'Programs', href: '/programs', image: '/images/hub/programs.jpg' },
  { title: 'Training Center', href: '/training-center', image: '/images/hub/center.jpg' },
  { title: 'My Certificate', href: '/certificates', image: '/images/hub/certificates.jpg' },
];

/** * 4. Neural Engine Config 
 * إعدادات الـ Neural Core اللي بتعطي الروح للموقع
 */
export const NEURAL_CONFIG = {
  particleCount: 120,
  velocity: 0.5,
  mouseRadius: 150,
  particleSize: 1.2,
  connectionDistance: 140,
  colors: {
    node: "rgba(212, 175, 55, 0.4)", // الذهبي الفخم
    bg: "#020617" // الكحلي الملكي العميق
  }
};

export const ACADEMY_ABOUT_TABS = [
  { id: 'accreditation', title: 'Our Accreditation' },
  { id: 'overview', title: 'Discover Who We Are' },
  { id: 'experience', title: 'Professional Experience' }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Shield', icon: Award },
  { id: 'Safety', label: 'Occupational Safety', icon: HardHat },
  { id: 'Security', label: 'Physical Security', icon: Shield },
  { id: 'Emergency', label: 'Emergency Response', icon: Flame },
];

export const INSTRUCTORS = [
  {
    id: 1,
    name: "Dr. James Sterling",
    role: "Chief Safety Strategist",
    specialty: "Industrial Risk Management",
    icon: ShieldAlert, // أيقونة حماية صناعية
    experience: "15+ Years"
  },
  {
    id: 2,
    name: "Capt. Sarah Kovac",
    role: "Security Operations Lead",
    specialty: "Critical Infrastructure",
    icon: Fingerprint, // أيقونة أمن وتحقق
    experience: "12+ Years"
  },
  {
    id: 3,
    name: "Eng. Ahmed Mansour",
    role: "Emergency Response Expert",
    specialty: "Fire & Crisis Control",
    icon: FlameKindling, // أيقونة استجابة للطوارئ
    experience: "10+ Years"
  }
];




export const TABS_MEMBERSHIP = [
  { 
    id: 'membership', 
    label: 'Membership', 
    icon: ShieldCheck,
    title: MEMBERSHIP_MISSION.title,
    content: MEMBERSHIP_MISSION.points
  },
  { 
    id: 'certificate', 
    label: 'My Certificate', 
    icon: Award,
    title: CERTIFICATE_OVERVIEW.title,
    content: CERTIFICATE_OVERVIEW.description
  }
];

// aboutState
export const STATS = [
  { label: 'Graduated Professionals', value: '1,000+', color: 'gold' },
  { label: 'Partner Countries', value: '42', color: 'white' },
  { label: 'Certified Courses', value: '120+', color: 'gold' },
  { label: 'Global Experts', value: '85', color: 'white' },
];


/** * 5. Contact Hub Configuration 
 * بيانات التواصل الأساسية لضمان مركزية التعديل
 */
export const CONTACT_CONFIG = {
  // البريد الرسمي المرتبط بالدومين الجديد لزيادة الموثوقية
  email: "info@britishacademy-ss.com", 
  supportEmail: "support@britishacademy-ss.com",
  
  // رقم التواصل الدولي (لندن)
  phone: "+44 20 7946 0000", 
  
  // العنوان في قلب المنطقة المالية (Canary Wharf)
  address: "Canary Wharf, Bank Street, London E14 5JP, United Kingdom",
  
  // ساعات العمل بتوقيت لندن (GMT)
  workingHours: "Mon - Fri, 09:00 - 17:00 (GMT+0)",
  
  // إحداثيات لندن (إطلالة سينمائية على التايمز)
  mapCenter: { 
    lat: 51.5048, 
    lng: -0.0195 
  },

  // روابط التواصل الاجتماعي (Social Context)
  social: {
    linkedin: "https://linkedin.com/company/britishacademy-ss",
    instagram: "https://instagram.com/britishacademy_ss",
  }
};

/** * 6. Contact Section Icons & Labels
 * توزيع المهام على الـ Contact Grid
 */
export const CONTACT_INFO_CARDS = [
  { 
    id: 'email',
    icon: Mail, 
    label: 'Official Inquiry', 
    value: CONTACT_CONFIG.email, 
    detail: 'Strategic Response within 24h' 
  },
  { 
    id: 'phone',
    icon: Phone, 
    label: 'London HQ Support', 
    value: CONTACT_CONFIG.phone, 
    detail: 'Expert British consultation' 
  },
  { 
    id: 'location',
    icon: MapPin, 
    label: 'Global Headquarters', 
    value: 'London Financial District', 
    detail: CONTACT_CONFIG.address 
  },
  { 
    id: 'hours',
    icon: Clock, 
    label: 'Operational Time', 
    value: CONTACT_CONFIG.workingHours, 
    detail: 'GMT Standard Time' 
  },
];
/** * 7. Contact Subjects (Form Options)
 * مواضيع المراسلة المحددة مسبقاً للـ Dropdown
 */
export const CONTACT_SUBJECTS = [
  { value: 'training', label: 'Strategic Training Inquiry', icon: ShieldCheck },
  { value: 'membership', label: 'Membership Verification', icon: Fingerprint },
  { value: 'partnership', label: 'Corporate Partnership', icon: Globe },
  { value: 'general', label: 'General Support / Other', icon: MessageSquare },
];

/** * 8. Social Links (Optional for Footer/Contact)
 * روابط التواصل الاجتماعي بالهوية الذهبية
 */
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: '#', icon: 'LinkedinIcon' },
  { name: 'X / Twitter', href: '#', icon: 'XIcon' },
  { name: 'Instagram', href: '#', icon: 'InstagramIcon' },
];

// src/lib/constants.ts

export const FEATURE_POINTS = [
  {
    id: "dream-job",
    title: "Land Your Dream Job",
    description: "Gain the essential skills and qualifications employers are looking for.",
  },
  {
    id: "career-prospects",
    title: "Boost Your Career",
    description: "Advance in your current field or explore exciting new opportunities.",
  },
  {
    id: "ahead-curve",
    title: "Stay Ahead Of Curve",
    description: "Keep your skills current and relevant in the ever-evolving market.",
  },
  {
    id: "earning-potential",
    title: "Increase Earning Potential",
    description: "Higher qualifications often lead to higher salaries.",
  },
];

import { TeamMember, Accreditation } from "@/types";

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    id: "ahmad",
    initials: "A.S.",
    name: "Ahmad Al-Sayed",
    role: "CEO",
    description: "20 years of experience in security",
    linkedin: "#",
  },
  {
    id: "mohammad",
    initials: "M.Z.",
    name: "Mohammad Al-Zahrani",
    role: "Academic Director",
    description: "PhD in Security Management",
    linkedin: "#",
  },
  {
    id: "sarah",
    initials: "S.A.",
    name: "Sarah Al-Otaibi",
    role: "CTO",
    description: "EdTech Expert",
    linkedin: "#",
  },
  {
    id: "khalid",
    initials: "K.S.",
    name: "Khalid Al-Shammari",
    role: "Partnerships Manager",
    description: "International Relations",
    linkedin: "#",
  },
];

export const ACCREDITATIONS: Accreditation[] = [
  { id: "asis", name: "ASIS", logo: "/logos/asis.png" },
  { id: "isoa", name: "ISOA", logo: "/logos/isoa.png" },
  { id: "ifpo", name: "IFPO", logo: "/logos/ifpo.png" },
  { id: "cpp", name: "CPP", logo: "/logos/cpp.png" },
  { id: "psp", name: "PSP", logo: "/logos/psp.png" },
];