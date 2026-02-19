import { sseService } from '@/shared/services/sse.service';

/**
 * Dev-only mock SSE utility.
 * MSW doesn't support SSE, so we expose a global helper for console testing.
 *
 * Payloads must match the backend's SseEventPayload wrapper format.
 *
 * Usage from browser console:
 *
 *   window.__mockSSE.emit('ROUTE_ASSIGNED', {
 *     type: 'ROUTE_ASSIGNED',
 *     title: 'New Route Assigned',
 *     body: 'You have been assigned a new route #5',
 *     referenceId: 5,
 *     data: { id: 5, status: 'DISPATCHED', company: { id: 1, displayName: 'Swift' }, stops: [], ... },
 *     timestamp: new Date().toISOString()
 *   })
 *
 *   window.__mockSSE.emit('ROUTE_UPDATED', {
 *     type: 'ROUTE_UPDATED',
 *     title: 'Route Updated',
 *     body: 'Route #1 status changed to COMPLETED',
 *     referenceId: 1,
 *     data: { id: 1, status: 'COMPLETED' },
 *     timestamp: new Date().toISOString()
 *   })
 *
 *   window.__mockSSE.emit('ROUTE_CANCELLED', {
 *     type: 'ROUTE_CANCELLED',
 *     title: 'Route Cancelled',
 *     body: 'Route #2 has been cancelled',
 *     referenceId: 2,
 *     data: 'Customer requested cancellation',
 *     timestamp: new Date().toISOString()
 *   })
 *
 *   window.__mockSSE.emit('POD_APPROVED', {
 *     type: 'POD_APPROVED',
 *     title: 'POD Approved',
 *     body: 'Your POD for stop #101 has been approved',
 *     referenceId: 101,
 *     data: null,
 *     timestamp: new Date().toISOString()
 *   })
 */

type SSEEventType =
  | 'ROUTE_ASSIGNED'
  | 'ROUTE_UPDATED'
  | 'ROUTE_CANCELLED'
  | 'POD_APPROVED'
  | 'POD_REJECTED'
  | 'SYSTEM';

interface MockSSE {
  emit: (type: SSEEventType, data: unknown) => void;
}

declare global {
  interface Window {
    __mockSSE: MockSSE;
  }
}

export function setupSSEMock(): void {
  if (typeof window === 'undefined') return;

  window.__mockSSE = {
    emit(type: SSEEventType, data: unknown) {
      const event = new CustomEvent(`sse:${type}`, { detail: data });
      window.dispatchEvent(event);
      console.log(`[SSE Mock] Emitted ${type}:`, data);
    },
  };

  // Override sseService.on to also listen via window events in dev
  const originalOn = sseService.on.bind(sseService);
  sseService.on = (eventType: SSEEventType, handler: (data: unknown) => void) => {
    const unsub = originalOn(eventType, handler);

    const windowHandler = (e: Event) => {
      handler((e as CustomEvent).detail);
    };
    window.addEventListener(`sse:${eventType}`, windowHandler);

    return () => {
      unsub();
      window.removeEventListener(`sse:${eventType}`, windowHandler);
    };
  };
}
