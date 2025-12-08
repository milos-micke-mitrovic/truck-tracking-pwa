import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { Header, Card, Button, Avatar, Heading, Text, Switch } from '@/shared/ui';
import { useAuthStore } from '@/shared/stores';
import { useTheme } from '@/shared/hooks';

export function ProfilePage() {
  const router = useIonRouter();
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.push('/login', 'root', 'replace');
  };

  return (
    <IonPage>
      <Header title="Profile" />
      <IonContent>
        <div className="profile-page">
          <div className="profile-page__header">
            <Avatar alt={user?.name || 'User'} size="xl" />
            <Heading level={2} className="profile-page__name">
              {user?.name || 'Driver'}
            </Heading>
            <Text size="sm" color="secondary" className="profile-page__email">
              {user?.email || 'driver@example.com'}
            </Text>
          </div>

          <Card title="Driver Information" className="profile-page__card">
            <div className="profile-page__info">
              <div className="profile-page__info-row">
                <Text as="span" size="sm" color="secondary" className="profile-page__info-label">
                  Driver ID
                </Text>
                <Text as="span" size="sm" weight="medium">
                  {user?.driverId || 'DRV-001'}
                </Text>
              </div>
              <div className="profile-page__info-row">
                <Text as="span" size="sm" color="secondary" className="profile-page__info-label">
                  Status
                </Text>
                <Text as="span" size="sm" weight="medium" color="success">
                  Active
                </Text>
              </div>
              <div className="profile-page__info-row">
                <Text as="span" size="sm" color="secondary" className="profile-page__info-label">
                  License
                </Text>
                <Text as="span" size="sm" weight="medium">
                  CDL Class A
                </Text>
              </div>
              <div className="profile-page__info-row">
                <Text as="span" size="sm" color="secondary" className="profile-page__info-label">
                  Experience
                </Text>
                <Text as="span" size="sm" weight="medium">
                  5 years
                </Text>
              </div>
            </div>
          </Card>

          <Card title="Vehicle" className="profile-page__card">
            <div className="profile-page__info">
              <div className="profile-page__info-row">
                <Text as="span" size="sm" color="secondary" className="profile-page__info-label">
                  Truck
                </Text>
                <Text as="span" size="sm" weight="medium">
                  Freightliner Cascadia
                </Text>
              </div>
              <div className="profile-page__info-row">
                <Text as="span" size="sm" color="secondary" className="profile-page__info-label">
                  Plate
                </Text>
                <Text as="span" size="sm" weight="medium">
                  ABC-1234
                </Text>
              </div>
            </div>
          </Card>

          <Card title="Appearance" className="profile-page__card">
            <Switch
              label="Dark Mode"
              helperText="Toggle between light and dark theme"
              checked={isDark}
              onIonChange={toggleTheme}
            />
          </Card>

          <div className="profile-page__actions">
            <Button variant="outline" fullWidth onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
