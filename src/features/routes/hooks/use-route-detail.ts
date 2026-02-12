import { useState, useEffect, useCallback } from 'react';
import { routesApi } from '../api/routes.api';
import { useRoutesStore } from '../stores/use-routes-store';
import type { RouteResponse } from '../types/route.types';

export function useRouteDetail(routeId: string | undefined) {
  const { activeRoute, setActiveRoute } = useRoutesStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoute = useCallback(async () => {
    if (!routeId) return;

    if (activeRoute?.id === routeId) {
      return;
    }

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
  }, [routeId, activeRoute?.id, setActiveRoute]);

  const refresh = useCallback(async () => {
    if (!routeId) return;
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
  }, [routeId, setActiveRoute]);

  useEffect(() => {
    void fetchRoute();
  }, [fetchRoute]);

  return {
    route: activeRoute?.id === routeId ? activeRoute : null,
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
