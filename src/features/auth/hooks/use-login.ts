import { useState, useCallback } from 'react';
import { useAuthStore } from '@/shared/stores';
import { apiClient } from '@/shared/api';
import { decodeJwtPayload } from '@/shared/utils';
import { registerPushNotifications } from '@/shared/services/push.service';
import type { LoginCredentials, AuthResponse, AuthError } from '../types/auth.types';

interface UseLoginReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  error: AuthError | null;
  clearError: () => void;
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await apiClient.post<AuthResponse>('/auth/login', {
          body: credentials,
        });

        const payload = decodeJwtPayload(data.accessToken);

        const user = {
          id: payload.sub,
          email: payload.email,
          name: `${payload.first_name} ${payload.last_name}`,
          driverId: payload.sub,
          tenantId: payload.tenant_id,
        };

        setAuth(user, data.accessToken, data.refreshToken, data.expiresIn);

        // Register push notifications (non-blocking)
        void registerPushNotifications(user.driverId);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError({ message });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setAuth]
  );

  return {
    login,
    isLoading,
    error,
    clearError,
  };
}
