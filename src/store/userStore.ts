import { create } from 'zustand';
import { User } from '../types/user';
import { DUMMY_USER } from '../constants/dummyData';

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  loadMockUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => set({ user }),

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  setLoading: (isLoading) => set({ isLoading }),

  loadMockUser: () => set({ user: DUMMY_USER }),
}));
