import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonBackButton,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
  useIonRouter,
} from '@ionic/react';
import { Navigation, Camera, Clock, MapPin, FileText, Shield, CheckCircle } from 'lucide-react';
import { Header, Card, Text, Button, Badge, ActionSheet, Toast, Skeleton } from '@/shared/ui';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';
import { formatDate, hapticSuccess, hapticError, copyToClipboard } from '@/shared/utils';
import { StopStatusBadge } from '../components/StopStatusBadge';
import { useRouteDetail } from '../hooks/use-route-detail';
import { useRouteActions } from '../hooks/use-route-actions';
import { StopType, StopStatus } from '../types/route.types';
import type { RouteStopResponse } from '../types/route.types';

// Pickup: En Route → Arrived → Departed
const PICKUP_FLOW: StopStatus[] = [
  StopStatus.PENDING,
  StopStatus.EN_ROUTE,
  StopStatus.ARRIVED,
  StopStatus.DEPARTED,
];

// Delivery: En Route → Arrived → then driver submits POD
// COMPLETED is set automatically when dispatcher approves the POD.
const DELIVERY_FLOW: StopStatus[] = [StopStatus.PENDING, StopStatus.EN_ROUTE, StopStatus.ARRIVED];

const STATUS_LABELS: Record<string, string> = {
  [StopStatus.EN_ROUTE]: 'En Route',
  [StopStatus.ARRIVED]: 'Mark Arrived',
  [StopStatus.DEPARTED]: 'Depart',
};

function getNextStatus(
  currentStatus: StopStatus | null | undefined,
  stopType: StopType
): StopStatus | null {
  const flow = stopType === StopType.PICKUP ? PICKUP_FLOW : DELIVERY_FLOW;

  if (!currentStatus) {
    return StopStatus.EN_ROUTE;
  }

  const currentIndex = flow.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex >= flow.length - 1) {
    return null;
  }

  return flow[currentIndex + 1];
}

