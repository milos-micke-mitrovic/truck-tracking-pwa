import { useEffect, useState } from 'react';
import { useAuthStore } from '@/shared/stores';
import { useRoutesStore } from '@/features/routes/stores/use-routes-store';
import { useNotificationsStore } from '@/features/notifications/stores/use-notifications-store';
import { sseService } from '@/shared/services/sse.service';
import { RouteStatus } from '@/features/routes/types/route.types';
import type { RouteShortResponse } from '@/features/routes/types/route.types';
import type { NotificationResponse } from '@/features/notifications/types/notification.types';

interface SSEToast {
  isOpen: boolean;
  message: string;
}

export function useSSE() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { setRoutes, updateRouteStatus, routes } = useRoutesStore();
  const { addNotification, setUnreadCount, unreadCount } = useNotificationsStore();
  const [toast, setToast] = useState<SSEToast>({ isOpen: false, message: '' });

  useEffect(() => {
    if (!isAuthenticated || !user?.tenantId || !user?.driverId) {
      return;
    }

    sseService.connect(user.tenantId, user.driverId, token || undefined);

    const unsubAssigned = sseService.on('ROUTE_ASSIGNED', (data) => {
      const route = data as RouteShortResponse;
      setRoutes([...routes, route]);
    });

    const unsubUpdated = sseService.on('ROUTE_UPDATED', (data) => {
      const update = data as { routeId: string; status: RouteStatus };
      if (update.routeId && update.status) {
        updateRouteStatus(update.routeId, update.status);
      }
    });

    const unsubCancelled = sseService.on('ROUTE_CANCELLED', (data) => {
      const cancel = data as { routeId: string };
      if (cancel.routeId) {
        updateRouteStatus(cancel.routeId, RouteStatus.CANCELLED);
      }
    });

    const unsubNotification = sseService.on('NOTIFICATION_RECEIVED', (data) => {
      const notification = data as NotificationResponse;
      addNotification(notification);
      setUnreadCount(unreadCount + 1);
      setToast({ isOpen: true, message: notification.title });
    });

    return () => {
      unsubAssigned();
      unsubUpdated();
      unsubCancelled();
      unsubNotification();
      sseService.disconnect();
    };
  }, [isAuthenticated, user?.tenantId, user?.driverId]); // eslint-disable-line react-hooks/exhaustive-deps

  const dismissToast = () => setToast({ isOpen: false, message: '' });

  return { toast, dismissToast };
}
