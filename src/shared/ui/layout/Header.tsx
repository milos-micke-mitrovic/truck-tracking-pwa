import { IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/react';
import type { ReactNode } from 'react';
import { cn } from '@/shared/utils';

export interface HeaderProps {
  title: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  rounded?: boolean;
  className?: string;
}

export function Header({
  title,
  leftContent,
  rightContent,
  rounded = true,
  className,
}: HeaderProps) {
  return (
    <IonHeader className={cn('header', rounded && 'header-rounded', className)}>
      <IonToolbar>
        {leftContent && <IonButtons slot="start">{leftContent}</IonButtons>}
        <IonTitle>{title}</IonTitle>
        {rightContent && <IonButtons slot="end">{rightContent}</IonButtons>}
      </IonToolbar>
    </IonHeader>
  );
}
