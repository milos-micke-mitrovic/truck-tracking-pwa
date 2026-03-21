import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonContent, IonBackButton, IonButtons } from '@ionic/react';
import { Header, Card, Skeleton, Button } from '@/shared/ui';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';
import { useNotificationsStore } from '@/features/notifications/stores/use-notifications-store';
import { notificationsApi } from '@/features/notifications/api/notifications.api';
import { NotificationType } from '@/features/notifications/types/notification.types';
import { useAuthStore } from '@/shared/stores/use-auth-store';
import { useRouteDetail } from '../hooks/use-route-detail';
import { RouteDetailHeader } from '../components/RouteDetailHeader';
import { RouteStopTimeline } from '../components/RouteStopTimeline';
import { RouteStatusActions } from '../components/RouteStatusActions';
import { RouteInfoSection } from '../components/RouteInfoSection';

export function RouteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { route, isLoading, error, refresh } = useRouteDetail(id);
  const user = useAuthStore((s) => s.user);
  const { notifications, markAsRead } = useNotificationsStore();

  // Auto-mark ROUTE_ASSIGNED notifications as read when viewing the route
  useEffect(() => {
    if (!route || !user) return;

    const unreadAssigned = notifications.filter(
      (n) => !n.read && n.type === NotificationType.ROUTE_ASSIGNED && n.referenceId === route.id
    );

    unreadAssigned.forEach((n) => {
      markAsRead(n.id);
      notificationsApi.markAsRead(n.id, user.driverId).catch(() => {
        // Silently ignore — local state is already updated
      });
    });
  }, [route, user, notifications, markAsRead]);

  return (
    <IonPage>
      <Header
        title={route?.brokerIdentifier || route?.internalIdentifier || 'Load Details'}
        leftContent={
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/loads" />
          </IonButtons>
        }
        rightContent={<NotificationBell />}
      />
      <IonContent>
        <div className="route-detail-page">
          {isLoading && !route && <RouteDetailSkeleton />}

          {error && (
            <div className="route-detail-page__error">
              <p>{error}</p>
              <Button variant="outline" size="small" onClick={refresh}>
                Retry
              </Button>
            </div>
          )}

          {route && (
            <>
              <RouteDetailHeader route={route} />
              <RouteStatusActions routeId={route.id} status={route.status} />
              <RouteStopTimeline stops={route.stops} routeId={route.id} />
              <RouteInfoSection route={route} />
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}

function RouteDetailSkeleton() {
  return (
    <div
      style={{
        padding: 'var(--spacing-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
      }}
    >
      {/* Header card */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <Skeleton width="50%" height={22} />
          <Skeleton width={70} height={24} variant="rectangular" />
        </div>
        <Skeleton width="70%" height={14} />
        <div style={{ marginTop: 8 }}>
          <Skeleton width="55%" height={14} />
        </div>
      </Card>

      {/* Actions */}
      <Skeleton width="100%" height={44} variant="rectangular" />

      {/* Timeline stops */}
      <Card>
        <Skeleton width="30%" height={18} />
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 12 }}>
              <Skeleton width={24} height={24} variant="circular" />
              <div style={{ flex: 1 }}>
                <Skeleton width="60%" height={14} />
                <div style={{ marginTop: 6 }}>
                  <Skeleton width="80%" height={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Info section */}
      <Card>
        <Skeleton width="35%" height={18} />
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton width="30%" height={14} />
              <Skeleton width="40%" height={14} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
