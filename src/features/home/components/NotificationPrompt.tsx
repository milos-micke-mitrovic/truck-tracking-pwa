import { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Text } from '@/shared/ui';

const DISMISSED_KEY = 'notification-prompt-dismissed';

function isDismissedThisSession(): boolean {
  return sessionStorage.getItem(DISMISSED_KEY) === 'true';
}

function isNotificationSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

export function NotificationPrompt() {
  const [visible, setVisible] = useState(() => {
    if (!isNotificationSupported()) return false;
    if (Notification.permission !== 'default') return false;
    if (isDismissedThisSession()) return false;
    return true;
  });

  if (!visible) return null;

  const handleAllow = async () => {
    const result = await Notification.requestPermission();
    if (result === 'granted') {
      // TODO: Subscribe to push and send subscription to BE
    }
    setVisible(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, 'true');
    setVisible(false);
  };

  return (
    <div className="notification-prompt">
      <div className="notification-prompt__icon">
        <Bell size={20} />
      </div>
      <div className="notification-prompt__content">
        <Text size="sm" weight="semibold" as="span">
          Enable notifications
        </Text>
        <Text size="xs" color="secondary" as="span">
          Stay updated on deliveries and route changes
        </Text>
      </div>
      <button className="notification-prompt__allow" onClick={handleAllow}>
        Allow
      </button>
      <button className="notification-prompt__close" onClick={handleDismiss} aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  );
}
