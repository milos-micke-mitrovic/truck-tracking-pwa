import { IonApp, IonRouterOutlet, iosTransitionAnimation } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { I18nProvider } from '@/shared/i18n';
import { ErrorBoundary, OfflineBanner, TabsLayout } from '@/shared/components';
import { LoginPage } from '@/features/auth/pages/LoginPage';

export function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <IonApp>
          <OfflineBanner />
          <IonReactRouter>
            <IonRouterOutlet animation={iosTransitionAnimation}>
              <Route exact path="/login" component={LoginPage} />
              <Route path="/tabs" component={TabsLayout} />
              <Route>
                <Redirect to="/login" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </I18nProvider>
    </ErrorBoundary>
  );
}
