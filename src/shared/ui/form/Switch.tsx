import { IonToggle } from '@ionic/react';
import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils';
import { Text } from '../typography';

type IonToggleProps = ComponentProps<typeof IonToggle>;

export interface SwitchProps extends Omit<IonToggleProps, 'labelPlacement'> {
  label?: string;
  helperText?: string;
}

export function Switch({ label, helperText, className, ...props }: SwitchProps) {
  return (
    <div className={cn('switch-wrapper', className)}>
      <IonToggle labelPlacement="start" justify="space-between" {...props}>
        {label && (
          <Text size="base" className="switch-wrapper__label">
            {label}
          </Text>
        )}
      </IonToggle>
      {helperText && (
        <Text size="xs" color="tertiary" className="switch-wrapper__helper">
          {helperText}
        </Text>
      )}
    </div>
  );
}
