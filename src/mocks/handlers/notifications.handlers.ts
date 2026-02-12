import { http, HttpResponse, delay } from 'msw';
import { mockNotifications } from '../data/notifications.data';
import type { NotificationResponse } from '@/features/notifications/types/notification.types';

// Mutable copy for state changes during the session
let notificationsList = [...mockNotifications];

export const notificationsHandlers = [
  // GET /api/notifications — paginated list sorted by createdAt DESC
  http.get('/api/notifications', async ({ request }) => {
    await delay(400);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '20', 10);

    const sorted = [...notificationsList].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const totalElements = sorted.length;
    const totalPages = Math.ceil(totalElements / size);
    const start = page * size;
    const content = sorted.slice(start, start + size);

    return HttpResponse.json({
      content,
      number: page,
      size,
      totalElements,
      totalPages,
      first: page === 0,
      last: page >= totalPages - 1,
      empty: content.length === 0,
    });
  }),

  // GET /api/notifications/unread-count
  http.get('/api/notifications/unread-count', async () => {
    await delay(200);

    const count = notificationsList.filter((n) => !n.read).length;

    return HttpResponse.json({ count });
  }),

  // PATCH /api/notifications/:id/read — mark single as read
  http.patch('/api/notifications/:id/read', async ({ params }) => {
    await delay(300);

    const id = params.id as string;
    const index = notificationsList.findIndex((n) => n.id === id);

    if (index === -1) {
      return HttpResponse.json({ message: 'Notification not found' }, { status: 404 });
    }

    const updated: NotificationResponse = {
      ...notificationsList[index],
      read: true,
      readAt: new Date().toISOString(),
    };
    notificationsList[index] = updated;

    return HttpResponse.json(updated);
  }),

  // PATCH /api/notifications/read-all — mark all as read
  http.patch('/api/notifications/read-all', async () => {
    await delay(300);

    let count = 0;
    notificationsList = notificationsList.map((n) => {
      if (!n.read) {
        count++;
        return { ...n, read: true, readAt: new Date().toISOString() };
      }
      return n;
    });

    return HttpResponse.json({ count });
  }),

  // DELETE /api/notifications/:id — soft delete single notification
  http.delete('/api/notifications/:id', async ({ params }) => {
    await delay(300);

    const id = params.id as string;
    const index = notificationsList.findIndex((n) => n.id === id);

    if (index === -1) {
      return HttpResponse.json({ message: 'Notification not found' }, { status: 404 });
    }

    notificationsList.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  // DELETE /api/notifications — soft delete all notifications for driver
  http.delete('/api/notifications', async () => {
    await delay(300);

    const count = notificationsList.length;
    notificationsList = [];

    return HttpResponse.json({ count });
  }),
];