function formatAccessory(acc: string): string {
  return acc
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

function CopyableRefRow({ type, value }: { type: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void copyToClipboard(value).then((ok) => {
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    });
  };

  return (
    <div className="stop-detail-page__ref-row" onClick={handleCopy} style={{ cursor: 'pointer' }}>
      <Text as="span" size="sm" color="secondary">
        {type}
      </Text>
      <Text as="span" size="sm" weight="medium" color={copied ? 'success' : undefined}>
        {copied ? 'Copied!' : value}
      </Text>
    </div>
  );
}

export function StopDetailPage() {
  const { id: routeId, stopId } = useParams<{ id: string; stopId: string }>();
  const history = useHistory();
  const router = useIonRouter();
  const { route, refresh } = useRouteDetail(routeId);
  const { updateStopStatus, isLoading: isUpdating } = useRouteActions();

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<StopStatus | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  const stop: RouteStopResponse | undefined = route?.stops.find((s) => String(s.id) === stopId);

  if (!route) {
    return (
      <IonPage>
        <Header
          title="Stop Details"
          leftContent={
            <IonButtons slot="start">
              <IonBackButton defaultHref={`/tabs/loads/${routeId}`} />
            </IonButtons>
          }
          rightContent={<NotificationBell />}
        />
        <IonContent>
          <div className="stop-detail-page">
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <Skeleton width={80} height={24} variant="rectangular" />
                <Skeleton width={70} height={24} variant="rectangular" />
              </div>
              <Skeleton width="70%" height={20} />
              <div style={{ marginTop: 8 }}>
                <Skeleton width="90%" height={14} />
              </div>
            </Card>
            <Skeleton width="100%" height={44} variant="rectangular" />
            <Card>
              <Skeleton width="40%" height={16} />
              <div style={{ marginTop: 12 }}>
                <Skeleton width="100%" height={14} />
              </div>
            </Card>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!stop) {
    return (
      <IonPage>
        <Header
          title="Stop Details"
          leftContent={
            <IonButtons slot="start">
              <IonBackButton defaultHref={`/tabs/loads/${routeId}`} />
            </IonButtons>
          }
          rightContent={<NotificationBell />}
        />
        <IonContent>
          <div className="stop-detail-page__empty">
            <Text color="secondary">Stop not found</Text>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const isDelivery = stop.type === StopType.DELIVERY;
  const nextStatus = getNextStatus(stop.status as StopStatus | null, stop.type);

  const handleStatusAction = () => {
    if (!nextStatus) return;
    setPendingStatus(nextStatus);
    setShowConfirm(true);
  };

  const handleConfirmStatus = () => {
    if (!pendingStatus) return;
    const statusToSet = pendingStatus;
    setPendingStatus(null);
    setShowConfirm(false);
    updateStopStatus(Number(routeId), Number(stopId), statusToSet)
      .then(() => {
        hapticSuccess();
      })
      .catch(() => {
        hapticError();
        setToastMessage('Failed to update stop status. Please try again.');
        setShowErrorToast(true);
      });
  };

  const handleNavigate = () => {
    if (stop.facility?.latitude && stop.facility?.longitude) {
      history.push('/tabs/map', {
        destination: {
          lat: stop.facility.latitude,
          lng: stop.facility.longitude,
          address: `${stop.facility.street ?? ''}, ${stop.facility.city ?? ''}, ${stop.facility.state ?? ''}`,
          customer: stop.facility.name,
        },
        navigationTimestamp: Date.now(),
      });
    }
  };

  const handleSubmitPod = () => {
    router.push(`/tabs/loads/${routeId}/stops/${stopId}/pod`, 'forward', 'push');
  };

  return (
    <IonPage>
      <Header
        title={`${stop.type === StopType.PICKUP ? 'Pickup' : 'Delivery'} #${stop.stopOrder + 1}`}
        leftContent={
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/tabs/loads/${routeId}`} />
          </IonButtons>
        }
        rightContent={<NotificationBell />}
      />
      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={(e) => {
            void refresh().then(() => e.detail.complete());
          }}
        >
          <IonRefresherContent />
        </IonRefresher>
        <div className="stop-detail-page">
          <Card className="stop-detail-page__header-card">
            <div className="stop-detail-page__type-row">
              <Badge variant={isDelivery ? 'info' : 'warning'}>{stop.type}</Badge>
              <StopStatusBadge status={stop.status} />
            </div>

            <Text size="lg" weight="semibold">
              {stop.facility?.name || stop.facility?.city || 'Facility pending'}
            </Text>

            {stop.facility && (
              <div
                className="stop-detail-page__address"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const address = [stop.facility!.street, stop.facility!.city, stop.facility!.state]
                    .filter(Boolean)
                    .join(', ');
                  if (address) {
                    void copyToClipboard(address).then((ok) => {
                      if (ok) {
                        setAddressCopied(true);
                        setTimeout(() => setAddressCopied(false), 1500);
                      }
                    });
                  }
                }}
              >
                <MapPin size={16} />
                <Text size="sm" color={addressCopied ? 'success' : 'secondary'}>
                  {addressCopied
                    ? 'Copied!'
                    : [stop.facility.street, stop.facility.city, stop.facility.state]
                        .filter(Boolean)
                        .join(', ') || 'Address not available'}
                </Text>
              </div>
            )}

            {(stop.arrivalStartDate || stop.arrivalEndDate) && (
              <div className="stop-detail-page__appointment">
                <Clock size={16} />
                <Text size="sm" color="secondary">
                  {stop.arrivalStartDate && formatDate(stop.arrivalStartDate, 'MMM d, h:mm a')}
                  {stop.arrivalEndDate && ` - ${formatDate(stop.arrivalEndDate, 'h:mm a')}`}
                </Text>
              </div>
            )}

            {stop.actualArrivalDate && (
              <div className="stop-detail-page__appointment">
                <CheckCircle size={16} color="var(--color-success, #22c55e)" />
                <Text size="sm" color="secondary">
                  Arrived: {formatDate(stop.actualArrivalDate, 'MMM d, h:mm a')}
                </Text>
              </div>
            )}

            {stop.actualDepartureDate && (
              <div className="stop-detail-page__appointment">
                <CheckCircle size={16} color="var(--color-success, #22c55e)" />
                <Text size="sm" color="secondary">
                  Departed: {formatDate(stop.actualDepartureDate, 'MMM d, h:mm a')}
                </Text>
              </div>
            )}
          </Card>

          <div className="stop-detail-page__actions">
            {stop.facility?.latitude && stop.facility?.longitude && (
              <Button variant="solid" fullWidth onClick={handleNavigate}>
                <Navigation size={18} />
                Navigate to Facility
              </Button>
            )}

            {isDelivery &&
              stop.status !== StopStatus.COMPLETED &&
              stop.status !== StopStatus.SKIPPED && (
                <Button variant="outline" fullWidth onClick={handleSubmitPod}>
                  <Camera size={18} />
                  Submit POD
                </Button>
              )}

            {nextStatus && (
              <Button
                variant="solid"
                fullWidth
                onClick={handleStatusAction}
                disabled={isUpdating}
                loading={isUpdating}
              >
                {STATUS_LABELS[nextStatus]}
              </Button>
            )}
          </div>

          {stop.referenceNumbers.length > 0 && (
            <Card title="Reference Numbers" className="stop-detail-page__card">
              <div className="stop-detail-page__refs">
                {stop.referenceNumbers.map((ref) => (
                  <CopyableRefRow key={ref.id} type={ref.type} value={ref.value} />
                ))}
              </div>
            </Card>
          )}

          {stop.accessories.length > 0 && (
            <Card title="Required Accessories / PPE" className="stop-detail-page__card">
              <div className="stop-detail-page__badges">
                {stop.accessories.map((acc) => (
                  <Badge key={acc} variant="outline">
                    <Shield size={12} />
                    {formatAccessory(acc)}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {stop.requiredDocuments.length > 0 && (
            <Card title="Required Documents" className="stop-detail-page__card">
              <div className="stop-detail-page__docs">
                {stop.requiredDocuments.map((doc) => (
                  <div key={doc} className="stop-detail-page__doc-row">
                    <FileText size={14} />
                    <Text size="sm">{formatAccessory(doc)}</Text>
                  </div>
                ))}
              </div>
            </Card>
          )}
          <ActionSheet
            isOpen={showConfirm}
            onClose={() => {
              setShowConfirm(false);
              setPendingStatus(null);
            }}
            header="Update Stop Status"
            subHeader={
              pendingStatus ? `Set status to "${STATUS_LABELS[pendingStatus]}"?` : undefined
            }
            buttons={[
              {
                text: pendingStatus ? STATUS_LABELS[pendingStatus] : 'Confirm',
                handler: handleConfirmStatus,
              },
              {
                text: 'Cancel',
                role: 'cancel',
              },
            ]}
          />

          <Toast
            isOpen={showErrorToast}
            message={toastMessage}
            variant="error"
            duration={3000}
            onDidDismiss={() => setShowErrorToast(false)}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}
