import { useState, useEffect, useCallback, useRef } from 'react';
import { routesApi } from '../api/routes.api';
import { useRoutesStore } from '../stores/use-routes-store';
import type { RouteResponse } from '../types/route.types';

export function useRouteDetail(routeId: string | undefined) {
  const activeRoute = useRoutesStore((s) => s.activeRoute);
  const setActiveRoute = useRoutesStore((s) => s.setActiveRoute);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchedIdRef = useRef<string>();

  useEffect(() => {
    if (!routeId || fetchedIdRef.current === routeId) return;
    if (String(activeRoute?.id) === routeId) {
      fetchedIdRef.current = routeId;
      return;
    }

    fetchedIdRef.current = routeId;
    setIsLoading(true);
    setError(null);

    routesApi
      .getRoute(routeId)
      .then((route) => {
        setActiveRoute(route);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load route';
        setError(message);
        fetchedIdRef.current = undefined;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [routeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = useCallback(async () => {
    if (!routeId) return;
    fetchedIdRef.current = undefined;
    setIsLoading(true);
    setError(null);
    try {
      const route = await routesApi.getRoute(routeId);
      setActiveRoute(route);
      fetchedIdRef.current = routeId;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load route';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [routeId, setActiveRoute]);

  const isCached = routeId != null && String(activeRoute?.id) === routeId;

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
