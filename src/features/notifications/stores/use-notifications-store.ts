import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NotificationResponse } from '../types/notification.types';
import { NotificationType } from '../types/notification.types';

interface NotificationsState {
  notifications: NotificationResponse[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  setNotifications: (notifications: NotificationResponse[]) => void;
  appendNotifications: (notifications: NotificationResponse[]) => void;
  addNotification: (notification: NotificationResponse) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  removeNotification: (id: number) => void;
  removeByReferenceId: (referenceId: number, type: NotificationType) => void;
  clearNotifications: () => void;
  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,

      setNotifications: (notifications) => set({ notifications }),

      appendNotifications: (notifications) =>
        set((state) => ({
          notifications: [...state.notifications, ...notifications],
        })),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            read: true,
            readAt: n.readAt ?? new Date().toISOString(),
          })),
          unreadCount: 0,
        })),

      removeNotification: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount:
              notification && !notification.read
                ? Math.max(0, state.unreadCount - 1)
                : state.unreadCount,
          };
        }),

      removeByReferenceId: (referenceId, type) =>
        set((state) => {
          const removed = state.notifications.filter(
            (n) => n.referenceId === referenceId && n.type === type
          );
          const unreadRemoved = removed.filter((n) => !n.read).length;
          return {
            notifications: state.notifications.filter(
              (n) => !(n.referenceId === referenceId && n.type === type)
            ),
            unreadCount: Math.max(0, state.unreadCount - unreadRemoved),
          };
        }),

      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),

      setUnreadCount: (unreadCount) => set({ unreadCount }),

      incrementUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),
    }),
    {
      name: 'truck-drive-notifications',
      partialize: (state) => ({
        unreadCount: state.unreadCount,
      }),
    }
  )
);
