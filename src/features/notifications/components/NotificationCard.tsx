import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { IonItemSliding, IonItem, IonItemOptions, IonItemOption } from '@ionic/react';
import { Truck, FileCheck, FileX, XCircle, RefreshCw, Info } from 'lucide-react';
import { Text } from '@/shared/ui';
import { formatRelativeDate } from '@/shared/utils';
import { cn } from '@/shared/utils';
import { NotificationType, ReferenceType } from '../types/notification.types';
import type { NotificationResponse } from '../types/notification.types';
import { notificationsApi } from '../api/notifications.api';
import { useNotificationsStore } from '../stores/use-notifications-store';

interface NotificationCardProps {
  notification: NotificationResponse;
}

const iconMap: Record<NotificationType, typeof Truck> = {
  [NotificationType.ROUTE_ASSIGNED]: Truck,
  [NotificationType.ROUTE_UPDATED]: RefreshCw,
  [NotificationType.ROUTE_CANCELLED]: XCircle,
  [NotificationType.POD_APPROVED]: FileCheck,
  [NotificationType.POD_REJECTED]: FileX,
  [NotificationType.SYSTEM]: Info,
};

const iconColorMap: Record<NotificationType, string> = {
  [NotificationType.ROUTE_ASSIGNED]: 'notification-icon--primary',
  [NotificationType.ROUTE_UPDATED]: 'notification-icon--warning',
  [NotificationType.ROUTE_CANCELLED]: 'notification-icon--danger',
  [NotificationType.POD_APPROVED]: 'notification-icon--success',
  [NotificationType.POD_REJECTED]: 'notification-icon--danger',
  [NotificationType.SYSTEM]: 'notification-icon--info',
};

export function NotificationCard({ notification }: NotificationCardProps) {
  const history = useHistory();
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const markAsRead = useNotificationsStore((state) => state.markAsRead);
  const removeNotification = useNotificationsStore((state) => state.removeNotification);

  const Icon = iconMap[notification.type];

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
      notificationsApi.markAsRead(notification.id).catch(() => {});
    }

    if (notification.referenceId && notification.referenceType) {
      switch (notification.referenceType) {
        case ReferenceType.ROUTE:
          history.push(`/tabs/loads/${notification.referenceId}`);
          break;
        case ReferenceType.STOP:
        case ReferenceType.POD:
          break;
      }
    }
  };

  const handleDelete = () => {
    removeNotification(notification.id);
    notificationsApi.deleteNotification(notification.id).catch(() => {});
    void slidingRef.current?.close();
  };

  return (
    <IonItemSliding ref={slidingRef} className="notification-card-sliding">
      <IonItem
        lines="none"
        button
        detail={false}
        onClick={handleClick}
        className={cn('notification-card', !notification.read && 'notification-card--unread')}
      >
        <div className="notification-card__content">
          <div className={cn('notification-card__icon', iconColorMap[notification.type])}>
            <Icon size={18} />
          </div>
          <div className="notification-card__body">
            <div className="notification-card__header">
              <Text size="sm" weight="medium">
                {notification.title}
              </Text>
              {!notification.read && <span className="notification-card__dot" />}
            </div>
            <Text size="xs" color="secondary" className="notification-card__message">
              {notification.message}
            </Text>
            <Text size="xs" color="tertiary">
              {formatRelativeDate(notification.createdAt)}
            </Text>
          </div>
        </div>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={handleDelete}>
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}
