import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RouteShortResponse, RouteResponse, RouteStatus } from '../types/route.types';

interface RoutesState {
  routes: RouteShortResponse[];
  activeRoute: RouteResponse | null;
  isLoading: boolean;
  error: string | null;
  setRoutes: (routes: RouteShortResponse[]) => void;
  addRoute: (route: RouteShortResponse) => void;
  setActiveRoute: (route: RouteResponse | null) => void;
  updateRouteInList: (id: number, updates: Partial<RouteShortResponse>) => void;
  updateRouteStatus: (id: number, status: RouteStatus) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRoutesStore = create<RoutesState>()(
  persist(
    (set) => ({
      routes: [],
      activeRoute: null,
      isLoading: false,
      error: null,

      setRoutes: (routes) => set({ routes }),

      addRoute: (route) =>
        set((state) => ({
          routes: state.routes.some((r) => r.id === route.id)
            ? state.routes
            : [...state.routes, route],
        })),

      setActiveRoute: (route) => set({ activeRoute: route }),

      updateRouteInList: (id, updates) =>
        set((state) => ({
          routes: state.routes.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        })),

      updateRouteStatus: (id, status) =>
        set((state) => ({
          routes: state.routes.map((r) => (r.id === id ? { ...r, status } : r)),
          activeRoute:
            state.activeRoute?.id === id ? { ...state.activeRoute, status } : state.activeRoute,
        })),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),
    }),
    {
      name: 'truck-drive-routes',
      partialize: (state) => ({
        routes: state.routes,
        activeRoute: state.activeRoute,
      }),
    }
  )
);
