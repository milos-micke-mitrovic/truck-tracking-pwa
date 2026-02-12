import { apiClient } from '@/shared/api';
import type { PaginatedResponse } from '@/shared/types/api.types';
import type { NotificationResponse, UnreadCountResponse } from '../types/notification.types';

interface GetNotificationsParams {
  driverId?: string;
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

  getUnreadCount(driverId: string) {
    return apiClient.get<UnreadCountResponse>('/notifications/unread-count', {
      params: { driverId },
    });
  },

  markAsRead(id: string) {
    return apiClient.patch<NotificationResponse>(`/notifications/${id}/read`);
  },

  markAllAsRead(driverId: string) {
    return apiClient.patch<{ count: number }>('/notifications/read-all', {
      params: { driverId },
    });
  },

  deleteNotification(id: string) {
    return apiClient.delete<void>(`/notifications/${id}`);
  },

  deleteAllNotifications(driverId: string) {
    return apiClient.delete<{ count: number }>('/notifications', {
      params: { driverId },
    });
  },
};
