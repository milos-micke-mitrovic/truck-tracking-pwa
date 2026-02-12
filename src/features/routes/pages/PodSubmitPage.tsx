import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonBackButton, IonButtons } from '@ionic/react';
import { Camera, X } from 'lucide-react';
import { Header, Card, Textarea, Button, Text } from '@/shared/ui';
import { usePodSubmit } from '../hooks/use-pod-submit';
import { useCamera, type CameraPhoto } from '@/shared/hooks/use-camera';

export function PodSubmitPage() {
  const { id: routeId, stopId } = useParams<{ id: string; stopId: string }>();
  const history = useHistory();
  const { submitPod, isLoading } = usePodSubmit();
  const { takePhoto } = useCamera();
  const [photos, setPhotos] = useState<CameraPhoto[]>([]);
  const [notes, setNotes] = useState('');

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
            <IonBackButton defaultHref={`/tabs/loads/${routeId}/stops/${stopId}`} />
          </IonButtons>
        }
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

          <Button
            variant="solid"
            fullWidth
            loading={isLoading}
            disabled={photos.length === 0}
            onClick={handleSubmit}
          >
            Submit POD ({photos.length} photo{photos.length !== 1 ? 's' : ''})
          </Button>
        </div>
      </IonContent>
    </IonPage>
  );
}
