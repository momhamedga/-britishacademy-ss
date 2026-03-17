import { LucideIcon } from 'lucide-react';

/**
 * @interface ContactInfoItem
 * يحدد هيكل بيانات كروت المعلومات في الـ Contact Grid
 */
export interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}

/**
 * @type ContactSubject
 * تحديد المواضيع المتاحة في الـ Dropdown لضمان عدم إرسال قيم عشوائية
 */
export type ContactSubject = 
  | 'Strategic Training Inquiry'
  | 'Membership Verification'
  | 'Corporate Partnership'
  | 'General Support';

/**
 * @interface ContactFormData
 * يمثل هيكل البيانات الصادرة من الـ Form
 */
export interface ContactFormData {
  fullName: string;
  email: string;
  subject: ContactSubject;
  message: string;
}

/**
 * @interface FormStatus
 * لتتبع حالة الإرسال (نجاح، خطأ، أو تحميل)
 */
export interface FormStatus {
  state: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}