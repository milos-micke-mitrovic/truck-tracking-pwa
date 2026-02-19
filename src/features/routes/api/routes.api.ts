import { apiClient } from '@/shared/api';
import type { PaginatedResponse } from '@/shared/types/api.types';
import type {
  RouteShortResponse,
  RouteResponse,
  RouteStopResponse,
  UpdateRouteStatusRequest,
  UpdateStopRequest,
  PodSubmissionResponse,
  PodSubmissionRequest,
  TempFileResult,
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

  getRoute(id: number | string) {
    return apiClient.get<RouteResponse>(`/routes/${id}`);
  },

  updateRouteStatus(id: number | string, body: UpdateRouteStatusRequest) {
    return apiClient.patch<RouteResponse>(`/routes/${id}/status`, { body });
  },

  getStops(routeId: number | string) {
    return apiClient.get<RouteStopResponse[]>(`/routes/${routeId}/stops`);
  },

  updateStop(routeId: number | string, stopId: number | string, body: UpdateStopRequest) {
    return apiClient.put<RouteStopResponse>(`/routes/${routeId}/stops/${stopId}`, { body });
  },

  uploadTempDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.postFormData<TempFileResult>('/documents/upload/temp', formData);
  },

  deleteTempDocument(tempFileName: string) {
    return apiClient.delete(`/documents/temp/${tempFileName}`);
  },

  submitPod(stopId: number | string, request: PodSubmissionRequest) {
    return apiClient.post<PodSubmissionResponse>(`/stops/${stopId}/pod`, { body: request });
  },

  getPod(stopId: number | string) {
    return apiClient.get<PodSubmissionResponse>(`/stops/${stopId}/pod`);
  },
};
