import { IonToast } from '@ionic/react';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  isOpen: boolean;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  position?: 'top' | 'middle' | 'bottom';
  onDidDismiss?: () => void;
}

const iconMap: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
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
      icon={iconMap[variant] as unknown as string}
      onDidDismiss={onDidDismiss}
      className="toast"
    />
  );
}
