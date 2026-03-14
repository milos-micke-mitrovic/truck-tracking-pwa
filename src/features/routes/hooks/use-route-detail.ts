import { useState, useEffect, useCallback } from 'react';
import { routesApi } from '../api/routes.api';
import { useRoutesStore } from '../stores/use-routes-store';
import type { RouteResponse } from '../types/route.types';

export function useRouteDetail(routeId: string | undefined) {
  const activeRoute = useRoutesStore((s) => s.activeRoute);
  const setActiveRoute = useRoutesStore((s) => s.setActiveRoute);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCached = routeId != null && String(activeRoute?.id) === routeId;

  const fetchRoute = useCallback(
    async (force = false) => {
      if (!routeId) return;
      if (!force && isCached) return;

      setIsLoading(true);
      setError(null);

      try {
        const route = await routesApi.getRoute(routeId);
        setActiveRoute(route);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load route';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [routeId, isCached, setActiveRoute]
  );

  const refresh = useCallback(async () => {
    await fetchRoute(true);
  }, [fetchRoute]);

  useEffect(() => {
    void fetchRoute();
  }, [fetchRoute]);

  return {
    route: isCached ? activeRoute : null,
    isLoading,
    error,
    refresh,
  } as {
    route: RouteResponse | null;
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
  };
}
