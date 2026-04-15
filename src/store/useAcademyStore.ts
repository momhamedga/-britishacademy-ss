import { create } from 'zustand';
import { Course } from '@/types';

interface AcademyState {
  courses: Course[];
  activeCategory: string;
  activeLevel: string;    // إضافة المستوى
  activeDuration: string; // إضافة المدة
}

interface AcademyActions {
  setCourses: (courses: Course[]) => void;
  setActiveCategory: (category: string) => void;
  setActiveLevel: (level: string) => void;       // أكشن جديد
  setActiveDuration: (duration: string) => void; // أكشن جديد
  resetFilters: () => void;                      // لمسح كل الفلاتر
}

// 1. الـ State الأساسي
const useAcademyStore = create<AcademyState>(() => ({
  courses: [],
  activeCategory: 'all',
  activeLevel: '',
  activeDuration: '',
}));

// 2. الـ Actions (الوظائف)
export const useAcademyActions = (): AcademyActions => {
  const setCourses = (courses: Course[]) => 
    useAcademyStore.setState({ courses });
    
  const setActiveCategory = (category: string) => 
    useAcademyStore.setState({ activeCategory: category });

  const setActiveLevel = (level: string) => 
    useAcademyStore.setState({ activeLevel: level });

  const setActiveDuration = (duration: string) => 
    useAcademyStore.setState({ activeDuration: duration });

  const resetFilters = () => 
    useAcademyStore.setState({ activeCategory: 'all', activeLevel: '', activeDuration: '' });

  return { setCourses, setActiveCategory, setActiveLevel, setActiveDuration, resetFilters };
};

export { useAcademyStore };