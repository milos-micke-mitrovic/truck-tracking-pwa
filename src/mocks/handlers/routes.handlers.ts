import { http, HttpResponse, delay } from 'msw';
import { mockRoutesShort, mockRouteDetails } from '../data/routes.data';
import { RouteStatus, PodStatus } from '@/features/routes/types/route.types';
import type {
  RouteShortResponse,
  RouteResponse,
  RouteStopResponse,
} from '@/features/routes/types/route.types';

// Mutable copies for state changes during the session
let routesList = [...mockRoutesShort];
const routeDetails: Record<string, RouteResponse> = { ...mockRouteDetails };

export const routesHandlers = [
  // GET /api/routes — paginated list
  http.get('/api/routes', async ({ request }) => {
    await delay(400);

    const url = new URL(request.url);
    const driverId = url.searchParams.get('driverId');
    const status = url.searchParams.get('status');
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '20', 10);

    let filtered: RouteShortResponse[] = [...routesList];

    if (driverId) {
      // In mock, all routes belong to the mock driver
      filtered = filtered.filter(() => true);
    }

    if (status) {
      const statuses = status.split(',');
      filtered = filtered.filter((r) => statuses.includes(r.status));
    }

    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / size);
    const start = page * size;
    const content = filtered.slice(start, start + size);

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

  // GET /api/routes/:id — route detail
  http.get('/api/routes/:id', async ({ params }) => {
    await delay(300);

    const id = params.id as string;
    const route = routeDetails[id];

    if (!route) {
      return HttpResponse.json({ message: 'Route not found' }, { status: 404 });
    }

    return HttpResponse.json(route);
  }),

  // PATCH /api/routes/:id/status — update route status
  http.patch('/api/routes/:id/status', async ({ params, request }) => {
    await delay(300);

    const id = params.id as string;
    const numericId = Number(id);
    const body = (await request.json()) as { status: RouteStatus };
    const route = routeDetails[id];

    if (!route) {
      return HttpResponse.json({ message: 'Route not found' }, { status: 404 });
    }

    const updated: RouteResponse = {
      ...route,
      status: body.status,
      updatedAt: new Date().toISOString(),
    };
    routeDetails[id] = updated;

    routesList = routesList.map((r) => (r.id === numericId ? { ...r, status: body.status } : r));

    return HttpResponse.json(updated);
  }),

  // GET /api/routes/:routeId/stops
  http.get('/api/routes/:routeId/stops', async ({ params }) => {
    await delay(200);

    const routeId = params.routeId as string;
    const route = routeDetails[routeId];

    if (!route) {
      return HttpResponse.json({ message: 'Route not found' }, { status: 404 });
    }

    return HttpResponse.json(route.stops);
  }),

  // PUT /api/routes/:routeId/stops/:stopId
  http.put('/api/routes/:routeId/stops/:stopId', async ({ params, request }) => {
    await delay(300);

    const routeId = params.routeId as string;
    const stopId = Number(params.stopId);
    const body = (await request.json()) as Partial<RouteStopResponse>;
    const route = routeDetails[routeId];

    if (!route) {
      return HttpResponse.json({ message: 'Route not found' }, { status: 404 });
    }

    const stopIndex = route.stops.findIndex((s) => s.id === stopId);
    if (stopIndex === -1) {
      return HttpResponse.json({ message: 'Stop not found' }, { status: 404 });
    }

    const updatedStop: RouteStopResponse = {
      ...route.stops[stopIndex],
      ...body,
    };
    route.stops[stopIndex] = updatedStop;
    routeDetails[routeId] = { ...route, updatedAt: new Date().toISOString() };

    return HttpResponse.json(updatedStop);
  }),

  // POST /api/stops/:stopId/pod — submit POD
  http.post('/api/stops/:stopId/pod', async ({ params }) => {
    await delay(500);

    const stopId = params.stopId as string;

    return HttpResponse.json({
      id: `pod-${stopId}`,
      stopId: Number(stopId),
      status: PodStatus.SUBMITTED,
      documents: [
        {
          id: `doc-${Date.now()}`,
          fileName: 'pod-photo-1.jpg',
          fileUrl: '/mock/pod-photo-1.jpg',
          fileType: 'image/jpeg',
          uploadedAt: new Date().toISOString(),
        },
      ],
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
    });
  }),

  // GET /api/stops/:stopId/pod — get POD
  http.get('/api/stops/:stopId/pod', async ({ params }) => {
    await delay(200);

    const stopId = Number(params.stopId);

    // Check if the stop exists in any route
    for (const route of Object.values(routeDetails)) {
      const stop = route.stops.find((s) => s.id === stopId);
      if (stop) {
        return HttpResponse.json({
          id: `pod-${stopId}`,
          stopId,
          status: PodStatus.SUBMITTED,
          documents: [
            {
              id: `doc-${stopId}-1`,
              fileName: 'pod-photo-1.jpg',
              fileUrl: '/mock/pod-photo-1.jpg',
              fileType: 'image/jpeg',
              uploadedAt: '2025-06-12T13:40:00Z',
            },
          ],
          submittedAt: '2025-06-12T13:40:00Z',
          reviewedAt: null,
        });
      }
    }

    return HttpResponse.json({ message: 'POD not found' }, { status: 404 });
  }),
];
