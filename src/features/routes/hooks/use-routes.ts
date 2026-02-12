import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/shared/stores';
import { routesApi } from '../api/routes.api';
import { useRoutesStore } from '../stores/use-routes-store';
import type { RouteStatus } from '../types/route.types';

interface UseRoutesOptions {
  status?: RouteStatus;
}

export function useRoutes(options: UseRoutesOptions = {}) {
  const { status } = options;
  const user = useAuthStore((state) => state.user);
  const { routes, isLoading, error, setRoutes, setLoading, setError } = useRoutesStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRoutes = useCallback(async () => {
    if (!user?.driverId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await routesApi.getRoutes({
        driverId: user.driverId,
        status,
      });
      setRoutes(response.content);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load routes';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user?.driverId, status, setRoutes, setLoading, setError]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchRoutes();
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
    refresh,
  };
}
