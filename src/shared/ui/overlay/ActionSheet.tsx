import { IonActionSheet } from '@ionic/react';
import type { ReactNode } from 'react';

export interface ActionSheetButton {
  text: string;
  role?: 'cancel' | 'destructive' | 'selected';
  icon?: ReactNode;
  handler?: () => void | boolean;
}

export interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  subHeader?: string;
  buttons: ActionSheetButton[];
}

export function ActionSheet({ isOpen, onClose, header, subHeader, buttons }: ActionSheetProps) {
  return (
    <IonActionSheet
      isOpen={isOpen}
      onDidDismiss={onClose}
      header={header}
      subHeader={subHeader}
      buttons={buttons.map((button) => ({
        ...button,
        icon: button.icon as string | undefined,
      }))}
    />
  );
}
