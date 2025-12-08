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
import { home, person, navigate } from 'ionicons/icons';
import { HomePage } from '@/features/home/pages/HomePage';
import { MapPage } from '@/features/map/pages/MapPage';
import { ProfilePage } from '@/features/profile';
import { AuthGuard } from './AuthGuard';

export function TabsLayout() {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push('/tabs/home');
  };

  const handleMapClick = () => {
    history.push('/tabs/map');
  };

  const handleProfileClick = () => {
    history.push('/tabs/profile');
  };

  return (
    <AuthGuard>
      <IonTabs>
        <IonRouterOutlet animation={iosTransitionAnimation}>
          <Route exact path="/tabs/home" component={HomePage} />
          <Route exact path="/tabs/map" component={MapPage} />
          <Route exact path="/tabs/profile" component={ProfilePage} />
          <Route exact path="/tabs">
            <Redirect to="/tabs/home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" onClick={handleHomeClick}>
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          {/* Spacer for center FAB */}
          <IonTabButton disabled className="tab-button-spacer">
            <span />
          </IonTabButton>

          <IonTabButton tab="profile" onClick={handleProfileClick}>
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
    </AuthGuard>
  );
}
