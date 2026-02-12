import { sseService } from '@/shared/services/sse.service';

/**
 * Dev-only mock SSE utility.
 * MSW doesn't support SSE, so we expose a global helper for console testing.
 *
 * Usage from browser console:
 *   window.__mockSSE.emit('ROUTE_ASSIGNED', { id: 'route-new', ... })
 *   window.__mockSSE.emit('ROUTE_UPDATED', { routeId: 'route-001', status: 'COMPLETED' })
 *   window.__mockSSE.emit('ROUTE_CANCELLED', { routeId: 'route-002' })
 */

type SSEEventType = 'ROUTE_ASSIGNED' | 'ROUTE_UPDATED' | 'ROUTE_CANCELLED';

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
      // Directly trigger handlers registered on the SSE service
      // Since we can't inject into EventSource, we use the service's on/emit pattern
      // The handlers registered via useSSE will pick these up
      const event = new CustomEvent(`sse:${type}`, { detail: data });
      window.dispatchEvent(event);
      console.log(`[SSE Mock] Emitted ${type}:`, data);
    },
  };

  // Override sseService.connect to use window events in dev
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
