import { create } from 'zustand';
import { AuthUser } from '../types/auth';

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean; // true once Firebase has resolved the first auth state
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  setInitialized: () => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  isLoading: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setInitialized: () => set({ isInitialized: true }),

  logout: () => set({ isAuthenticated: false, user: null }),

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  setLoading: (isLoading) => set({ isLoading }),
}));
