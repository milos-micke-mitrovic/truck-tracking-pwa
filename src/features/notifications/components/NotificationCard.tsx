import { useHistory } from 'react-router-dom';
import { Truck, FileCheck, FileX, XCircle, RefreshCw, Info } from 'lucide-react';
import { ActionCard, Text } from '@/shared/ui';
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
  const markAsRead = useNotificationsStore((state) => state.markAsRead);

  const Icon = iconMap[notification.type];

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
      notificationsApi.markAsRead(notification.id, notification.recipientDriverId).catch(() => {});
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

  return (
    <ActionCard
      color="primary"
      className={cn('notification-card', !notification.read && 'notification-card--unread')}
      onClick={handleClick}
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
            {notification.body}
          </Text>
          <Text size="xs" color="tertiary">
            {formatRelativeDate(notification.createdAt)}
          </Text>
        </div>
      </div>
    </ActionCard>
  );
}
