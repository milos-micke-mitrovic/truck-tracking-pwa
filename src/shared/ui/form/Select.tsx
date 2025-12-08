import { IonSelect, IonSelectOption } from '@ionic/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { cn } from '@/shared/utils';
import { Text } from '../typography';

type IonSelectProps = ComponentProps<typeof IonSelect>;

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<IonSelectProps, 'children'> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  helperText,
  error,
  options,
  placeholder = 'Select...',
  className,
  ...props
}: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error;

  return (
    <div className="input-wrapper">
      {label && (
        <Text
          as="label"
          size="sm"
          weight="medium"
          color="secondary"
          className="input-wrapper__label"
        >
          {label}
        </Text>
      )}
      <div
        className={cn(
          'input-wrapper__field',
          'input-wrapper__field--select',
          isFocused && 'input-wrapper__field--focused',
          hasError && 'input-wrapper__field--error'
        )}
      >
        <IonSelect
          interface="popover"
          placeholder={placeholder}
          className={cn('select', className)}
          interfaceOptions={{ cssClass: 'select-popover' }}
          onIonFocus={() => setIsFocused(true)}
          onIonBlur={() => setIsFocused(false)}
          {...props}
        >
          {options.map((option) => (
            <IonSelectOption key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </IonSelectOption>
          ))}
        </IonSelect>
      </div>
      {(error || helperText) && (
        <Text size="xs" color={hasError ? 'danger' : 'tertiary'} className="input-wrapper__helper">
          {error || helperText}
        </Text>
      )}
    </div>
  );
}
