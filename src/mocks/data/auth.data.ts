import type { User } from '@/shared/stores';

export const mockUser: User = {
  id: 'drv-1001',
  email: 'driver@example.com',
  name: 'John Driver',
  driverId: 'drv-1001',
  tenantId: 'tenant-001',
  companyId: 'comp-001',
  vehicleId: 'veh-001',
  phoneNumber: '+1-555-0123',
};

export const mockCredentials = {
  email: 'driver@example.com',
  password: 'password123',
};

function createMockJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  const signature = btoa('mock-signature');
  return `${header}.${body}.${signature}`;
}

export const mockAccessToken = createMockJwt({
  sub: mockUser.id,
  tenant_id: mockUser.tenantId,
  first_name: 'John',
  last_name: 'Driver',
  email: mockUser.email,
  role: 'DRIVER',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600,
});

export const mockRefreshToken = 'mock-refresh-token-abc123';
