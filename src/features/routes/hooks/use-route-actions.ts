import { useState, useCallback } from 'react';
import { routesApi } from '../api/routes.api';
import { useRoutesStore } from '../stores/use-routes-store';
import { StopStatus as StopStatusEnum } from '../types/route.types';
import type { RouteStatus, StopStatus, RouteStopResponse } from '../types/route.types';

export function useRouteActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateRouteStatus, setActiveRoute, activeRoute } = useRoutesStore();

  const changeRouteStatus = useCallback(
    async (routeId: string, status: RouteStatus) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedRoute = await routesApi.updateRouteStatus(routeId, { status });
        updateRouteStatus(routeId, status);
        setActiveRoute(updatedRoute);
        return updatedRoute;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update status';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [updateRouteStatus, setActiveRoute]
  );

  const updateStopStatus = useCallback(
    async (routeId: string, stopId: string, status: StopStatus) => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedStop = await routesApi.updateStop(routeId, stopId, {
          status,
          ...(status === StopStatusEnum.ARRIVED
            ? { actualArrivalDate: new Date().toISOString() }
            : {}),
          ...(status === StopStatusEnum.COMPLETED
            ? { actualDepartureDate: new Date().toISOString() }
            : {}),
        });

        if (activeRoute && activeRoute.id === routeId) {
          const updatedStops = activeRoute.stops.map((s: RouteStopResponse) =>
            s.id === stopId ? updatedStop : s
          );
          setActiveRoute({ ...activeRoute, stops: updatedStops });
        }

        return updatedStop;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update stop';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [activeRoute, setActiveRoute]
  );

  return {
    changeRouteStatus,
    updateStopStatus,
    isLoading,
    error,
  };
}
