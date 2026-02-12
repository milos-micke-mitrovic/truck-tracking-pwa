import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { unregisterPushNotifications } from '@/shared/services/push.service';

export interface User {
  id: string;
  email: string;
  name: string;
  driverId: string;
  tenantId: string;
  companyId?: string;
  vehicleId?: string;
  phoneNumber?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string, refreshToken: string, expiresIn: number) => void;
  setToken: (token: string, expiresIn: number) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      expiresAt: null,
      isAuthenticated: false,
      setAuth: (user, token, refreshToken, expiresIn) =>
        set({
          user,
          token,
          refreshToken,
          expiresAt: Date.now() + expiresIn * 1000,
          isAuthenticated: true,
        }),
      setToken: (token, expiresIn) =>
        set({
          token,
          expiresAt: Date.now() + expiresIn * 1000,
        }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      logout: () => {
        void unregisterPushNotifications();
        set({
          user: null,
          token: null,
          refreshToken: null,
          expiresAt: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'truck-drive-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
