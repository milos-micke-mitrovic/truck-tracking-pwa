import { apiClient } from '@/shared/api';
import type { PaginatedResponse } from '@/shared/types/api.types';
import type {
  RouteShortResponse,
  RouteResponse,
  RouteStopResponse,
  UpdateRouteStatusRequest,
  UpdateStopRequest,
  PodSubmissionResponse,
} from '../types/route.types';

interface GetRoutesParams {
  driverId?: string;
  status?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export const routesApi = {
  getRoutes(params: GetRoutesParams = {}) {
    return apiClient.get<PaginatedResponse<RouteShortResponse>>('/routes', {
      params: {
        driverId: params.driverId,
        status: params.status,
        page: params.page,
        size: params.size ?? 20,
        sort: params.sort,
      },
    });
  },

  getRoute(id: string) {
    return apiClient.get<RouteResponse>(`/routes/${id}`);
  },

  updateRouteStatus(id: string, body: UpdateRouteStatusRequest) {
    return apiClient.patch<RouteResponse>(`/routes/${id}/status`, { body });
  },

  getStops(routeId: string) {
    return apiClient.get<RouteStopResponse[]>(`/routes/${routeId}/stops`);
  },

  updateStop(routeId: string, stopId: string, body: UpdateStopRequest) {
    return apiClient.put<RouteStopResponse>(`/routes/${routeId}/stops/${stopId}`, { body });
  },

  submitPod(stopId: string, formData: FormData) {
    return apiClient.postFormData<PodSubmissionResponse>(`/stops/${stopId}/pod`, formData);
  },

  getPod(stopId: string) {
    return apiClient.get<PodSubmissionResponse>(`/stops/${stopId}/pod`);
  },
};
