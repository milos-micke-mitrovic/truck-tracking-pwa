import { useParams, useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonBackButton, IonButtons } from '@ionic/react';
import { Navigation, Camera, Clock, MapPin, FileText, Shield } from 'lucide-react';
import { Header, Card, Text, Button, Badge } from '@/shared/ui';
import { formatDate } from '@/shared/utils';
import { StopStatusBadge } from '../components/StopStatusBadge';
import { useRouteDetail } from '../hooks/use-route-detail';
import { StopType, PodStatus } from '../types/route.types';
import type { RouteStopResponse } from '../types/route.types';

export function StopDetailPage() {
  const { id: routeId, stopId } = useParams<{ id: string; stopId: string }>();
  const history = useHistory();
  const { route } = useRouteDetail(routeId);

  const stop: RouteStopResponse | undefined = route?.stops.find((s) => s.id === stopId);

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

  const handleNavigate = () => {
    if (stop.facility.latitude && stop.facility.longitude) {
      history.push('/tabs/map', {
        destination: {
          lat: stop.facility.latitude,
          lng: stop.facility.longitude,
          address: `${stop.facility.address}, ${stop.facility.city}, ${stop.facility.state} ${stop.facility.zip}`,
          customer: stop.facility.name,
        },
        navigationTimestamp: Date.now(),
      });
    }
  };

  const handleSubmitPod = () => {
    history.push(`/tabs/loads/${routeId}/stops/${stopId}/pod`);
  };

  return (
    <IonPage>
      <Header
        title={`${stop.type === StopType.PICKUP ? 'Pickup' : 'Delivery'} #${stop.stopNumber}`}
        leftContent={
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/tabs/loads/${routeId}`} />
          </IonButtons>
        }
      />
      <IonContent>
        <div className="stop-detail-page">
          <Card className="stop-detail-page__header-card">
            <div className="stop-detail-page__type-row">
              <Badge variant={isDelivery ? 'info' : 'warning'}>{stop.type}</Badge>
              <StopStatusBadge status={stop.status} />
            </div>

            <Text size="lg" weight="semibold">
              {stop.facility.name}
            </Text>

            <div className="stop-detail-page__address">
              <MapPin size={16} />
              <Text size="sm" color="secondary">
                {stop.facility.address}, {stop.facility.city}, {stop.facility.state}{' '}
                {stop.facility.zip}
              </Text>
            </div>

            {(stop.appointmentStartDate || stop.appointmentEndDate) && (
              <div className="stop-detail-page__appointment">
                <Clock size={16} />
                <Text size="sm" color="secondary">
                  {stop.appointmentStartDate &&
                    formatDate(stop.appointmentStartDate, 'MMM d, h:mm a')}
                  {stop.appointmentEndDate && ` - ${formatDate(stop.appointmentEndDate, 'h:mm a')}`}
                </Text>
              </div>
            )}

            {stop.notes && (
              <Text size="sm" color="secondary" className="stop-detail-page__notes">
                {stop.notes}
              </Text>
            )}
          </Card>

          <div className="stop-detail-page__actions">
            {stop.facility.latitude && stop.facility.longitude && (
              <Button variant="solid" fullWidth onClick={handleNavigate}>
                <Navigation size={18} />
                Navigate to Facility
              </Button>
            )}

            {isDelivery && stop.podStatus === PodStatus.NOT_SUBMITTED && (
              <Button variant="outline" fullWidth onClick={handleSubmitPod}>
                <Camera size={18} />
                Submit POD
              </Button>
            )}
          </div>

          {stop.referenceNumbers.length > 0 && (
            <Card title="Reference Numbers" className="stop-detail-page__card">
              <div className="stop-detail-page__refs">
                {stop.referenceNumbers.map((ref) => (
                  <div key={ref.id} className="stop-detail-page__ref-row">
                    <Text as="span" size="sm" color="secondary">
                      {ref.type}
                    </Text>
                    <Text as="span" size="sm" weight="medium">
                      {ref.value}
                    </Text>
                  </div>
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
                    {acc.replace(/_/g, ' ')}
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
                    <Text size="sm">{doc.replace(/_/g, ' ')}</Text>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {stop.podStatus !== PodStatus.NOT_SUBMITTED && (
            <Card title="POD Status" className="stop-detail-page__card">
              <Badge variant={stop.podStatus === PodStatus.APPROVED ? 'success' : 'info'}>
                {stop.podStatus}
              </Badge>
            </Card>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
