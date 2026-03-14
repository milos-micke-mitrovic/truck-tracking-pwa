import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '@/shared/stores';
import { useRoutesStore } from '@/features/routes/stores/use-routes-store';
import { useNotificationsStore } from '@/features/notifications/stores/use-notifications-store';
import { sseService } from '@/shared/services/sse.service';
import { registerPushNotifications } from '@/shared/services/push.service';
import { routesApi } from '@/features/routes/api/routes.api';
import { notificationsApi } from '@/features/notifications/api/notifications.api';
import { RouteStatus, mapRouteResponseToShort } from '@/features/routes/types/route.types';
import type { RouteResponse, SseEventPayload } from '@/features/routes/types/route.types';
import type { NotificationResponse } from '@/features/notifications/types/notification.types';
import { ReferenceType, NotificationType } from '@/features/notifications/types/notification.types';

type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface SSEToast {
  isOpen: boolean;
  message: string;
  variant: ToastVariant;
  actionLabel?: string;
  onAction?: () => void;
}

export interface RouteAlert {
  isOpen: boolean;
  routeId: number | null;
  message: string;
}

export function useSSE() {
  const history = useHistory();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { addRoute, updateRouteInList, updateRouteStatus, setActiveRoute } = useRoutesStore();
  const activeRoute = useRoutesStore((state) => state.activeRoute);
  const incrementUnreadCount = useNotificationsStore((state) => state.incrementUnreadCount);
  const addNotification = useNotificationsStore((state) => state.addNotification);
  const removeByReferenceId = useNotificationsStore((state) => state.removeByReferenceId);
  const setNotifications = useNotificationsStore((state) => state.setNotifications);
  const setUnreadCount = useNotificationsStore((state) => state.setUnreadCount);

  const [toast, setToast] = useState<SSEToast>({
    isOpen: false,
    message: '',
    variant: 'info',
  });
  const [routeAlert, setRouteAlert] = useState<RouteAlert>({
    isOpen: false,
    routeId: null,
    message: '',
  });
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const showToast = (
    payload: SseEventPayload,
    variant: ToastVariant = 'info',
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const message = payload.body || payload.title;
    if (message) {
      setToast({ isOpen: true, message, variant, actionLabel, onAction });
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

    // Re-register push subscription each session in case backend lost it
    void registerPushNotifications(user.driverId);

    // Track SSE connection status
    const unsubStatus = sseService.onStatusChange((connected) => {
      setIsConnected(connected);
    });

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

      // Show prominent alert for new route assignment
      const routeId = payload.referenceId ?? (routeData?.id ? routeData.id : null);
      setRouteAlert({
        isOpen: true,
        routeId: routeId ? Number(routeId) : null,
        message: payload.body || payload.title,
      });
    });

    // ROUTE_UPDATED — backend sends SseEventPayload<RouteResponse>
    const unsubUpdated = sseService.on('ROUTE_UPDATED', (raw) => {
      const payload = raw as SseEventPayload<RouteResponse>;
      const routeData = payload.data;
      if (routeData && routeData.id) {
        // Update all route fields in the list, not just status
        updateRouteInList(routeData.id, mapRouteResponseToShort(routeData));
        // If this route is currently open in detail view, refresh it fully
        if (activeRoute?.id === routeData.id) {
          setActiveRoute(routeData);
        }
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
        // Remove the now-stale ROUTE_ASSIGNED notification for this route
        removeByReferenceId(routeId, NotificationType.ROUTE_ASSIGNED);
      }
      addNotification(buildNotification(payload, ReferenceType.ROUTE));
      incrementUnreadCount();
      showToast(payload, 'warning');
    });

    // POD_APPROVED — refresh route so status updates to DELIVERED if all stops done
    const unsubPodApproved = sseService.on('POD_APPROVED', (raw) => {
      void (async () => {
        const payload = raw as SseEventPayload;
        addNotification(buildNotification(payload, ReferenceType.POD));
        incrementUnreadCount();
        showToast(payload, 'success');

        const routeId = payload.referenceId;
        if (routeId) {
          try {
            const updatedRoute = await routesApi.getRoute(routeId);
            updateRouteInList(updatedRoute.id, mapRouteResponseToShort(updatedRoute));
            if (activeRoute?.id === updatedRoute.id) {
              setActiveRoute(updatedRoute);
            }
          } catch {
            // Silently ignore — notification was already shown
          }
        }
      })();
    });

    // POD_REJECTED — include action to navigate to the route for resubmission
    const unsubPodRejected = sseService.on('POD_REJECTED', (raw) => {
      const payload = raw as SseEventPayload;
      addNotification(buildNotification(payload, ReferenceType.POD));
      incrementUnreadCount();
      const routeId = payload.referenceId;
      showToast(
        payload,
        'error',
        'View Route',
        routeId ? () => history.push(`/tabs/loads/${routeId}`) : undefined
      );
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

        // Catch up on any notifications missed while the app was backgrounded
        void (async () => {
          try {
            const driverId = user.driverId;
            const [notifResponse, unreadResponse] = await Promise.all([
              notificationsApi.getNotifications({ driverId, page: 0, size: 20 }),
              notificationsApi.getUnreadCount(driverId),
            ]);
            setNotifications(notifResponse.content);
            setUnreadCount(unreadResponse.count);
          } catch {
            // Silently ignore — SSE reconnect will still deliver future events
          }
        })();
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
      unsubStatus();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      sseService.disconnect();
    };
  }, [isAuthenticated, user?.tenantId, user?.driverId, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const dismissToast = () => setToast({ isOpen: false, message: '', variant: 'info' });
  const dismissRouteAlert = () => setRouteAlert({ isOpen: false, routeId: null, message: '' });

  return { toast, dismissToast, routeAlert, dismissRouteAlert, isConnected };
}
