import { create } from 'zustand';
import { Course } from '@/types';

interface AcademyState {
  courses: Course[];
  activeCategory: string;
}

interface AcademyActions {
  setCourses: (courses: Course[]) => void;
  setActiveCategory: (category: string) => void;
}

// 1. الـ State الأساسي
const useAcademyStore = create<AcademyState>((set) => ({
  courses: [],
  activeCategory: 'all',
}));

// 2. الـ Actions (الوظائف)
export const useAcademyActions = () => {
  const setCourses = (courses: Course[]) => 
    useAcademyStore.setState({ courses });
    
  const setActiveCategory = (category: string) => 
    useAcademyStore.setState({ activeCategory: category });

  return { setCourses, setActiveCategory };
};

// 3. Export للـ State عشان نستخدمه في الـ Selectors
export { useAcademyStore };