import { IonCheckbox } from '@ionic/react';
import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils';
import { Text } from '../typography';

type IonCheckboxProps = ComponentProps<typeof IonCheckbox>;

export interface CheckboxProps extends Omit<IonCheckboxProps, 'labelPlacement'> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Checkbox({ label, helperText, error, className, ...props }: CheckboxProps) {
  const hasError = !!error;

  return (
    <div className={cn('checkbox-wrapper', hasError && 'checkbox-wrapper--error', className)}>
      <IonCheckbox labelPlacement="end" justify="start" {...props}>
        {label && (
          <Text size="base" className="checkbox-wrapper__label">
            {label}
          </Text>
        )}
      </IonCheckbox>
      {(error || helperText) && (
        <Text
          size="xs"
          color={hasError ? 'danger' : 'tertiary'}
          className="checkbox-wrapper__helper"
        >
          {error || helperText}
        </Text>
      )}
    </div>
  );
}
