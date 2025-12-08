import { IonLoading } from '@ionic/react';

export interface LoadingOverlayProps {
  isOpen: boolean;
  message?: string;
  duration?: number;
  onDidDismiss?: () => void;
}

export function LoadingOverlay({
  isOpen,
  message = 'Please wait...',
  duration,
  onDidDismiss,
}: LoadingOverlayProps) {
  return (
    <IonLoading isOpen={isOpen} message={message} duration={duration} onDidDismiss={onDidDismiss} />
  );
}
