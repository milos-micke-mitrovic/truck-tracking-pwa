import { apiClient } from '@/shared/api';

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

async function sendSubscriptionToBackend(
  driverId: number | string,
  subscription: PushSubscription
): Promise<void> {
  const json = subscription.toJSON();
  await apiClient.post(`/push/subscribe/${driverId}`, {
    body: {
      endpoint: json.endpoint,
      p256dhKey: json.keys?.p256dh,
      authKey: json.keys?.auth,
    },
  });
}

export async function registerPushNotifications(driverId: number | string): Promise<void> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  try {
    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();

    if (existing) {
      await sendSubscriptionToBackend(driverId, existing);
      return;
    }

    // Fetch VAPID public key from backend
    const { publicKey } = await apiClient.get<{ publicKey: string }>('/push/vapid-public-key');
    if (!publicKey) return; // Backend hasn't configured VAPID keys yet

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey).buffer as ArrayBuffer,
    });

    await sendSubscriptionToBackend(driverId, subscription);
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
