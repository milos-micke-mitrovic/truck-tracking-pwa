import { http, HttpResponse, delay } from 'msw';
import { mockUser, mockCredentials, mockToken } from '../data/auth.data';

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as { username: string; password: string };

    if (body.username === mockCredentials.username && body.password === mockCredentials.password) {
      return HttpResponse.json({
        success: true,
        data: {
          user: mockUser,
          token: mockToken,
        },
      });
    }

    return HttpResponse.json(
      {
        success: false,
        message: 'Invalid username or password',
      },
      { status: 401 }
    );
  }),

  http.post('/api/auth/logout', async () => {
    await delay(200);

    return HttpResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  }),

  http.get('/api/auth/me', async ({ request }) => {
    await delay(300);

    const authHeader = request.headers.get('Authorization');

    if (authHeader === `Bearer ${mockToken}`) {
      return HttpResponse.json({
        success: true,
        data: mockUser,
      });
    }

    return HttpResponse.json(
      {
        success: false,
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }),
];
