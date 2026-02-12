import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuthStore } from '@/shared/stores';
import { notificationsApi } from '../api/notifications.api';
import { useNotificationsStore } from '../stores/use-notifications-store';

const PAGE_SIZE = 20;

export function useNotifications() {
  const user = useAuthStore((state) => state.user);
  const {
    notifications = [],
    isLoading,
    error,
    setNotifications,
    appendNotifications,
    setLoading,
    setError,
  } = useNotificationsStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);

  const fetchNotifications = useCallback(async () => {
    if (!user?.driverId) return;

    setLoading(true);
    setError(null);
    pageRef.current = 0;

    try {
      const response = await notificationsApi.getNotifications({
        driverId: user.driverId,
        page: 0,
        size: PAGE_SIZE,
      });
      setNotifications(response.content);
      setHasMore(!response.last);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load notifications';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user?.driverId, setNotifications, setLoading, setError]);

  const loadMore = useCallback(async () => {
    if (!user?.driverId || !hasMore) return;

    const nextPage = pageRef.current + 1;

    try {
      const response = await notificationsApi.getNotifications({
        driverId: user.driverId,
        page: nextPage,
        size: PAGE_SIZE,
      });
      appendNotifications(response.content);
      pageRef.current = nextPage;
      setHasMore(!response.last);
    } catch {
      // Silently fail on load more — user can retry by scrolling again
    }
  }, [user?.driverId, hasMore, appendNotifications]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchNotifications();
    setIsRefreshing(false);
  }, [fetchNotifications]);

  useEffect(() => {
    void fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    refresh,
    loadMore,
  };
}
