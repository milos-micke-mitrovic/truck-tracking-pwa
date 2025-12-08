import { IonButton, IonSpinner } from '@ionic/react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/shared/utils';

type IonButtonProps = ComponentProps<typeof IonButton>;

export interface ButtonProps extends Omit<IonButtonProps, 'children' | 'size'> {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'clear';
  size?: 'small' | 'default' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Button({
  children,
  variant = 'solid',
  size = 'default',
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <IonButton
      fill={variant === 'solid' ? 'solid' : variant === 'outline' ? 'outline' : 'clear'}
      size={size}
      expand={fullWidth ? 'block' : undefined}
      disabled={disabled || loading}
      className={cn('button', className)}
      {...props}
    >
      {loading ? (
        <IonSpinner name="crescent" className="button__spinner" />
      ) : (
        <>
          {startIcon && (
            <span slot="start" className="button__icon">
              {startIcon}
            </span>
          )}
          {children}
          {endIcon && (
            <span slot="end" className="button__icon">
              {endIcon}
            </span>
          )}
        </>
      )}
    </IonButton>
  );
}
