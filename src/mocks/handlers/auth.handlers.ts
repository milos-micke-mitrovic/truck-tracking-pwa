import { http, HttpResponse, delay } from 'msw';
import { mockCredentials, mockAccessToken, mockRefreshToken } from '../data/auth.data';

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as { email: string; password: string };

    if (body.email === mockCredentials.email && body.password === mockCredentials.password) {
      return HttpResponse.json({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        tokenType: 'Bearer',
        expiresIn: 3600,
      });
    }

    return HttpResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }),

  http.post('/api/auth/refresh', async ({ request }) => {
    await delay(300);

    const body = (await request.json()) as { refreshToken: string };

    if (body.refreshToken === mockRefreshToken) {
      return HttpResponse.json({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        tokenType: 'Bearer',
        expiresIn: 3600,
      });
    }

    return HttpResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
  }),

  http.post('/api/auth/logout', async () => {
    await delay(200);
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),
];
