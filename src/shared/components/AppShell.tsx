import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';

export function AppShell() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={LoginPage} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
