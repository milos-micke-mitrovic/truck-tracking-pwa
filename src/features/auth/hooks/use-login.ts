import { useState, useCallback } from 'react';
import { useAuthStore } from '@/shared/stores';
import { apiClient } from '@/shared/api';
import type { LoginCredentials, LoginResponse, AuthError } from '../types/auth.types';

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
        const data = await apiClient.post<LoginResponse>('/auth/login', {
          body: credentials,
        });

        if (!data.success) {
          throw new Error(data.message || 'Login failed');
        }

        if (data.data) {
          setAuth(data.data.user, data.data.token);
        }
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
