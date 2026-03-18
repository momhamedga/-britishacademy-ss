import { create } from 'zustand'; // لو بتستخدم Zustand

interface PortalState {
  isLocked: boolean;
  unlock: () => void;
}

export const usePortalStore = create<PortalState>((set) => ({
  isLocked: true,
  unlock: () => set({ isLocked: false }),
}));