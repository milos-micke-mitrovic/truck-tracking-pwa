import { IonDatetime, IonModal } from '@ionic/react';
import type { ComponentProps } from 'react';
import { useState, useRef } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/shared/utils';
import { Text } from '../typography';

type IonDatetimeProps = ComponentProps<typeof IonDatetime>;

export interface DatePickerProps extends Omit<IonDatetimeProps, 'presentation'> {
  label?: string;
  helperText?: string;
  error?: string;
  placeholder?: string;
}

export function DatePicker({
  label,
  helperText,
  error,
  placeholder = 'Select date...',
  value,
  onIonChange,
  className,
  ...props
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const modalRef = useRef<HTMLIonModalElement>(null);
  const hasError = !!error;

  const formatDate = (dateString: string | string[] | null | undefined): string => {
    if (!dateString) return '';
    const date = new Date(Array.isArray(dateString) ? dateString[0] : dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const displayValue = formatDate(value);

  const handleCancel = () => {
    void modalRef.current?.dismiss();
  };

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
      <button
        type="button"
        className={cn(
          'input-wrapper__field',
          'input-wrapper__field--picker',
          isFocused && 'input-wrapper__field--focused',
          hasError && 'input-wrapper__field--error',
          className
        )}
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span className={cn('picker__value', !displayValue && 'picker__placeholder')}>
          {displayValue || placeholder}
        </span>
        <Calendar size={20} className="picker__icon" />
      </button>
      {(error || helperText) && (
        <Text size="xs" color={hasError ? 'danger' : 'tertiary'} className="input-wrapper__helper">
          {error || helperText}
        </Text>
      )}

      <IonModal
        ref={modalRef}
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        className="picker-modal"
      >
        <IonDatetime
          presentation="date"
          value={value}
          onIonChange={onIonChange}
          showDefaultButtons
          doneText="Confirm"
          cancelText="Cancel"
          onIonCancel={handleCancel}
          {...props}
        />
      </IonModal>
    </div>
  );
}
