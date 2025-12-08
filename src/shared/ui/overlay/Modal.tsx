import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from '@ionic/react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { IconButton } from '../buttons';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  fullscreen?: boolean;
  initialBreakpoint?: number;
  breakpoints?: number[];
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  fullscreen = false,
  initialBreakpoint,
  breakpoints,
}: ModalProps) {
  const isSheet = initialBreakpoint !== undefined;

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className={isSheet ? 'modal-sheet' : ''}
      initialBreakpoint={initialBreakpoint}
      breakpoints={breakpoints}
    >
      {title && (
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
            {showCloseButton && (
              <IonButtons slot="end">
                <IconButton icon={<X size={24} />} aria-label="Close modal" onClick={onClose} />
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent fullscreen={fullscreen}>{children}</IonContent>
    </IonModal>
  );
}
