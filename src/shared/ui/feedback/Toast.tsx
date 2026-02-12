import { IonToast } from '@ionic/react';
import {
  checkmarkCircleOutline,
  alertCircleOutline,
  warningOutline,
  informationCircleOutline,
} from 'ionicons/icons';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  isOpen: boolean;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  position?: 'top' | 'middle' | 'bottom';
  onDidDismiss?: () => void;
}

const iconMap: Record<ToastVariant, string> = {
  success: checkmarkCircleOutline,
  error: alertCircleOutline,
  warning: warningOutline,
  info: informationCircleOutline,
};

const colorMap: Record<ToastVariant, string> = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
  info: 'primary',
};

export function Toast({
  isOpen,
  message,
  variant = 'info',
  duration = 3000,
  position = 'top',
  onDidDismiss,
}: ToastProps) {
  return (
    <IonToast
      isOpen={isOpen}
      message={message}
      duration={duration}
      position={position}
      color={colorMap[variant]}
      icon={iconMap[variant]}
      onDidDismiss={onDidDismiss}
      className="toast"
    />
  );
}
