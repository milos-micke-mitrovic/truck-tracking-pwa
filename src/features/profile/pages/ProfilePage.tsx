import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { Header, Card, Button, Avatar, Heading, Text, Switch, Skeleton } from '@/shared/ui';
import { useAuthStore } from '@/shared/stores';
import { useTheme } from '@/shared/hooks';
import { useProfile } from '../hooks/use-profile';
import { formatDate } from '@/shared/utils';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';

export function ProfilePage() {
  const router = useIonRouter();
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();
  const { driver, vehicle, trailer, isLoading } = useProfile();

  const handleLogout = () => {
    logout();
    router.push('/login', 'root', 'replace');
  };

  return (
    <IonPage>
      <Header title="Profile" rightContent={<NotificationBell />} />
      <IonContent>
        <div className="profile-page">
          <div className="profile-page__header">
            <Avatar alt={user?.name || 'User'} size="xl" />
            <Heading level={2} className="profile-page__name">
              {driver ? `${driver.firstName} ${driver.lastName}` : user?.name || 'Driver'}
            </Heading>
            <Text size="sm" color="secondary" className="profile-page__email">
              {driver?.email || user?.email || 'driver@example.com'}
            </Text>
            {driver?.phoneNumber && (
              <Text size="sm" color="tertiary">
                {driver.phoneNumber}
              </Text>
            )}
          </div>

          {isLoading && !driver ? (
            <>
              <ProfileCardSkeleton rows={4} />
              <ProfileCardSkeleton rows={5} />
              <ProfileCardSkeleton rows={3} />
            </>
          ) : (
            <>
              <Card title="Driver Information" className="profile-page__card">
                <div className="profile-page__info">
                  <ProfileRow label="Driver ID" value={user?.driverId || '-'} />
                  <ProfileRow
                    label="Status"
                    value={driver?.status || 'Active'}
                    valueColor={driver?.status === 'ACTIVE' ? 'success' : undefined}
                  />
                  <ProfileRow label="License" value={driver?.licenseClass || '-'} />
                  <ProfileRow label="License #" value={driver?.licenseNumber || '-'} />
                  {driver?.licenseExpiry && (
                    <ProfileRow
                      label="Expires"
                      value={formatDate(driver.licenseExpiry, 'MMM d, yyyy')}
                    />
                  )}
                  {driver?.companyName && <ProfileRow label="Company" value={driver.companyName} />}
                  {driver?.hireDate && (
                    <ProfileRow
                      label="Hire Date"
                      value={formatDate(driver.hireDate, 'MMM d, yyyy')}
                    />
                  )}
                </div>
              </Card>

              <Card title="Vehicle" className="profile-page__card">
                <div className="profile-page__info">
                  {vehicle ? (
                    <>
                      <ProfileRow label="Unit" value={vehicle.unitNumber} />
                      <ProfileRow
                        label="Truck"
                        value={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      />
                      <ProfileRow label="Plate" value={vehicle.licensePlate} />
                      <ProfileRow label="VIN" value={vehicle.vin} />
                      <ProfileRow
                        label="Mileage"
                        value={`${vehicle.currentMileage.toLocaleString()} mi`}
                      />
                      <ProfileRow label="Fuel" value={vehicle.fuelType} />
                      {vehicle.lastServiceDate && (
                        <ProfileRow
                          label="Last Service"
                          value={formatDate(vehicle.lastServiceDate, 'MMM d, yyyy')}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <ProfileRow label="Truck" value="-" />
                      <ProfileRow label="Plate" value="-" />
                    </>
                  )}
                </div>
              </Card>

              {trailer && (
                <Card title="Trailer" className="profile-page__card">
                  <div className="profile-page__info">
                    <ProfileRow label="Unit" value={trailer.unitNumber} />
                    <ProfileRow label="Type" value={trailer.type} />
                    <ProfileRow label="Make" value={`${trailer.year} ${trailer.make}`} />
                    <ProfileRow label="Length" value={`${trailer.length} ft`} />
                    <ProfileRow
                      label="Max Weight"
                      value={`${trailer.maxWeight.toLocaleString()} lbs`}
                    />
                    <ProfileRow label="Plate" value={trailer.licensePlate} />
                  </div>
                </Card>
              )}
            </>
          )}

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

function ProfileRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="profile-page__info-row">
      <Text as="span" size="sm" color="secondary" className="profile-page__info-label">
        {label}
      </Text>
      <Text as="span" size="sm" weight="medium" color={valueColor as 'success' | undefined}>
        {value}
      </Text>
    </div>
  );
}

function ProfileCardSkeleton({ rows }: { rows: number }) {
  return (
    <Card className="profile-page__card">
      <Skeleton width="40%" height={20} />
      <div className="profile-page__info" style={{ marginTop: 12 }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="profile-page__info-row">
            <Skeleton width="30%" height={14} />
            <Skeleton width="45%" height={14} />
          </div>
        ))}
      </div>
    </Card>
  );
}
