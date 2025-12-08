import type { User } from '@/shared/stores';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  message?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}
