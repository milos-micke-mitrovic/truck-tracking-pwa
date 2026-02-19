import { useEffect, useState } from 'react';
import { useAuthStore } from '@/shared/stores';
import { useRoutesStore } from '@/features/routes/stores/use-routes-store';
import { useNotificationsStore } from '@/features/notifications/stores/use-notifications-store';
import { sseService } from '@/shared/services/sse.service';
import { RouteStatus, mapRouteResponseToShort } from '@/features/routes/types/route.types';
import type { RouteResponse, SseEventPayload } from '@/features/routes/types/route.types';
import type { NotificationResponse } from '@/features/notifications/types/notification.types';
import { ReferenceType } from '@/features/notifications/types/notification.types';

type ToastVariant = 'success' | 'info' | 'warning' | 'error';

interface SSEToast {
  isOpen: boolean;
  message: string;
  variant: ToastVariant;
}

export function useSSE() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { addRoute, updateRouteStatus } = useRoutesStore();
  const incrementUnreadCount = useNotificationsStore((state) => state.incrementUnreadCount);
  const addNotification = useNotificationsStore((state) => state.addNotification);
  const [toast, setToast] = useState<SSEToast>({
    isOpen: false,
    message: '',
    variant: 'info',
  });

  const showToast = (payload: SseEventPayload, variant: ToastVariant = 'info') => {
    const message = payload.body || payload.title;
    if (message) {
      setToast({ isOpen: true, message, variant });
    }
  };

  const buildNotification = (
    payload: SseEventPayload,
    referenceType: ReferenceType | null
  ): NotificationResponse => ({
    id: -Date.now(),
    tenantId: Number(user!.tenantId),
    recipientDriverId: Number(user!.driverId),
    type: payload.type as NotificationResponse['type'],
    channel: 'SSE',
    title: payload.title,
    body: payload.body,
    referenceId: payload.referenceId,
    referenceType,
    read: false,
    createdAt: payload.timestamp,
    readAt: null,
  });

  useEffect(() => {
    if (!isAuthenticated || !user?.tenantId || !user?.driverId) {
      return;
    }

    sseService.connect(user.tenantId, user.driverId, token || undefined);

    // ROUTE_ASSIGNED — backend sends SseEventPayload<RouteResponse>
    const unsubAssigned = sseService.on('ROUTE_ASSIGNED', (raw) => {
      const payload = raw as SseEventPayload<RouteResponse>;
      const routeData = payload.data;
      if (routeData && routeData.id) {
        const shortRoute = mapRouteResponseToShort(routeData);
        addRoute(shortRoute);
      }
      addNotification(buildNotification(payload, ReferenceType.ROUTE));
      incrementUnreadCount();
      showToast(payload, 'success');
    });

    // ROUTE_UPDATED — backend sends SseEventPayload<RouteResponse>
    const unsubUpdated = sseService.on('ROUTE_UPDATED', (raw) => {
      const payload = raw as SseEventPayload<RouteResponse>;
      const routeData = payload.data;
      if (routeData && routeData.id && routeData.status) {
        updateRouteStatus(routeData.id, routeData.status);
      }
      addNotification(buildNotification(payload, ReferenceType.ROUTE));
      incrementUnreadCount();
      showToast(payload, 'info');
    });

    // ROUTE_CANCELLED — backend sends SseEventPayload<string> (reason), routeId is in referenceId
    const unsubCancelled = sseService.on('ROUTE_CANCELLED', (raw) => {
      const payload = raw as SseEventPayload<string>;
      const routeId = payload.referenceId;
      if (routeId) {
        updateRouteStatus(routeId, RouteStatus.CANCELLED);
      }
      addNotification(buildNotification(payload, ReferenceType.ROUTE));
      incrementUnreadCount();
      showToast(payload, 'warning');
    });

    // POD_APPROVED
    const unsubPodApproved = sseService.on('POD_APPROVED', (raw) => {
      const payload = raw as SseEventPayload;
      addNotification(buildNotification(payload, ReferenceType.POD));
      incrementUnreadCount();
      showToast(payload, 'success');
    });

    // POD_REJECTED
    const unsubPodRejected = sseService.on('POD_REJECTED', (raw) => {
      const payload = raw as SseEventPayload;
      addNotification(buildNotification(payload, ReferenceType.POD));
      incrementUnreadCount();
      showToast(payload, 'error');
    });

    // SYSTEM
    const unsubSystem = sseService.on('SYSTEM', (raw) => {
      const payload = raw as SseEventPayload;
      addNotification(buildNotification(payload, null));
      incrementUnreadCount();
      showToast(payload, 'info');
    });

    // Auto-reconnect when the app returns to foreground or network recovers
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sseService.reconnect();
      }
    };
    const handleOnline = () => {
      sseService.reconnect();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);

    return () => {
      unsubAssigned();
      unsubUpdated();
      unsubCancelled();
      unsubPodApproved();
      unsubPodRejected();
      unsubSystem();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      sseService.disconnect();
    };
  }, [isAuthenticated, user?.tenantId, user?.driverId, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const dismissToast = () => setToast({ isOpen: false, message: '', variant: 'info' });

  return { toast, dismissToast };
}
