import { apiClient } from '@/shared/api';
import type { PaginatedResponse } from '@/shared/types/api.types';
import type { NotificationResponse, UnreadCountResponse } from '../types/notification.types';

interface GetNotificationsParams {
  driverId?: number | string;
  page?: number;
  size?: number;
}

export const notificationsApi = {
  getNotifications(params: GetNotificationsParams = {}) {
    return apiClient.get<PaginatedResponse<NotificationResponse>>('/notifications', {
      params: {
        driverId: params.driverId,
        page: params.page,
        size: params.size ?? 20,
      },
    });
  },

  getUnreadCount(driverId: number | string) {
    return apiClient.get<UnreadCountResponse>('/notifications/unread-count', {
      params: { driverId },
    });
  },

  markAsRead(id: number | string, driverId: number | string) {
    return apiClient.patch<NotificationResponse>(`/notifications/${id}/read`, {
      params: { driverId },
    });
  },

  markAllAsRead(driverId: number | string) {
    return apiClient.patch<{ count: number }>('/notifications/read-all', {
      params: { driverId },
    });
  },

  deleteNotification(id: number | string, driverId: number | string) {
    return apiClient.delete<void>(`/notifications/${id}`, {
      params: { driverId },
    });
  },

  deleteAllNotifications(driverId: number | string) {
    return apiClient.delete<{ count: number }>('/notifications', {
      params: { driverId },
    });
  },
};
