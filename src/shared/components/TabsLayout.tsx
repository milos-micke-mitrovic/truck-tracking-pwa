import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonFab,
  IonFabButton,
  iosTransitionAnimation,
} from '@ionic/react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { home, person, navigate, cube } from 'ionicons/icons';
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
  const { toast, dismissToast } = useSSE();
  const history = useHistory();

  const handleMapClick = () => {
    history.push('/tabs/map');
  };

  return (
    <AuthGuard>
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

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        variant={toast.variant}
        duration={4000}
        onDidDismiss={dismissToast}
      />
    </AuthGuard>
  );
}
