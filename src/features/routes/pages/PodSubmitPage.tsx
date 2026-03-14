import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonButtons } from '@ionic/react';
import { Camera, X, ChevronLeft } from 'lucide-react';
import { Header, Card, Textarea, Button, Text, Alert } from '@/shared/ui';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';
import { usePodSubmit } from '../hooks/use-pod-submit';
import { useCamera, type CameraPhoto } from '@/shared/hooks/use-camera';
import { routesApi } from '../api/routes.api';
import { useRoutesStore } from '../stores/use-routes-store';
import { mapRouteResponseToShort } from '../types/route.types';

export function PodSubmitPage() {
  const { id: routeId, stopId } = useParams<{ id: string; stopId: string }>();
  const history = useHistory();
  const { submitPod, isLoading, error, uploadProgress } = usePodSubmit();
  const { takePhoto } = useCamera();
  const { setActiveRoute, updateRouteInList } = useRoutesStore();
  const [photos, setPhotos] = useState<CameraPhoto[]>([]);
  const [notes, setNotes] = useState('');
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);

  const hasUnsavedChanges = photos.length > 0;

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowLeaveAlert(true);
    } else {
      history.goBack();
    }
  };

  const handleConfirmLeave = () => {
    setShowLeaveAlert(false);
    history.goBack();
  };

  const handleAddPhoto = async () => {
    const photo = await takePhoto();
    if (photo) {
      setPhotos((prev) => [...prev, photo]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (photos.length === 0) return;

    try {
      await submitPod(stopId, photos, notes || undefined);

      // Refetch route to get updated status & completedAt from backend
      try {
        const updatedRoute = await routesApi.getRoute(routeId);
        setActiveRoute(updatedRoute);
        const shortRoute = mapRouteResponseToShort(updatedRoute);
        updateRouteInList(updatedRoute.id, {
          status: shortRoute.status,
          completedAt: shortRoute.completedAt,
        });
      } catch {
        // Non-critical — route will update on next list fetch
      }

      history.goBack();
    } catch {
      // Error handled by hook
    }
  };

  return (
    <IonPage>
      <Header
        title="Submit POD"
        leftContent={
          <IonButtons slot="start">
            <button
              type="button"
              onClick={handleBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ion-color-primary)',
              }}
            >
              <ChevronLeft size={24} />
            </button>
          </IonButtons>
        }
        rightContent={<NotificationBell />}
      />
      <IonContent>
        <div className="pod-submit-page">
          <Card title="Photos">
            <div className="pod-photo-gallery">
              {photos.map((photo, index) => (
                <div key={index} className="pod-photo-gallery__item">
                  <img src={photo.dataUrl} alt={`POD photo ${index + 1}`} />
                  <button
                    type="button"
                    className="pod-photo-gallery__remove"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button type="button" className="pod-photo-gallery__add" onClick={handleAddPhoto}>
                <Camera size={24} />
                <Text size="xs">Add Photo</Text>
              </button>
            </div>
          </Card>

          <Card title="Notes">
            <Textarea
              placeholder="Add notes about the delivery..."
              value={notes}
              onIonInput={(e) => setNotes(e.detail.value ?? '')}
            />
          </Card>

          {error && (
            <Text size="sm" className="pod-submit-page__error">
              {error}
            </Text>
          )}

          <Button
            variant="solid"
            fullWidth
            loading={isLoading}
            disabled={photos.length === 0}
            onClick={handleSubmit}
          >
            {uploadProgress ??
              `Submit POD (${photos.length} photo${photos.length !== 1 ? 's' : ''})`}
          </Button>
        </div>
      </IonContent>

      <Alert
        isOpen={showLeaveAlert}
        onClose={() => setShowLeaveAlert(false)}
        header="Unsaved Photos"
        message="You have photos that haven't been submitted. Are you sure you want to leave?"
        buttons={[
          { text: 'Cancel', role: 'cancel' },
          { text: 'Leave', role: 'destructive', handler: handleConfirmLeave },
        ]}
      />
    </IonPage>
  );
}
