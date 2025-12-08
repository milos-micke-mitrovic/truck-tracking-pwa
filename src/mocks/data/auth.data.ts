import type { User } from '@/shared/stores';

export const mockUser: User = {
  id: '1',
  email: 'john.driver@truckdrive.com',
  name: 'John Driver',
  driverId: 'DRV-001',
};

export const mockCredentials = {
  username: 'driver',
  password: 'password123',
};

export const mockToken = 'mock-jwt-token-123456789';
