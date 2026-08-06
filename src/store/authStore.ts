import { create } from 'zustand';
import { AuthUser } from '../types/auth';
import { DUMMY_USER } from '../constants/dummyData';

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (user: AuthUser, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
  setLoading: (loading: boolean) => void;
  // Mock login for development
  mockLogin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,

  login: (user, accessToken, refreshToken) =>
    set({ isAuthenticated: true, user, accessToken, refreshToken }),

  logout: () =>
    set({ isAuthenticated: false, user: null, accessToken: null, refreshToken: null }),

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  setLoading: (isLoading) => set({ isLoading }),

  mockLogin: () =>
    set({
      isAuthenticated: true,
      user: {
        id: DUMMY_USER.id,
        name: DUMMY_USER.name,
        email: DUMMY_USER.email,
        phone: DUMMY_USER.phone,
        avatarUrl: DUMMY_USER.avatarUrl,
        isVerified: DUMMY_USER.isVerified,
      },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    }),
}));
