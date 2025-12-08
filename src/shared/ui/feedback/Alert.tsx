import { IonAlert } from '@ionic/react';

export interface AlertButton {
  text: string;
  role?: 'cancel' | 'destructive';
  handler?: () => void | boolean;
}

export interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  subHeader?: string;
  message: string;
  buttons?: AlertButton[];
}

export function Alert({
  isOpen,
  onClose,
  header,
  subHeader,
  message,
  buttons = [{ text: 'OK' }],
}: AlertProps) {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header={header}
      subHeader={subHeader}
      message={message}
      buttons={buttons}
    />
  );
}
