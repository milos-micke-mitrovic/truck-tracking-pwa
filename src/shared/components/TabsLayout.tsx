import { useState, useEffect } from 'react';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonFab,
  IonFabButton,
  IonToast,
  IonAlert,
  iosTransitionAnimation,
} from '@ionic/react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { home, person, navigate, cube, cloudOfflineOutline } from 'ionicons/icons';
import { useRoutesStore } from '@/features/routes/stores/use-routes-store';
import { RouteStatus } from '@/features/routes/types/route.types';
import { HomePage } from '@/features/home/pages/HomePage';
import { MapPage } from '@/features/map/pages/MapPage';
import { ProfilePage } from '@/features/profile';
import { RoutesListPage } from '@/features/routes/pages/RoutesListPage';
import { RouteDetailPage } from '@/features/routes/pages/RouteDetailPage';
import { StopDetailPage } from '@/features/routes/pages/StopDetailPage';
import { PodSubmitPage } from '@/features/routes/pages/PodSubmitPage';
import { NotificationsListPage } from '@/features/notifications/pages/NotificationsListPage';
import { AuthGuard } from './AuthGuard';
import { useSSE } from '@/shared/hooks/use-sse';
import { Toast } from '@/shared/ui';

export function TabsLayout() {
  const { toast, dismissToast, routeAlert, dismissRouteAlert, isConnected } = useSSE();
  const history = useHistory();
  const routes = useRoutesStore((state) => state.routes);

  const activeStatuses: RouteStatus[] = [
    RouteStatus.BOOKED,
    RouteStatus.DISPATCHED,
    RouteStatus.IN_TRANSIT,
    RouteStatus.AT_PICKUP,
    RouteStatus.LOADED,
    RouteStatus.AT_DELIVERY,
  ];
  const activeLoadsCount = routes.filter((r) => activeStatuses.includes(r.status)).length;

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const handleMapClick = () => {
    history.push('/tabs/map');
  };

  return (
    <AuthGuard>
      {!isOnline && (
        <div className="offline-banner">
          <IonIcon icon={cloudOfflineOutline} />
          You're offline — showing cached data
        </div>
      )}
      <IonTabs>
        <IonRouterOutlet animation={iosTransitionAnimation}>
          <Route exact path="/tabs/home" component={HomePage} />
          <Route exact path="/tabs/loads" component={RoutesListPage} />
          <Route exact path="/tabs/loads/:id" component={RouteDetailPage} />
          <Route exact path="/tabs/loads/:id/stops/:stopId" component={StopDetailPage} />
          <Route exact path="/tabs/loads/:id/stops/:stopId/pod" component={PodSubmitPage} />
          <Route exact path="/tabs/map" component={MapPage} />
          <Route exact path="/tabs/notifications" component={NotificationsListPage} />
          <Route exact path="/tabs/profile" component={ProfilePage} />
          <Route exact path="/tabs">
            <Redirect to="/tabs/home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/tabs/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="loads" href="/tabs/loads">
            <IonIcon icon={cube} />
            <IonLabel>Loads</IonLabel>
            {activeLoadsCount > 0 && <span className="tab-badge">{activeLoadsCount}</span>}
          </IonTabButton>

          {/* Center spacer for FAB */}
          <IonTabButton disabled className="tab-button-spacer tab-button-spacer--fab">
            <span />
          </IonTabButton>

          {/* Right spacer — mirrors Loads position for symmetry */}
          <IonTabButton disabled className="tab-button-spacer">
            <span />
          </IonTabButton>

          <IonTabButton tab="profile" href="/tabs/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

      {/* Center FAB - uses Ionic's native positioning */}
      <IonFab vertical="bottom" horizontal="center" className="tab-bar-fab">
        <IonFabButton onClick={handleMapClick} className="tab-bar-fab__button">
          <IonIcon icon={navigate} />
        </IonFabButton>
      </IonFab>

      {/* SSE offline banner — shown when real-time connection is lost */}
      <IonToast
        isOpen={isConnected === false}
        message="Reconnecting to live updates..."
        position="top"
        color="warning"
        icon={cloudOfflineOutline}
        className="toast"
      />

      {/* SSE event toast — with optional action button (e.g. POD_REJECTED "View Route") */}
      {toast.actionLabel && toast.onAction ? (
        <IonToast
          isOpen={toast.isOpen}
          message={toast.message}
          duration={6000}
          position="top"
          color={
            toast.variant === 'error'
              ? 'danger'
              : toast.variant === 'success'
                ? 'success'
                : toast.variant === 'warning'
                  ? 'warning'
                  : 'primary'
          }
          buttons={[
            {
              text: toast.actionLabel,
              handler: () => {
                toast.onAction?.();
                dismissToast();
              },
            },
            { role: 'cancel', text: 'Dismiss', handler: dismissToast },
          ]}
          onDidDismiss={dismissToast}
          className="toast"
        />
      ) : (
        <Toast
          isOpen={toast.isOpen}
          message={toast.message}
          variant={toast.variant}
          duration={4000}
          onDidDismiss={dismissToast}
        />
      )}

      {/* ROUTE_ASSIGNED alert */}
      <IonAlert
        isOpen={routeAlert.isOpen}
        header="New Route Assigned"
        message={routeAlert.message}
        cssClass="route-assigned-alert"
        buttons={[
          {
            text: 'View Route',
            cssClass: 'route-assigned-alert__view-btn',
            handler: () => {
              if (routeAlert.routeId) {
                history.push(`/tabs/loads/${routeAlert.routeId}`);
              } else {
                history.push('/tabs/loads');
              }
              dismissRouteAlert();
            },
          },
          {
            text: 'Later',
            role: 'cancel',
            handler: dismissRouteAlert,
          },
        ]}
        onDidDismiss={dismissRouteAlert}
      />
    </AuthGuard>
  );
}
