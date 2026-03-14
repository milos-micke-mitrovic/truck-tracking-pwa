import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuthStore } from '@/shared/stores';
import { routesApi } from '../api/routes.api';
import { useRoutesStore } from '../stores/use-routes-store';
import type { RouteStatus } from '../types/route.types';

const STALE_MS = 30_000; // Consider data stale after 30s

interface UseRoutesOptions {
  status?: RouteStatus;
}

export function useRoutes(options: UseRoutesOptions = {}) {
  const { status } = options;
  const user = useAuthStore((state) => state.user);
  const { routes, isLoading, error, routesFetchedAt, setRoutes, appendRoutes, setLoading, setError } =
    useRoutesStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);

  const fetchRoutes = useCallback(
    async (force = false) => {
      if (!user?.driverId) return;
      if (!force && routesFetchedAt && Date.now() - routesFetchedAt < STALE_MS) return;

      setLoading(true);
      setError(null);
      pageRef.current = 0;

      try {
        const response = await routesApi.getRoutes({
          driverId: user.driverId,
          status,
          page: 0,
        });
        setRoutes(response.content);
        setHasMore(!response.last);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load routes';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [user?.driverId, status, routesFetchedAt, setRoutes, setLoading, setError]
  );

  const loadMore = useCallback(async () => {
    if (!user?.driverId || !hasMore) return;

    const nextPage = pageRef.current + 1;

    try {
      const response = await routesApi.getRoutes({
        driverId: user.driverId,
        status,
        page: nextPage,
      });
      appendRoutes(response.content);
      pageRef.current = nextPage;
      setHasMore(!response.last);
    } catch (err) {
      // Silently fail on load more - user can retry
    }
  }, [user?.driverId, status, hasMore, appendRoutes]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchRoutes(true);
    setIsRefreshing(false);
  }, [fetchRoutes]);

  useEffect(() => {
    void fetchRoutes();
  }, [fetchRoutes]);

  return {
    routes,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    refresh,
    loadMore,
  };
}
