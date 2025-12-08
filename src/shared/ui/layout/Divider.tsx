import { cn } from '@/shared/utils';

export interface DividerProps {
  variant?: 'default' | 'thick';
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({
  variant = 'default',
  direction = 'horizontal',
  className,
}: DividerProps) {
  return (
    <div
      className={cn(
        'divider',
        variant === 'thick' && 'divider--thick',
        direction === 'vertical' && 'divider--vertical',
        className
      )}
    />
  );
}
