import { IonFab, IonFabButton } from '@ionic/react';
import type { ReactNode } from 'react';

export interface FabProps {
  icon: ReactNode;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  'aria-label': string;
}

const positionMap: Record<
  string,
  { vertical: 'top' | 'bottom'; horizontal: 'start' | 'end' | 'center' }
> = {
  'bottom-right': { vertical: 'bottom', horizontal: 'end' },
  'bottom-left': { vertical: 'bottom', horizontal: 'start' },
  'bottom-center': { vertical: 'bottom', horizontal: 'center' },
  'top-right': { vertical: 'top', horizontal: 'end' },
  'top-left': { vertical: 'top', horizontal: 'start' },
};

export function Fab({
  icon,
  onClick,
  position = 'bottom-right',
  color = 'primary',
  disabled = false,
  'aria-label': ariaLabel,
}: FabProps) {
  const { vertical, horizontal } = positionMap[position];

  return (
    <IonFab vertical={vertical} horizontal={horizontal} slot="fixed">
      <IonFabButton color={color} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
        {icon}
      </IonFabButton>
    </IonFab>
  );
}
