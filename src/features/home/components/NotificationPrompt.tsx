import { useEffect } from 'react';
import { useAuthStore } from '@/shared/stores';
import { registerPushNotifications } from '@/shared/services/push.service';

/**
 * No UI — iOS handles the permission prompt natively.
 * This component just ensures push subscription is registered
 * once permission has been granted.
 */
export function NotificationPrompt() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (
      'Notification' in window &&
      'serviceWorker' in navigator &&
      Notification.permission === 'granted' &&
      user?.driverId
    ) {
      void registerPushNotifications(user.driverId);
    }
  }, [user?.driverId]);

  return null;
}
