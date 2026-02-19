import { useEffect, useCallback } from 'react';
import { useAuthStore } from '@/shared/stores';
import { notificationsApi } from '../api/notifications.api';
import { useNotificationsStore } from '../stores/use-notifications-store';

export function useUnreadCount() {
  const user = useAuthStore((state) => state.user);
  const { unreadCount, setUnreadCount } = useNotificationsStore();

  const fetchUnreadCount = useCallback(async () => {
    if (!user?.driverId) return;

    try {
      const response = await notificationsApi.getUnreadCount(user.driverId);
      setUnreadCount(response.count);
    } catch {
      // Silently fail — badge just won't update
    }
  }, [user?.driverId, setUnreadCount]);

  useEffect(() => {
    void fetchUnreadCount();
  }, [fetchUnreadCount]);

  return { unreadCount, refetch: fetchUnreadCount };
}
