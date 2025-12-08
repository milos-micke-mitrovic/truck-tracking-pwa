import { useState, useCallback } from 'react';
import type { ToastVariant } from '@/shared/ui';

interface ToastState {
  isOpen: boolean;
  message: string;
  variant: ToastVariant;
}

interface UseToastReturn {
  isOpen: boolean;
  message: string;
  variant: ToastVariant;
  showToast: (message: string, variant?: ToastVariant) => void;
  hideToast: () => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const initialState: ToastState = {
  isOpen: false,
  message: '',
  variant: 'info',
};

export function useToast(): UseToastReturn {
  const [state, setState] = useState<ToastState>(initialState);

  const showToast = useCallback((message: string, variant: ToastVariant = 'info') => {
    setState({ isOpen: true, message, variant });
  }, []);

  const hideToast = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const success = useCallback(
    (message: string) => {
      showToast(message, 'success');
    },
    [showToast]
  );

  const error = useCallback(
    (message: string) => {
      showToast(message, 'error');
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string) => {
      showToast(message, 'warning');
    },
    [showToast]
  );

  const info = useCallback(
    (message: string) => {
      showToast(message, 'info');
    },
    [showToast]
  );

  return {
    isOpen: state.isOpen,
    message: state.message,
    variant: state.variant,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info,
  };
}
