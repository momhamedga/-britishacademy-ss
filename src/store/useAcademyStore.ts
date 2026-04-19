import { create } from 'zustand';
import { Course } from '@/types';

interface AcademyState {
  courses: Course[];
  activeCategory: string;
  activeLevel: string;
  activeDuration: string;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  
  // Actions دمجناها هنا عشان نكسر الـ Infinite Loop
  setCourses: (courses: Course[]) => void;
  setActiveCategory: (category: string) => void;
  setActiveLevel: (level: string) => void;
  setActiveDuration: (duration: string) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  resetFilters: () => void;
}

export const useAcademyStore = create<AcademyState>((set) => ({
  // --- 1. State ---
  courses: [],
  activeCategory: 'all',
  activeLevel: '',
  activeDuration: '',
  searchQuery: '',
  viewMode: 'grid',

  // --- 2. Actions (ثابتة ولا تتغير) ---
  setCourses: (courses) => set({ courses }),
  
  setActiveCategory: (category) => set({ activeCategory: category }),

  setActiveLevel: (level) => set({ activeLevel: level }),

  setActiveDuration: (duration) => set({ activeDuration: duration }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setViewMode: (viewMode) => set({ viewMode }),

  resetFilters: () => set({ 
    activeCategory: 'all', 
    activeLevel: '', 
    activeDuration: '', 
    searchQuery: '' 
  }),
}));