import { apiClient } from '@/shared/api';

const PUSH_ENABLED = import.meta.env.VITE_PUSH_ENABLED === 'true';
const VAPID_KEY = import.meta.env.VITE_PUSH_VAPID_KEY || '';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerPushNotifications(driverId: string): Promise<void> {
  if (!PUSH_ENABLED || !VAPID_KEY) return;
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();

    if (existing) {
      // Already subscribed
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_KEY).buffer as ArrayBuffer,
    });

    await apiClient.post('/push/subscribe', {
      body: {
        driverId,
        subscription: subscription.toJSON(),
      },
    });
  } catch {
    // Push registration is non-critical, silently fail
  }
}

export async function unregisterPushNotifications(): Promise<void> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
    }
  } catch {
    // Silently fail
  }
}
