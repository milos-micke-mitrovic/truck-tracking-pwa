import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/shared/utils';

type IonCardProps = ComponentProps<typeof IonCard>;

export type CardAccent = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface CardProps extends IonCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  accent?: CardAccent;
}

export function Card({ children, title, subtitle, accent, className, ...props }: CardProps) {
  return (
    <IonCard className={cn('card', accent && `card--accent-${accent}`, className)} {...props}>
      {(title || subtitle) && (
        <IonCardHeader>
          {title && <IonCardTitle>{title}</IonCardTitle>}
          {subtitle && <IonCardSubtitle>{subtitle}</IonCardSubtitle>}
        </IonCardHeader>
      )}
      <IonCardContent>{children}</IonCardContent>
    </IonCard>
  );
}
