import { useState, useMemo } from 'react';
import {
  IonButtons,
  IonBackButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/react';
import { MoreVertical } from 'lucide-react';
import { PageLayout } from '@/shared/components';
import { IconButton, Skeleton, EmptyState, ActionSheet } from '@/shared/ui';
import type { ActionSheetButton } from '@/shared/ui';
import { NotificationCard } from '../components/NotificationCard';
import { NotificationsFilter, type NotificationFilterTab } from '../components/NotificationsFilter';
import { useNotifications } from '../hooks/use-notifications';
import { useNotificationsStore } from '../stores/use-notifications-store';
import { notificationsApi } from '../api/notifications.api';
import { useAuthStore } from '@/shared/stores';

export function NotificationsListPage() {
  const [filter, setFilter] = useState<NotificationFilterTab>('all');
  const [showActions, setShowActions] = useState(false);
  const { notifications, isLoading, hasMore, refresh, loadMore } = useNotifications();
  const { unreadCount, markAllAsRead, clearNotifications } = useNotificationsStore();
  const user = useAuthStore((state) => state.user);

  const filteredNotifications = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter((n) => !n.read);
    }
    return notifications;
  }, [notifications, filter]);

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    if (user?.driverId) {
      notificationsApi.markAllAsRead(user.driverId).catch(() => {});
    }
  };

  const handleClearAll = () => {
    clearNotifications();
    if (user?.driverId) {
      notificationsApi.deleteAllNotifications(user.driverId).catch(() => {});
    }
  };

  const handleLoadMore = async (event: CustomEvent<void>) => {
    await loadMore();
    void (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  const headerLeft = (
    <IonButtons slot="start">
      <IonBackButton defaultHref="/tabs/home" />
    </IonButtons>
  );

  const actionButtons: ActionSheetButton[] = [];
  if (unreadCount > 0) {
    actionButtons.push({ text: 'Mark all as read', handler: handleMarkAllAsRead });
  }
  if (notifications.length > 0) {
    actionButtons.push({ text: 'Clear all', role: 'destructive', handler: handleClearAll });
  }
  actionButtons.push({ text: 'Cancel', role: 'cancel' });

  const headerRight =
    notifications.length > 0 ? (
      <IconButton
        icon={<MoreVertical size={20} />}
        aria-label="More actions"
        onClick={() => setShowActions(true)}
      />
    ) : undefined;

  return (
    <PageLayout
      title="Notifications"
      headerLeftContent={headerLeft}
      headerRightContent={headerRight}
      onRefresh={refresh}
    >
      <div className="notifications-list-page">
        <NotificationsFilter value={filter} onChange={setFilter} />

        {isLoading && !notifications.length ? (
          <div className="notifications-list-page__list">
            {Array.from({ length: 4 }).map((_, i) => (
              <NotificationCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <EmptyState
            title={filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            description={
              filter === 'unread'
                ? "You're all caught up!"
                : 'Notifications about your routes and deliveries will appear here.'
            }
          />
        ) : (
          <div className="notifications-list-page__list">
            {filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </div>

      {filter === 'all' && hasMore && (
        <IonInfiniteScroll threshold="100px" onIonInfinite={handleLoadMore}>
          <IonInfiniteScrollContent loadingSpinner="crescent" />
        </IonInfiniteScroll>
      )}

      <ActionSheet
        isOpen={showActions}
        onClose={() => setShowActions(false)}
        header="Notifications"
        buttons={actionButtons}
      />
    </PageLayout>
  );
}

function NotificationCardSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--spacing-sm)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        background: 'var(--card-background)',
        borderRadius: 'var(--card-border-radius)',
      }}
    >
      <Skeleton variant="circular" width={36} height={36} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <Skeleton width="50%" height={14} />
          <Skeleton width={50} height={12} />
        </div>
        <Skeleton width="85%" height={12} />
        <div style={{ marginTop: 4 }}>
          <Skeleton width="60%" height={12} />
        </div>
      </div>
    </div>
  );
}
