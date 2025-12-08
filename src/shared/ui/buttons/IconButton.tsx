import { IonButton } from '@ionic/react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/shared/utils';

type IonButtonProps = ComponentProps<typeof IonButton>;

export interface IconButtonProps extends Omit<IonButtonProps, 'children'> {
  icon: ReactNode;
  'aria-label': string;
  size?: 'small' | 'default' | 'large';
}

export function IconButton({
  icon,
  'aria-label': ariaLabel,
  size = 'default',
  className,
  ...props
}: IconButtonProps) {
  return (
    <IonButton
      fill="clear"
      aria-label={ariaLabel}
      className={cn(
        'icon-button',
        size === 'small' && 'icon-button--small',
        size === 'large' && 'icon-button--large',
        className
      )}
      {...props}
    >
      {icon}
    </IonButton>
  );
}
