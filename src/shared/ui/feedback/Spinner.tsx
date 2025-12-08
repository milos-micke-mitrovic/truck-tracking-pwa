import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 40,
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return <Loader2 size={sizeMap[size]} className={cn('spinner', `spinner--${size}`, className)} />;
}
