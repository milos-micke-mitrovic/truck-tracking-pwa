import { IonInput } from '@ionic/react';
import type { ComponentProps, ReactNode } from 'react';
import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/utils';
import { Text } from '../typography';

type IonInputProps = ComponentProps<typeof IonInput>;

export interface InputProps extends Omit<IonInputProps, 'label'> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Input = forwardRef<HTMLIonInputElement, InputProps>(
  ({ label, error, helperText, startIcon, endIcon, type, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

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
            isFocused && 'input-wrapper__field--focused',
            hasError && 'input-wrapper__field--error'
          )}
        >
          {startIcon && (
            <div className="input-wrapper__icon input-wrapper__icon--start">{startIcon}</div>
          )}
          <IonInput
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            className={cn('input', className)}
            onIonFocus={() => setIsFocused(true)}
            onIonBlur={() => setIsFocused(false)}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              className="input-wrapper__password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          ) : (
            endIcon && <div className="input-wrapper__icon input-wrapper__icon--end">{endIcon}</div>
          )}
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

Input.displayName = 'Input';
