import { IonPage, IonContent } from '@ionic/react';
import { GuestGuard } from '@/shared/components';
import { Heading, Text, Logo } from '@/shared/ui';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <GuestGuard>
      <IonPage>
        <IonContent className="login-page">
          <div className="login-page__container">
            <div className="login-page__header">
              <div className="login-page__logo">
                <Logo size="xl" />
              </div>
              <Heading level={1} className="login-page__title">
                Truck Drive
              </Heading>
              <Text color="secondary" className="login-page__subtitle">
                Sign in to continue
              </Text>
            </div>

            <div className="login-page__form">
              <LoginForm />
            </div>

          </div>
        </IonContent>
      </IonPage>
    </GuestGuard>
  );
}
