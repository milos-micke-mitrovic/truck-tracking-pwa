import { IonDatetime, IonModal } from '@ionic/react';
import type { ComponentProps } from 'react';
import { useState, useRef } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/shared/utils';
import { Text } from '../typography';

type IonDatetimeProps = ComponentProps<typeof IonDatetime>;

export interface TimePickerProps extends Omit<IonDatetimeProps, 'presentation'> {
  label?: string;
  helperText?: string;
  error?: string;
  placeholder?: string;
}

export function TimePicker({
  label,
  helperText,
  error,
  placeholder = 'Select time...',
  value,
  onIonChange,
  className,
  ...props
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const modalRef = useRef<HTMLIonModalElement>(null);
  const hasError = !!error;

  const formatTime = (timeString: string | string[] | null | undefined): string => {
    if (!timeString) return '';
    const time = Array.isArray(timeString) ? timeString[0] : timeString;
    // Handle ISO string or time-only string
    const date = time.includes('T') ? new Date(time) : new Date(`1970-01-01T${time}`);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const displayValue = formatTime(value);

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
        <Clock size={20} className="picker__icon" />
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
          presentation="time"
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
