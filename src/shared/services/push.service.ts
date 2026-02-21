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
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('[Push] Service Worker or PushManager not supported');
    return;
  }
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    console.warn('[Push] Notification permission not granted:', Notification.permission);
    return;
  }

  try {
    console.log('[Push] Waiting for service worker ready...');
    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();

    if (existing) {
      console.log('[Push] Re-sending existing subscription to backend');
      await sendSubscriptionToBackend(driverId, existing);
      console.log('[Push] Subscription sent successfully');
      return;
    }

    console.log('[Push] No existing subscription, fetching VAPID key...');
    const { publicKey } = await apiClient.get<{ publicKey: string }>('/push/vapid-public-key');
    if (!publicKey) {
      console.warn('[Push] Backend returned no VAPID public key');
      return;
    }
    console.log('[Push] Got VAPID key, subscribing...');

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey).buffer as ArrayBuffer,
    });
    console.log('[Push] Subscribed, sending to backend...');

    await sendSubscriptionToBackend(driverId, subscription);
    console.log('[Push] Registration complete');
  } catch (err) {
    console.error('[Push] Registration failed:', err);
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
