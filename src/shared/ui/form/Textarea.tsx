import { IonTextarea } from '@ionic/react';
import type { ComponentProps } from 'react';
import { forwardRef, useState } from 'react';
import { cn } from '@/shared/utils';
import { Text } from '../typography';

type IonTextareaProps = ComponentProps<typeof IonTextarea>;

export interface TextareaProps extends Omit<IonTextareaProps, 'label'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLIonTextareaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
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
            'input-wrapper__field--textarea',
            isFocused && 'input-wrapper__field--focused',
            hasError && 'input-wrapper__field--error'
          )}
        >
          <IonTextarea
            ref={ref}
            className={cn('textarea', className)}
            onIonFocus={() => setIsFocused(true)}
            onIonBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <Text
            size="xs"
            color={hasError ? 'danger' : 'tertiary'}
            className="input-wrapper__helper"
          >
            {error || helperText}
          </Text>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
