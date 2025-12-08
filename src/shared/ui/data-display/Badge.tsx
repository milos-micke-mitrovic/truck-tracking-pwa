import type { ReactNode } from 'react';
import { cn } from '@/shared/utils';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('badge', variant !== 'default' && `badge--${variant}`, className)}>
      {children}
    </span>
  );
}
