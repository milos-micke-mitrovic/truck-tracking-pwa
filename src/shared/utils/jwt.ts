export interface JwtPayload {
  sub: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export function decodeJwtPayload(token: string): JwtPayload {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  const payload = parts[1];
  const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decoded) as JwtPayload;
}
